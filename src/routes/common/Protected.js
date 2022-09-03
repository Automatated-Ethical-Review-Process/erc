import { Navigate, Outlet, useLocation } from "react-router-dom";

import useAuth from "hooks/useAuth";
import DashboardLayout from "layouts/DashboardLayout";
import Loading from "components/common/Loading";
import routes from "config/routes";

const Redirect = ({ to }) => {
  const location = useLocation();
  return <Navigate to={to} replace state={{ from: location }} />;
};

export const ProtectedNavigate = ({ rules, children }) => {
  const { user, isAuthenticated, isLoading } = useAuth();

  for (let rule of rules) {
    if (isAuthenticated && user.roles.includes(rule.role)) {
      return <Redirect to={rule.to} />;
    }
  }

  return <Loading value={isLoading}>{children}</Loading>;
};

const unverifiedRoutes = [routes.profile, routes.notification];

export const ProtectedRoute = ({
  role,
  to = routes.signIn,
  init = true,
  children,
}) => {
  const { pathname } = useLocation();
  const { user, isAuthenticated, isLoading } = useAuth(init);

  if (isLoading) {
    return <Loading value={isLoading} />;
  }

  if (
    isAuthenticated &&
    user.state === false &&
    !unverifiedRoutes.includes(pathname)
  ) {
    return <Redirect to={routes.profile} />;
  }

  return isAuthenticated &&
    (role === undefined || user.roles.includes(role)) ? (
    children || <Outlet />
  ) : (
    <Redirect to={to} />
  );
};

export const ProtectedDashboardRoute = ({ role, to, children }) => {
  const { pathname } = useLocation();

  return (
    <ProtectedRoute role={role} to={to}>
      {pathname.split("/").filter((i) => i).length === 1 ? (
        <DashboardLayout role={role} />
      ) : (
        children
      )}
    </ProtectedRoute>
  );
};
