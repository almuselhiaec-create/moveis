import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../Features/UserSlice";

// Load user from localStorage
const savedUser = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
  preloadedState: {
    user: {
      user: savedUser,
      loading: false,
      error: null,
      purchase: null,
    },
  },
});

// Subscribe → save whenever state changes
store.subscribe(() => {
  const state = store.getState();
  if (state.user.user) {
    localStorage.setItem("user", JSON.stringify(state.user.user));
  } else {
    localStorage.removeItem("user");
  }
});
