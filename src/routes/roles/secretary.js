import { Route } from "react-router-dom";

import SecretaryLayout from "layouts/sidebar/SecretaryLayout";
import SecretaryDashboard from "containers/dashboard/SecretaryDashboard";
import UnassignedProposal from "containers/sidebar/secretary/unassigned/Proposal";
import ChooseReviewType from "containers/sidebar/secretary/unassigned/ChooseReviewType";
import AssignReviewers from "containers/sidebar/secretary/unassigned/AssignReviewers";
import InReviewDocuments from "containers/sidebar/secretary/inReview/Documents";
import Reviews from "containers/sidebar/secretary/inReview/Reviews";
import Review from "containers/sidebar/secretary/inReview/Review";
import Comments from "containers/sidebar/secretary/inReview/Comments";
import Comment from "containers/sidebar/secretary/inReview/Comment";
import ReviewedProposal from "containers/sidebar/secretary/reviewed/Proposal";
import NotifyAuthor from "containers/sidebar/secretary/reviewed/NotifyAuthor";
import Proposals from "components/proposals/Proposals";
import Proposal from "components/proposals/Proposal";
import Versions from "components/proposals/Versions";
import Documents from "components/proposals/Documents";
import CurrentUsers from "containers/sidebar/clerk/currentUsers/CurrentUsers";
import Users from "components/users/users";

import routes from "config/routes";
import roles from "config/roles";
import { ProtectedDashboardRoute } from "routes/common/Protected";
import documentRoute from "routes/common/document";

const secretaryRoute = (
   <Route
      path={routes.secretary}
      element={
         <ProtectedDashboardRoute role={roles.secretary}>
            <SecretaryLayout />
         </ProtectedDashboardRoute>
      }
   >
      <Route index element={<SecretaryDashboard />} />

      <Route path="unassigned">
         <Route index element={<Proposals />} />
         <Route path=":pid">
            <Route index element={<UnassignedProposal />} />
            <Route path="review">
               <Route index element={<ChooseReviewType />} />
               <Route path="assign" element={<AssignReviewers />} />
            </Route>
            <Route path="versions">
               <Route index element={<Versions />} />
               <Route path=":vid">
                  <Route index element={<Documents />} />
                  {documentRoute}
               </Route>
            </Route>
         </Route>
      </Route>

      <Route path="in-review">
         <Route index element={<Proposals />} />
         <Route path=":pid">
            <Route index element={<Proposal />} />
            <Route path="versions">
               <Route index element={<Versions />} />
               <Route path=":vid">
                  <Route index element={<InReviewDocuments />} />
                  <Route path="reviews">
                     <Route index element={<Reviews />} />
                     <Route path=":rid" element={<Review />} />
                  </Route>
                  <Route path="comments">
                     <Route index element={<Comments />} />
                     <Route path=":cid" element={<Comment />} />
                  </Route>
                  {documentRoute}
               </Route>
            </Route>
         </Route>
      </Route>

      <Route path="reviewed">
         <Route index element={<Proposals />} />
         <Route path=":pid">
            <Route index element={<ReviewedProposal />} />
            <Route path="notify" element={<NotifyAuthor />} />
            <Route path="versions">
               <Route index element={<Versions />} />
               <Route path=":vid">
                  <Route index element={<InReviewDocuments />} />
                  <Route path="reviews">
                     <Route index element={<Reviews />} />
                     <Route path=":rid" element={<Review />} />
                  </Route>
                  <Route path="comments">
                     <Route index element={<Comments />} />
                     <Route path=":cid" element={<Comment />} />
                  </Route>
                  {documentRoute}
               </Route>
            </Route>
         </Route>
      </Route>

      <Route path="archived">
         <Route index element={<Proposals />} />
         <Route path=":pid">
            <Route index element={<Proposal />} />
            <Route path="versions">
               <Route index element={<Versions />} />
               <Route path=":vid">
                  <Route index element={<InReviewDocuments />} />
                  <Route path="reviews">
                     <Route index element={<Reviews />} />
                     <Route path=":rid" element={<Review />} />
                  </Route>
                  <Route path="comments">
                     <Route index element={<Comments />} />
                     <Route path=":cid" element={<Comment />} />
                  </Route>
                  {documentRoute}
               </Route>
            </Route>
         </Route>
      </Route>

      <Route path="user-management">
         <Route index element={<Users />} />
         <Route path=":uid">
            <Route index element={<CurrentUsers />} />
         </Route>
      </Route>
   </Route>
);

export default secretaryRoute;
