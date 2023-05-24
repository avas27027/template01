import ProductCard from '../components/paterns/ProductCard';
import LeftFilterBar, { FiltersResponseInterface } from '../components/interactive/LeftFilterBar';
import { useEffect, useState } from 'react';
import { CategoryProductsInterfaceF, useCategoryProducts } from '../queries/CategoryProductsHook';
import { Link, useParams } from 'react-router-dom';
import { useProducts } from '../queries/ProductsHook';

export default function ProductsFinderLayout() {
    const params = useParams(), category = params.category, subcategory = params.subcategory
    const categoriesFilters = useCategoryProducts()! as Array<CategoryProductsInterfaceF>
    const [filtersSelected, setFiltersSelected] = useState<Array<FiltersResponseInterface>>([])
    const [searchText, setSearchText] = useState("")
    const [filtersArray, setfiltersArray] = useState<string[][]>([])
    const re = useProducts(searchText, filtersArray)
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
    const sizes = ["XS", "S", "M", "L", "XL"]
    const rangeFilters = [{ title: "Precio", filterName: "price", max: 1000, min: 0, step: 100 }]
    const checkboxFilters = [
        { "title": "Colores", "filterName": "caracteristics.color", "boxes": colors },
        { "title": "Sizes", "filterName": "caracteristics.size", "boxes": sizes }
    ]

    useEffect(() => {
        let formatedFilters = formatFilters(filtersSelected)
        setfiltersArray(formatedFilters)
    }, [filtersSelected, category, subcategory])

    function formatFilters(filters: FiltersResponseInterface[]) {
        let cb = filters.filter((e) => e.filterType === "checkbox")
        let dr = filters.filter((e) => e.filterType === "doubleRange")
        let subCatName = filters.filter((e) => e.filterType === "subcategories")[0]?.filterName
        /**Formating checkbox */
        let cbf = cb.map((e) => {
            return e.vals.map((v) => {
                return e.filterName + " = " + v
            })
        })

        /**Formating doubleRange */
        let drf = [""]
        dr.map((e, index) => {
            e.vals.map((v, i) => {
                if (v != "") {
                    if (i === 0) drf.push(e.filterName + " > " + v)
                    else drf.push(e.filterName + " < " + v)
                }
            })
        })
        drf = drf.filter(e => e != "")

        /**Formating subcategories */
        let sbf = [""]
        if (subCatName != undefined) {
            if (subcategory != undefined) sbf = [subCatName + " = " + subcategory]
            else if (category != undefined) {
                let sb = categoriesFilters.filter(e => e.name === category)[0].subcategory_list
                sb.map((e, i) => {
                    sbf.push(subCatName + " = " + e)
                })
            }
        }
        sbf = sbf.filter(e => e != "")

        /**Combinating all */
        return [...cbf, ...drf, sbf] as string[][]
    }
    return (
        <div className='productFinderLayout'>
            <div className="productFinderLayout-leftBar">
                <div className="productFinderLayout-leftBar-nav">
                    <Link to={"/products"}><p>{"Products"}</p></Link>
                    {category != undefined ? <Link to={"/products/" + category}><p>&emsp;{">"}&emsp;{category}</p></Link> : ""}
                    {subcategory != undefined ? <Link to={"/products/" + category + "/" + subcategory}><p>&emsp;{">"}&emsp;{subcategory}</p></Link> : ""}
                </div>
                <LeftFilterBar callback={e => {
                    setFiltersSelected(e)
                }} categoriesFilters={{ filterName: "subcategory_product.Name", categories: categoriesFilters }}
                    checkboxFilters={checkboxFilters} doubleRangeFilters={rangeFilters}
                ></LeftFilterBar>
            </div>
            <div className="productFinderLayout-container">
                <div className="productFinderLayout-searchContainer">
                    <input type="text" onInput={(e) => setSearchText(e.currentTarget.value)} name='pFinderInput' placeholder='Inicia tu busqueda' />
                </div>
                <div className="productFinderLayout-productBox">
                    {re.map((b, index) => {
                        let x = { name: b.name, price: String(b.price), color: b.color, size: b.size, subcategory: b.subcategory_product, picture: b.productPictures[0], link: "/" }
                        return (
                            <ProductCard key={"p-" + index} width='100%' height='100%' data={x} />
                        );
                    })}
                </div>
            </div>
        </div>
    )
}
