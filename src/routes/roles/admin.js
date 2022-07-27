import { Route } from "react-router-dom";

import AdminLayout from "layouts/sidebar/AdminLayout";
import AdminDashboard from "containers/dashboard/AdminDashboard";
import Users from "components/users/users";
import UpdateUser from "containers/sidebar/admin/UpdateUser";
import AddUser from "containers/sidebar/admin/AddUser";
import CurrentUser from "containers/sidebar/admin/CurrentUser";

import Roles from "config/roles";
import routes from "config/routes";
import { ProtectedDashboardRoute } from "routes/common/Protected";

const adminRoute = (
  <Route
    path={routes.admin}
    element={
      <ProtectedDashboardRoute role={Roles.admin}>
        <AdminLayout />
      </ProtectedDashboardRoute>
    }
  >
    <Route index element={<AdminDashboard />} />

    <Route path="users">
      <Route
        index
        element={
          <Users
            extraFields={{
              isUnderGraduate: "is UnderGraduate",
              mobileNumber: "Mobile number",
            }}
          />
        }
      />
      <Route path=":uid">
        <Route index element={<CurrentUser />} />
        <Route path="update">
          <Route index element={<UpdateUser />} />
        </Route>
      </Route>
    </Route>

    <Route path="add-user" element={<AddUser />} />
  </Route>
);

export default adminRoute;
