import dataApi from "./api";

const reviewApi = dataApi.injectEndpoints({
  endpoints: (build) => ({
    acceptReviewerProposal: build.mutation({
      query: ({ pid, vid, rid }) => ({
        url: `/proposal/${pid}/version/${vid}/reviewer/confirm`,
        method: "PUT",
        body: { reviewerId: rid },
      }),
    }),
    rejectReviewerProposal: build.mutation({
      query: ({ pid, vid, rid, message }) => ({
        url: `/proposal/${pid}/version/${vid}/reviewer/reject`,
        method: "PUT",
        body: { reviewerId: rid, message }, // TODO: endpoint doesn't accept message
      }),
    }),
  }),
});

export const {
  useAcceptReviewerProposalMutation,
  useRejectReviewerProposalMutation,
} = reviewApi;

export default reviewApi;
