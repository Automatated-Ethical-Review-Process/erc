import { Route } from "react-router-dom";

import ShowNotification from "components/notification/ShowNotification";

const notificationRoute = (
   <Route path="/notification" element={<ShowNotification />} />
);

export default notificationRoute;
