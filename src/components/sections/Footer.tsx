import {
  AiOutlineInstagram,
  AiOutlineTwitter,
  AiOutlineCopyright,
} from "react-icons/ai";
import { useAppSelector } from "../../app/hooks";
import { useFooter } from "../../queries/FooterHook";

export default function Footer() {
  const language = useAppSelector((state) => state.languageSlice.language);
  const data = useFooter()!

  return (
    <div className="footer">
      <div className="footer-grid">
        {data.map((d, index) => {
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
