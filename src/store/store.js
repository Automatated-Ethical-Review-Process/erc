import { configureStore } from "@reduxjs/toolkit";

import notificationReduser from "./notificationSlice";

export const store = configureStore({
   reducer: {
      notifications: notificationReduser,
   },
});
