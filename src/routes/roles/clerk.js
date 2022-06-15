import { Route } from "react-router-dom";

import ClerkLayout from "layouts/sidebar/ClerkLayout";
import ClerkDashboard from "containers/dashboard/ClerkDashboard";
import NewUserDetails from "containers/sidebar/clerk/newUserRequests/userDetails1";
import CurrentUsers from "containers/sidebar/clerk/currentUsers/CurrentUsers";
import AddReviewer from "containers/sidebar/clerk/addReviewer/addReviewer";
import NewSubmissions from "containers/sidebar/clerk/newSubmissions/newSubmission";
import Undergraduate from "containers/sidebar/clerk/newUserRequests/undergraduate";
import Proposals from "components/proposals/Proposals";
import Versions from "components/proposals/Versions";
import Documents from "components/proposals/Documents";
import Users from "components/users/users";

import documentRoute from "routes/common/document";
import routes from "config/routes";
import roles from "config/roles";
import { ProtectedDashboardRoute } from "routes/common/Protected";

const clerkRoute = (
   <Route
      path={routes.clerk}
      element={
         <ProtectedDashboardRoute role={roles.clerk}>
            <ClerkLayout />
         </ProtectedDashboardRoute>
      }
   >
      <Route index element={<ClerkDashboard />} />

      <Route path="new-user-requests">
         <Route index element={<Users />} />
         <Route path=":uid">
            <Route index element={<NewUserDetails />} />
            <Route path="undergraduate">
               <Route index element={<Undergraduate />} />
            </Route>
         </Route>
      </Route>

      <Route path="current-users">
         <Route index element={<Users />} />
         <Route path=":uid">
            <Route index element={<CurrentUsers />} />
            <Route path="undergraduate">
               <Route index element={<Undergraduate />} />
            </Route>
         </Route>
      </Route>

      <Route path="new-submissions">
         <Route index element={<Proposals />} />
         <Route path=":pid">
            <Route index element={<NewSubmissions />} />
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
