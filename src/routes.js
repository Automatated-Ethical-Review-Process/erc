//layouts
import MainLayout from "./layouts/MainLayout";
import ClerkLayout from "./layouts/ClerkLayout";
import ApplicantLayout from "./layouts/ApplicantLayout";
import SecretaryLayout from "./layouts/SecretaryLayout";
import ReviewerLayout from "./layouts/ReviewerLayout";
import AdminLayout from "./layouts/AdminLayout";
import NewUserRequest from "./containers/Dashboard/Clerk/NewUserRequest";

//componets
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";

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
      path: "/clerk",
      element: <ClerkLayout />,
      children: [
         { path: "new-user-request", element: <NewUserRequest /> },
         { path: "*", element: <h1>Not Found 404</h1> },
      ],
   },
   {
      path: "/applicant",
      element: <ApplicantLayout />,
      children: [
         { path: "dashboard", element: <h1>Hello</h1> },
         { path: "*", element: <h1>Not Found 404</h1> },
      ],
   },
   {
      path: "/secretary",
      element: <SecretaryLayout />,
      children: [
         { path: "dashboard", element: <h1>Hello</h1> },
         { path: "*", element: <h1>Not Found 404</h1> },
      ],
   },
   {
      path: "/reviewer",
      element: <ReviewerLayout />,
      children: [
         { path: "dashboard", element: <h1>Hello</h1> },
         { path: "*", element: <h1>Not Found 404</h1> },
      ],
   },
   {
      path: "/admin",
      element: <AdminLayout />,
      children: [
         { path: "dashboard", element: <h1>Hello</h1> },
         { path: "*", element: <h1>Not Found 404</h1> },
      ],
   },
];

export default routes;
