import { BrowserRouter as Router, useLocation, useNavigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ModalProvider } from './contexts/ModalContext';
import { AppRoutes } from '../src/routes/AppRoutes';
import { Layout } from './components/layout/Layout';

function AppContent() {
  const location = useLocation();
  const navigate = useNavigate();
  const isAuthPage = location.pathname === '/login';

  // Deriva a página ativa direto do pathname (ex: "/workout" → "workout", "/" → "dashboard")
  const currentPage = location.pathname === '/' ? 'dashboard' : location.pathname.replace(/^\//, '').split('/')[0];

  function handleNavigate(page: string) {
    navigate(page === 'dashboard' ? '/' : `/${page}`);
  }

  return (
    <>
      {isAuthPage ? (
        <AppRoutes />
      ) : (
        <Layout currentPage={currentPage} onNavigate={handleNavigate}>
          <AppRoutes />
        </Layout>
      )}
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <ModalProvider>
        <Router>
          <AppContent />
        </Router>
      </ModalProvider>
    </AuthProvider>
  );
}

export default App;
