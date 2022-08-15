import dataApi from "./api";

const fileApi = dataApi.injectEndpoints({
  endpoints: (build) => ({
    getFile: build.query({
      query: (id) => ({
        url: `/file/documents/${id}`,
        responseHandler: (r) => r.blob(),
      }),
    }),
  }),
});

export const { useGetFileQuery } = fileApi;

export default fileApi;
