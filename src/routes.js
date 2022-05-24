//layouts
import MainLayout from "./layouts/MainLayout";
import NewUserRequest from "./containers/Dashboard/Clerk/NewUserRequests/NewUserRequests";
import DashboardLayout from "./layouts/DashboardLayout";

import Step1 from "./containers/Dashboard/Applicant/newSubmission/Step1";
import CurrentSubmission from "./containers/Dashboard/Applicant/CurrentSubmission";
import Step2 from "./containers/Dashboard/Applicant/newSubmission/Step2";
import NewSubmission from "./containers/Dashboard/Applicant/newSubmission/NewSubmission";

//componets
import SignIn from "./components/SignIn";
import SignUp from "./components/signup/SignUp";
import ForgotPassword from "./components/forgotPassword/ForgotPassword";
import ClerkDashboard from "./containers/Dashboard/Clerk/ClerkDashboard";
import ReviewerDashboard from "./containers/Dashboard/Reviewer/ReviewerDashboard";
import ApplicantDashboard from "./containers/Dashboard/Applicant/ApplicantDashboard";
import SecretaryDashboard from "./containers/Dashboard/Secretary/SecretaryDashboard";
import AdminDashboard from "./containers/Dashboard/Admin/AdminDashboard";
import ClerkSidebarLayout from "./layouts/Sidebar/Clerk/ClerkSidebarLayout";
import ApplicantSidebarLayout from "./layouts/Sidebar/Applicant/ApplicantSidebarLayout";
import SecretarySidebarLayout from "./layouts/Sidebar/Secretary/SecretarySidebarLayout";
import ReviewerSidebarLayout from "./layouts/Sidebar/Reviewer/ReviewerSidebarLayout";
import AdminSidebarLayout from "./layouts/Sidebar/Admin/AdminSidebarLayout";
import ShowProfile from "./components/ShowProfile";
import EditProfile from "./components/EditProfile";
import PendingProposals from "./containers/Dashboard/Reviewer/PendingProposals/Pending-proposals";

const routes = (isAuthenticated, userRole) => [
   {
      path: "/",
      element: <MainLayout />,
      children: [
         { path: "", element: <SignIn /> },
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
      children: [{ path: "", element: <ClerkDashboard /> }],
   },
   {
      path: "/clerk",
      element: <ClerkSidebarLayout />,
      children: [
         { path: "new-user-requests", element: <NewUserRequests /> },
         { path: "current-users", element: <h1>Current Users</h1> },
         { path: "new-submissions", element: <h1>New Submissions</h1> },
         { path: "current-proposals", element: <h1>Current Proposals</h1> },
         { path: "*", element: <h1>Not Found 404</h1> },
      ],
   },
   {
      path: "/applicant",
      element: <DashboardLayout />,
      children: [{ path: "", element: <ApplicantDashboard /> }],
   },
   {
      path: "/applicant",
      element: <ApplicantSidebarLayout />,
      children: [
         { path: "new-submission", element: <NewSubmission /> },
         { path: "current-submission", element: <CurrentSubmission /> },
         { path: "old-submissions", element: <h1>Old Submissions</h1> },
         { path: "step1", element: <Step1 /> },
         { path: "step2", element: <Step2 /> },
         { path: "*", element: <h1>Not Found 404</h1> },
      ],
   },
   {
      path: "/secretary",
      element: <DashboardLayout />,
      children: [{ path: "", element: <SecretaryDashboard /> }],
   },
   {
      path: "/secretary",
      element: <SecretarySidebarLayout />,
      children: [
         { path: "unassigned", element: <h1>Unassigned Proposals</h1> },
         { path: "in-review", element: <h1>In Review Proposals</h1> },
         { path: "reviewed", element: <h1>Reviewed Proposals</h1> },
         { path: "archived", element: <h1>Archived Proposals</h1> },
         { path: "user-management", element: <h1>User Management</h1> },
         { path: "*", element: <h1>Not Found 404</h1> },
      ],
   },
   {
      path: "/reviewer",
      element: <DashboardLayout />,
      children: [{ path: "", element: <ReviewerDashboard /> }],
   },
   {
      path: "/reviewer",
      element: <ReviewerSidebarLayout />,
      children: [
         { path: "pending", element: <PendingProposals /> },
         { path: "reviewing", element: <h1>Reviewing Proposals</h1> },
         { path: "reviewed", element: <h1>Reviewed Proposals</h1> },
         { path: "other", element: <h1>Other Proposals</h1> },
         { path: "*", element: <h1>Not Found 404</h1> },
      ],
   },
   {
      path: "/admin",
      element: <DashboardLayout />,
      children: [{ path: "", element: <AdminDashboard /> }],
   },
   {
      path: "/admin",
      element: <AdminSidebarLayout />,
      children: [
         { path: "users", element: <h1>Current Users</h1> },
         { path: "add-user", element: <h1>Add User</h1> },
         { path: "*", element: <h1>Not Found 404</h1> },
      ],
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
   {
      path: "/test",
      element: <ReviewerSidebarLayout />,
      children: [
         { path: "", element: <h1>Hello</h1> },
         { path: "*", element: <h1>Not Found 404</h1> },
      ],
   },
];

export default routes;
