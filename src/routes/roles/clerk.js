import { Route } from "react-router-dom";

import Documents from "components/proposals/Documents";
import Proposals from "components/proposals/Proposals";
import Versions from "components/proposals/Versions";
import Users from "components/users/users";
import User from "components/users/user";
import ClerkDashboard from "containers/dashboard/ClerkDashboard";
import AddReviewer from "containers/sidebar/clerk/AddReviewer";
import NewSubmission from "containers/sidebar/clerk/NewSubmission";
import NewUser from "containers/sidebar/clerk/NewUser";
import ClerkLayout from "layouts/sidebar/ClerkLayout";

import Roles from "config/roles";
import routes from "config/routes";
import documentRoute from "routes/common/document";
import { ProtectedDashboardRoute } from "routes/common/Protected";

const clerkRoute = (
  <Route
    path={routes.clerk}
    element={
      <ProtectedDashboardRoute role={Roles.clerk}>
        <ClerkLayout />
      </ProtectedDashboardRoute>
    }
  >
    <Route index element={<ClerkDashboard />} />

    <Route path="new-user-requests">
      <Route index element={<Users />} />
      <Route path=":uid" element={<NewUser />} />
    </Route>

    <Route path="current-users">
      <Route index element={<Users extraFields={{ roles: "Roles" }} />} />
      <Route path=":uid" element={<User />} />
    </Route>

    <Route path="new-submissions">
      <Route index element={<Proposals extraFields={{ pi: "PI" }} />} />
      <Route path=":pid">
        <Route index element={<NewSubmission />} />
        <Route path="versions">
          <Route index element={<Versions />} />
          <Route path=":vid">
            <Route index element={<Documents />} />
            {documentRoute}
          </Route>
        </Route>
      </Route>
    </Route>

    <Route path="add-reviewer" element={<AddReviewer />} />
  </Route>
);

export default clerkRoute;
