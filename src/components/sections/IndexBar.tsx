import React, { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import {
  useAppDispatch,
  useAppSelector,
  useScrollPosition,
} from "../../app/hooks";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { setTheme } from "../../app/slices/themeSlice";
export default function IndexBar() {
  const scrollPos = useScrollPosition();
  const [dropToogle, setDropToogle] = useState(false);
  const theme = useAppSelector((state) => state.themeSlice.theme);
  const dispach = useAppDispatch();

  return (
    <div
      className={`indexBar ${scrollPos > 10 ? "move" : ""}`}
      data-active={!dropToogle}
    >
      <div className="indexBar-logo">
        <h2>Angles</h2>
      </div>
      <div className="indexBar-content">
        <div className="indexBar-content-link__group" data-active={dropToogle}>
          <a href="#">Features</a>
          <a href="#">Blog</a>
          <a href="#">Resources</a>
          <button
            onClick={() => {
              dispach(setTheme(theme === "light" ? "dark" : "light"));
            }}
          >
            {theme === "light"? <MdDarkMode /> : <MdLightMode />}
          </button>
        </div>
        <button
          className="indexBar-content but"
          onMouseEnter={() => {
            setDropToogle(!dropToogle);
          }}
          onMouseLeave={() => {
            setDropToogle(!dropToogle);
          }}
        >
          <AiOutlineMenu />
        </button>
      </div>
    </div>
  );
}
