//layouts
import MainLayout from "./layouts/MainLayout";
import ClerkLayout from "./layouts/ClerkLayout";

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
   
];

export default routes;
