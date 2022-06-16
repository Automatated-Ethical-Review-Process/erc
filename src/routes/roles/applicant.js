import { Route } from "react-router-dom";

import ApplicantLayout from "layouts/sidebar/ApplicantLayout";
import ApplicantDashboard from "containers/dashboard/ApplicantDashboard";
import NewSubmission from "containers/sidebar/applicant/newSubmission/NewSubmission";
import CurrentSubmission from "containers/sidebar/applicant/currentSubmissions/Proposal";
import Documents from "containers/sidebar/applicant/currentSubmissions/Documents";
import Proposals from "components/proposals/Proposals";
import Proposal from "components/proposals/Proposal";
import Versions from "components/proposals/Versions";

import routes from "config/routes";
import roles from "config/roles";
import { ProtectedDashboardRoute } from "routes/common/Protected";
import documentRoute from "routes/common/document";

const applicantRoute = (
   <Route
      path={routes.applicant}
      element={
         <ProtectedDashboardRoute role={roles.applicant}>
            <ApplicantLayout />
         </ProtectedDashboardRoute>
      }
   >
      <Route index element={<ApplicantDashboard />} />

      <Route path="new-submission" element={<NewSubmission />} />

      <Route path="current-submissions">
         <Route
            index
            element={<Proposals extraFields={{ status: "Status" }} />}
         />
         <Route path=":pid">
            <Route index element={<CurrentSubmission />} />
            <Route path="versions">
               <Route index element={<Versions />} />
               <Route path=":vid">
                  <Route index element={<Documents />} />
                  {documentRoute}
               </Route>
            </Route>
         </Route>
      </Route>

      <Route path="old-submissions">
         <Route
            index
            element={<Proposals extraFields={{ status: "Status" }} />}
         />
         <Route path=":pid">
            <Route
               index
               element={<Proposal extraFields={{ status: "Status" }} />}
            />
            <Route path="versions">
               <Route index element={<Versions />} />
               <Route path=":vid">
                  <Route index element={<Documents />} />
                  {documentRoute}
               </Route>
            </Route>
         </Route>
      </Route>
   </Route>
);

export default applicantRoute;
