import { useCategoryProducts } from "./CategoryProductsHook";
import meilisearchCall from "./MeilisearchCall";
import { useEffect, useState } from "react";

interface productInterface {
    name: string,
    price: number,
    subcategory_product: { Name: string },
    caracteristics: { size: string, color: string }
    productPictures: Array<{
        formats: {
            medium: {
                url: string
            }
        }
    }>
}
export interface productInterfaceF {
    name: string,
    color: string,
    price: number,
    size: string,
    subcategory_product: string,
    productPictures: Array<string>
}
export function useProducts(word: string, filters?: string[][]) {
    const [productRes, setProductRes] = useState<Array<productInterfaceF>>([])
    useEffect(() => {
        meilisearchCall("product", word, { names: ["subcategory_product.Name", "caracteristics.size", "caracteristics.color", "price"], args: filters != undefined ? filters : []}).then((res) => {
            const a: Array<productInterfaceF> = res.hits.map((x) => {
                const data = x as productInterface
                const name = data.name
                const color = data.caracteristics.color
                const price = data.price
                const size = data.caracteristics.size
                const subcategory_product = data.subcategory_product.Name
                const productPictures = data.productPictures != undefined ? data.productPictures.map((x) => x.formats.medium.url) : [""]
                return ({ name, color, price,size, subcategory_product, productPictures })
            })
            setProductRes(a)
        })
    }, [word,filters])
    return productRes;
};