import React, { CSSProperties, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import {
  useAppDispatch,
  useAppSelector,
  useScrollPosition,
} from "../../app/hooks";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { setTheme } from "../../app/slices/themeSlice";
export default function IndexBar(props: {
  height: string;
  themeBut?: boolean;
  title: string;
  links: Array<{ name: string; l: string }>;
}) {
  const [dropToogle, setDropToogle] = useState(false);
  const theme = useAppSelector((state) => state.themeSlice.theme);
  const dispach = useAppDispatch();

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
          {props.links.map((l, index) => {
            return (
              <a key={"link-" + index} href={l.l}>
                {l.name}
              </a>
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
