import { Route } from "react-router-dom";

import ShowNotification from "components/notification/ShowNotification";
import routes from "config/routes";

const notificationRoute = (
   <Route path={routes.notification} element={<ShowNotification />} />
);

export default notificationRoute;
