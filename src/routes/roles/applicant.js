import { Route } from "react-router-dom";

import Proposal from "components/proposals/Proposal";
import Versions from "components/proposals/Versions";
import Documents from "components/proposals/Documents";
import ApplicantDashboard from "containers/dashboard/ApplicantDashboard";
import NewSubmission from "containers/sidebar/applicant/NewSubmission";
import OngoingSubmission from "containers/sidebar/applicant/ongoingSubmissions/Proposal";
import ApplicantLayout from "layouts/sidebar/ApplicantLayout";

import Roles from "config/roles";
import routes from "config/routes";
import { documentRoute, otherDocumentRoute } from "routes/common/document";
import { ProtectedDashboardRoute } from "routes/common/Protected";

import ApplicantOldSubmissions from "containers/sidebar/applicant/OldSubmissions";
import ApplicantOngoingSubmissions from "containers/sidebar/applicant/ongoingSubmissions/Proposals";
import ApplicantPendingSubmissions from "containers/sidebar/applicant/PendingSubmissions";
import ViewDecision from "containers/sidebar/applicant/common/ViewDecision";
import DocumentsWithDecision from "containers/sidebar/applicant/common/DocumentsWithDecision";
import SubmitNewVersion from "containers/sidebar/applicant/ongoingSubmissions/SubmitNewVersion";

const applicantRoute = (
  <Route
    path={routes.applicant}
    element={
      <ProtectedDashboardRoute role={Roles.applicant}>
        <ApplicantLayout />
      </ProtectedDashboardRoute>
    }
  >
    <Route index element={<ApplicantDashboard />} />

    <Route path="new-submission" element={<NewSubmission />} />

    <Route path="pending-submissions">
      <Route index element={<ApplicantPendingSubmissions />} />
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
        {otherDocumentRoute}
      </Route>
    </Route>

    <Route path="ongoing-submissions">
      <Route index element={<ApplicantOngoingSubmissions />} />
      <Route path=":pid">
        <Route index element={<OngoingSubmission />} />
        <Route path="new-version" element={<SubmitNewVersion />} />
        <Route path="versions">
          <Route index element={<Versions />} />
          <Route path=":vid">
            <Route index element={<DocumentsWithDecision />} />
            <Route path="decision" element={<ViewDecision />} />
            {documentRoute}
          </Route>
        </Route>
        {otherDocumentRoute}
      </Route>
    </Route>

    <Route path="old-submissions">
      <Route index element={<ApplicantOldSubmissions />} />
      <Route path=":pid">
        <Route
          index
          element={<Proposal extraFields={{ status: "Status" }} />}
        />
        <Route path="versions">
          <Route index element={<Versions />} />
          <Route path=":vid">
            <Route index element={<DocumentsWithDecision />} />
            <Route path="decision" element={<ViewDecision />} />
            {documentRoute}
          </Route>
        </Route>
        {otherDocumentRoute}
      </Route>
    </Route>
  </Route>
);

export default applicantRoute;
