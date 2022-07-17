import { createApi } from "@reduxjs/toolkit/query/react";

import { dataQuery } from "api/base";

const dataApi = createApi({
   reducerPath: "api/data",
   baseQuery: dataQuery,
   endpoints: () => ({}),
});

export default dataApi;
