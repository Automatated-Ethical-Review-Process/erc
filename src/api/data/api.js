import { createApi } from "@reduxjs/toolkit/query/react";

import { dataQuery } from "api/base";

export default createApi({
   reducerPath: "api/data",
   baseQuery: dataQuery,
   endpoints: () => ({}),
});
