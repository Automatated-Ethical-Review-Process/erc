import { Route } from "react-router-dom";

import Documents from "components/proposals/Documents";
import Proposal from "components/proposals/Proposal";
import Versions from "components/proposals/Versions";
import Users from "components/users/users";
import SecretaryDashboard from "containers/dashboard/SecretaryDashboard";
import CurrentUser from "containers/sidebar/admin/CurrentUser";
import UpdateUser from "containers/sidebar/admin/UpdateUser";
import Comment from "containers/sidebar/secretary/inReview/Comment";
import Comments from "containers/sidebar/secretary/inReview/Comments";
import InReviewDocuments from "containers/sidebar/secretary/inReview/Documents";
import Review from "containers/sidebar/secretary/inReview/Review";
import Reviews from "containers/sidebar/secretary/inReview/Reviews";
import NotifyAuthor from "containers/sidebar/secretary/reviewed/NotifyAuthor";
import ReviewedProposal from "containers/sidebar/secretary/reviewed/Proposal";
import ChooseReviewType from "containers/sidebar/secretary/unassigned/ChooseReviewType";
import UnassignedProposal from "containers/sidebar/secretary/unassigned/Proposal";
import AssignedProposal from "containers/sidebar/secretary/assigned/Proposal";
import EditReviewers from "containers/sidebar/secretary/assigned/EditReviewers";
import SecretaryLayout from "layouts/sidebar/SecretaryLayout";

import UserData from "containers/sidebar/secretary/reviewer-requests/UserDetails";

import Roles from "config/roles";
import routes from "config/routes";
import SecretaryArchivedProposals from "containers/sidebar/secretary/ArchivedProposals";
import SecretaryInReviewProposals from "containers/sidebar/secretary/inReview/Proposals";
import SecretaryReviewedProposals from "containers/sidebar/secretary/reviewed/Proposals";
import SecretaryUnassignedProposals from "containers/sidebar/secretary/unassigned/Proposals";
import SecretaryAssignedProposals from "containers/sidebar/secretary/assigned/Proposals";
import documentRoute from "routes/common/document";
import { ProtectedDashboardRoute } from "routes/common/Protected";

const secretaryRoute = (
  <Route
    path={routes.secretary}
    element={
      <ProtectedDashboardRoute role={Roles.secretary}>
        <SecretaryLayout />
      </ProtectedDashboardRoute>
    }
  >
    <Route index element={<SecretaryDashboard />} />

    <Route path="unassigned">
      <Route index element={<SecretaryUnassignedProposals />} />
      <Route path=":pid">
        <Route index element={<UnassignedProposal />} />
        <Route path="review" element={<ChooseReviewType />} />
        <Route path="versions">
          <Route index element={<Versions />} />
          <Route path=":vid">
            <Route index element={<Documents />} />
            {documentRoute}
          </Route>
        </Route>
      </Route>
    </Route>

    <Route path="assigned">
      <Route index element={<SecretaryAssignedProposals />} />
      <Route path=":pid">
        <Route index element={<AssignedProposal />} />
        <Route path="edit" element={<EditReviewers />} />
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
      <Route index element={<SecretaryInReviewProposals />} />
      <Route path=":pid">
        <Route
          index
          element={
            <Proposal
              extraFields={{
                pi: "Author",
                cis: "Co-Investigators",
                reviewType: "Review Type",
                reviewers: "Reviewers",
              }}
            />
          }
        />
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
      <Route index element={<SecretaryReviewedProposals />} />
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
      <Route index element={<SecretaryArchivedProposals />} />
      <Route path=":pid">
        <Route
          index
          element={
            <Proposal
              extraFields={{
                pi: "Author",
                cis: "Co-Investigators",
              }}
            />
          }
        />
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
      <Route index element={<Users extraFields={{ roles: "Roles" }} />} />
      <Route path=":uid">
        <Route index element={<CurrentUser />} />
        <Route path="update" element={<UpdateUser />} />
      </Route>
    </Route>

    <Route path="reviewer-requests">
      <Route index element={<Users />} />
      <Route path=":uid">
        <Route index element={<UserData />} />
        <Route path="update" element={<UpdateUser />} />
      </Route>
    </Route>
  </Route>
);

export default secretaryRoute;
