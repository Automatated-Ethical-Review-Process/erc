import { Route } from "react-router-dom";

import Documents from "components/proposals/Documents";
import Proposal from "components/proposals/Proposal";
import Versions from "components/proposals/Versions";
import ReviewerDashboard from "containers/dashboard/ReviewerDashboard";
import AddComments from "containers/sidebar/reviewer/other/AddComments";
import OtherDocuments from "containers/sidebar/reviewer/other/Documents";
import PendingProposal from "containers/sidebar/reviewer/pending/Proposal";
import ReviewedDocuments from "containers/sidebar/reviewer/reviewed/Documents";
import ViewEvaluation from "containers/sidebar/reviewer/reviewed/ViewEvaluation";
import ReviewingDocuments from "containers/sidebar/reviewer/reviewing/Documents";
import SubmitEvaluation from "containers/sidebar/reviewer/reviewing/SubmitEvaluation";
import ReviewerLayout from "layouts/sidebar/ReviewerLayout";

import Roles from "config/roles";
import routes from "config/routes";
import ReviewerOtherProposals from "containers/sidebar/reviewer/other/Proposals";
import ReviewerPendingProposals from "containers/sidebar/reviewer/pending/Proposals";
import ReviewerReviewedProposals from "containers/sidebar/reviewer/reviewed/Proposals";
import ReviewerReviewingProposals from "containers/sidebar/reviewer/reviewing/Proposals";
import { documentRoute } from "routes/common/document";
import {
  ProtectedDashboardRoute,
  ProtectedRoute,
} from "routes/common/Protected";
const reviewerRoute = (
  <Route
    path={routes.reviewer}
    element={
      <ProtectedDashboardRoute role={Roles.reviewer}>
        <ReviewerLayout />
      </ProtectedDashboardRoute>
    }
  >
    <Route index element={<ReviewerDashboard />} />

    <Route path="pending">
      <Route index element={<ReviewerPendingProposals />} />
      <Route path=":pid">
        <Route index element={<PendingProposal />} />
        <Route path="versions">
          <Route index element={<Versions />} />
          <Route path=":vid">
            <Route index element={<Documents />} />
            {documentRoute}
          </Route>
        </Route>
      </Route>
    </Route>

    <Route path="reviewing">
      <Route index element={<ReviewerReviewingProposals />} />
      <Route path=":pid">
        <Route index element={<Proposal />} />
        <Route path="versions">
          <Route index element={<Versions />} />
          <Route path=":vid">
            <Route index element={<ReviewingDocuments />} />
            <Route path="evaluation" element={<SubmitEvaluation />} />
            {documentRoute}
          </Route>
        </Route>
      </Route>
    </Route>

    <Route path="reviewed">
      <Route index element={<ReviewerReviewedProposals />} />
      <Route path=":pid">
        <Route index element={<Proposal extraFields={null} />} />
        <Route path="versions">
          <Route index element={<Versions />} />
          <Route path=":vid">
            <Route index element={<ReviewedDocuments />} />
            <Route path="evaluation" element={<ViewEvaluation />} />
            {documentRoute}
          </Route>
        </Route>
      </Route>
    </Route>

    <Route
      path="other"
      element={<ProtectedRoute role={Roles.i_reviewer} init={false} />}
    >
      <Route index element={<ReviewerOtherProposals />} />
      <Route path=":pid">
        <Route index element={<Proposal extraFields={null} />} />
        <Route path="versions">
          <Route index element={<Versions />} />
          <Route path=":vid">
            <Route index element={<OtherDocuments />} />
            <Route path="comments" element={<AddComments />} />
            {documentRoute}
          </Route>
        </Route>
      </Route>
    </Route>
  </Route>
);

export default reviewerRoute;
