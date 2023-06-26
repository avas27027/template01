import React, { CSSProperties } from "react";
import { useAppSelector } from "../../app/hooks";
import { useNavigate } from "react-router-dom";

type Props = {
  data: {
    title: string, desc: string, img: string, link: string
  }
  minHeight?: string,
  margin?: string
}

const Header = (props: Props) => {
  const language = useAppSelector((state) => state.languageSlice.language);
  const navigate = useNavigate()
  return (
    <div className="header" style={props}>
      <h1>{props.data.title}</h1>
      <img src={props.data.img} alt="imgPrinc" />
      <div className="header-description">
        <h3>
          {props.data.desc}
        </h3>
        <a href={props.data.link}><button>{language === "ES" ? "Empecemos" : "Lets start"}</button></a>
      </div>
    </div>
  );
}

export default Header