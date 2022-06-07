import { configureStore } from "@reduxjs/toolkit";

import notificationReduser from "./notificationSlice";
import authenticationReduser from "./authSlice";

export const store = configureStore({
   reducer: {
      notifications: notificationReduser,
      authentication: authenticationReduser,
   },
});
