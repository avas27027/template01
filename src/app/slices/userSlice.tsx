import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    user: "",
    pass: "",
  },
  reducers: {
    setUser: (state, action: PayloadAction<string>) => {
      state.user = action.payload;
    },
    setPass: (state, action: PayloadAction<string>) => {
      state.pass = action.payload;
    },
  },
});
export const { setUser, setPass } = userSlice.actions;
export const selectUser = (state: RootState) => state.userSlice;
export default userSlice.reducer;
