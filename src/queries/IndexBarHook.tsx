import useSWR from "swr";

interface indexBarInterface {
    attributes: {
        section: Array<{ name: string, link: string }>
    }
}
const url = import.meta.env.VITE_BACKEND_URL
const fetcher = async () => {
    return await fetch(`${url}/api/index-bar?populate=*`)
        .then((res) => {
            if (res.status !== 200) {
                throw new Error(`Couldn't login to Strapi. Status: ${res.status}`);
            }
            return res;
        })
        .then((res) => res.json())
        .then((res) => {
            let x: indexBarInterface = res.data;
            const arr = x.attributes.section.map(({ name, link }) => {
                const l = link === null ? "/" : link
                return ({ name, l })
            })
            return arr
        })
        .catch((err) => { console.log(err); });
}
export function useIndexBar() {
    const { data, error, isLoading } = useSWR("current-indexBar", fetcher)
    if (isLoading) return [{ name: "Loading...", l: "Loading..." }]
    if (error) return [{ name: "Error...", l: "Error..." }]
    return data
}


