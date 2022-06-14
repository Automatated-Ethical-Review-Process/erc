import { Route } from "react-router-dom";

import ApplicantLayout from "layouts/sidebar/ApplicantLayout";
import ApplicantDashboard from "containers/dashboard/ApplicantDashboard";
import CurrentSubmission from "containers/sidebar/applicant/currentSubmission/CurrentSubmission";
import CurrentDocument from "containers/sidebar/applicant/currentSubmission/Documents";
import ViewDecision from "containers/sidebar/applicant/currentSubmission/ViewDecision";
import NewSubmission from "containers/sidebar/applicant/newSubmission/NewSubmission";
import OldSubmissions from "containers/sidebar/applicant/oldSubmissions/OldSubmissions";
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

      <Route path="current-submission">
         <Route index element={<CurrentSubmission />} />
         <Route path=":pid">
            <Route index element={<Proposal />} />
            <Route path="versions">
               <Route index element={<Versions />} />
               <Route path=":vid">
                  <Route index element={<CurrentDocument />} />
                  <Route path="decision" element={<ViewDecision />} />
                  {documentRoute}
               </Route>
            </Route>
         </Route>
      </Route>

      <Route path="old-submissions">
         <Route index element={<OldSubmissions />} />
         <Route path=":pid">
            <Route index element={<OldSubmissions />} />
            <Route path="versions">
               <Route index element={<Versions />} />
               <Route path=":vid">
                  <Route index element={<CurrentDocument />} />
                  {documentRoute}
               </Route>
            </Route>
         </Route>
      </Route>
   </Route>
);

export default applicantRoute;
