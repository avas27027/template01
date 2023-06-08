import useSWR from "swr";

interface testiInterface {
    attributes: {
        content: string,
        author: {
            data: {
                attributes: {
                    username: string,
                    email: string,
                    profilePhoto: {
                        data: {
                            attributes: {
                                formats: {
                                    thumbnail: {
                                        url: string
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
const url = import.meta.env.VITE_BACKEND_URL
const fetcher = async () => {
    return await fetch(`${url}/api/user-comments?populate[0]=*&populate[1]=author.profilePhoto`)
        .then((res) => {
            if (res.status !== 200) {
                throw new Error(`Couldn't login to Strapi. Status: ${res.status}`);
            }
            return res;
        })
        .then((res) => res.json())
        .then((res) => {
            let x: Array<testiInterface> = res.data;
            const testis = x.map(({ attributes: { content: review }, attributes: { author: { data: { attributes: authoAttri } } } }) => {
                const photo = authoAttri.profilePhoto.data === null ? "" : authoAttri.profilePhoto.data.attributes.formats.thumbnail.url;
                return ({ name: authoAttri.username, social: authoAttri.email, img: photo, review })
            })
            return testis
        })
        .catch((err) => { console.log(err); });
}
export function useTesti() {
    const { data, error, isLoading } = useSWR("current-testis", fetcher)
    if (isLoading) return [{ name: "Loading...", social: "Loading...", img: "", review: "Loading..." }]
    if (error) return [{ name: "Error...", social: "Error...", img: "", review: "Loading..." }]
    return data
}


