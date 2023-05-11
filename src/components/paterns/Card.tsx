import React from "react";

export default function Card(props: {
  width: string;
  minHeight?: string;
  title: string;
  picture: string;
  desc: string;
  button?: { butname: string; butlink: string };
}) {
  
  return (
    <div
      className="card"
      style={{
        width: props.width,
        minHeight: props.minHeight === undefined ? "unset" : props.minHeight,
      }}
    >
      <div className="card-header">
        <img src={props.picture} alt="card-picture" />
      </div>
      <div className="card-content">
        <h3>{props.title}</h3>
        <p>{props.desc}</p>
        <button
          style={{ display: props.button === undefined ? "none" : "unset" }}
        >
          {props.button?.butname}
        </button>
      </div>
    </div>
  );
}
