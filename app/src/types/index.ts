export interface User {
  id: string;
  email: string;
  type: 'personal' | 'user';
  name?: string;
  profile?: UserProfile | PersonalProfile;
  createdAt: string;
}

export interface UserProfile {
  age: number;
  name?: string;
  gender: 'M' | 'F';
  bloodType: string;
  height: number;
  weight: number;
  hasTrainer: boolean;
  objective: 'mass' | 'fat_loss' | 'health';
  workoutType: 'gym' | 'cardio' | 'functional' | 'other';
  frequency: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
  schedule: 'morning' | 'afternoon' | 'evening' | 'flexible';
  allergies: string;
  avoidFoods: string;
  dietType: 'few_meals' | 'many_meals' | 'practical';
  intermittentFasting: 'yes' | 'no' | 'maybe';
  photo?: string;
  streak: number;
  workoutDays: string[];
}

export interface PersonalProfile {
  cref?: string;
  photo?: string;
  students: string[];
  experience: number;
}

export interface Workout {
  id: string;
  userId: string;
  personalId?: string;
  date: string;
  exercises: Exercise[];
  completed: boolean;
}

export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: string;
  weight?: number;
  duration?: number;
  notes?: string;
}

export interface Diet {
  id: string;
  userId: string;
  personalId?: string;
  date: string;
  meals: Meal[];
}

export interface Meal {
  id: string;
  name: string;
  time: string;
  foods: Food[];
  calories: number;
}

export interface Food {
  name: string;
  quantity: string;
  calories: number;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, type: 'personal' | 'user') => Promise<boolean>;
  logout: () => void;
  updateProfile: (profile: Partial<UserProfile | PersonalProfile>) => void;
  loading: boolean;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  photo?: string;
  workoutDays: number;
  progress: number;
  objective: 'mass' | 'fat_loss' | 'health';
  addedAt: string;
}

export interface Session {
  id: string;
  studentId: string;
  personalId: string;
  date: string;
  time: string;
  notes?: string;
  status: 'scheduled' | 'completed' | 'cancelled';
}

export interface CommunityUser {
  id: string;
  name: string;
  photo?: string;
  objective: 'mass' | 'fat_loss' | 'health';
  frequency: number;
  isFollowing?: boolean;
}