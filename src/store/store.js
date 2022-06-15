import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import authApi, { reducer as authReducer } from "api/auth/api";
import dataApi from "api/data/api";

import notificationReducer from "./notificationSlice";

export const store = configureStore({
   reducer: {
      [authApi.reducerPath]: authApi.reducer,
      [dataApi.reducerPath]: dataApi.reducer,
      auth: authReducer,
      notifications: notificationReducer,
   },
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
         .concat(authApi.middleware)
         .concat(dataApi.middleware),
});

setupListeners(store.dispatch);
