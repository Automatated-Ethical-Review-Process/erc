import { Route } from "react-router-dom";

import ClerkLayout from "layouts/sidebar/ClerkLayout";
import ClerkDashboard from "containers/dashboard/ClerkDashboard";
import NewUser from "containers/sidebar/clerk/newUserRequests/userDetails1";
import CurrentUser from "containers/sidebar/clerk/currentUsers/CurrentUser";
import AddReviewer from "containers/sidebar/clerk/addReviewer/addReviewer";
import NewSubmission from "containers/sidebar/clerk/newSubmissions/newSubmission";
import Undergraduate from "containers/sidebar/clerk/newUserRequests/undergraduate";
import Proposals from "components/proposals/Proposals";
import Versions from "components/proposals/Versions";
import Documents from "components/proposals/Documents";
import Users from "components/users/users";
import BaseUndergraduate from "components/users/undergraduate";

import documentRoute from "routes/common/document";
import routes from "config/routes";
import Roles from "config/roles";
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
         <Route path=":uid">
            <Route index element={<NewUser />} />
            <Route path="undergraduate">
               <Route index element={<Undergraduate />} />
            </Route>
         </Route>
      </Route>

      <Route path="current-users">
         <Route index element={<Users extraFields={{ roles: "Roles" }} />} />
         <Route path=":uid">
            <Route index element={<CurrentUser />} />
            <Route path="undergraduate">
               <Route index element={<BaseUndergraduate />} />
            </Route>
         </Route>
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
