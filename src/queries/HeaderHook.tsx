import useSWR from "swr";

interface featuresInterface {
  attributes: {
    Title: string, link: string, Desc: string,
      HeaderPicture: {
        data: { attributes: { formats: { small: { url: string } } } }
      }
  }
}
const url = import.meta.env.VITE_BACKEND_URL
const fetcher = async () => {
  return await fetch(`${url}/api/header-page?populate=*`)
    .then((res) => {
      if (res.status !== 200) {
        throw new Error(`Couldn't login to Strapi. Status: ${res.status}`);
      }
      return res;
    })
    .then((res) => res.json())
    .then((res) => {
      const q: featuresInterface = res.data;
      const title = q.attributes.Title
      const desc = q.attributes.Desc
      const link = q.attributes.link
      const img = q.attributes.HeaderPicture.data.attributes.formats.small.url
      return ({ title, desc,img, link })
    })
    .catch((err) => { console.log(err); });
}
export function useHeader() {
  const { data, error, isLoading } = useSWR("current-header", fetcher)
  if (isLoading) return { title: "Loading...", desc: "Loading...",img:"", link: "" }
  if (error) return { title: "Error...", desc: "Error...", img:"", link: "" }
  return data
}


