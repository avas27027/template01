import React, { CSSProperties, useEffect, useState } from "react";
import { AiOutlineRight, AiOutlineLeft } from "react-icons/ai";
/** **For a continius movement** *interval = aniVelocity, behavour = linear* */
export default function SlideShow(props: {
  slides: Array<JSX.Element>;
  /** miliseconds */
  aniVelocity: number;
  /** miliseconds */
  interval?: number;
  behavour?: "linear" | "ease";
  width: string;
  height: string;
  mediumMediaHeight?: string;
  smallMediaHeight?: string;
  legend?: boolean;
  buttons?: boolean;
  /** percentage 0-100 */
  spaceB?: number;
}) {
  const slidesArr = props.slides;
  const [curr, setCurr] = useState(0);
  const [last, setLast] = useState(0);
  const [direction, setDirection] = useState("forward");
  const [active, setActive] = useState(true);
  const legend = props.legend === undefined ? true : props.legend;
  const buttons = props.buttons === undefined ? true : props.buttons;
  const spaceB = props.spaceB === undefined ? 0 : props.spaceB;
  useEffect(() => {
    setActive(!active);
    if (curr === slidesArr.length) setCurr(0);
    else if (curr === -1) setCurr(slidesArr.length - 1);
  }, [curr]);
  useEffect(() => {
    if (props.interval != undefined) {
      const intervalo = setInterval(() => {
        setLast(curr);
        setCurr(curr + 1);
        setDirection("forward");
      }, props.interval);
      return () => {
        clearInterval(intervalo);
      };
    }
  });
  const legendHandler = (index: number) => {
    if (index >= curr) {
      setLast(curr);
      setCurr(index);
      setDirection("forward");
    } else {
      setLast(curr);
      setCurr(index);
      setDirection("reverse");
    }
  };
  return (
    <div
      className="slideShow"
      style={
        {
          width: props.width,
          "--normalHeight": props.height,
          "--mediumMediaHeight": props.mediumMediaHeight,
          "--smallMediaHeight": props.smallMediaHeight,
        } as CSSProperties
      }
    >
      <button
        className="left"
        onClick={() => {
          setLast(curr);
          setCurr(curr - 1);
          setDirection("reverse");
        }}
        data-active={buttons}
      >
        <AiOutlineLeft />
      </button>
      <button
        className="right"
        onClick={() => {
          setLast(curr);
          setCurr(curr + 1);
          setDirection("forward");
        }}
        data-active={buttons}
      >
        <AiOutlineRight />
      </button>
      <div
        className={"slideShow-slide " + direction}
        style={
          {
            "--behavour": props.behavour,
            "--v": props.aniVelocity + "ms",
            "--spaceB": spaceB + "%",
          } as CSSProperties
        }
        data-active={active}
      >
        {slidesArr[active ? curr : last]}
      </div>
      <div
        className={"slideShow-slide " + direction}
        style={
          {
            "--behavour": props.behavour,
            "--v": props.aniVelocity + "ms",
            "--spaceB": spaceB + "%",
          } as CSSProperties
        }
        data-active={!active}
      >
        {slidesArr[!active ? curr : last]}
      </div>
      <div
        className="slideShow-legend"
        style={{ "--slides": slidesArr.length } as CSSProperties}
        data-active={legend}
      >
        {slidesArr.map((a, index) => {
          return (
            <span
              key={"s-" + index}
              data-active={index === curr ? true : false}
              onClick={() => legendHandler(index)}
            ></span>
          );
        })}
      </div>
    </div>
  );
}
