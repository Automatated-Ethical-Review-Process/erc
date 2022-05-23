//layouts
import MainLayout from "./layouts/MainLayout";
import NewUserRequests from "./containers/Dashboard/Clerk/NewUserRequests";
import DashboardLayout from "./layouts/DashboardLayout";

//componets
import SignIn from "./components/SignIn";
import SignUp from "./components/signup/SignUp";
import ForgotPassword from "./components/forgotPassword/ForgotPassword";
import ClerkDashboardLayout from "./containers/Dashboard/Clerk/ClerkDashboardLayout";
import ReviewerDashboardLayout from "./containers/Dashboard/Reviewer/ReviewerDashboardLayout";
import ApplicantDashboardLayout from "./containers/Dashboard/Applicant/ApplicantDashboardLayout";
import SecretaryDashboardLayout from "./containers/Dashboard/Secretary/SecretaryDashboardLayout";
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
      children: [{ path: "", element: <ClerkDashboardLayout /> }],
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
      children: [{ path: "", element: <ApplicantDashboardLayout /> }],
   },
   {
      path: "/applicant",
      element: <ApplicantSidebarLayout />,
      children: [
         { path: "new-submission", element: <h1>New Submission</h1> },
         { path: "current-submission", element: <h1>Current Submission</h1> },
         { path: "old-submissions", element: <h1>Old Submissions</h1> },
         { path: "*", element: <h1>Not Found 404</h1> },
      ],
   },
   {
      path: "/secretary",
      element: <DashboardLayout />,
      children: [{ path: "", element: <SecretaryDashboardLayout /> }],
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
      children: [{ path: "", element: <ReviewerDashboardLayout /> }],
   },
   {
      path: "/reviewer",
      element: <ReviewerSidebarLayout />,
      children: [
         { path: "pending", element: <h1>Pending Proposals</h1> },
         { path: "reviewing", element: <h1>Reviewing Proposals</h1> },
         { path: "reviewed", element: <h1>Reviewed Proposals</h1> },
         { path: "other", element: <h1>Other Proposals</h1> },
         { path: "*", element: <h1>Not Found 404</h1> },
      ],
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
      children: [{ path: "users", element: <NewUserRequests /> }],
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
