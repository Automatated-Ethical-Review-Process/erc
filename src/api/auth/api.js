import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createSlice, isAnyOf } from "@reduxjs/toolkit";

import { AUTH } from "config/endpoints";
import tokenService from "services/auth/tokenService";
import Roles from "config/roles";

const authApi = createApi({
   reducerPath: "api/auth",
   tagTypes: ["authUser"],
   baseQuery: fetchBaseQuery({
      baseUrl: AUTH,
      credentials: "include",
   }),
   endpoints: (build) => ({
      getUser: build.query({
         query: () => ({
            url: "/current-user",
            method: "GET",
         }),
         providesTags: ["authUser"],
      }),
      signup: build.mutation({
         query: (body) => ({
            url: "/signup",
            method: "POST",
            body,
         }),
         invalidatesTags: ["authUser"],
      }),
      login: build.mutation({
         query: (body) => ({
            url: "/token/generate",
            method: "POST",
            body,
         }),
         invalidatesTags: ["authUser"],
      }),
      logout: build.mutation({
         query: () => ({
            url: "/logout",
            method: "POST",
         }),
         invalidatesTags: ["authUser"],
      }),
      refresh: build.mutation({
         query: () => ({
            url: "/token/refresh",
            method: "POST",
         }),
      }),
   }),
});

export const {
   useLazyGetUserQuery,
   useSignupMutation,
   useLoginMutation,
   useLogoutMutation,
} = authApi;

const dispatch = (function () {
   const dispatcher = import("store/store").then((store) => store.store);

   return function (action) {
      dispatcher.then((store) => store.dispatch(action.initiate()));
   };
})();

export const refreshToken = () => dispatch(authApi.endpoints.refresh);

export const waitAndDo = (callback) =>
   Promise.all(authApi.util.getRunningOperationPromises()).finally(callback);

export default authApi;

const initialUser = {
   id: "",
   email: "",
   roles: [],
};

const initialState = {
   user: initialUser,
   isBackOff: false,
   isAuthenticated: tokenService.getAccessToken() ? true : false,
};

const fixRoles = (roles) => {
   if (roles.includes(Roles.e_reviewer) || roles.includes(Roles.i_reviewer)) {
      return [...roles, Roles.reviewer];
   }
   return roles;
};

const authSlice = createSlice({
   name: "auth",
   initialState: initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder.addMatcher(
         authApi.endpoints.getUser.matchFulfilled,
         (auth, { payload }) => {
            auth.user = {
               id: payload.id,
               email: payload.email,
               roles: fixRoles(payload.roles),
            };
            auth.isBackOff = false;
         }
      );
      builder.addMatcher(
         authApi.endpoints.getUser.matchRejected,
         (auth, { payload }) => {
            if (payload !== undefined && !auth.isBackOff) {
               auth.isBackOff = true;
               dispatch(authApi.endpoints.refresh);
            }
         }
      );

      builder.addMatcher(
         authApi.endpoints.login.matchFulfilled,
         (auth, { payload }) => {
            auth.user.roles = fixRoles(payload.roles);
            auth.isAuthenticated = true;
            tokenService.setAccessToken(payload.access);
         }
      );

      builder.addMatcher(
         isAnyOf(
            authApi.endpoints.logout.matchFulfilled,
            authApi.endpoints.logout.matchRejected
         ),
         (auth) => {
            auth.user = initialUser;
            auth.isBackOff = true;
            auth.isAuthenticated = false;
            tokenService.removeAccessToken();
         }
      );

      builder.addMatcher(
         authApi.endpoints.refresh.matchFulfilled,
         (auth, { payload }) => {
            auth.isAuthenticated = true;
            tokenService.setAccessToken(payload.access);
            if (auth.isBackOff) {
               dispatch(authApi.endpoints.getUser);
            }
         }
      );
      builder.addMatcher(authApi.endpoints.refresh.matchRejected, () => {
         dispatch(authApi.endpoints.logout);
      });
   },
});

export const { reducer } = authSlice;

export const selectCurrentUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
