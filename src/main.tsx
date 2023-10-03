import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/sass/styles.scss";
import { Provider } from "react-redux";
import store from "./app/store";
import Footer from "./components/sections/Footer";
import LandingLayout from "./layouts/LandingLayout";
import IndexBar from "./components/sections/IndexBar";
import { HashRouter, Routes, Route } from "react-router-dom";
import LoginLayout from "./layouts/LoginLayout";
import BlogIndexLayout from "./layouts/BlogIndexLayout";
import LoginRedirect from "./components/LoginRedirect";
import BlogSection from "./components/sections/BlogSection";
import ProductsFinderLayout from "./layouts/ProductsFinderLayout";
import Profile from "./components/Profile";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

const persistor = persistStore(store)
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <PersistGate persistor={persistor}>
    <Provider store={store}>
      <React.StrictMode>
        <HashRouter>
          <IndexBar
            height="6vh"
            themeBut={true}
            title="Angle"
          ></IndexBar>
          <Routes>
            <Route path="" element={<LandingLayout></LandingLayout>} />
            <Route path="/login" element={<LoginLayout></LoginLayout>} />
            <Route path="/profile" element={<Profile margin="10vh 0"></Profile>} />
            <Route path="/blog" element={<BlogIndexLayout></BlogIndexLayout>} />
            <Route path="/blog/:id" element={<BlogSection margin="10vh 0"></BlogSection>} />
            <Route path="/products" element={<ProductsFinderLayout />} />
            <Route path="/products/:category" element={<ProductsFinderLayout />} />
            <Route path="/products/:category/:subcategory" element={<ProductsFinderLayout />} />
            <Route path="/connect/:providerName/redirect" element={<LoginRedirect />} />
          </Routes>
        </HashRouter>
        <Footer></Footer>
      </React.StrictMode>
    </Provider>
  </PersistGate >
);
