import dataApi from "./api";

const commentApi = dataApi.injectEndpoints({
  endpoints: (build) => ({
    getComment: build.query({
      query: ({ pid, vid, rid }) =>
        `/proposal/${pid}/version/${vid}/${rid}/general-comment`,
      // TODO: provideTags
    }),
    addComment: build.mutation({
      query: ({ pid, vid, rid, body }) => ({
        url: `/proposal/${pid}/version/${vid}/${rid}/general-comment`,
        method: "POST",
        body,
      }),
      // TODO: invalidateTags
    }),
    getAllGeneralComments: build.query({
      query: ({ pid, vid }) =>
        `/proposal/${pid}/version/${vid}/general-comment/all`,
    }),
  }),
});

export const {
  useGetCommentQuery,
  useAddCommentMutation,
  useGetAllGeneralCommentsQuery,
} = commentApi;

export default commentApi;
