import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: false,
  // user: JSON.parse(localStorage.getItem("user")) ?? false,
};

export const authSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    loginHandle: (state, action) => {
      // localStorage.setItem("user", JSON.stringify(action.payload));
      state.user = action.payload;
    },
    logoutHandle: (state) => {
      // localStorage.removeItem("user");
      state.user = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { loginHandle, logoutHandle } = authSlice.actions;

export default authSlice.reducer;
