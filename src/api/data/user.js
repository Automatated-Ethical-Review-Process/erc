import dataApi from "./api";

const userApi = dataApi.injectEndpoints({
  endpoints: (build) => ({
    getMe: build.query({
      query: () => "/user",
      providesTags: ["me"],
    }),
    updateMe: build.mutation({
      query: (body) => ({
        url: "/user",
        method: "PUT",
        body,
      }),
      invalidatesTags: (_, e) => (e ? [] : ["me"]),
    }),
    getUser: build.query({
      query: (id) => `/user/${id}`,
      providesTags: (r, _, id) => (r ? [{ type: "user", id }] : []),
    }),
    getUsers: build.query({
      query: () => "/user/all",
      providesTags: (r) => provideTags(r, "user"),
    }),
    getUsersByIds: build.mutation({
      query: (ids) => ({
        url: "/user/all/ids",
        method: "POST",
        body: { ids },
      }),
      providesTags: (r) => provideTags(r, "user"),
    }),
    getApplicants: build.query({
      query: () => "/user/all/applicant",
      providesTags: (r) => provideTags(r, "user"),
    }),
    getReviewers: build.query({
      query: () => "/user/all/reviewer",
      providesTags: (r) => provideTags(r, "user"),
    }),
    userExists: build.mutation({
      query: (body) => ({
        url: "/user/exists",
        method: "POST",
        body,
      }),
    }),
  }),
});

function provideTags(r, type) {
  return r
    ? [...r.map(({ id }) => ({ type, id })), { type, id: "LIST" }]
    : [{ type, id: "LIST" }];
}

export const {
  useGetMeQuery, //
  useUpdateMeMutation, //
  useGetUserQuery, //
  useLazyGetUsersQuery,
  useGetUsersByIdsMutation,
  useGetApplicantsQuery,
  useGetReviewersQuery,
  useUserExistsMutation,
} = userApi;

export default userApi;
