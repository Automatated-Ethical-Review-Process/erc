import { createApi } from "@reduxjs/toolkit/query/react";
import { createSlice, isAnyOf } from "@reduxjs/toolkit";

import { authQuery, initRefreshActions } from "api/base";
import tokenService from "services/auth/tokenService";
import Roles from "config/roles";

const authApi = createApi({
   reducerPath: "api/auth",
   tagTypes: ["authUser"],
   baseQuery: authQuery,
   endpoints: (build) => ({
      getUser: build.query({
         queryFn(_, _api, __, _baseQuery) {
            const { auth } = _api.getState();
            if (auth.isAuthenticated) {
               return _baseQuery("/current-user");
            }
            return { error: {} };
         },
         providesTags: ["authUser"],
      }),
      signupVerify: build.mutation({
         query: (body) => ({
            url: "/create-user/token",
            method: "POST",
            body,
         }),
      }),
      signup: build.mutation({
         query: (body) => ({
            url: "/create-user",
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
      validate: build.mutation({
         query: (id) => ({
            url: "/request/validate",
            method: "POST",
            params: { id },
         }),
      }),
      updateEmailVerify: build.mutation({
         query: (body) => ({
            url: "/update/email/send/token",
            method: "POST",
            body,
         }),
      }),
      updateEmail: build.mutation({
         query: (id) => ({
            url: "/update/email",
            method: "PUT",
            params: { id },
            invalidatesTags: (res) => (res ? ["authUser"] : []),
         }),
      }),
      forgotPasswordVerify: build.mutation({
         query: (body) => ({
            url: "/update/password/forgot/token",
            method: "POST",
            body,
         }),
      }),
      forgotPassword: build.mutation({
         query: ({ id, password }) => ({
            url: "/update/password/forgot",
            method: "POST",
            params: { id },
            body: { password },
         }),
      }),
      checkPassword: build.mutation({
         query: (body) => ({
            url: "/check/password",
            method: "POST",
            body,
         }),
      }),
      updatePassword: build.mutation({
         query: (body) => ({
            url: "/update/password",
            method: "PUT",
            body,
         }),
      }),
      updateRoles: build.mutation({
         query: (body) => ({
            url: "/update/roles",
            method: "PUT",
            body,
         }),
      }),
      inviteReviewer: build.mutation({
         query: (body) => ({
            url: "/create-user/invite/reviewer/token",
            method: "POST",
            body,
         }),
      }),
      inviteClerk: build.mutation({
         query: (body) => ({
            url: "/create-user/invite/clerk/token",
            method: "POST",
            body,
         }),
      }),
      inviteSecretary: build.mutation({
         query: (body) => ({
            url: "/create-user/invite/secretary/token",
            method: "POST",
            body,
         }),
      }),
   }),
});

export const {
   useLazyGetUserQuery, //
   useSignupVerifyMutation,
   useSignupMutation,
   useLoginMutation, //
   useLogoutMutation, //
   useValidateMutation, //
   useUpdateEmailVerifyMutation, //
   useUpdateEmailMutation, //
   useForgotPasswordVerifyMutation, //
   useForgotPasswordMutation, //
   useCheckPasswordMutation, //
   useUpdatePasswordMutation, //
   useUpdateRolesMutation,
   useInviteReviewerMutation,
   useInviteClerkMutation,
   useInviteSecretaryMutation,
} = authApi;

export default authApi;

const initialUser = {
   id: "",
   email: "",
   roles: [],
};

const initialState = {
   user: initialUser,
   isAuthenticated: tokenService.getAccessToken() ? true : false,
};

const fixRoles = (roles) => {
   if (roles.includes(Roles.e_reviewer) || roles.includes(Roles.i_reviewer)) {
      return [...roles, Roles.reviewer];
   }
   return roles;
};

const reset = (auth) => {
   auth.user = initialUser;
   auth.isAuthenticated = false;
   tokenService.removeAccessToken();
};

const authSlice = createSlice({
   name: "auth",
   initialState: initialState,
   reducers: {
      refreshFulfilled(auth, { payload }) {
         auth.isAuthenticated = true;
         tokenService.setAccessToken(payload.access);
      },
      refreshRejected: reset,
   },
   extraReducers: (builder) => {
      builder.addMatcher(
         authApi.endpoints.getUser.matchFulfilled,
         (auth, { payload }) => {
            auth.user = {
               id: payload.id,
               email: payload.email,
               roles: fixRoles(payload.roles),
            };
         }
      );
      builder.addMatcher(
         authApi.endpoints.getUser.matchRejected,
         (auth, { payload }) => (payload?.status ? reset(auth) : void 0)
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
         reset
      );
   },
});

initRefreshActions(
   authSlice.actions.refreshFulfilled,
   authSlice.actions.refreshRejected
);

export const { reducer } = authSlice;

export const selectCurrentUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
