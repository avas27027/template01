import { useAppSelector } from "../../app/hooks";

export default function Features(props: {
  data: Array<{ img: string; title: string; link:string; desc: string }>;
  margin?: string;
}) {
  const arr = props.data;
  const language = useAppSelector((state) => state.languageSlice.language);
  return (
    <div className="features" style={{ margin: props.margin }}>
      {arr?.map((f, index) => {
        return (
          <div
            className={index % 2 === 0 ? "feature" : "feature inv"}
            key={"f-" + index}
          >
            <img src={f.img} alt={"img-" + index} />
            <div className="feature-content">
              <h2>{f.title}</h2>
              <h3>{f.desc}</h3>
              <a href={f.link}><button>{language === "ES" ? "Leer más" : "Read More"}</button></a>
            </div>
          </div>
        );
      })}
    </div>
  );
}
