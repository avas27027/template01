import React from "react";
import Accordion from "../Accordion";
import { useAppSelector } from "../../app/hooks";

export default function FAQ(props: {
  faqs: Array<{ title: string; desc: string }>;
  margin?:string;
}) {
  const arr = props.faqs;
  const language = useAppSelector((state) => state.languageSlice.language);
  return (
    <div className="faq" style={{margin:props.margin}}>
      <h1>{language==="ES"? "Preguntas Frecuentes": "FAQ"}</h1>
      <Accordion items={arr} />
    </div>
  );
}
