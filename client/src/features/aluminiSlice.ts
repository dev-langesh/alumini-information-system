import { createSlice } from "@reduxjs/toolkit";
import { aluminiData } from "../../components/home/data";

const slice = createSlice({
  name: "alumini",
  initialState: { value: aluminiData },
  reducers: {},
});

export default slice.reducer;
