import P from "prop-types";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { getIsLogged } from "../../store/selectors";

function RequireAuth({ children }) {
  const location = useLocation();
  // const { isLogged } = useAuth();
  const isLogged = useSelector(getIsLogged);

  return isLogged ? children : <Navigate to="/login" state={{ from: location.pathname }} replace />;
}

RequireAuth.propTypes = {
  children: P.node.isRequired,
};

export default RequireAuth;
