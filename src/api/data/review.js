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
        body: { reviewerId: rid, message }, // TODO: endpoint doesn't accept message
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
  }),
});

export const {
  useAcceptReviewerProposalMutation,
  useRejectReviewerProposalMutation,
  useAssignAllReviewersMutation,
} = reviewApi;

export default reviewApi;
