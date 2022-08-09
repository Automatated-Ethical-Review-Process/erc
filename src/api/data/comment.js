import dataApi from "./api";

const commentApi = dataApi.injectEndpoints({
  endpoints: (build) => ({
    getComment: build.query({
      query: ({ pid, vid, rid }) =>
        `/proposal/${pid}/version/${vid}/${rid}/general-comment`,
      // TODO: provideTags
    }),
    addComment: build.mutation({
      query: ({ pid, vid, rid, content }) => ({
        url: `/proposal/${pid}/version/${vid}/${rid}/general-comment`,
        method: "POST",
        body: { content },
      }),
      // TODO: invalidateTags
    }),
    updateComment: build.mutation({
      query: ({ pid, vid, rid, content }) => ({
        url: `/proposal/${pid}/version/${vid}/${rid}/general-comment`,
        method: "PUT",
        body: { content },
      }),
      // TODO: invalidateTags
    }),
  }),
});

export const {
  useGetCommentQuery,
  useAddCommentMutation,
  useUpdateCommentMutation,
} = commentApi;

export default commentApi;
