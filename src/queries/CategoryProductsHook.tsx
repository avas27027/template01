import useSWR from "swr";

interface CategoryProductsInterface {
    attributes: {
        Name: string,
        subcategory_products: {
            data: Array<{
                id: string,
                attributes: {
                    Name: string
                }
            }>
        }
    }
}
export interface CategoryProductsInterfaceF {
    name: string,
    subcategory_list: Array<string>
}
const url = import.meta.env.VITE_BACKEND_URL
const fetcher = async () => {
    return await fetch(`${url}/api/category-products?populate=*`)
        .then((res) => {
            if (res.status !== 200) {
                throw new Error(`Couldn't login to Strapi. Status: ${res.status}`);
            }
            return res;
        })
        .then((res) => res.json())
        .then((res) => {
            let x: Array<CategoryProductsInterface> = res.data;
            const arr = x.map(({ attributes: { Name:name, subcategory_products: { data } } }) => {
                const subcategory_list = data.map(({ attributes: { Name } }) => Name)
                return ({ name, subcategory_list })
            })
            return arr
        })
        .catch((err) => { console.log(err); });
}
export function useCategoryProducts() {
    const { data, error, isLoading } = useSWR("current-categoryProducts", fetcher)
    if (isLoading) return [{ name: "Loading...", subcategory_list: [] }]
    if (error) return [{ name: "Error...", subcategory_list: [] }]
    return data
}