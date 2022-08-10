import dataApi from "./api";

const proposalApi = dataApi.injectEndpoints({
  endpoints: (build) => ({
    getProposals: build.query({
      query: () => "/proposal/all",
      // TODO: provideTags
    }),
    getProposal: build.query({
      query: (id) => `/proposal/${id}`,
      // TODO: provideTags
    }),
    getVersions: build.query({
      query: (id) => `/proposal/${id}/versions`,
      // TODO: provideTags
    }),
    getClerkNewProposals: build.query({
      query: () => "/proposal/pending", // FIXME: pending
      // TODO: provideTags
    }),
    getSecretaryUnassignedProposals: build.query({
      query: () => "/proposal/unassign",
      // TODO: provideTags
    }),
    getSecretaryReviewingProposals: build.query({
      query: () => "/proposal/reviewing",
      // TODO: provideTags
    }),
    getSecretaryReviewedProposals: build.query({
      query: () => "/proposal/reviewed",
      // TODO: provideTags
    }),
    getSecretaryArchivedProposals: build.query({
      query: () => "/proposal/archived",
      // TODO: provideTags
    }),
    getReviewerPendingProposals: build.query({
      query: (rid) => `/proposal/all/reviewer/${rid}/pending`,
      // TODO: provideTags
    }),
    getReviewerInReviewProposals: build.query({
      query: (rid) => `/proposal/all/reviewer/${rid}/confirm`,
      // TODO: provideTags
    }),
    getReviewerReviewedProposals: build.query({
      query: (rid) => `/proposal/all/reviewer/${rid}/complete`,
      // TODO: provideTags
    }),
    getReviewerOtherProposals: build.query({
      query: (rid) => `/proposal/all/reviewer/${rid}/other`,
      // TODO: provideTags
    }),
    getUserPendingProposals: build.query({
      query: () => "/proposal/user/pending",
      // TODO: provideTags
    }),
    getUserActiveProposals: build.query({
      query: () => "/proposal/user/active",
      // TODO: provideTags
    }),
    getUserOldProposals: build.query({
      query: () => "/proposal/user/old",
      // TODO: provideTags
    }),
  }),
});

export const {
  useGetProposalsQuery,
  useGetProposalQuery, //
  useGetVersionsQuery, //
  useGetClerkNewProposalsQuery, //
  useGetSecretaryUnassignedProposalsQuery, //
  useGetSecretaryReviewingProposalsQuery, //
  useGetSecretaryReviewedProposalsQuery, //
  useGetSecretaryArchivedProposalsQuery, //
  useGetReviewerPendingProposalsQuery, //
  useGetReviewerInReviewProposalsQuery, //
  useGetReviewerReviewedProposalsQuery, //
  useGetReviewerOtherProposalsQuery, //
  useGetUserPendingProposalsQuery, //
  useGetUserActiveProposalsQuery, //
  useGetUserOldProposalsQuery, //
} = proposalApi;

export default proposalApi;
