import dataApi from "./api";

const versionApi = dataApi.injectEndpoints({
  endpoints: (build) => ({
    getVersion: build.query({
      query: ({ pid, vid }) => `/proposal/${pid}/version/${vid}`,
      // TODO: provideTags
    }),
    setVersionSubmitted: build.mutation({
      query: ({ pid, vid }) => ({
        url: `/proposal/${pid}/version/${vid}/submit`,
        method: "PUT",
        // TODO: invalidateTags
      }),
    }),
    setVersionRejected: build.mutation({
      query: ({ pid, vid, message }) => ({
        url: `/proposal/${pid}/version/${vid}/reject`,
        method: "PUT",
        body: { message },
        // TODO: invalidateTags
      }),
    }),
    getAllReviews: build.query({
      query: ({ pid, vid }) => `/proposal/${pid}/version/${vid}/evaluations`,
      // TODO: provideTags
    }),
    addSecretaryComment: build.mutation({
      query: ({ pid, vid, body }) => ({
        url: `/proposal/${pid}/version/${vid}/status`,
        method: "PUT",
        body,
        //TODO:InvalidateTags
      }),
    }),
    gerLatestVersion: build.query({
      query: (pid) => ({
        url: `/proposal/${pid}/version/latest`,
      }),
    }),
  }),
});

export const {
  useGetVersionQuery,
  useSetVersionSubmittedMutation, //
  useSetVersionRejectedMutation, //
  useGetAllReviewsQuery,
  useAddSecretaryCommentMutation, //
  useGerLatestVersionQuery, //
} = versionApi;

export default versionApi;
