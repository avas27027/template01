import React, { CSSProperties, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { setTheme } from "../../app/slices/themeSlice";
import { Router, NavLink } from "react-router-dom";
import { useIndexBar } from "../../queries/IndexBarHook";

export default function IndexBar(props: {
  height: string;
  themeBut?: boolean;
  title: string;
}) {
  const [dropToogle, setDropToogle] = useState(false);
  const theme = useAppSelector((state) => state.themeSlice.theme);
  const dispach = useAppDispatch();
  const data = useIndexBar()!

  return (
    <div
      className={`indexBar`}
      data-active={!dropToogle}
      style={{ "--w": props.height } as CSSProperties}
    >
      <div className="indexBar-logo">
        <h2>{props.title}</h2>
      </div>
      <div className="indexBar-content">
        <div className="indexBar-content-link__group" data-active={dropToogle}>
          {data.map((l, index) => {
            return (
              <NavLink key={"link-" + index} to={l.l}>
                {l.name}
              </NavLink>
            );
          })}
          <button
            onClick={() => {
              dispach(setTheme(theme === "light" ? "dark" : "light"));
            }}
            style={{ display: props.themeBut ? "flex" : "none" }}
          >
            {theme === "light" ? <MdDarkMode /> : <MdLightMode />}
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
