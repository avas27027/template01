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
import Card from "./components/paterns/Card";
import BlogIndexLayout from "./layouts/BlogIndexLayout";
import LoginRedirect from "./components/LoginRedirect";
import BlogSection from "./components/sections/BlogSection";
import ProductsFinderLayout from "./layouts/ProductsFinderLayout";
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
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
          <Route path="/blog" element={<BlogIndexLayout></BlogIndexLayout>} />
          <Route path="/blog/:id" element={<BlogSection margin="10vh 0"></BlogSection>} />
          <Route path="/products" element={<ProductsFinderLayout/> }/>
          <Route path="/products/:category" element={<ProductsFinderLayout/> }/>
          <Route path="/products/:category/:subcategory" element={<ProductsFinderLayout/> }/>
          <Route path="/connect/:providerName/redirect" element={ <LoginRedirect/> } />
        </Routes>
      </HashRouter>
      <Footer></Footer>
    </React.StrictMode>
  </Provider>
);
