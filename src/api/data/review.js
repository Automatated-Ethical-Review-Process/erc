import dataApi from "./api";

const reviewApi = dataApi.injectEndpoints({
  endpoints: (build) => ({
    acceptReviewerProposal: build.mutation({
      query: ({ pid, vid, rid }) => ({
        url: `/proposal/${pid}/version/${vid}/reviewer/confirm`,
        method: "PUT",
        body: { reviewerId: rid },
      }),
      // TODO: invalidateTags
    }),
    rejectReviewerProposal: build.mutation({
      query: ({ pid, vid, rid, message }) => ({
        url: `/proposal/${pid}/version/${vid}/reviewer/reject`,
        method: "PUT",
        body: { reviewerId: rid, message },
      }),
      // TODO: invalidateTags
    }),
    assignAllReviewers: build.mutation({
      query: ({ pid, vid, reviewers }) => ({
        url: `/proposal/${pid}/version/${vid}/reviewer/assign/all`,
        method: "POST",
        body: { reviewers },
      }),
    }),
    // removeAssignedReviewer: build.mutation({
    //   query: ({ pid, vid, rid }) => ({
    //     url: `/proposal/${pid}/version/${vid}/reviewer/assign`,
    //     method: "DELETE",
    //     body: { reviewerId: rid },
    //   }),
    // }),
  }),
});

export const {
  useAcceptReviewerProposalMutation,
  useRejectReviewerProposalMutation,
  useAssignAllReviewersMutation,
  // useRemoveAssignedReviewerMutation,// removed
} = reviewApi;

export default reviewApi;
