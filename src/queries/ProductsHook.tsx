import { useCategoryProducts } from "./CategoryProductsHook";
import meilisearchCall from "./MeilisearchCall";
import { useEffect, useState } from "react";

interface productInterface {
    Name: string,
    Color: string,
    Price: number,
    subcategory_product: { Name: string },
    ProductPictures: Array<{
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
    subcategory_product: string,
    productPictures: Array<string>
}
export function useProducts(word: string) {
    const [productRes, setProductRes] = useState<Array<productInterfaceF>>([])

    useEffect(() => {
        meilisearchCall("product", word, { names: ["subcategory_product.Name", "Color", "Price"], args: "" }).then((res) => {
            const a: Array<productInterfaceF> = res.hits.map((x) => {
                const data = x as productInterface
                const name = data.Name
                const color = data.Color
                const price = data.Price
                const subcategory_product = data.subcategory_product.Name
                const productPictures = data.ProductPictures.map((x)=>x.formats.medium.url)
                return ({ name,color,price,subcategory_product, productPictures})
            })
            setProductRes(a)
        })
    }, [word])
    return productRes;
};