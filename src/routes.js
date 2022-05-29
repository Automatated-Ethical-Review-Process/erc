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

import PendingProposal from "containers/reviewer/pending/Proposal";
import ReviewingDocuments from "containers/reviewer/reviewing/Documents";
import SubmitEvaluation from "containers/reviewer/reviewing/SubmitEvaluation";
import ReviewedDocuments from "containers/reviewer/reviewed/Documents";
import ViewEvaluation from "containers/reviewer/reviewed/ViewEvaluation";
import OtherDocuments from "containers/reviewer/other/Documents";
import AddComments from "containers/reviewer/other/AddComments";

// components
import SignIn from "components/SignIn";
import SignUp from "components/signup/SignUp";
import ForgotPassword from "components/forgotPassword/ForgotPassword";
import ShowProfile from "components/profile/ShowProfile";
import EditProfile from "components/profile/EditProfile";

import Proposals from "components/proposals/Proposals";
import Proposal from "components/proposals/Proposal";
import Versions from "components/proposals/Versions";
import Documents from "components/proposals/Documents";
import Document from "components/proposals/Document";
import Preview from "components/proposals/Preview";
import Download from "components/proposals/Download";

// test
import Test from "components/common/Test";

const documentRoutes = {
   path: "doc-:did",
   children: [
      {
         index: true,
         element: <Document />,
      },
      {
         path: "preview",
         element: <Preview />,
      },
      {
         path: "download",
         element: <Download />,
      },
   ],
};

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
               { index: true, element: <Proposals /> },
               {
                  path: ":pid",
                  children: [
                     { index: true, element: <PendingProposal /> },
                     {
                        path: "versions",
                        children: [
                           { index: true, element: <Versions /> },
                           {
                              path: ":vid",
                              children: [
                                 { index: true, element: <Documents /> },

                                 documentRoutes,
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
               { index: true, element: <Proposals /> },
               {
                  path: ":pid",
                  children: [
                     { index: true, element: <Proposal /> },
                     {
                        path: "versions",
                        children: [
                           { index: true, element: <Versions /> },
                           {
                              path: ":vid",
                              children: [
                                 {
                                    index: true,
                                    element: <ReviewingDocuments />,
                                 },
                                 {
                                    path: "evaluation",
                                    element: <SubmitEvaluation />,
                                 },
                                 documentRoutes,
                              ],
                           },
                        ],
                     },
                  ],
               },
            ],
         },
         {
            path: "reviewed",
            children: [
               { index: true, element: <Proposals /> },
               {
                  path: ":pid",
                  children: [
                     { index: true, element: <Proposal /> },
                     {
                        path: "versions",
                        children: [
                           { index: true, element: <Versions /> },
                           {
                              path: ":vid",
                              children: [
                                 {
                                    index: true,
                                    element: <ReviewedDocuments />,
                                 },
                                 {
                                    path: "evaluation",
                                    element: <ViewEvaluation />,
                                 },
                                 documentRoutes,
                              ],
                           },
                        ],
                     },
                  ],
               },
            ],
         },
         {
            path: "other",
            children: [
               { index: true, element: <Proposals /> },
               {
                  path: ":pid",
                  children: [
                     { index: true, element: <Proposal /> },
                     {
                        path: "versions",
                        children: [
                           { index: true, element: <Versions /> },
                           {
                              path: ":vid",
                              children: [
                                 {
                                    index: true,
                                    element: <OtherDocuments />,
                                 },
                                 {
                                    path: "comments",
                                    element: <AddComments />,
                                 },
                                 documentRoutes,
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
