import { User, UserProfile, PersonalProfile, Workout, Exercise } from '../types';

const API_BASE_URL = 'http://localhost:3001/api';

interface ApiResponse<T> {
  message: string;
  data: T;
}

interface AuthResponse {
  user: User;
  token: string;
}

interface ApiError extends Error {
  status?: number;
}

class ApiService {
  private token: string | null = null;

  constructor() {
    this.token = localStorage.getItem('token');
  }

  private createApiError(message: string, status?: number): ApiError {
    const error = new Error(message) as ApiError;
    error.status = status;
    return error;
  }

  private getAuthHeaders(): Record<string, string> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    return headers;
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage = errorData.error || `HTTP error! status: ${response.status}`;
      throw this.createApiError(errorMessage, response.status);
    }

    return await response.json();
  }

  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const config: RequestInit = {
      headers: this.getAuthHeaders(),
      ...options,
    };

    try {
      const response = await fetch(url, config);
      return await this.handleResponse<T>(response);
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  private setAuthToken(token: string): void {
    this.token = token;
    localStorage.setItem('token', token);
  }

  private clearAuthToken(): void {
    this.token = null;
    localStorage.removeItem('token');
  }

  // Auth methods
  async login(email: string, password: string): Promise<AuthResponse> {
    const response = await this.makeRequest<ApiResponse<AuthResponse>>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    this.setAuthToken(response.data.token);
    return response.data;
  }

  async register(email: string, password: string, type: 'USER' | 'PERSONAL'): Promise<AuthResponse> {
    const response = await this.makeRequest<ApiResponse<AuthResponse>>('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, type }),
    });

    this.setAuthToken(response.data.token);
    return response.data;
  }

  async getProfile(): Promise<User> {
    const response = await this.makeRequest<ApiResponse<User>>('/auth/profile');
    return response.data;
  }

  logout(): void {
    this.clearAuthToken();
  }

  // User profile methods
  async updateUserProfile(profile: Partial<UserProfile>): Promise<UserProfile> {
    const response = await this.makeRequest<ApiResponse<UserProfile>>('/users/profile/user', {
      method: 'PUT',
      body: JSON.stringify(profile),
    });
    return response.data;
  }

  async updatePersonalProfile(profile: Partial<PersonalProfile>): Promise<PersonalProfile> {
    const response = await this.makeRequest<ApiResponse<PersonalProfile>>('/users/profile/personal', {
      method: 'PUT',
      body: JSON.stringify(profile),
    });
    return response.data;
  }

  // User search and management
  async searchUsers(query: string): Promise<User[]> {
    const encodedQuery = encodeURIComponent(query);
    const response = await this.makeRequest<ApiResponse<User[]>>(`/users/search?q=${encodedQuery}`);
    return response.data;
  }

  async addStudent(studentId: string): Promise<void> {
    await this.makeRequest('/users/students', {
      method: 'POST',
      body: JSON.stringify({ studentId }),
    });
  }

  async getStudents(): Promise<any[]> {
    const response = await this.makeRequest<ApiResponse<any[]>>('/users/students');
    return response.data;
  }

  // Workout methods
  async createWorkout(workout: {
    name: string;
    userId: string;
    date: string;
    exercises: Omit<Exercise, 'id'>[];
  }): Promise<Workout> {
    const response = await this.makeRequest<ApiResponse<Workout>>('/workouts', {
      method: 'POST',
      body: JSON.stringify(workout),
    });
    return response.data;
  }

  async getUserWorkouts(userId?: string): Promise<Workout[]> {
    const endpoint = userId ? `/workouts/user/${userId}` : '/workouts/user';
    const response = await this.makeRequest<ApiResponse<Workout[]>>(endpoint);
    return response.data;
  }

  async getWorkout(workoutId: string): Promise<Workout> {
    const response = await this.makeRequest<ApiResponse<Workout>>(`/workouts/${workoutId}`);
    return response.data;
  }

  async updateWorkout(workoutId: string, workout: Partial<Workout>): Promise<Workout> {
    const response = await this.makeRequest<ApiResponse<Workout>>(`/workouts/${workoutId}`, {
      method: 'PUT',
      body: JSON.stringify(workout),
    });
    return response.data;
  }

  async deleteWorkout(workoutId: string): Promise<void> {
    await this.makeRequest(`/workouts/${workoutId}`, {
      method: 'DELETE',
    });
  }

  async completeWorkout(workoutId: string): Promise<Workout> {
    const response = await this.makeRequest<ApiResponse<Workout>>(`/workouts/${workoutId}/complete`, {
      method: 'PATCH',
    });
    return response.data;
  }

  // Health check
  async healthCheck(): Promise<{ status: string; timestamp: string }> {
    return await this.makeRequest('/health');
  }
}

export const apiService = new ApiService();