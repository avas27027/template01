import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    user: "",
    jwt: "",
  },
  reducers: {
    setUser: (state, action: PayloadAction<string>) => {
      state.user = action.payload;
    },
    setJwt: (state, action: PayloadAction<string>) => {
      state.jwt = action.payload;
    },
  },
});
export const { setUser, setJwt } = userSlice.actions;
export const selectUser = (state: RootState) => state.userSlice;
export default userSlice.reducer;
