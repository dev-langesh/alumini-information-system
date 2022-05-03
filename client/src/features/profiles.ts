import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "profiles",
  initialState: { value: [] },
  reducers: {
    setProfiles: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setProfiles } = slice.actions;

export default slice.reducer;
