import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "notification",
  initialState: { value: [] },
  reducers: {
    setMessages: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setMessages } = slice.actions;

export default slice.reducer;
