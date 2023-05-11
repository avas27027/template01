import React, { useRef } from "react";
import { AiOutlinePlus } from "react-icons/ai";

export default function Accordion(props: {
  items: Array<{ title: string; desc: string }>;
  hide?: boolean
}) {
  const arr = props.items;
  const accDesc = useRef<Array<HTMLDivElement>>([]);
  const accHead = useRef<Array<HTMLDivElement>>([]);
  return (
    <div className="accordion-group">
      {arr.map((f, index) => {
        return (
          <div
            className={index === 0 ? "accordion first" : "accordion"}
            key={"f-" + index}
            onClick={(e) => {
              accDesc.current[index].classList.toggle("hide");
              accHead.current[index].classList.toggle("hide");
            }}
          >
            <div
              className="accordion-header hide"
              ref={(el) => (accHead.current[index] = el!)}
            >
              <div className="acc-icon">
                <AiOutlinePlus />
              </div>
              <h3>{f.title}</h3>
            </div>
            <div
              className="accordion-desc hide"
              ref={(el) => (accDesc.current[index] = el!)}
            >
              <p>{f.desc}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
