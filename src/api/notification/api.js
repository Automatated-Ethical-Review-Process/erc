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
      }),
      getNotification: build.query({
         query: (id) => `/${id}`,
      }),
   }),
});

export const { useGetNotificationQuery, useGetNotificationsQuery } =
   notificationApi;

export default notificationApi;

function pathGenarator(contentId, notificationType) {
   if (notificationType === "NEW_PROPOSAL_SUBMISSION") {
      return "/clerk/new-submissions";
   } else if (notificationType === "NEW_USER_REQUEST") {
      return "/clerk/new-user-requests";
   } else if (notificationType === "USER_PROFILE") {
      return "/profile";
   } else if (notificationType === "") {
   }
}
