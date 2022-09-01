import { toFormData } from "utils/formData";
import dataApi from "./api";

const evaluationFormApi = dataApi.injectEndpoints({
  endpoints: (build) => ({
    addEvaluationForm: build.mutation({
      query: ({ pid, vid, rid, data }) => ({
        url: `/proposal/${pid}/version/${vid}/${rid}/evaluation`,
        method: "POST",
        body: toFormData(data),
      }),
    }),
    getEvaluationForm: build.query({
      query: ({ pid, vid, rid }) =>
        `/proposal/${pid}/version/${vid}/${rid}/evaluation`,
      // TODO: provideTags
    }),
  }),
});

export const { useAddEvaluationFormMutation, useGetEvaluationFormQuery } =
  evaluationFormApi;

export default evaluationFormApi;
