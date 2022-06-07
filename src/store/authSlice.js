import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
   name: "authentication",
   initialState: {
      value: {
         isAuthenticated: true,
         roles: ["ROLE_CLERK", "ROLE_APPLICANT", "ROLE_SECRETARY"],
      },
   },
   reducers: {
      setAuthentication: (state, action) => {
         state.value = action.payload;
      },
   },
});

export const { setAuthentication } = authSlice.actions;
export default authSlice.reducer;
