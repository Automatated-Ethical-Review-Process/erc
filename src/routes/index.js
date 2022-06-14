import { Routes, Route } from "react-router-dom";

import mainRoute from "./main";
import rolesRoutes from "./roles";
import profileRoute from "./profile";
import notificationRoute from "./notification";

import Test from "components/common/Test";

import { ProtectedRoute } from "./common/Protected";

const AppRoutes = () => (
   <Routes>
      {mainRoute}
      {rolesRoutes}

      <Route element={<ProtectedRoute />}>
         {profileRoute}
         {notificationRoute}
      </Route>

      <Route path="/test" element={<Test />} />

      <Route path="*" element={<h4>{"Oops, page not found :("}</h4>} />
   </Routes>
);

export default AppRoutes;
