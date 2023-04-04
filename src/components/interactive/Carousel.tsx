import React, { CSSProperties, useRef, useState } from "react";
import { AiOutlineRight, AiOutlineLeft } from "react-icons/ai";
export default function Carousel(props: {
  slides: Array<JSX.Element>;
  columns?: number;
  width: string;
}) {
  const slides = props.slides;
  const columns =
    props.columns != undefined && props.columns > 0 ? props.columns : 1;
  const [leftSwitch, setLeftSwitch] = useState(true);
  const [rightSwitch, setRightSwitch] = useState(true);
  const boxRef = useRef<HTMLDivElement>(null);
  const slideRef = useRef<HTMLDivElement>(null);
  const carouselScrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {

    if (e.currentTarget.scrollLeft === 0) setLeftSwitch(false);
    else if (
      e.currentTarget.scrollLeft >=
      e.currentTarget.scrollWidth - e.currentTarget.clientWidth
    )
      setRightSwitch(false);
    else {
      setLeftSwitch(true);
      setRightSwitch(true);
    }
  };
  return (
    <div className="carousel" style={{ width: props.width }}>
      <div
        className="carousel-box"
        style={{ "--cols": columns } as CSSProperties}
        onScroll={(e) => carouselScrollHandler(e)}
        ref={boxRef}
      >
        {slides.map((s, index) => {
          return (
            <div key={"c-" + index} className="carousel-slide" ref={slideRef}>
              {s}
            </div>
          );
        })}
      </div>
      <button
        className="carousel-button left"
        data-active={leftSwitch}
        onClick={() => {
          boxRef.current!.scrollTo({
            top: 0,
            left: boxRef.current!.scrollLeft - slideRef.current!.offsetWidth,
            behavior: "smooth",
          });
        }}
      >
        <AiOutlineLeft />
      </button>
      <button
        className="carousel-button right"
        data-active={rightSwitch}
        onClick={() => {
          boxRef.current!.scrollTo({
            top: 0,
            left: boxRef.current!.scrollLeft + slideRef.current!.offsetWidth,
            behavior: "smooth",
          });
        }}
      >
        <AiOutlineRight />
      </button>
    </div>
  );
}
