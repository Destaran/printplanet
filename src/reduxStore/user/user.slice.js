import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    storeUser: (state, { payload }) => {
      state.currentUser = payload;
    },
  },
});

export const { storeUser } = userSlice.actions;

export default userSlice.reducer;
