import useSWR from "swr";

interface footerInterface {
  attributes: {
    FooterSection: Array<{
      subtitle: string,
      link: Array<{
        nameLink: string,
        link: string
      }>
    }>
  }
}
const url = import.meta.env.VITE_BACKEND_URL
const fetcher = async () => {
  return await fetch(
    `${url}/api/footer?populate[0]=FooterSection&populate[1]=FooterSection.link`
  )
    .then((res) => {
      if (res.status !== 200) {
        throw new Error(`Couldn't login to Strapi. Status: ${res.status}`);
      }
      return res;
    })
    .then((res) => res.json())
    .then((res) => {
      const q: footerInterface = res.data;
      const arr = q.attributes.FooterSection.map(({ subtitle: title, link }) => {
        const content = link.map(({ nameLink: name, link }) => ({ name, link }))
        return ({ title, content })
      })
      return arr
    })
    .catch((err) => { console.log(err); });
}
export function useFooter() {
  const { data, error, isLoading } = useSWR("current-footer", fetcher)
  if (isLoading) return [{ title: "Loading...", content: [{name: "Loading...", link:""}]}]
  if (error) return [{ title: "Error...", content: [{name: "Error...", link:""}]}]
  return data
}


