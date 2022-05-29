import { createSlice } from "@reduxjs/toolkit";

export const notificationSlice = createSlice({
   name: "notification",
   initialState: {
      value: {
         count: 8,
         content: null,
      },
   },
   reducers: {
      setNotification: (state, action) => {
         state.value = action.payload;
      },
   },
});

export const { setNotification } = notificationSlice.actions;

export default notificationSlice.reducer;
