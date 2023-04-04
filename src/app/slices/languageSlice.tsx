import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const languageSlice = createSlice({
  name: "leguageSlice",
  initialState: {
    language: "ES",
  },
  reducers: {
    setLanguage: (state, action: PayloadAction<"ES" | "EN">) => {
      state.language = action.payload;
    },
  },
});
export const { setLanguage } = languageSlice.actions;
export const selectLenguage = (state: RootState) => state.languageSlice;
export default languageSlice.reducer;
