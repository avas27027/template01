import React from "react";
import DoubleRangeSlider from '../../paterns/DoubleRangeSlider'


export default function FilterDoubleRange(props: {
    setValues(filterName: string, filterType: "checkbox" | "doubleRange" | "subcategories", vals: string[]): void,
    doubleRangeFilters: Array<{ title: string, filterName: string, max: number, min: number, step: number }>
}) {
    const setValues = props.setValues
    return (
        <div className='leftFilterBar-container'>{props.doubleRangeFilters.map((x, index) => {
            return (
                <div key={"drange-" + index} className="leftFilterBar-element">
                    <h4>{x.title}</h4>
                    <DoubleRangeSlider min={x.min} max={x.max} step={x.step}
                        dispach={e => {
                            let f = e.from != x.min ? e.from : "", t = e.to != x.max ? e.to : ""
                            setValues(x.filterName, "doubleRange", [String(f), String(t)])
                        }} />
                </div>
            )
        })}</div>
    )
}