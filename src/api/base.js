import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Mutex } from "async-mutex";

import { AUTH, DATA } from "config/endpoints";

localStorage.setItem("access", "test");
const mutex = new Mutex();

const authBaseQuery = fetchBaseQuery({
   baseUrl: AUTH,
   credentials: "include",
});

const dataBaseQuery = fetchBaseQuery({
   baseUrl: DATA,
   credentials: "include",
});

const refresh = (function () {
   var _onFulfilled,
      _onRejected,
      _isInit = false;
   return {
      init(onFulfilled, onRejected) {
         if (!_isInit) {
            _onFulfilled = onFulfilled;
            _onRejected = onRejected;
            _isInit = true;
         }
      },
      onFulfilled: (data) => _onFulfilled(data),
      onRejected: (data) => _onRejected(data),
   };
})();

export const { init: initRefreshActions } = refresh;

const doNotRefresh = ["login"];

const withReAuth = (baseQuery) => async (args, api, extraOptions) => {
   await mutex.waitForUnlock();
   let result = await baseQuery(args, api, extraOptions);

   if (
      result.error &&
      result.error.status === 401 &&
      !doNotRefresh.includes(api.endpoint)
   ) {
      if (mutex.isLocked()) {
         await mutex.waitForUnlock();
         result = await baseQuery(args, api, extraOptions);
      } else {
         const release = await mutex.acquire();
         const refreshResult = await authBaseQuery(
            {
               url: "/token/refresh",
               method: "POST",
            },
            api,
            extraOptions
         );
         if (refreshResult.data) {
            api.dispatch(refresh.onFulfilled(refreshResult.data));
            result = await baseQuery(args, api, extraOptions);
         } else {
            api.dispatch(refresh.onRejected(refreshResult.error));
         }
         release();
      }
   }
   return result;
};

const authQuery = withReAuth(authBaseQuery);
const dataQuery = withReAuth(dataBaseQuery);

export { authQuery, dataQuery };
