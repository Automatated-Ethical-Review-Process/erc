import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Mutex } from "async-mutex";

import { DATA } from "config/endpoints";
import { refreshToken } from "api/auth/api";

const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
   baseUrl: DATA,
   prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.access;
      if (token) {
         headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
   },
});

const baseQueryWithReAuth = async (args, api, extraOptions) => {
   await mutex.waitForUnlock();
   let result = await baseQuery(args, api, extraOptions);

   if (result.error && result.error.status === 401) {
      if (mutex.isLocked()) {
         await mutex.waitForUnlock();
      } else {
         const release = await mutex.acquire();
         await refreshToken();
         release();
      }
      result = await baseQuery(args, api, extraOptions);
   }
   return result;
};

export default createApi({
   reducerPath: "api/data",
   baseQuery: baseQueryWithReAuth,
   endpoints: () => ({}),
});
