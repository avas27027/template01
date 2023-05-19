import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { CategoryProductsInterfaceF, useCategoryProducts } from '../../queries/CategoryProductsHook'
import DoubleRangeSlider from '../paterns/DoubleRangeSlider'

export default function LeftFilterBar(props: {
    category?: string, subcategory?: string
    checkboxFilters?: Array<{ title: string, boxes: Array<string>, dispach: React.Dispatch<React.SetStateAction<string[]>> }>
}) {
    const category = props.category === undefined ? "" : <Link to={"/products/" + props.category}><p>&emsp;{">" + props.category}</p></Link>
    const subcategory = props.subcategory === undefined ? "" : <Link to={"/products/" + props.category + "/" + props.subcategory}><p>&emsp;{">" + props.subcategory}</p></Link>

    const filtersD = useCategoryProducts()! as Array<CategoryProductsInterfaceF>

    useEffect(() => {
        const subList = filtersD.filter(x => x.name === props.category)[0]
        //console.log(selectedColors)
    }, [props])

    function checkboxClick(l: string[], dispach: React.Dispatch<React.SetStateAction<string[]>>, word: string) {
        if (l.includes(word)) {
            let list = l.filter(x => x != word)
            dispach(list)
        }
        else {
            dispach([...l, word])
        }
    }
    return (
        <div className="leftFilterBar">
            <div className="leftFilterBar-nav">
                <Link to={"/products"}><p>{"Products\t"}</p></Link>{category}{subcategory}
            </div>
            {filtersD.map((x, i) => {
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
                                        onClick={e => checkboxClick(x.boxes, x.dispach, e.currentTarget.value)}
                                    />
                                    <p><label htmlFor={"rcol-" + x.title + i}>{y}</label></p>
                                </div>
                            )}
                        </div>
                    </div>)
            })}
            <div className="leftFilterBar container">
                <h4>Precio</h4>
                <DoubleRangeSlider></DoubleRangeSlider>
            </div>
        </div>
    )
}
