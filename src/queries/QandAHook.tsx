import useSWR from "swr";

interface qaInterface {
  attributes: {
    question: Array<{ pregunta: string, respuesta: string }>
  }
}
const url = import.meta.env.VITE_BACKEND_URL
const fetcher = async () => {
  return await fetch(`${url}/api/q-and-a-page?populate=*`)
    .then((res) => {
      if (res.status !== 200) {
        throw new Error(`Couldn't login to Strapi. Status: ${res.status}`);
      }
      return res;
    })
    .then((res) => res.json())
    .then((res) => {
      const q: qaInterface = res.data;
      const arr = q.attributes.question.map(({ pregunta: title, respuesta: desc }) => ({ title, desc }))
      return arr
    })
    .catch((err) => { console.log(err); });
}
export function useQandA() {
  const { data, error, isLoading } = useSWR("current-QandA", fetcher)
  if (isLoading) return [{ title: "Loading...", desc: "Loading..." }]
  if (error) return [{ title: "Loading...", desc: "Loading..." }]
  return data
}


