import { Route } from "react-router-dom";

import ShowProfile from "components/profile/ShowProfile";
import EditProfile from "components/profile/EditProfile";

const profileRoute = (
   <Route path="/profile">
      <Route index element={<ShowProfile />} />

      <Route path="edit" element={<EditProfile />} />
   </Route>
);

export default profileRoute;
