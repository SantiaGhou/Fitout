// appRoutes.tsx
import React from 'react';
import { Routes, Route, Navigate, useNavigate, useParams } from 'react-router-dom';

import { useAuth } from '../contexts/AuthContext';

import { AuthForm } from '../components/auth/AuthForm';
import { UserOnboarding } from '../components/onboarding/UserOnboarding';
import { PersonalOnboarding } from '../components/onboarding/PersonalOnboarding';
import { UserDashboard } from '../components/dashboard/UserDashboard';
import { PersonalDashboard } from '../components/dashboard/PersonalDashboard';
import { StudentsList } from '../components/personal/StudentsList';
import { AddStudent } from '../components/personal/AddStudent';
import { CreateWorkout } from '../components/personal/CreateWorkout';
import { ScheduleSession } from '../components/personal/ScheduleSession';
import { UserWorkout } from '../components/user/UserWorkout';
import { UserDiet } from '../components/user/UserDiet';
import { Community } from '../components/user/Community';
import { UserProfile } from '../components/user/UserProfile';
import { UserProfileView } from '../components/user/UserProfileView';


// ⛔ Função que só deixa acessar se estiver logado
function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) return <div>Carregando...</div>;
  if (!user) return <Navigate to="/login" />;
  if (!user.profile) return <Navigate to="/onboarding" />;
  return <>{children}</>;
}

// 🔄 Direciona pro onboarding certo baseado no tipo de usuário
function OnboardingRoute() {
  const { user, loading } = useAuth();

  console.log('[OnboardingRoute] loading:', loading, 'user:', user?.id, 'profile:', user?.profile);

  if (loading) return <div>Carregando...</div>;
  if (!user) return <Navigate to="/login" />;
  if (user.profile) return <Navigate to="/" />;

  return user.type === 'personal' ? <PersonalOnboarding /> : <UserOnboarding />;
}

// 🧭 Wrappers pra lidar com navegação e props obrigatórias
function AddStudentWrapper() {
  const navigate = useNavigate();
  return <AddStudent onBack={() => navigate('/students')} />;
}

function StudentsListWrapper() {
  const navigate = useNavigate();

  function handleAddStudent() {
    navigate('/students/add');
  }

  function handleCreateWorkout(studentId: string) {
    navigate(`/students/${studentId}/create-workout`);
  }

  function handleScheduleSession(studentId: string) {
    navigate(`/students/${studentId}/schedule-session`);
  }

  return (
    <StudentsList
      onAddStudent={handleAddStudent}
      onCreateWorkout={handleCreateWorkout}
      onScheduleSession={handleScheduleSession}
    />
  );
}

function CreateWorkoutWrapper() {
  const { studentId } = useParams();
  const navigate = useNavigate();

  if (!studentId) return <div>Aluno não encontrado</div>;

  const studentName = 'João Silva'; // Aqui você pode buscar o nome real se quiser
  return <CreateWorkout studentId={studentId} studentName={studentName} onBack={() => navigate('/students')} />;
}

function ScheduleSessionWrapper() {
  const { studentId } = useParams();
  const navigate = useNavigate();

  if (!studentId) return <div>Aluno não encontrado</div>;

  const studentName = 'João Silva'; // Mesmo esquema aqui
  return <ScheduleSession studentId={studentId} studentName={studentName} onBack={() => navigate('/students')} />;
}

function UserProfileViewWrapper() {
  const { userId } = useParams();
  const navigate = useNavigate();

  if (!userId) return <div>Usuário não encontrado</div>;

  return <UserProfileView userId={userId} onBack={() => navigate('/community')} />;
}

// 🔒 Rotas privadas com base no tipo de usuário
function AppPrivateRoutes() {
  const { user } = useAuth();
  if (!user) return null;

  if (user.type === 'personal') {
    return (
      <Routes>
        <Route path="/" element={<PersonalDashboard />} />
        <Route path="/students" element={<StudentsListWrapper />} />
        <Route path="/students/add" element={<AddStudentWrapper />} />
        <Route path="/students/:studentId/create-workout" element={<CreateWorkoutWrapper />} />
        <Route path="/students/:studentId/schedule-session" element={<ScheduleSessionWrapper />} />
        <Route
          path="/sessions"
          element={<ScheduleSession studentId="" studentName="Todos os alunos" onBack={() => {}} />}
        />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<UserDashboard />} />
      <Route path="/workout" element={<UserWorkout />} />
      <Route path="/diet" element={<UserDiet />} />
      <Route path="/community" element={<Community />} />
      <Route path="/profile" element={<UserProfile />} />
      <Route path="/user-profile/:userId" element={<UserProfileViewWrapper />} />
    </Routes>
  );
}

// 🌍 Exporta as rotas gerais
export function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<AuthForm />} />
      <Route path="/onboarding" element={<OnboardingRoute />} />
      <Route
        path="/*"
        element={
          <PrivateRoute>
            <AppPrivateRoutes />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}
