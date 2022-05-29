import { createSlice } from "@reduxjs/toolkit";

export const notificationSlice = createSlice({
   name: "notification",
   initialState: {
      value: 5,
   },
   reducers: {
      setNotification: (state, action) => {
         state.value = action.payload;
      },
   },
});

export const { setNotification } = notificationSlice.actions;

export default notificationSlice.reducer;
