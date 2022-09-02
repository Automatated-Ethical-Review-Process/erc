import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import authApi, { reducer as authReducer } from "api/auth/api";
import dataApi from "api/data/api";
import notificationApi, {
   reducer as notificationReducer,
} from "api/notification/api";
import { setStore } from "./dispatcher";

//import notificationReducer from "./notificationSlice";

const store = configureStore({
   reducer: {
      [authApi.reducerPath]: authApi.reducer,
      [dataApi.reducerPath]: dataApi.reducer,
      [notificationApi.reducerPath]: notificationApi.reducer,
      auth: authReducer,
      notification: notificationReducer,
   },
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false })
         .concat(authApi.middleware)
         .concat(notificationApi.middleware)
         .concat(dataApi.middleware),
});

setStore(store);
setupListeners(store.dispatch);

export default store;
