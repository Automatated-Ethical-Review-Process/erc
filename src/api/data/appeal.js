import dataApi from "./api";

const reviewerRequestApi = dataApi.injectEndpoints({
  endpoints: (build) => ({
    getReviewerRequest: build.query({
      query: () => {
        `/appeal/all/pending`;
      },
    }),
  }),
});

export const { useGetReviewerRequestQuery } = reviewerRequestApi;
