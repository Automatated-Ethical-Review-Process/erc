// layouts
import MainLayout from "layouts/MainLayout";

import DashboardLayout from "layouts/DashboardLayout";

import ClerkLayout from "layouts/sidebar/ClerkLayout";
import ApplicantLayout from "layouts/sidebar/ApplicantLayout";
import SecretaryLayout from "layouts/sidebar/SecretaryLayout";
import ReviewerLayout from "layouts/sidebar/ReviewerLayout";
import AdminLayout from "layouts/sidebar/AdminLayout";

// containers
import SignIn from "containers/main/SignIn";
import SignUp from "containers/main/signup/SignUp";
import ForgotPassword from "containers/main/forgotPassword/ForgotPassword";

import ClerkDashboard from "containers/dashboard/ClerkDashboard";
import ReviewerDashboard from "containers/dashboard/ReviewerDashboard";
import ApplicantDashboard from "containers/dashboard/ApplicantDashboard";
import SecretaryDashboard from "containers/dashboard/SecretaryDashboard";
import AdminDashboard from "containers/dashboard/AdminDashboard";

import Step1 from "containers/sidebar/applicant/newSubmission/Step1";
import CurrentSubmission from "containers/sidebar/applicant/currentSubmission/CurrentSubmission";
import Step2 from "containers/sidebar/applicant/newSubmission/Step2";
import NewSubmission from "containers/sidebar/applicant/newSubmission/NewSubmission";

import PendingProposal from "containers/sidebar/reviewer/pending/Proposal";
import ReviewingDocuments from "containers/sidebar/reviewer/reviewing/Documents";
import SubmitEvaluation from "containers/sidebar/reviewer/reviewing/SubmitEvaluation";
import ReviewedDocuments from "containers/sidebar/reviewer/reviewed/Documents";
import ViewEvaluation from "containers/sidebar/reviewer/reviewed/ViewEvaluation";
import OtherDocuments from "containers/sidebar/reviewer/other/Documents";
import AddComments from "containers/sidebar/reviewer/other/AddComments";

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

// components
import ShowProfile from "components/profile/ShowProfile";
import EditProfile from "components/profile/EditProfile";

import ShowNotification from "components/notification/ShowNotification";

import Proposals from "components/proposals/Proposals";
import Proposal from "components/proposals/Proposal";
import Versions from "components/proposals/Versions";
import Documents from "components/proposals/Documents";
import Document from "components/proposals/Document";
import Preview from "components/proposals/Preview";
import Download from "components/proposals/Download";

import Users from "components/users/users";

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
      children: [
         { index: true, element: <SignIn /> },
         {
            path: "signup",
            element: <SignUp />,
         },
         { path: "forgot-password", element: <ForgotPassword /> },
      ],
   },
   {
      path: "/clerk",
      element: decideLayout(<DashboardLayout />, <ClerkLayout />),
      children: [
         { index: true, element: <ClerkDashboard /> },
         {
            path: "new-user-requests",
            children: [
               { index: true, element: <Users /> },
               {
                  path: ":uid",
                  children: [{ index: true, element: <NewUserDetails /> }],
               },
            ],
         },
         {
            path: "current-users",
            children: [
               { index: true, element: <Users /> },
               {
                  path: ":uid",
                  children: [{ index: true, element: <CurrentUserDetails /> }],
               },
            ],
         },
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
         {
            path: "unassigned",
            children: [
               { index: true, element: <Proposals /> },
               {
                  path: ":pid",
                  children: [
                     { index: true, element: <UnassignedProposal /> },
                     {
                        path: "review",
                        children: [
                           { index: true, element: <ChooseReviewType /> },
                           { path: "assign", element: <AssignReviewers /> },
                        ],
                     },
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
            path: "in-review",
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
                                    element: <InReviewDocuments />,
                                 },
                                 {
                                    path: "reviews",
                                    children: [
                                       { index: true, element: <Reviews /> },
                                       { path: ":rid", element: <Review /> },
                                    ],
                                 },
                                 {
                                    path: "comments",
                                    children: [
                                       { index: true, element: <Comments /> },
                                       { path: ":cid", element: <Comment /> },
                                    ],
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
                     { index: true, element: <ReviewedProposal /> },
                     { path: "notify", element: <NotifyAuthor /> },
                     {
                        path: "versions",
                        children: [
                           { index: true, element: <Versions /> },
                           {
                              path: ":vid",
                              children: [
                                 {
                                    index: true,
                                    element: <InReviewDocuments />,
                                 },
                                 {
                                    path: "reviews",
                                    children: [
                                       { index: true, element: <Reviews /> },
                                       { path: ":rid", element: <Review /> },
                                    ],
                                 },
                                 {
                                    path: "comments",
                                    children: [
                                       { index: true, element: <Comments /> },
                                       { path: ":cid", element: <Comment /> },
                                    ],
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
            path: "archived",
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
                                    element: <InReviewDocuments />,
                                 },
                                 {
                                    path: "reviews",
                                    children: [
                                       { index: true, element: <Reviews /> },
                                       { path: ":rid", element: <Review /> },
                                    ],
                                 },
                                 {
                                    path: "comments",
                                    children: [
                                       { index: true, element: <Comments /> },
                                       { path: ":cid", element: <Comment /> },
                                    ],
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
   {
      path: "/notification",
      element: <ShowNotification />,
   },
   { path: "/test", element: <Test /> },
   { path: "*", element: <h4>{"Oops, page not found :("}</h4> },
];

export default routes;
