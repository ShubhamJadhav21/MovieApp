import { createSlice } from "@reduxjs/toolkit";

const users = createSlice({
  name: "users",
  initialState: {
    loggedIn: localStorage.getItem("isAuthenticated") === "true",
  },
  reducers: {
    login: (state) => {
      state.loggedIn = true;
      localStorage.setItem("isAuthenticated", "true"); 
    },
    logout: (state) => {
      state.loggedIn = false;
      localStorage.removeItem("isAuthenticated"); 
      localStorage.removeItem("userMobile");
    },
  },
});

export const { login, logout } = users.actions;
export default users.reducer;
