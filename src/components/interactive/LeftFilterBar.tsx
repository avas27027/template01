import React, { useEffect, useState } from 'react'
import { Link, NavLink, useParams } from 'react-router-dom'
import DoubleRangeSlider from '../paterns/DoubleRangeSlider'

export interface FiltersResponseInterface {
    filterName: string, filterType: "checkbox" | "doubleRange" | "subcategories", vals: string[]
}
export default function LeftFilterBar(props: {
    callback: (response: Array<FiltersResponseInterface>) => any,
    categoriesFilters?: { filterName: string, categories: Array<{ name: string, subcategory_list: Array<string> }> },
    checkboxFilters?: Array<{ title: string, filterName: string, boxes: Array<string> }>,
    doubleRangeFilters?: Array<{ title: string, filterName: string, max: number, min: number, step: number }>
}) {
    const [filtersRes, setFiltersRes] = useState<Array<{ filterName: string, filterType: "checkbox" | "doubleRange" | "subcategories", vals: string[] }>>([])
    useEffect(() => {
        if (props.categoriesFilters != undefined) setFiltersRes([{ filterName: props.categoriesFilters.filterName, filterType: "subcategories", vals: [] }])
    }, [])
    function getValues(title: string) {
        let l = filtersRes.filter((x) => x.filterName === title)[0]?.vals
        return l != undefined ? l : []
    }
    function setValues(filterName: string, filterType: "checkbox" | "doubleRange" | "subcategories", vals: string[]) {
        let valueList = filtersRes.filter(x => x.filterName != filterName)
        setFiltersRes([...valueList, { filterName, filterType, vals }])
        props.callback([...valueList, { filterName, filterType, vals }])

    }

    function checkboxClick(title: string, word: string) {
        let l = getValues(title)
        if (l.includes(word)) {
            let list = l.filter(x => x != word)
            setValues(title, "checkbox", list)
        }
        else {
            setValues(title, "checkbox", [...l, word])
        }
    }

    return (
        <div className="leftFilterBar">

            {props.categoriesFilters?.categories.map((x, i) => {
                return (
                    <div className='leftFilterBar-container' key={"t-" + i}>
                        <NavLink to={"/products/" + x.name}><h3>{x.name}</h3></NavLink>
                        <div className="leftFilterBar-items">
                            {x.subcategory_list.map((y, index) =>
                                <NavLink key={"l-" + index} to={"/products/" + x.name + "/" + y}>
                                    {<p>{y}</p>}
                                </NavLink>)
                            }
                        </div>
                    </div>)
            })}
            {props.checkboxFilters?.map((x, index) => {
                return (
                    <div key={"filter-" + index} className="leftFilterBar-container">
                        <h4>{x.title}</h4>
                        <div className='leftFilterBar-items'>
                            {x.boxes.map((y, i) =>
                                <div className='leftFilterBar-items-box' key={i}>
                                    <input id={"rcol-" + x.title + i}
                                        type='checkbox' name={x.title} value={y} key={"rcol-" + i}
                                        onClick={e => checkboxClick(x.filterName, e.currentTarget.value)}
                                    />
                                    <p><label htmlFor={"rcol-" + x.title + i}>{y}</label></p>
                                </div>
                            )}
                        </div>
                    </div>)
            })}
            {props.doubleRangeFilters?.map((x, index) => {
                return (
                    <div key={"drange-" + index} className="leftFilterBar-container">
                        <h4>{x.title}</h4>
                        <DoubleRangeSlider min={x.min} max={x.max} step={x.step}
                            dispach={e => {
                                let f = e.from != x.min ? e.from : "", t = e.to != x.max ? e.to : ""
                                setValues(x.filterName, "doubleRange", [String(f), String(t)])
                            }} />
                    </div>
                )
            })}
        </div>
    )
}
