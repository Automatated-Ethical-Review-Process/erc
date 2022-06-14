import { Route } from "react-router-dom";

import AdminLayout from "layouts/sidebar/AdminLayout";
import AdminDashboard from "containers/dashboard/AdminDashboard";
import Users from "components/users/users";
import Undergraduate from "components/users/undergraduate";
import AddUsers from "containers/sidebar/admin/AddUsers";
import CurrentUsers from "containers/sidebar/admin/CurrentUsers";

import roles from "config/roles";
import routes from "config/routes";
import { ProtectedDashboardRoute } from "routes/common/Protected";

const adminRoute = (
   <Route
      path={routes.admin}
      element={
         <ProtectedDashboardRoute role={roles.admin}>
            <AdminLayout />
         </ProtectedDashboardRoute>
      }
   >
      <Route index element={<AdminDashboard />} />

      <Route path="users">
         <Route index element={<Users />} />
         <Route path=":uid">
            <Route index element={<CurrentUsers />} />
            <Route path="undergraduate">
               <Route index element={<Undergraduate />} />
            </Route>
         </Route>
      </Route>

      <Route path="add-user" element={<AddUsers />} />
   </Route>
);

export default adminRoute;
