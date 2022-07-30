import dataApi from "./api";

const userApi = dataApi.injectEndpoints({
  endpoints: (build) => ({
    getMe: build.query({
      query: () => "/user",
      providesTags: ["me"],
    }),
    getUser: build.query({
      query: (id) => `/user/${id}`,
      providesTags: (_, e, id) => (e ? [] : [{ type: "user", id }]),
    }),
    getUsers: build.query({
      query: () => "/user/all",
      providesTags: (r) =>
        r
          ? [
              ...r.map(({ id }) => ({ type: "user", id })),
              { type: "user", id: "LIST" },
            ]
          : [{ type: "user", id: "LIST" }],
    }),
    updateMe: build.mutation({
      query: (body) => ({
        url: "/user",
        method: "PUT",
        body,
      }),
      invalidatesTags: (_, e) => (e ? [] : ["me"]),
    }),
  }),
});

export const {
  useGetMeQuery,
  useGetUserQuery,
  useGetUsersQuery,
  useUpdateMeMutation,
} = userApi;

export default userApi;
