import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "alumini",
  initialState: { value: {} },
  reducers: {
    setProfile: (state, action) => {
      state.value = action.payload;
    },
    reset: (state) => {
      state.value = {};
    },
  },
});

export const { setProfile } = slice.actions;

export default slice.reducer;
