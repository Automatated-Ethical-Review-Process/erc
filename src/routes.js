//layouts
import MainLayout from "./layouts/MainLayout";
import ClerkLayout from "./layouts/ClerkLayout";
import ApplicantLayout from "./layouts/ApplicantLayout";
import SecretaryLayout from "./layouts/SecretaryLayout";
import ReviewerLayout from "./layouts/ReviewerLayout";

//componets
import SignIn from "./components/SignIn";

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
      path: "/clerk",
      element: <ClerkLayout />,
      children: [
         { path: "dashboard", element: <h1>Hello</h1> },
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
];

export default routes;
