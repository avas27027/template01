import React from "react";
import { useAppSelector } from "../../app/hooks";

export default function Header(props: { minHeight?: string; margin?: string }) {
  const language = useAppSelector((state) => state.languageSlice.language);
  return (
    <div className="header" style={props}>
      <h1>Landing Page</h1>
      <img src="/low-poly-grid-haikei.svg" alt="imgPrinc" />
      <div className="header-description">
        <h3>
          Go from design to site with Framer, the web builder for creative pros.
        </h3>
        <button>{language === "ES" ? "Empecemos" : "Lets start"}</button>
      </div>
    </div>
  );
}
