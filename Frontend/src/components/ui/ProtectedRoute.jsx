import { Navigate } from 'react-router-dom';
import { useUser } from '../utils/UserContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useUser();

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;