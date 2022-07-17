import dataApi from "./api";

const userApi = dataApi.enhanceEndpoints({
   endpoints: (build) => ({
      getMe: build.query({
         query: () => "/user",
      }),
      getUser: build.query({
         query: (id) => `/user/${id}`,
      }),
      getUsers: build.query({
         query: () => "/user/all",
      }),
      updateUser: build.mutation({
         query: (body) => ({
            url: "/user",
            method: "PUT",
            body,
         }),
      }),
   }),
});

export const {
   useGetMeQuery,
   useGetUserQuery,
   useGetUsersQuery,
   useUpdateUserMutation,
} = userApi;

export default userApi;
