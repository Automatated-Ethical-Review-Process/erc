import { Route } from "react-router-dom";

import ShowProfile from "components/profile/ShowProfile";
import EditProfile from "components/profile/EditProfile";
import routes from "config/routes";

const profileRoute = (
   <Route path={routes.profile}>
      <Route index element={<ShowProfile />} />

      <Route path="edit" element={<EditProfile />} />
   </Route>
);

export default profileRoute;
