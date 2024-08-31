import { AuthUserInterface } from "#/types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface AuthSlice {
  data: AuthUserInterface | null;
}

const initialState: AuthSlice = {
  data: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<AuthUserInterface>) => {
      state.data = action.payload;
    },
    removeUser: (state) => {
      state.data = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser, removeUser } = authSlice.actions;

export default authSlice.reducer;
