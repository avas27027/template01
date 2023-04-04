import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/sass/styles.scss";
import { Provider } from "react-redux";
import store from "./app/store";
import Footer from "./components/sections/Footer";
import LandingLayout from "./layouts/LandingLayout";
import IndexBar from "./components/sections/IndexBar";

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
      <IndexBar></IndexBar>
      <LandingLayout></LandingLayout>

      <Footer data={foot}></Footer>
    </React.StrictMode>
  </Provider>
);
