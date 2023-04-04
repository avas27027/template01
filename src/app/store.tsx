import { configureStore } from "@reduxjs/toolkit";
import windowSizeSlice from "./slices/windowSizeSlice";
import userSlice from "./slices/userSlice";
import languageSlice from "./slices/languageSlice";
import themeSlice from "./slices/themeSlice";

const store = configureStore({
  reducer: {
    winSlice: windowSizeSlice,
    userSlice: userSlice,
    languageSlice: languageSlice,
    themeSlice: themeSlice,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
