import React from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { AuthForm } from './components/auth/AuthForm';
import { UserOnboarding } from './components/onboarding/UserOnboarding';
import { PersonalOnboarding } from './components/onboarding/PersonalOnboarding';
import { UserDashboard } from './components/dashboard/UserDashboard';
import { PersonalDashboard } from './components/dashboard/PersonalDashboard';
import { StudentsList } from './components/personal/StudentsList';
import { AddStudent } from './components/personal/AddStudent';
import { CreateWorkout } from './components/personal/CreateWorkout';
import { ScheduleSession } from './components/personal/ScheduleSession';
import { UserWorkout } from './components/user/UserWorkout';
import { UserDiet } from './components/user/UserDiet';
import { Community } from './components/user/Community';
import { UserProfile } from './components/user/UserProfile';
import { UserProfileView } from './components/user/UserProfileView';
import { Layout } from './components/layout/Layout';

const AppContent: React.FC = () => {
  const { user, loading } = useAuth();
  const [currentPage, setCurrentPage] = React.useState('dashboard');
  const [selectedStudentId, setSelectedStudentId] = React.useState<string>('');
  const [selectedStudentName, setSelectedStudentName] = React.useState<string>('');
  const [selectedUserId, setSelectedUserId] = React.useState<string>('');

  if (loading) {
    return (
      <div className="min-h-screen bg-background-primary flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-content-brand"></div>
      </div>
    );
  }

  if (!user) {
    return <AuthForm />;
  }

  // Check if user needs onboarding
  if (!user.profile) {
    if (user.type === 'personal') {
      return <PersonalOnboarding />;
    } else {
      return <UserOnboarding />;
    }
  }

  const handleNavigate = (page: string, userId?: string) => {
    setCurrentPage(page);
    if (userId) {
      setSelectedUserId(userId);
    }
  };

  const handleAddStudent = () => {
    setCurrentPage('add-student');
  };

  const handleCreateWorkout = (studentId: string) => {
    setSelectedStudentId(studentId);
    setSelectedStudentName('João Silva'); // This would come from actual data
    setCurrentPage('create-workout');
  };

  const handleScheduleSession = (studentId: string) => {
    setSelectedStudentId(studentId);
    setSelectedStudentName('João Silva'); // This would come from actual data
    setCurrentPage('schedule-session');
  };

  const renderPersonalContent = () => {
    switch (currentPage) {
      case 'students':
        return (
          <StudentsList
            onAddStudent={handleAddStudent}
            onCreateWorkout={handleCreateWorkout}
            onScheduleSession={handleScheduleSession}
          />
        );
      case 'add-student':
        return <AddStudent onBack={() => setCurrentPage('students')} />;
      case 'create-workout':
        return (
          <CreateWorkout
            studentId={selectedStudentId}
            studentName={selectedStudentName}
            onBack={() => setCurrentPage('students')}
          />
        );
      case 'schedule-session':
        return (
          <ScheduleSession
            studentId={selectedStudentId}
            studentName={selectedStudentName}
            onBack={() => setCurrentPage('students')}
          />
        );
      case 'search':
        return <AddStudent onBack={() => setCurrentPage('dashboard')} />;
      case 'sessions':
        return <ScheduleSession studentId="" studentName="Todos os alunos" onBack={() => setCurrentPage('dashboard')} />;
      default:
        return <PersonalDashboard onNavigate={handleNavigate} />;
    }
  };

  const renderUserContent = () => {
    switch (currentPage) {
      case 'workout':
        return <UserWorkout onNavigate={handleNavigate} />;
      case 'diet':
        return <UserDiet />;
      case 'community':
        return <Community />;
      case 'profile':
        return <UserProfile />;
      case 'user-profile':
        return <UserProfileView userId={selectedUserId} onBack={() => setCurrentPage('community')} />;
      default:
        return <UserDashboard onNavigate={handleNavigate} />;
    }
  };
  // User is authenticated and has completed onboarding
  return (
    <Layout currentPage={currentPage} onNavigate={handleNavigate}>
      {user.type === 'personal' ? renderPersonalContent() : renderUserContent()}
    </Layout>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;