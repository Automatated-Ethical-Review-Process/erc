// layouts
import MainLayout from "layouts/MainLayout";
import DashboardLayout from "layouts/DashboardLayout";
import ClerkSidebarLayout from "layouts/Sidebar/Clerk/ClerkSidebarLayout";
import ApplicantSidebarLayout from "layouts/Sidebar/Applicant/ApplicantSidebarLayout";
import SecretarySidebarLayout from "layouts/Sidebar/Secretary/SecretarySidebarLayout";
import ReviewerSidebarLayout from "layouts/Sidebar/Reviewer/ReviewerSidebarLayout";
import AdminSidebarLayout from "layouts/Sidebar/Admin/AdminSidebarLayout";

// containers
import ClerkDashboard from "containers/Dashboard/Clerk/ClerkDashboard";
import ReviewerDashboard from "containers/Dashboard/Reviewer/ReviewerDashboard";
import ApplicantDashboard from "containers/Dashboard/Applicant/ApplicantDashboard";
import SecretaryDashboard from "containers/Dashboard/Secretary/SecretaryDashboard";
import AdminDashboard from "containers/Dashboard/Admin/AdminDashboard";

import Step1 from "containers/Dashboard/Applicant/NewSubmission/Step1";
import CurrentSubmission from "containers/Dashboard/Applicant/CurrentSubmission/CurrentSubmission";
import Step2 from "containers/Dashboard/Applicant/NewSubmission/Step2";
import NewSubmission from "containers/Dashboard/Applicant/NewSubmission/NewSubmission";
import NewUserRequests from "containers/Dashboard/Clerk/NewUserRequests/NewUserRequests";

import PendingProposals from "containers/Dashboard/Reviewer/PendingProposals/PendingProposals";
import PendingProposal from "containers/Dashboard/Reviewer/PendingProposals/Proposal/Proposal";
import PendingVersions from "containers/Dashboard/Reviewer/PendingProposals/Proposal/Versions/Versions";
import PendingDocuments from "containers/Dashboard/Reviewer/PendingProposals/Proposal/Versions/Documents/Documents";
import PendingDocument from "containers/Dashboard/Reviewer/PendingProposals/Proposal/Versions/Documents/Document/Document";
import PendingDocumentPreview from "containers/Dashboard/Reviewer/PendingProposals/Proposal/Versions/Documents/Document/Preview";
import PendingDocumentDownload from "containers/Dashboard/Reviewer/PendingProposals/Proposal/Versions/Documents/Document/Download";

import ReviewingProposals from "containers/Dashboard/Reviewer/ReviewingProposals/ReviewingProposals";
import ProposalsReviewing from "containers/Dashboard/Reviewer/ReviewingProposals/Proposals/Proposals";
import OtherProposals from "containers/Dashboard/Reviewer/OtherProposals/OtherProposals";
import ReviewedProposals from "containers/Dashboard/Reviewer/ReviewedProposals/ReviewedProposals";
import ProposalsReviewed from "containers/Dashboard/Reviewer/ReviewedProposals/Proposals/Proposals";
import ProposalsOther from "containers/Dashboard/Reviewer/OtherProposals/Proposals/Proposals";

// components
import SignIn from "components/SignIn";
import SignUp from "components/signup/SignUp";
import ForgotPassword from "components/forgotPassword/ForgotPassword";
import ShowProfile from "components/ShowProfile";
import EditProfile from "components/EditProfile";

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
      element: decideLayout(<DashboardLayout />, <ClerkSidebarLayout />),
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
      element: decideLayout(<DashboardLayout />, <ApplicantSidebarLayout />),
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
      element: decideLayout(<DashboardLayout />, <SecretarySidebarLayout />),
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
      element: decideLayout(<DashboardLayout />, <ReviewerSidebarLayout />),
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
      element: decideLayout(<DashboardLayout />, <AdminSidebarLayout />),
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
