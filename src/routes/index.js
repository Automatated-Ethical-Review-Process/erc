// layouts
import MainLayout from "layouts/MainLayout";

import ClerkLayout from "layouts/sidebar/ClerkLayout";
import ApplicantLayout from "layouts/sidebar/ApplicantLayout";
import SecretaryLayout from "layouts/sidebar/SecretaryLayout";
import ReviewerLayout from "layouts/sidebar/ReviewerLayout";
import AdminLayout from "layouts/sidebar/AdminLayout";

// containers
import SignIn from "containers/main/SignIn";
// import SignUp from "containers/main/signup/SignUp";
import VerifyEmail from "containers/main/signup/EmailVerify";
import ForgotPassword from "containers/main/forgotPassword/ForgotPassword";

import ClerkDashboard from "containers/dashboard/ClerkDashboard";
import ReviewerDashboard from "containers/dashboard/ReviewerDashboard";
import ApplicantDashboard from "containers/dashboard/ApplicantDashboard";
import SecretaryDashboard from "containers/dashboard/SecretaryDashboard";
import AdminDashboard from "containers/dashboard/AdminDashboard";

import CurrentSubmission from "containers/sidebar/applicant/currentSubmission/CurrentSubmission";
import NewSubmission from "containers/sidebar/applicant/newSubmission/NewSubmission";

import PendingProposal from "containers/sidebar/reviewer/pending/Proposal";
import ReviewingDocuments from "containers/sidebar/reviewer/reviewing/Documents";
import SubmitEvaluation from "containers/sidebar/reviewer/reviewing/SubmitEvaluation";
import ReviewedDocuments from "containers/sidebar/reviewer/reviewed/Documents";
import ViewEvaluation from "containers/sidebar/reviewer/reviewed/ViewEvaluation";
import OtherDocuments from "containers/sidebar/reviewer/other/Documents";
import AddComments from "containers/sidebar/reviewer/other/AddComments";
import CurrentDocument from "containers/sidebar/applicant/currentSubmission/Documents";
import ViewDecision from "containers/sidebar/applicant/currentSubmission/ViewDecision";
import OldSubmissions from "containers/sidebar/applicant/oldSubmissions/OldSubmissions";

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

import NewUserDetails from "containers/sidebar/clerk/newUserRequests/userDetails1";
import CurrentUserDetails from "containers/sidebar/clerk/currentUsers/CurrentUsers";
import CurrentUserDetailsAdmin from "containers/sidebar/admin/CurrentUsers";
import AddReviewer from "containers/sidebar/clerk/addReviewer/addReviewer";
import NewSubmissions from "containers/sidebar/clerk/newSubmissions/newSubmission";

// components
import ShowProfile from "components/profile/ShowProfile";
import EditProfile from "components/profile/EditProfile";

import ShowNotification from "components/notification/ShowNotification";

import Proposals from "components/proposals/Proposals";
import Proposal from "components/proposals/Proposal";
import Versions from "components/proposals/Versions";
import Documents from "components/proposals/Documents";

import Users from "components/users/users";
import Undergraduate1 from "containers/sidebar/clerk/newUserRequests/undergraduate";
import Undergraduate from "components/users/undergraduate";
import AddUsers from "containers/sidebar/admin/AddUsers";

import SignUp from "containers/main/signup/SignUp";

// test
import Test from "components/common/Test";

// other
import { Routes, Route } from "react-router-dom";

import roles from "config/roles";
import {
   ProtectedNavigate,
   ProtectedRoute,
   ProtectedDashboardRoute,
} from "./common/Protected";
import DocumentRoute from "./common/Document";

const rules = [
   { role: roles.admin, to: "/admin" },
   { role: roles.secretary, to: "/secretary" },
   { role: roles.reviewer, to: "/reviewer" },
   { role: roles.clerk, to: "/clerk" },
   { role: roles.applicant, to: "/applicant" },
];

const AppRoutes = () => (
   <Routes>
      <Route path="/" element={<MainLayout />}>
         <Route
            index
            element={
               <ProtectedNavigate rules={rules}>
                  <SignIn />
               </ProtectedNavigate>
            }
         />
         <Route path="verify" element={<VerifyEmail />} />
         <Route path="signup" element={<SignUp />} />
         <Route path="forgot-password" element={<ForgotPassword />} />
      </Route>

      <Route
         path="/clerk"
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
                  <Route index element={<Undergraduate1 />} />
               </Route>
            </Route>
         </Route>
         <Route path="current-users">
            <Route index element={<Users />} />
            <Route path=":uid">
               <Route index element={<CurrentUserDetails />} />
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
                     <Route element={<DocumentRoute />} />
                  </Route>
               </Route>
            </Route>
         </Route>
         <Route path="add-reviewer" element={<AddReviewer />} />
      </Route>

      <Route
         path="/applicant"
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
                     <Route element={<DocumentRoute />} />
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
                     <Route element={<DocumentRoute />} />
                  </Route>
               </Route>
            </Route>
         </Route>
      </Route>

      <Route
         path="/secretary"
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
                     <Route element={<DocumentRoute />} />
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
                     <Route element={<DocumentRoute />} />
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
                     <Route element={<DocumentRoute />} />
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
                     <Route element={<DocumentRoute />} />
                  </Route>
               </Route>
            </Route>
         </Route>
         <Route path="user-management">
            <Route index element={<Users />} />
            <Route path=":uid">
               <Route index element={<CurrentUserDetails />} />
            </Route>
         </Route>
      </Route>

      <Route
         path="/reviewer"
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
                     <Route element={<DocumentRoute />} />
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
                     <Route element={<DocumentRoute />} />
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
                     <Route element={<DocumentRoute />} />
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
                     <Route element={<DocumentRoute />} />
                  </Route>
               </Route>
            </Route>
         </Route>
      </Route>

      <Route
         path="/admin"
         element={
            <ProtectedDashboardRoute role={roles.admin}>
               <AdminLayout />
            </ProtectedDashboardRoute>
         }
      >
         <Route index element={<AdminDashboard />} />
         <Route path="users">
            <Route index element={<Users />} />
            <Route path=":uid">
               <Route index element={<CurrentUserDetailsAdmin />} />
               <Route path="undergraduate">
                  <Route index element={<Undergraduate />} />
               </Route>
            </Route>
         </Route>
         <Route path="add-user" element={<AddUsers />} />
      </Route>

      <Route element={<ProtectedRoute />}>
         <Route path="/profile">
            <Route index element={<ShowProfile />} />
            <Route path="edit" element={<EditProfile />} />
         </Route>

         <Route path="/notification" element={<ShowNotification />} />
      </Route>

      <Route path="/test" element={<Test />} />
      <Route path="*" element={<h4>{"Oops, page not found :("}</h4>} />
   </Routes>
);

export default AppRoutes;
