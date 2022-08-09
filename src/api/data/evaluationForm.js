import dataApi from "./api";

const evaluationFormApi = dataApi.injectEndpoints({
  endpoints: (build) => ({
    getEvaluationForm: build.query({
      query: ({ pid, vid, rid }) =>
        `/proposal/${pid}/version/${vid}/${rid}/evaluation`,
      // TODO: provideTags
    }),
  }),
});

export const { useGetEvaluationFormQuery } = evaluationFormApi;

export default evaluationFormApi;
