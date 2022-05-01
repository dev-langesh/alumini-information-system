import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "sidebar",
  initialState: { value: "close" },
  reducers: {
    open: (state) => {
      state.value = "open";
    },
    close: (state) => {
      state.value = "close";
    },
  },
});

export const { open, close } = slice.actions;

export default slice.reducer;
