import React, { Component, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import FilterCheckbox from './FilterCheckbox'
import FilterDoubleRange from './FilterDoubleRange'


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
    const getValues = (title: string) => {
        let l = filtersRes.filter((x) => x.filterName === title)[0]?.vals
        return l != undefined ? l : []
    }
    const setValues = (filterName: string, filterType: "checkbox" | "doubleRange" | "subcategories", vals: string[]) => {
        let valueList = filtersRes.filter(x => x.filterName != filterName)
        setFiltersRes([...valueList, { filterName, filterType, vals }])
        props.callback([...valueList, { filterName, filterType, vals }])
    }

    return (
        <div className="leftFilterBar">
            {props.categoriesFilters?.categories && props.categoriesFilters!.categories.map((x, i) => {
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
            {props.checkboxFilters && <FilterCheckbox checkboxFilters={props.checkboxFilters!} getValues={getValues} setValues={setValues} />}
            {props.doubleRangeFilters && <FilterDoubleRange doubleRangeFilters={props.doubleRangeFilters!} setValues={setValues} />}
        </div>
    )
}
