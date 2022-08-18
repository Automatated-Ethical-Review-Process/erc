import dataApi from "./api";

const appealApi = dataApi.injectEndpoints({
  endpoints: (build) => ({
    addAppeal: build.mutation({
      query: (body) => ({
        url: "/appeal",
        method: "POST",
        body,
      }),
    }),
    getMyAppeals: build.query({
      query: () => `/appeal/all/applicant`,
    }),
    getAppeal: build.query({
      query: (id) => `/appeal/${id}`,
    }),
    getAppeals: build.query({
      query: () => "/appeal/all/pending",
    }),
    acceptAppeal: build.mutation({
      query: (id) => ({
        url: `/appeal/${id}/accept`,
        method: "PUT",
      }),
    }),
    rejectAppeal: build.mutation({
      query: (id) => ({
        url: `/appeal/${id}/reject`,
        method: "PUT",
      }),
    }),
  }),
});

export const {
  useAddAppealMutation,
  useGetMyAppealsQuery,
  useGetAppealQuery,
  useGetAppealsQuery,
  useAcceptAppealMutation,
  useRejectAppealMutation,
} = appealApi;

export default appealApi;
