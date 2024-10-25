import { useSelector } from "react-redux";
import { Navigate } from 'react-router-dom';

function ProctectRoute({ children, isPrivate, adminRoute }) {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  if (adminRoute) {
    if (isAuthenticated) {
      if (user) {
        if (user.name === 'nguyenquoctien') {
          return (<div>This is admin....</div>)
        }
        else {
          return <Navigate to="/home" />;
        }
      }
    }
    else {
      return <Navigate to="/" />;
    }
  }


  if (isPrivate && !isAuthenticated) {
    return <Navigate to="/" />;
  }


  if (!isPrivate && isAuthenticated) {
    return <Navigate to="/home" />;
  }

  return children;
}

export default ProctectRoute;
