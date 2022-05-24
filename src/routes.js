//layouts
import MainLayout from "./layouts/MainLayout";
import NewUserRequest from "./containers/Dashboard/Clerk/NewUserRequest";
import DashboardLayout from "./layouts/DashboardLayout";


import Step1 from "./containers/Dashboard/Applicant/newSubmission/Step1";
import CurrentSubmission from "./containers/Dashboard/Applicant/CurrentSubmission";
import Step2 from "./containers/Dashboard/Applicant/newSubmission/Step2";
import NewSubmission from "./containers/Dashboard/Applicant/newSubmission/NewSubmission";

//componets
import SignIn from "./components/SignIn";
import SignUp from "./components/signup/SignUp";
import ForgotPassword from "./components/forgotPassword/ForgotPassword";
import ClerkDashboardLayout from "./containers/Dashboard/Clerk/ClerkDashboardLayout";
import ReviewerDashboardLayout from "./containers/Dashboard/Reviewer/ReviewerDashboardLayout";
import ApplicantDashboardLayout from "./containers/Dashboard/Applicant/ApplicantDashboardLayout";
import SecretatyDashboardLayout from "./containers/Dashboard/Secretary/SecretaryDashboardLayout";
import AdminDashboardLayout from "./containers/Dashboard/Admin/AdminDashboardLayout";
import ClerkSidebarLayout from "./containers/Sidebar/Clerk/ClerkSidebarLayout";
import ApplicantSidebarLayout from "./containers/Sidebar/Applicant/ApplicantSidebarLayout";
import SecretarySidebarLayout from "./containers/Sidebar/Secretary/SecretarySidebarLayout";
import ReviewerSidebarLayout from "./containers/Sidebar/Reviewer/ReviewerSidebarLayout";
import AdminSidebarLayout from "./containers/Sidebar/Admin/AdminSidebarLayout";
import ShowProfile from "./components/ShowProfile";
import EditProfile from "./components/EditProfile";

const routes = (isAuthenticated, userRole) => [
   {
      path: "/",
      element: <MainLayout />,
      children: [
         { path: "/", element: <SignIn /> },
         { path: "*", element: <h1>Not Found 404</h1> },
      ],
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
      element: <DashboardLayout />,
      children: [
         { path: "", element: <ClerkDashboardLayout /> },
         { path: "*", element: <h1>Not Found 404</h1> },
      ],
   },
   {
      path: "/clerk",
      element: <ClerkSidebarLayout />,
      children: [{ path: "new-user-request", element: <NewUserRequest /> }],
   },
   {
      path: "/applicant",
      element: <DashboardLayout />,
      children: [
         { path: "", element: <ApplicantDashboardLayout /> },
         { path: "*", element: <h1>Not Found 404</h1> },
      ],
   },
   {
      path: "/applicant",
      element: <ApplicantSidebarLayout />,
      children: [
         { path: "step1", element: <Step1 /> },
         { path: "current-submission", element: <CurrentSubmission /> },
         { path: "step2", element: <Step2 /> },
         { path: "new-submission", element: <NewSubmission /> }
      ],
   },
   {
      path: "/secretary",
      element: <DashboardLayout />,
      children: [
         { path: "", element: <SecretatyDashboardLayout /> },
         { path: "*", element: <h1>Not Found 404</h1> },
      ],
   },
   {
      path: "/secretary",
      element: <SecretarySidebarLayout />,
      children: [{ path: "unassigned-proposals", element: <NewUserRequest /> }],
   },
   {
      path: "/reviewer",
      element: <DashboardLayout />,
      children: [
         { path: "", element: <ReviewerDashboardLayout /> },
         { path: "*", element: <h1>Not Found 404</h1> },
      ],
   },
   {
      path: "/reviewer",
      element: <ReviewerSidebarLayout />,
      children: [{ path: "pending-proposals", element: <NewUserRequest /> }],
   },
   {
      path: "/admin",
      element: <DashboardLayout />,
      children: [
         { path: "", element: <AdminDashboardLayout /> },
         { path: "*", element: <h1>Not Found 404</h1> },
      ],
   },
   {
      path: "/admin",
      element: <AdminSidebarLayout />,
      children: [{ path: "users", element: <NewUserRequest /> }],
   },
   {
      path: "/profile",
      element: <ShowProfile />,
      children: [
         { path: "dashboard", element: <h1>Hello</h1> },
         { path: "*", element: <h1>Not Found 404</h1> },
      ],
   },
   {
      path: "/edit-profile",
      element: <EditProfile />,
      children: [
         { path: "dashboard", element: <h1>Hello</h1> },
         { path: "*", element: <h1>Not Found 404</h1> },
      ],
   },
];

export default routes;
