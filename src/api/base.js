import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Mutex } from "async-mutex";

import { AUTH, DATA } from "config/endpoints";
import authService from "services/auth";

const doNotAuth = [
   "signupVerify",
   "signup",
   "login",
   "validate",
   "updateEmailVerify",
   "updateEmail",
   "forgotPasswordVerify",
   "forgotPassword",
];

const authBaseQuery = fetchBaseQuery({
   baseUrl: AUTH,
   prepareHeaders: (headers, { endpoint }) => {
      if (authService.hasAccess && !doNotAuth.includes(endpoint)) {
         headers.set("Authorization", `Bearer ${authService.access}`);
      }
      return headers;
   },
});

const dataBaseQuery = fetchBaseQuery({
   baseUrl: DATA,
   prepareHeaders: (headers) => {
      if (authService.hasAccess) {
         headers.set("Authorization", `Bearer ${authService.access}`);
      }
      return headers;
   },
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

const mutex = new Mutex();

const withReAuth = (baseQuery) => async (args, api, extraOptions) => {
   await mutex.waitForUnlock();
   let result = await baseQuery(args, api, extraOptions);

   if (
      result.error &&
      result.error.status === 401 &&
      authService.hasRefresh &&
      (baseQuery === dataBaseQuery || !doNotAuth.includes(api.endpoint))
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
               body: { token: authService.refresh },
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
