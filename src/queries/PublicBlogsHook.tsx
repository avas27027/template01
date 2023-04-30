import useSWR from "swr";

interface publicBlogsInterface {
    attributes: {
        title: string, text: string, slug: string, updatedAt: string,
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
interface publicBlogsInterface2 {
    title: string, text: string, slug: string, updatedAt: string,
    blogPicture: {
        formats: {
            medium: { url: string }
        }
    }
}
export interface publicBlogsInterfaceF {
    id: string, title: string, date: string, text: string, picture: string
}
const urlBase = import.meta.env.VITE_BACKEND_URL


const fetcher = (...args: any) => fetch(args)
    .then((res) => res.json())
    .then((res) => {
        const q: Array<publicBlogsInterface> = res.data;
        const arr = q.map(({ attributes: { title, slug: id, updatedAt: date, blogPicture } }) => {
            const picture = blogPicture.data === null ? "" : blogPicture.data.attributes.formats.thumbnail.url
            return ({ id, title, date, picture })
        })
        return arr
    })
    .catch((err) => { console.log(err); });

const fetcher1 = (...args: any) => fetch(args)
    .then((res) => res.json())
    .then((res) => {
        const q: publicBlogsInterface2 = res[0];
        const id = q.slug;
        const title = q.title;
        const date = q.updatedAt;
        const text = q.text;
        const picture = q.blogPicture === null ? "" : q.blogPicture.formats.medium.url;
        console.log(title)
        return ({ id, title, date, text, picture })
    })
    .catch((err) => { console.log(err); });


export function usepublicBlog(url?: string) {
    if (url === undefined) {
        const { data, error, isLoading } = useSWR(`${urlBase}/api/public-blogs?populate=*`, fetcher)
        if (isLoading) return [{ id: "Loading...", title: "Loading...", date: "Loading...", text: "Loading...", picture: "" }]
        if (error) return [{ id: "Error...", title: "Error...", date: "Error...", text: "Error...", picture: "" }]
        return data
    }
    else {
        const { data, error, isLoading } = useSWR(`${urlBase}/api/public-blogs/url/${url}?populate=*`, fetcher1)
        if (isLoading) return [{ id: "Loading...", title: "Loading...", date: "Loading...", text: "Loading...", picture: "" }]
        if (error) return [{ id: "Error...", title: "Error...", date: "Error...", text: "Error...", picture: "" }]
        return data
    }

}


