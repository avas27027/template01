import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const winSlice = createSlice({
  name: "winSlice",
  initialState: {
    value: 1044,
  },
  reducers: {
    reset: (state) => {
      state.value = 1044;
    },
    replace: (state, action: PayloadAction<number>) => {
      state.value = action.payload;
    },
  },
});
export const { reset, replace } = winSlice.actions;
export const selectWin = (state: RootState) => state.winSlice.value;
export default winSlice.reducer;
