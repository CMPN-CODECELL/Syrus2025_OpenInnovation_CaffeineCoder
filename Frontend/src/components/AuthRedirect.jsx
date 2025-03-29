// components/AuthRedirect.jsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AuthRedirect = () => {
  const { user } = useAuth();
  
  // Redirect to appropriate dashboard based on role
  if (user) {
    return <Navigate to={`/${user.role.toLowerCase()}/dashboard`} replace />;
  }
  
  return null;
};

export default AuthRedirect;