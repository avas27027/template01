import React from "react";
import {
  AiOutlineInstagram,
  AiOutlineTwitter,
  AiOutlineCopyright,
} from "react-icons/ai";
import { useAppSelector } from "../../app/hooks";
export default function Footer(props: {
  data: Array<{
    title: string;
    content: Array<{ name: string; link: string }>;
  }>;
}) {
  const language = useAppSelector((state) => state.languageSlice.language);
  return (
    <div className="footer">
      <div className="footer-grid">
        {props.data.map((d, index) => {
          return (
            <div className="footer-grid-col" key={"d-" + index}>
              <b>{d.title}</b>
              {d.content.map((s, index) => {
                return (
                  <a href={s.link} key={"s-" + index}>
                    {s.name}
                  </a>
                );
              })}
            </div>
          );
        })}
      </div>
      <div className="footer-copyright">
        <p>
          <AiOutlineCopyright />
          &nbsp;2023 Angle.SA
        </p>
        <p>
          <a href="#">
            <AiOutlineInstagram />
          </a>{" "}
          &nbsp;&nbsp;{" "}
          <a href="#">
            <AiOutlineTwitter />
          </a>
        </p>
      </div>
    </div>
  );
}
