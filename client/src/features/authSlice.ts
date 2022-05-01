import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "auth",
  initialState: { value: "" },
  reducers: {
    signin: (state, action) => {
      state.value = action.payload;
    },
    logout: (state) => {
      state.value = "";
    },
  },
});

export const { signin, logout } = slice.actions;

export default slice.reducer;
