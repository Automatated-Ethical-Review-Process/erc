import { Route } from "react-router-dom";

import ReviewerLayout from "layouts/sidebar/ReviewerLayout";
import ReviewerDashboard from "containers/dashboard/ReviewerDashboard";
import PendingProposal from "containers/sidebar/reviewer/pending/Proposal";
import ReviewingDocuments from "containers/sidebar/reviewer/reviewing/Documents";
import SubmitEvaluation from "containers/sidebar/reviewer/reviewing/SubmitEvaluation";
import ReviewedDocuments from "containers/sidebar/reviewer/reviewed/Documents";
import ViewEvaluation from "containers/sidebar/reviewer/reviewed/ViewEvaluation";
import OtherDocuments from "containers/sidebar/reviewer/other/Documents";
import AddComments from "containers/sidebar/reviewer/other/AddComments";
import Proposals from "components/proposals/Proposals";
import Proposal from "components/proposals/Proposal";
import Versions from "components/proposals/Versions";
import Documents from "components/proposals/Documents";

import routes from "config/routes";
import roles from "config/roles";
import { ProtectedDashboardRoute } from "routes/common/Protected";
import documentRoute from "routes/common/document";

const reviewerRoute = (
   <Route
      path={routes.reviewer}
      element={
         <ProtectedDashboardRoute role={roles.reviewer}>
            <ReviewerLayout />
         </ProtectedDashboardRoute>
      }
   >
      <Route index element={<ReviewerDashboard />} />

      <Route path="pending">
         <Route index element={<Proposals />} />
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
         <Route index element={<Proposals />} />
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
         <Route index element={<Proposals />} />
         <Route path=":pid">
            <Route index element={<Proposal />} />
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

      <Route path="other">
         <Route index element={<Proposals />} />
         <Route path=":pid">
            <Route index element={<Proposal />} />
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
