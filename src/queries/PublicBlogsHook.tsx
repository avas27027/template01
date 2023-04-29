import useSWR from "swr";

interface publicBlogsInterface {
    attributes: {
        title: string, text: string, slug: string, updatedAt:string,
        blogPicture: {
            data: {
                attributes: {
                    formats: {
                        thumbnail: { url: string }
                    }
                }
            }
        }
    }
}
const url = import.meta.env.VITE_BACKEND_URL
const fetcher = async () => {
    return await fetch(`${url}/api/public-blogs?populate=*`)
        .then((res) => {
            if (res.status !== 200) {
                throw new Error(`Couldn't login to Strapi. Status: ${res.status}`);
            }
            return res;
        })
        .then((res) => res.json())
        .then((res) => {
            const q: Array<publicBlogsInterface> = res.data;
            const arr = q.map(({ attributes:{title,slug:id,updatedAt:date,blogPicture} }) => {
                console.log(blogPicture)
                const picture = blogPicture.data===null?"":blogPicture.data.attributes.formats.thumbnail.url
                return ({ id,title,date, picture })
            })
            return arr
        })
        .catch((err) => { console.log(err); });
}
export function usepublicBlog() {
    const { data, error, isLoading } = useSWR("current-publicBlog", fetcher)
    if (isLoading) return [{id: "Loading...", title: "Loading...", date: "Loading...",picture:""}]
    if (error) return [{ id: "Error...", title: "Error...", date: "Error...",picture:""}]
    return data
}


