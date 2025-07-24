import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { AppRoutes } from '../src/routes/AppRoutes';
import { Layout } from './components/layout/Layout';

function AppContent() {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login';

  return (
    <>
      {isAuthPage ? (
        <AppRoutes />
      ) : (
        <Layout>
          <AppRoutes />
        </Layout>
      )}
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
