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

const foot = [
  {
    title: "Products",
    content: [
      { name: "Features", link: "#" },
      { name: "Learn", link: "#" },
      { name: "Plugins", link: "#" },
    ],
  },
  {
    title: "Templates",
    content: [
      { name: "Blog", link: "#" },
      { name: "Personal", link: "#" },
      { name: "SetUp", link: "#" },
    ],
  },
];

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <React.StrictMode>
      <HashRouter>
        <IndexBar
          height="6vh"
          themeBut={true}
          title="Angle"
          links={[
            { name: "Features", l: "" },
            { name: "Blog", l: "/blog" },
            { name: "Resources", l: "/login" },
          ]}
        ></IndexBar>
        <Routes>
          <Route path="" element={<LandingLayout></LandingLayout>} />
          <Route path="/login" element={<LoginLayout></LoginLayout>} />
          <Route path="/blog" element={<BlogIndexLayout></BlogIndexLayout>} />
          <Route path="/connect/:providerName/redirect" element={ <LoginRedirect/> } />
          <Route
            path="/card/:id"
            element={
              <Card
                width="80%"
                title="ejemplo"
                picture="https://media.istockphoto.com/id/1175781029/vector/gray-linear-abstract-background-for-your-design-vector.jpg?s=1024x1024&w=is&k=20&c=g2V6sGnFuvo0hT-CDp2UKjIqCw_yEh1ebSc9dhZupsg="
                desc="esta es una prueba"
              />
            }
          />
        </Routes>
      </HashRouter>
      <Footer data={foot}></Footer>
    </React.StrictMode>
  </Provider>
);
