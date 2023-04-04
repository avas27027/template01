import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import svar from "../../assets/sass/Abstracts/_mixins.module.scss";

export const themeSlice = createSlice({
  name: "themeSlice",
  initialState: {
    theme: "light",
  },
  reducers: {
    setTheme: (state, action: PayloadAction<string>) => {
      let p = false;
      let themesString = "";
      for (let i = 0; i < +svar.length; i++) {
        themesString += svar[i] + " ";
        if (action.payload === svar[i]) {
          state.theme = action.payload;
          document.documentElement.className = "";
          document.documentElement.classList.add(`theme-${action.payload}`);
          p = true;
        }
      }
      if (!p) {
        state.theme = "light";
        throw new Error(
          "Please use one of the following themes: " +
            themesString +
            ". You can set this in src/assets/sass/Abstracts/_variables.scss"
        );
      }
    },
  },
});
export const { setTheme } = themeSlice.actions;
export const selectTheme = (state: RootState) => state.themeSlice;
export default themeSlice.reducer;
