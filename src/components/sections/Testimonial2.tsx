import React, { CSSProperties } from "react";

export default function Testimonial2(props: {
  data: Array<{ name: string; social: string; img: string; review: string }>;
  margin?: string;
  height?: string;
}) {
  return (
    <div className="testimonial2" style={{ margin: props.margin }}>
      {props.data.map((r, i) => {
        return (
          <div
            key={"re-" + i}
            className="testi2"
            style={{ "--varHeight": props.height } as CSSProperties}
          >
            <div className="testi2-header">
              <img src={r.img} alt="" />
              <div className="testi2-header-name">
                <h3>{r.name}</h3>
                <p>{r.social}</p>
              </div>
            </div>
            <div className="testi2-content">
              <p>{r.review}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
