// layouts
import MainLayout from "layouts/MainLayout";
import DashboardLayout from "layouts/DashboardLayout";
import ClerkLayout from "layouts/sidebar/ClerkLayout";
import ApplicantLayout from "layouts/sidebar/ApplicantLayout";
import SecretaryLayout from "layouts/sidebar/SecretaryLayout";
import ReviewerLayout from "layouts/sidebar/ReviewerLayout";
import AdminLayout from "layouts/sidebar/AdminLayout";

// containers
import ClerkDashboard from "containers/clerk/Dashboard";
import ReviewerDashboard from "containers/reviewer/Dashboard";
import ApplicantDashboard from "containers/applicant/Dashboard";
import SecretaryDashboard from "containers/secretary/Dashboard";
import AdminDashboard from "containers/admin/Dashboard";

import Step1 from "containers/applicant/newSubmission/Step1";
import CurrentSubmission from "containers/applicant/currentSubmission/CurrentSubmission";
import Step2 from "containers/applicant/newSubmission/Step2";
import NewSubmission from "containers/applicant/newSubmission/NewSubmission";
import NewUserRequests from "containers/clerk/newUserRequests/NewUserRequests";

import PendingProposals from "containers/reviewer/pending/Pending";
import PendingProposal from "containers/reviewer/pending/Proposal/Proposal";
import PendingVersions from "containers/reviewer/pending/Proposal/Versions/Versions";
import PendingDocuments from "containers/reviewer/pending/Proposal/Versions/Documents/Documents";
import PendingDocument from "containers/reviewer/pending/Proposal/Versions/Documents/Document/Document";
import PendingDocumentPreview from "containers/reviewer/pending/Proposal/Versions/Documents/Document/Preview";
import PendingDocumentDownload from "containers/reviewer/pending/Proposal/Versions/Documents/Document/Download";

import ReviewingProposals from "containers/reviewer/reviewing/Reviewing";
import ProposalsReviewing from "containers/reviewer/reviewing/Proposals/Proposals";
import OtherProposals from "containers/reviewer/other/Other";
import ReviewedProposals from "containers/reviewer/reviewed/Reviewed";
import ProposalsReviewed from "containers/reviewer/reviewed/Proposals/Proposals";
import ProposalsOther from "containers/reviewer/other/Proposals/Proposals";

// components
import SignIn from "components/SignIn";
import SignUp from "components/signup/SignUp";
import ForgotPassword from "components/forgotPassword/ForgotPassword";
import ShowProfile from "components/profile/ShowProfile";
import EditProfile from "components/profile/EditProfile";

// test
import Test from "components/common/Test";

const routes = (isAuthenticated, userRole, decideLayout) => [
   {
      path: "/",
      element: <MainLayout />,
      children: [{ index: true, element: <SignIn /> }],
   },
   {
      path: "/signup",
      element: <SignUp />,
   },
   {
      path: "/forgot-password",
      element: <ForgotPassword />,
   },
   {
      path: "/clerk",
      element: decideLayout(<DashboardLayout />, <ClerkLayout />),
      children: [
         { index: true, element: <ClerkDashboard /> },
         { path: "new-user-requests", element: <NewUserRequests /> },
         { path: "current-users", element: <h1>Current Users</h1> },
         { path: "new-submissions", element: <h1>New Submissions</h1> },
         { path: "current-proposals", element: <h1>Current Proposals</h1> },
      ],
   },
   {
      path: "/applicant",
      element: decideLayout(<DashboardLayout />, <ApplicantLayout />),
      children: [
         { index: true, element: <ApplicantDashboard /> },
         { path: "new-submission", element: <NewSubmission /> },
         { path: "current-submission", element: <CurrentSubmission /> },
         { path: "old-submissions", element: <h1>Old Submissions</h1> },
         { path: "step1", element: <Step1 /> },
         { path: "step2", element: <Step2 /> },
      ],
   },
   {
      path: "/secretary",
      element: decideLayout(<DashboardLayout />, <SecretaryLayout />),
      children: [
         { index: true, element: <SecretaryDashboard /> },
         { path: "unassigned", element: <h1>Unassigned Proposals</h1> },
         { path: "in-review", element: <h1>In Review Proposals</h1> },
         { path: "reviewed", element: <h1>Reviewed Proposals</h1> },
         { path: "archived", element: <h1>Archived Proposals</h1> },
         { path: "user-management", element: <h1>User Management</h1> },
      ],
   },
   {
      path: "/reviewer",
      element: decideLayout(<DashboardLayout />, <ReviewerLayout />),
      children: [
         { index: true, element: <ReviewerDashboard /> },
         {
            path: "pending",
            children: [
               { index: true, element: <PendingProposals /> },
               {
                  path: ":pid",
                  children: [
                     { index: true, element: <PendingProposal /> },
                     {
                        path: "versions",
                        children: [
                           { index: true, element: <PendingVersions /> },
                           {
                              path: ":vid",
                              children: [
                                 { index: true, element: <PendingDocuments /> },
                                 {
                                    path: "doc-:did",
                                    children: [
                                       {
                                          index: true,
                                          element: <PendingDocument />,
                                       },
                                       {
                                          path: "preview",
                                          element: <PendingDocumentPreview />,
                                       },
                                       {
                                          path: "download",
                                          element: <PendingDocumentDownload />,
                                       },
                                    ],
                                 },
                              ],
                           },
                        ],
                     },
                  ],
               },
            ],
         },
         {
            path: "reviewing",
            children: [
               { index: true, element: <ReviewingProposals /> },
               { path: ":id", element: <ProposalsReviewing /> },
            ],
         },
         {
            path: "reviewed",
            children: [
               { index: true, element: <ReviewedProposals /> },
               { path: ":id", element: <ProposalsReviewed /> },
            ],
         },
         {
            path: "other",
            children: [
               { index: true, element: <OtherProposals /> },
               { path: ":id", element: <ProposalsOther /> },
            ],
         },
      ],
   },
   {
      path: "/admin",
      element: decideLayout(<DashboardLayout />, <AdminLayout />),
      children: [
         { index: true, element: <AdminDashboard /> },
         { path: "users", element: <h1>Current Users</h1> },
         { path: "add-user", element: <h1>Add User</h1> },
      ],
   },
   {
      path: "/profile",
      children: [
         { index: true, element: <ShowProfile /> },
         { path: "edit", element: <EditProfile /> },
      ],
   },
   { path: "/test", element: <Test /> },
   { path: "*", element: <h4>{"Oops, page not found :("}</h4> },
];

export default routes;
