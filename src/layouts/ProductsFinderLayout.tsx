import React, { useState } from 'react'
import { Link, NavLink, useParams } from 'react-router-dom';
import ProductCard from '../components/paterns/ProductCard';
import { CategoryProductsInterfaceF, useCategoryProducts } from '../queries/CategoryProductsHook';

export default function ProductsFinderLayout() {
    const [selectedColors, setSelectedColors] = useState<Array<string>>([])
    const params = useParams()
    const category = params.category === undefined ? "" : <Link to={"/products/" + params.category}><p>&emsp;{">" + params.category}</p></Link>
    const subcategory = params.subcategory === undefined ? "" : <Link to={"/products/" + params.category + "/" + params.subcategory}><p>&emsp;{">" + params.subcategory}</p></Link>
    const data = [
        {
            name: "Vestido DG", price: "39", color: "blanco", link: "/",
            picture: "https://i.pinimg.com/originals/db/fb/f4/dbfbf4f38cb0fd9ffed852a42e683917.jpg"
        },
        {
            name: "Vestido DG", price: "39", color: "blanco", link: "/",
            picture: "https://i.pinimg.com/originals/db/fb/f4/dbfbf4f38cb0fd9ffed852a42e683917.jpg"
        },
        {
            name: "Vestido DG", price: "39", color: "blanco", link: "/",
            picture: "https://i.pinimg.com/originals/db/fb/f4/dbfbf4f38cb0fd9ffed852a42e683917.jpg"
        },
        {
            name: "Vestido DG", price: "39", color: "blanco", link: "/",
            picture: "https://i.pinimg.com/originals/db/fb/f4/dbfbf4f38cb0fd9ffed852a42e683917.jpg"
        }
    ]
    const colors = ["white", "black", "violet", "red", "blue", "brown"]
    const filtersD = useCategoryProducts()! as Array<CategoryProductsInterfaceF>
    return (
        <div className='productFinderLayout'>

            <div className="productFinderLayout leftBar">
                <div className="productFinderLayout leftBar-nav">
                    <Link to={"/products"}><p>{"Products\t"}</p></Link>{category}{subcategory}
                </div>
                {filtersD.map((x, i) => {
                    return (
                        <div className='productFinderLayout leftBar-container' key={"t-" + i}>
                            <NavLink to={"/products/" + x.name}><h4>{x.name}</h4></NavLink>
                            <div className="leftBar-filters categories">
                                {x.subcategory_list.map((y, index) =>
                                    <NavLink key={"l-" + index} to={"/products/" + x.name + "/" + y}>{<p>{y}</p>}</NavLink>)
                                }
                            </div>
                        </div>)
                })}
                <div className="productFinderLayout leftBar-container">
                    <h4>Colores</h4>
                    {selectedColors}
                    <div className='leftBar-filters colors'>
                        {colors.map((x, i) =>
                            <div className='leftBar-filters colors-radio' key={i}
                            onClick={()=>console.log(x)}>
                                
                                <input id={"rcol-" + x} 
                                type='checkbox' name='colors' value={x} key={"rcol-" + i} />
                                <p><label htmlFor={"rcol-" + x}>{x}</label></p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="productFinderLayout-container">
                <div className="productFinderLayout-searchContainer">
                    <input type="text" name='pFinderInput' placeholder='Inicia tu busqueda' />
                    <button>Buscar</button>
                </div>
                <div className="productFinderLayout-productBox">
                    {data.map((b, index) => {
                        return (
                            <ProductCard key={"p-" + index} width='100%' height='100%' data={b} />
                        );
                    })}
                </div>
            </div>
        </div>
    )
}
