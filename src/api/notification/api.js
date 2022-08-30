import { createApi } from "@reduxjs/toolkit/query/react";

import { notificationQuery } from "api/base";

const notification = createApi({
   reducerPath: "api/notification",
   baseQuery: notificationQuery,
   endpoints: () => ({}),
});

const notificationApi = notification.injectEndpoints({
   endpoints: (build) => ({
      getNotifications: build.query({
         query: () => "/",
         // TODO: provideTags
      }),
      getNotification: build.query({
         query: (id) => `/${id}`,
         // TODO: provideTags
      }),
   }),
});

export const { useGetNotificationQuery, useGetNotificationsQuery } =
   notificationApi;

export default notificationApi;
