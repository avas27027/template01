import React, { CSSProperties, useEffect, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { setTheme } from "../../app/slices/themeSlice";
import { NavLink } from "react-router-dom";
import FetchStrapi from "../../queries/fetchStrapi/FetchStrapi";

export default function IndexBar(props: {
  height: string;
  themeBut?: boolean;
  title: string;
}) {
  const user = useAppSelector(state => state.userSlice.user)
  const [dropToogle, setDropToogle] = useState(false);
  const theme = useAppSelector((state) => state.themeSlice.theme);
  const dispach = useAppDispatch();
  const data = new FetchStrapi().useIndex


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
          {!data.isLoading && data.data?.map((l, index) => {
            return (
              <NavLink key={"link-" + index} to={l.l}>
                {l.name}
              </NavLink>
            );
          })}
          {user != ""? <NavLink to={"/profile"}>Perfil</NavLink> : <NavLink to={"/login"}>Login</NavLink>}
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
