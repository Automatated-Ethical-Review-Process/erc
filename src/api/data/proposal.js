import { toFormData } from "utils/formData";
import dataApi from "./api";

const proposalApi = dataApi.injectEndpoints({
  endpoints: (build) => ({
    addProposal: build.mutation({
      query: (data) => ({
        url: "/proposal",
        method: "POST",
        body: toFormData(data),
      }),
    }),
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
      query: () => "/proposal/pending",
      // TODO: provideTags
    }),
    getSecretaryUnassignedProposals: build.query({
      query: () => "/proposal/unassign",
      // TODO: provideTags
    }),
    getSecretaryAssignedProposals: build.query({
      query: () => "/proposal/review-state",
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
  useAddProposalMutation,
  useGetProposalsQuery,
  useGetProposalQuery, //
  useGetVersionsQuery, //
  useGetClerkNewProposalsQuery, //
  useGetSecretaryUnassignedProposalsQuery, //
  useGetSecretaryAssignedProposalsQuery, //
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
