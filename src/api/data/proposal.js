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
    getPendingProposals: build.query({
      query: () => "/proposal/pending",
      // TODO: provideTags
    }),
    getUnassignedProposals: build.query({
      query: () => "/proposal/unassign",
      // TODO: provideTags
    }),
  }),
});

export const {
  useGetProposalsQuery,
  useGetProposalQuery,
  useGetVersionsQuery,
  useGetPendingProposalsQuery,
  useGetUnassignedProposalsQuery,
} = proposalApi;

export default proposalApi;
