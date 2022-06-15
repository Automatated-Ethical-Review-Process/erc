import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createSlice, isAnyOf } from "@reduxjs/toolkit";

import { AUTH } from "config/endpoints";
import tokenService from "services/auth/tokenService";
import userService from "services/auth/userService";

const authApi = createApi({
   reducerPath: "api/auth",
   tagTypes: ["authUser"],
   baseQuery: fetchBaseQuery({ baseUrl: AUTH }),
   endpoints: (build) => ({
      getUser: build.query({
         query: () => ({
            url: "/getUser",
            method: "GET",
            headers: {
               Authorization: `Bearer ${tokenService.getAccessToken()}`,
            },
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
            url: "/login",
            method: "POST",
            body,
         }),
         invalidatesTags: ["authUser"],
      }),
      logout: build.mutation({
         query: () => ({
            url: "/logout",
            method: "POST",
            headers: {
               Authorization: `Bearer ${tokenService.getAccessToken()}`,
            },
         }),
         invalidatesTags: ["authUser"],
      }),
      refresh: build.mutation({
         query: () => ({
            url: "/refresh",
            method: "POST",
            headers: {
               Authorization: `Bearer ${tokenService.getRefreshToken()}`,
            },
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

const dispatch = (func) =>
   import("store/store").then((store) => store.store.dispatch(func));

export const refreshToken = async () =>
   await dispatch(authApi.endpoints.refresh.initiate());

export const waitAndDo = (callback) =>
   Promise.all(authApi.util.getRunningOperationPromises()).finally(callback);

export default authApi;

const initialUser = {
   id: "",
   email: "",
   roles: [],
};

const initialState = {
   access: tokenService.getAccessToken(),
   refresh: tokenService.getRefreshToken(),
   user: initialUser,
   isAuthenticated: tokenService.getAccessToken() ? true : false,
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
               roles: payload.roles,
            };
         }
      );
      builder.addMatcher(
         authApi.endpoints.login.matchFulfilled,
         (auth, { payload }) => {
            auth.access = payload.access;
            auth.refresh = payload.refresh;
            auth.user.roles = payload.roles;
            auth.isAuthenticated = true;
            userService.setUser(payload);
         }
      );
      builder.addMatcher(
         isAnyOf(
            authApi.endpoints.logout.matchFulfilled,
            // authApi.endpoints.getUser.matchRejected,
            authApi.endpoints.refresh.matchRejected
         ),
         (auth) => {
            auth.access = "";
            auth.refresh = "";
            auth.user = initialUser;
            auth.isAuthenticated = false;
            userService.removeUser();
         }
      );
      builder.addMatcher(
         authApi.endpoints.refresh.matchFulfilled,
         (auth, { payload }) => {
            auth.access = payload.token;
            tokenService.updateAccessToken(payload.token);
         }
      );
   },
});

export const { reducer } = authSlice;

export const selectCurrentUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
