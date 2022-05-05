import { configureStore } from "@reduxjs/toolkit";
import sidebarReducer from "../features/sidebarSlice";
import aluminiReducer from "../features/aluminiSlice";
import authReducer from "../features/authSlice";
import profilesReducer from "../features/profiles";
import notificationReducer from "../features/notification";

export const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    alumini: aluminiReducer,
    auth: authReducer,
    profiles: profilesReducer,
    messages: notificationReducer,
  },
});
