import ProductCard from '../components/paterns/ProductCard';
import LeftFilterBar, { FiltersResponseInterface } from '../components/interactive/LeftFilterBar/LeftFilterBar';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import FetchStrapi from '../queries/fetchStrapi/FetchStrapi';
import FetchMeilisearch from '../queries/fetchMeili/FetchMeilisearch';

export default function ProductsFinderLayout() {
    const params = useParams(), category = params.category, subcategory = params.subcategory
    const strapiFetch = new FetchStrapi(), categoriesFilters = strapiFetch.useCategoryProduct, filterAttributes = strapiFetch.useFliterBar
    
    const [filtersSelected, setFiltersSelected] = useState<Array<any>>([])
    const [searchText, setSearchText] = useState(""), [filtersArray, setfiltersArray] = useState<string[][]>([])
    
    const meiliFetch = new FetchMeilisearch().useProducts(searchText,filtersArray)

    const rangeFilters = () => {
        if (filterAttributes.data === undefined) return undefined
        let { title, filterName } = filterAttributes.data!.doubleRange
        let max = Number(filterAttributes.data!.doubleRange.max)
        let min = Number(filterAttributes.data!.doubleRange.min)
        let step = Number(filterAttributes.data!.doubleRange.step)
        return [{ title, filterName, max, min, step }]
    }
    const checkboxFilters = () => {
        let fetch = strapiFetch.selectRef()
        if (filterAttributes.data === undefined) return undefined
        return filterAttributes.data.checkbox.map(({ title, filterName, api }) => {
            let boxes = fetch[api] != undefined ? fetch[api]! : [""]
            return { title, filterName, boxes }
        })
    }

    useEffect(() => {
        let formatedFilters = formatFilters(filtersSelected)
        if (!categoriesFilters.isLoading) setfiltersArray(formatedFilters)
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
                let sb = categoriesFilters.data!.filter(e => e.name === category)[0].subcategory_list
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
                <nav className="productFinderLayout-leftBar-nav">
                    <Link to={"/products"}><p>{"Products"}</p></Link>
                    {category != undefined ? <Link to={"/products/" + category}><p>&emsp;{">"}&emsp;{category}</p></Link> : ""}
                    {subcategory != undefined ? <Link to={"/products/" + category + "/" + subcategory}><p>&emsp;{">"}&emsp;{subcategory}</p></Link> : ""}
                </nav>
                {<LeftFilterBar callback={e => { setFiltersSelected(e) }}
                    categoriesFilters={{ filterName: "subcategory_product.Name", categories: categoriesFilters.data! }}
                    checkboxFilters={checkboxFilters()} doubleRangeFilters={rangeFilters()}
                ></LeftFilterBar>}
            </div>
            <div className="productFinderLayout-container">
                <div className="productFinderLayout-searchContainer">
                    <input type="text" onInput={(e) => setSearchText(e.currentTarget.value)} name='pFinderInput' placeholder='Inicia tu busqueda' />
                </div>
                <div className="productFinderLayout-productBox">
                    {meiliFetch?.map((b, index) => {
                        let x = { name: b.name, price: String(b.price), color: b.colorName, size: b.uniqueSizeName, subcategory: b.subcatName, picture: b.productPictures[0], link: "/" }
                        return (
                            <ProductCard key={"p-" + index} width='100%' height='100%' data={x} />
                        );
                    })}
                </div>
            </div>
        </div>
    )
}
