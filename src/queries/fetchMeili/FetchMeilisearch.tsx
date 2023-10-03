import meilisearchCall from "./MeilisearchCall";
import { useEffect, useState } from "react";
import indexesMeili from "./indexesMeili.json"

type productInterface = {
    name: string,
    price: number,
    subcategory_product: { Name: string },
    productPictures: Array<{
        formats: {
            thumbnail: {
                url: string
            }
        }
    }>,
    colors_ref: {
        colorName: string,
    }
    size_ref: {
        uniqueSizeName: string,
    }
}
type blogInterface = {
    title: string,
    text: string,
    slug: string,
    updatedAt: string,
    blogPicture: {
        formats: {
            small: {
                url: string
            }
        }
    }
}

const productsFunct = (res: ReturnType<typeof meilisearchCall> | undefined) => {
    const [product, setProduct] = useState<{ name: string, colorName: string, price: number, uniqueSizeName: string, subcatName: string, productPictures: string[] }[]>()
    useEffect(() => {
        if (res != undefined) {
            res.then((res) => {
                let x = res.hits.map((x) => {
                    const { name, price, size_ref: { uniqueSizeName }, colors_ref: { colorName }, subcategory_product: { Name: subcatName } } = x as productInterface
                    const data = x as productInterface
                    const productPictures = data.productPictures != undefined ? data.productPictures.map((x) => x.formats.thumbnail.url) : [""]
                    return ({ name, colorName, price, uniqueSizeName, subcatName, productPictures })
                })
                setProduct(x)
            })
        }
    }, [res])
    return product
}

const publicBlogFunct = (res: ReturnType<typeof meilisearchCall> | undefined) => {
    const [blogs, setBlogs] = useState<{ slug: string, title: string, text: string, updatedAt: string, blogPicture: string }[]>()
    useEffect(() => {
        if (res != undefined) {
            res.then((res) => {
                let x = res.hits.map((x) => {
                    const { slug, title, text, updatedAt } = x as blogInterface
                    const data = x as blogInterface, blogPicture = data.blogPicture.formats.small.url
                    return { slug, title, text, updatedAt, blogPicture }
                })
                setBlogs(x)
            })
        }
    }, [res])
    return blogs


}

export default class FetchMeilisearch {
    private meiliCall = (word: string, route: keyof typeof indexesMeili, filters?: string[][]) => {
        const [response, setResponse] = useState<ReturnType<typeof meilisearchCall>>()
        useEffect(() => {
            let a = meilisearchCall(indexesMeili[route].name, word, { names: indexesMeili[route].filterNames, args: filters != undefined ? filters : [] })
            setResponse(a)
        }, [word, filters])
        return response;
    }
    public useProducts = (word: string, filters?: string[][]) => productsFunct(this.meiliCall(word, "product", filters))
    public usePublicBlogs = (word:string, filters?:string[][]) => publicBlogFunct(this.meiliCall(word,"public-blog",filters))
}