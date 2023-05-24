import MeiliSearch from "meilisearch";

const url = import.meta.env.VITE_MEILISEARCH_URL;
const api = import.meta.env.VITE_MEILISEARCH_API;

const meilisearchCall = async (index: string, search: string, filters?: { names: Array<string>, args: string[][] }) => {
    const client = new MeiliSearch({
        host: url,
        apiKey: api, // Use the public key not the private or master key to search.
    })
    let filterString = [[""]]
    if (filters != undefined) {
        client.index(index).updateSettings({
            filterableAttributes: filters.names
        })
        filterString = filters.args
    }
    console.log(filterString)
    const res = (await client.index(index).search(search, { filter: filterString }))
    console.log(res)
    return res
}

export default meilisearchCall;