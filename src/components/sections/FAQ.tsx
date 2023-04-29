import React, { useEffect, useState } from "react";
import Accordion from "../Accordion";
import { useAppSelector } from "../../app/hooks";

export default function FAQ(props: {
  data: Array<{ title: string, desc: string }>
  margin?: string;
}) {
  const language = useAppSelector((state) => state.languageSlice.language);

  return (
    <div className="faq" style={{ margin: props.margin }}>
      <h1>{language === "ES" ? "Preguntas Frecuentes" : "FAQ"}</h1>
      <Accordion items={props.data} />
    </div>
  );
}
