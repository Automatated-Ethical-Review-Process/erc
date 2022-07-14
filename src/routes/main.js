import { Route } from "react-router-dom";

import MainLayout from "layouts/MainLayout";
import SignIn from "containers/main/SignIn";
import SignUp from "containers/main/signup/SignUp";
import ForgotPassword from "containers/main/ForgotPassword";
import Update from "containers/main/Update";

import Roles from "config/roles";
import routes from "config/routes";
import { ProtectedNavigate } from "routes/common/Protected";

const rules = [
   { role: Roles.admin, to: routes.admin },
   { role: Roles.secretary, to: routes.secretary },
   { role: Roles.reviewer, to: routes.reviewer },
   { role: Roles.clerk, to: routes.clerk },
   { role: Roles.applicant, to: routes.applicant },
];

const mainRoute = (
   <Route path={routes.home} element={<MainLayout />}>
      <Route
         index
         element={
            <ProtectedNavigate rules={rules}>
               <SignIn />
            </ProtectedNavigate>
         }
      />

      <Route path="signup" element={<SignUp />} />

      <Route path="forgot-password" element={<ForgotPassword />} />

      <Route path="update">
         <Route path=":entry" element={<Update />} />
      </Route>
   </Route>
);

export default mainRoute;
