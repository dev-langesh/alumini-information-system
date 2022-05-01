import { configureStore } from "@reduxjs/toolkit";
import sidebarReducer from "../features/sidebarSlice";
import aluminiReducer from "../features/aluminiSlice";
import authReducer from "../features/authSlice";

export const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    alumini: aluminiReducer,
    auth: authReducer,
  },
});
