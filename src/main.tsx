import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/sass/styles.scss";
import { Provider } from "react-redux";
import store from "./app/store";
import Footer from "./components/sections/Footer";
import LandingLayout from "./layouts/LandingLayout";
import IndexBar from "./components/sections/IndexBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginLayout from "./layouts/LoginLayout";
import Card from "./components/paterns/Card";
import BlogIndexLayout from "./layouts/BlogIndexLayout";
import LoginRedirect from "./components/LoginRedirect";

const url = import.meta.env.VITE_PROD_BASE
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
      <BrowserRouter>
        <IndexBar
          height="6vh"
          themeBut={true}
          title="Angle"
          links={[
            { name: "Features", l: url },
            { name: "Blog", l: url+"/blog" },
            { name: "Resources", l: url+"/login" },
          ]}
        ></IndexBar>
        <Routes>
          <Route path={url+"/"} element={<LandingLayout></LandingLayout>} />
          <Route path={url+"/login"} element={<LoginLayout></LoginLayout>} />
          <Route path={url+"/blog"} element={<BlogIndexLayout></BlogIndexLayout>} />
          <Route path={url+"/connect/:providerName/redirect"} element={ <LoginRedirect/> } />
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
      </BrowserRouter>
      <Footer data={foot}></Footer>
    </React.StrictMode>
  </Provider>
);
