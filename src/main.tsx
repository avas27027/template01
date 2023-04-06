import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/sass/styles.scss";
import { Provider } from "react-redux";
import store from "./app/store";
import Footer from "./components/sections/Footer";
import LandingLayout from "./layouts/LandingLayout";
import IndexBar from "./components/sections/IndexBar";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginLayout from "./layouts/LoginLayout";
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

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingLayout></LandingLayout>,
  },
  {
    path: "/login",
    element: <LoginLayout></LoginLayout>,
  },
]);
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <React.StrictMode>
      <IndexBar
        height="6vh"
        themeBut={true}
        title="Angle"
        links={[
          { name: "Features", l: "#" },
          { name: "Blog", l: "#" },
          { name: "Resources", l: "#" },
        ]}
      ></IndexBar>
      <RouterProvider router={router} />
      <Footer data={foot}></Footer>
    </React.StrictMode>
  </Provider>
);
