import { Route, Navigate } from 'react-router-dom';
import { Role } from '../../Models/IUserModel';

interface PrivateRouteProps {
    path: string;
    element: React.ReactNode;
    userRole: Role;
  }
  
  const PrivateRoute: React.FC<PrivateRouteProps> = ({
    path,
    element,
    userRole,
  }) => {
    if (userRole === Role.admin) {
      return <Route path={path} element={element} />;
    } else {
      return <Navigate to="/unauthorized" />;
    }
  };

export default PrivateRoute;
