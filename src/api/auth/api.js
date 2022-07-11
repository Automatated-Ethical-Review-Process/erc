import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createSlice, isAnyOf } from "@reduxjs/toolkit";

import { AUTH } from "config/endpoints";
import tokenService from "services/auth/tokenService";
import dispatchEndpoint from "store/dispatcher";
import Roles from "config/roles";

localStorage.setItem("access", "test");

const authApi = createApi({
   reducerPath: "api/auth",
   tagTypes: ["authUser"],
   baseQuery: fetchBaseQuery({
      baseUrl: AUTH,
      credentials: "include",
   }),
   endpoints: (build) => ({
      getUser: build.query({
         queryFn(_, _api, __, _baseQuery) {
            const {
               auth: { isAuthenticated },
            } = _api.getState();
            if (isAuthenticated) {
               return _baseQuery("/current-user");
            }
            return { error: {} };
         },
         providesTags: ["authUser"],
      }),
      signup: build.mutation({
         query: (body) => ({
            url: "/signup",
            method: "POST",
            body,
         }),
         invalidatesTags: (res) => (res ? ["authUser"] : []),
      }),
      login: build.mutation({
         query: (body) => ({
            url: "/token/generate",
            method: "POST",
            body,
         }),
         invalidatesTags: (res) => (res ? ["authUser"] : []),
      }),
      logout: build.mutation({
         query: () => ({
            url: "/logout",
            method: "POST",
         }),
         invalidatesTags: (res) => (res ? ["authUser"] : []),
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

export const refreshToken = () => dispatchEndpoint(authApi.endpoints.refresh);

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
            if (payload?.status && !auth.isBackOff) {
               auth.isBackOff = true;
               dispatchEndpoint(authApi.endpoints.refresh);
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
               dispatchEndpoint(authApi.endpoints.getUser);
            }
         }
      );
      builder.addMatcher(authApi.endpoints.refresh.matchRejected, () => {
         dispatchEndpoint(authApi.endpoints.logout);
      });
   },
});

export const { reducer } = authSlice;

export const selectCurrentUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
