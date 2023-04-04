import React from "react";
import { useAppSelector } from "../../app/hooks";
export default function Testimonial1(props: {
  data: Array<{ name: string; social: string; img: string; review: string }>;
  margin?: string;
}) {
  const ar = props.data;
  const language = useAppSelector((state) => state.languageSlice.language);
  return (
    <div className="testimonial1" style={{margin:props.margin}}>
      <h1>{language === "EN" ? "Reviews" : "Reseñas"}</h1>
      <div className="testimonial1-group">
        {ar.map((r, i) => {
          return (
            <div key={"re-" + i} className="testi1">
              <p>{"“" + r.review + "”"}</p>
              <div className="testi1-footer">
                <img src={r.img} alt="" />
                <div className="testi1-footer-name">
                  <h3>{r.name}</h3>
                  <p>{r.social}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
