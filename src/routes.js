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
import Undergraduate1 from "containers/sidebar/clerk/newUserRequests/undergraduate";
import Undergraduate2 from "components/users/undergraduate";

import { Navigate } from "react-router-dom";

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
      element:
         isAuthenticated && userRole.includes("ROLE_CLERK") ? (
            decideLayout(<DashboardLayout />, <ClerkLayout />)
         ) : (
            <Navigate to="/" />
         ),
      children: [
         { index: true, element: <ClerkDashboard /> },
         {
            path: "new-user-requests",
            children: [
               { index: true, element: <Users /> },
               {
                  path: ":uid",
                  children: [
                     { index: true, element: <NewUserDetails /> },
                     {
                        path: "undergraduate",
                        children: [
                           { index: true, element: <Undergraduate1 /> },
                        ],
                     },
                  ],
               },
            ],
         },
         {
            path: "current-users",
            children: [
               { index: true, element: <Users /> },
               {
                  path: ":uid",
                  children: [
                     { index: true, element: <CurrentUserDetails /> },
                     {
                        path: "undergraduate",
                        children: [
                           { index: true, element: <Undergraduate2 /> },
                        ],
                     },
                  ],
               },
            ],
         },
         { path: "new-submissions", element: <h1>New Submissions</h1> },
         { path: "current-proposals", element: <h1>Current Proposals</h1> },
      ],
   },
   {
      path: "/applicant",
      element:
         isAuthenticated && userRole.includes("ROLE_APPLICANT") ? (
            decideLayout(<DashboardLayout />, <ApplicantLayout />)
         ) : (
            <Navigate to="/" />
         ),
      children: [
         { index: true, element: <ApplicantDashboard /> },
         { path: "new-submission", element: <NewSubmission /> },
         {
            path: "current-submission",
            children: [
               { index: true, element: <CurrentSubmission /> },
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
                                 { index: true, element: <CurrentDocument /> },
                                 {
                                    path: "decision",
                                    element: <ViewDecision />,
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
            path: "old-submissions",
            children: [
               { index: true, element: <OldSubmissions /> },
               {
                  path: ":pid",
                  children: [
                     { index: true, element: <OldSubmissions /> },
                     {
                        path: "versions",
                        children: [
                           { index: true, element: <Versions /> },
                           {
                              path: ":vid",
                              children: [
                                 { index: true, element: <CurrentDocument /> },
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
      path: "/secretary",
      element:
         isAuthenticated && userRole.includes("ROLE_SECRETARY") ? (
            decideLayout(<DashboardLayout />, <SecretaryLayout />)
         ) : (
            <Navigate to="/" />
         ),
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
         {
            path: "user-management",
            children: [
               { index: true, element: <Users /> },
               {
                  path: ":uid",
                  children: [{ index: true, element: <CurrentUserDetails /> }],
               },
            ],
         },
      ],
   },
   {
      path: "/reviewer",
      element:
         isAuthenticated && userRole.includes("ROLE_REVIEWER") ? (
            decideLayout(<DashboardLayout />, <ReviewerLayout />)
         ) : (
            <Navigate to="/" />
         ),
      children: [
         { index: true, element: <ReviewerDashboard /> },
         {
            path: "pending",
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
   {
      path: "/admin",
      element:
         isAuthenticated && userRole.includes("ROLE_REVIEWER") ? (
            decideLayout(<DashboardLayout />, <AdminLayout />)
         ) : (
            <Navigate to="/" />
         ),
      children: [
         { index: true, element: <AdminDashboard /> },
         {
            path: "users",
            children: [
               { index: true, element: <Users /> },
               {
                  path: ":uid",
                  children: [{ index: true, element: <CurrentUserDetails /> }],
               },
            ],
         },
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
