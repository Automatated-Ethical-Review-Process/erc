//layouts
import MainLayout from "./layouts/MainLayout";
import NewUserRequest from "./containers/Dashboard/Clerk/NewUserRequest";
import DashboardLayout from "./layouts/DashboardLayout";

//componets
import SignIn from "./components/SignIn";
import SignUp from "./components/signup/SignUp";
import ForgotPassword from "./components/forgotPassword/ForgotPassword";
import ClerkDashboard from "./containers/Dashboard/Clerk/ClerkDashboard";
import ReviewerDashboard from "./containers/Dashboard/Reviewer/ReviewerDashboard";
import ApplicantDashboard from "./containers/Dashboard/Applicant/ApplicantDashboard";
import SecretatyDashboard from "./containers/Dashboard/Secretary/SecretaryDashboard";
import AdminDashboard from "./containers/Dashboard/Admin/AdminDashboard";
import ClerkSidebarLayout from "./layouts/Sidebar/Clerk/ClerkSidebarLayout";
import ApplicantSidebarLayout from "./layouts/Sidebar/Applicant/ApplicantSidebarLayout";
import SecretarySidebarLayout from "./layouts/Sidebar/Secretary/SecretarySidebarLayout";
import ReviewerSidebarLayout from "./layouts/Sidebar/Reviewer/ReviewerSidebarLayout";
import AdminSidebarLayout from "./layouts/Sidebar/Admin/AdminSidebarLayout";
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
         { path: "", element: <ClerkDashboard /> },
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
         { path: "", element: <ApplicantDashboard /> },
         { path: "*", element: <h1>Not Found 404</h1> },
      ],
   },
   {
      path: "/applicant",
      element: <ApplicantSidebarLayout />,
      children: [{ path: "new-submission", element: <NewUserRequest /> }],
   },
   {
      path: "/secretary",
      element: <DashboardLayout />,
      children: [
         { path: "", element: <SecretatyDashboard /> },
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
         { path: "", element: <ReviewerDashboard /> },
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
         { path: "", element: <AdminDashboard /> },
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
