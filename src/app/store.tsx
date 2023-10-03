import { combineReducers, configureStore } from "@reduxjs/toolkit";
import windowSizeSlice from "./slices/windowSizeSlice";
import userSlice from "./slices/userSlice";
import languageSlice from "./slices/languageSlice";
import themeSlice from "./slices/themeSlice";

//Consulta https://stackoverflow.com/questions/59874937/how-to-add-redux-persist-to-typescript-project
import storageSession from 'redux-persist/lib/storage/session'
import { persistReducer } from 'redux-persist'
import thunk from "redux-thunk";

const persistConfig = {
  key: "root",
  storage: storageSession,
  whitelist: ['userSlice']
}
const persistRoot = combineReducers({
  userSlice: userSlice,
  winSlice: windowSizeSlice,
  languageSlice: languageSlice,
  themeSlice: themeSlice,
})

const persistedReducer = persistReducer(persistConfig, persistRoot)

const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk]
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
