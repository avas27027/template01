import useSWR from "swr";

interface featuresInterface {
    attributes: {
      Feature: Array<{
        Title: string, Link: string, Desc: string,
        FeaturePicture: {
          data: {
            attributes: {
              formats: {
                small: { url: string }
              }
            }
          }
        }
      }>
    }
  }
const url = import.meta.env.VITE_BACKEND_URL
const fetcher = async () => {
    return await fetch(`${url}/api/features-page?populate=Feature.FeaturePicture`)
    .then((res) => {
      if (res.status !== 200) {
        throw new Error(`Couldn't login to Strapi. Status: ${res.status}`);
      }
      return res;
    })
    .then((res) => res.json())
    .then((res) => {
      const q: featuresInterface = res.data;
      const arr = q.attributes.Feature.map(({ Title: title, FeaturePicture, Link:link, Desc: desc }) => {
        const img = FeaturePicture.data.attributes.formats.small.url;
        return ({ title, img, link, desc })
      })
      return arr
    })
    .catch((err) => { console.log(err); });
}
export function useFeatures() {
    const { data, error, isLoading } = useSWR("current-features", fetcher)
    if (isLoading) return [{ title: "Loading...", desc: "Loading...",link:"", img: ""}]
    if (error) return [{ title: "Error...", desc: "Error...",link:"", img: ""}]
    return data
}


