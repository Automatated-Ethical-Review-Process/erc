import { Route } from "react-router-dom";

import MainLayout from "layouts/MainLayout";
import SignIn from "containers/main/SignIn";
import VerifyEmail from "containers/main/signup/EmailVerify";
import SignUp from "containers/main/signup/SignUp";
import ForgotPassword from "containers/main/forgotPassword/ForgotPassword";

import roles from "config/roles";
import routes from "config/routes";
import { ProtectedNavigate } from "routes/common/Protected";

const rules = [
   { role: roles.admin, to: routes.admin },
   { role: roles.secretary, to: routes.secretary },
   { role: roles.reviewer, to: routes.reviewer },
   { role: roles.clerk, to: routes.clerk },
   { role: roles.applicant, to: routes.applicant },
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

      <Route path="verify" element={<VerifyEmail />} />

      <Route path="signup" element={<SignUp />} />

      <Route path="forgot-password" element={<ForgotPassword />} />
   </Route>
);

export default mainRoute;
