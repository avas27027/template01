import useSWR from "swr";
import routes from "./routesStrapi.json"
import {
    headerInterface,
    featuresInterface,
    qaInterface,
    testiInterface,
    footerInterface,
    indexInterface,
    allPublicBlogsInterface,
    urlPublicBlogInterface,
    CategoryProductsInterface,
    FilterBarInterface,
    ColorsInterface,
    SizeInterface
} from "./ModelStrapi"

const fetcher = (url: string) => fetch(url).then((res) => res.json());
const url = import.meta.env.VITE_BACKEND_URL

type obtainedDataType<Type> = {
    data: Type,
    error: any,
    isLoading: boolean
}

const headerFunct = (props: obtainedDataType<headerInterface>) => {
    let res = undefined
    if (!props.isLoading && props.error === undefined) {
        const Title = props.data.data.attributes.Title
        const Desc = props.data.data.attributes.Desc
        const url = props.data.data.attributes.HeaderPicture.data.attributes.formats.small.url
        const link = props.data.data.attributes.link
        res = { Title, Desc, url, link }
    }
    return { data: res, error: props.error, isLoading: props.isLoading }
}
const featuresFunct = (props: obtainedDataType<featuresInterface>) => {
    let res = undefined
    if (!props.isLoading && props.error === undefined) {
        res = props.data.data.attributes.Feature.map(({ Title: title, FeaturePicture, Link: link, Desc: desc }) => {
            const img = FeaturePicture.data.attributes.formats.small.url;
            return { title, img, link, desc }
        })
    }
    return { data: res, error: props.error, isLoading: props.isLoading }
}
const qaFunct = (props: obtainedDataType<qaInterface>) => {
    let res = undefined
    if (!props.isLoading && props.error === undefined) {
        res = props.data.data.attributes.question.map(({ pregunta, respuesta }) => { return { pregunta, respuesta } })
    }
    return { data: res, error: props.error, isLoading: props.isLoading }
}
const testisFunct = (props: obtainedDataType<testiInterface>) => {
    let res = undefined
    if (!props.isLoading && props.error === undefined) {
        res = props.data.data.map(({ attributes: { content }, attributes: { author: { data: { attributes: authoAttri } } } }) => {
            const photo = authoAttri.profilePhoto.data === null ? "" : authoAttri.profilePhoto.data.attributes.formats.thumbnail.url;
            const username = authoAttri.username, email = authoAttri.email
            return { username, email, photo, content }
        })
    }
    return { data: res, error: props.error, isLoading: props.isLoading }
}
const footerFunct = (props: obtainedDataType<footerInterface>) => {
    let res = undefined
    if (!props.isLoading && props.error === undefined) {
        res = props.data.data.attributes.FooterSection.map(({ subtitle: title, link }) => {
            const content = link.map(({ nameLink: name, link }) => ({ name, link }))
            return ({ title, content })
        })
    }
    return { data: res, error: props.error, isLoading: props.isLoading }
}
const indexFunct = (props: obtainedDataType<indexInterface>) => {
    let res = undefined
    if (!props.isLoading && props.error === undefined) {
        res = props.data.data.attributes.section.map(({ name, link }) => {
            const l = link === null ? "/" : link
            return ({ name, l })
        })
    }
    return { data: res, error: props.error, isLoading: props.isLoading }
}
const allPublicBlogFunct = (props: obtainedDataType<allPublicBlogsInterface>) => {
    let res = undefined
    if (!props.isLoading && props.error === undefined) {
        res = props.data.data.map(({ attributes: { title, slug: id, updatedAt: date, blogPicture } }) => {
            const picture = blogPicture.data === null ? "" : blogPicture.data.attributes.formats.thumbnail.url
            return ({ id, title, date, picture })
        })
    }
    return { data: res, error: props.error, isLoading: props.isLoading }
}
const urlPublicBlogFunct = (props: obtainedDataType<urlPublicBlogInterface[]>) => {
    let res = undefined
    if (!props.isLoading && props.error === undefined) {
        const { slug, title, updatedAt, text } = props.data[0]
        const picture = props.data[0].blogPicture === undefined ? "" : props.data[0].blogPicture.formats.small.url;
        res = { slug, title, updatedAt, text, picture }
    }
    return { data: res, error: props.error, isLoading: props.isLoading }
}
const categoryProductFunct = (props: obtainedDataType<CategoryProductsInterface>) => {
    let res = undefined
    if (!props.isLoading && props.error === undefined) {
        res = props.data.data.map(({ attributes: { Name: name, subcategory_products: { data } } }) => {
            const subcategory_list = data.map(({ attributes: { Name } }) => Name)
            return ({ name, subcategory_list })
        })
    }
    return { data: res, error: props.error, isLoading: props.isLoading }
}
const filterBarFunct = (props: obtainedDataType<FilterBarInterface>) => {
    let res = undefined
    if (!props.isLoading && props.error === undefined) {
        res = props.data.data.attributes
    }
    return { data: res, error: props.error, isLoading: props.isLoading }
}
const colorsFunct = (props: obtainedDataType<ColorsInterface>) => {
    let res = undefined
    if (!props.isLoading && props.error === undefined) {
        res = props.data.data.map(({ attributes: { colorName, rgb, uniqueColorName } }) => { return { colorName, rgb, uniqueColorName } })
    }
    return { data: res, error: props.error, isLoading: props.isLoading }
}
const sizeFunct = (props: obtainedDataType<SizeInterface>) => {
    let res = undefined
    if (!props.isLoading && props.error === undefined) {
        res = props.data.data.map(({ attributes: { sizeName, uniqueSizeName } }) => { return { sizeName, uniqueSizeName } })
    }
    return { data: res, error: props.error, isLoading: props.isLoading }
}

export default class FetchStrapi {
    private router = (route: keyof typeof routes, params?: string) => {
        const { data, isLoading, error } = useSWR(`${url}${routes[route]}${params ? params : ""}`, fetcher)
        return { data, isLoading, error }
    }
    public selectRef = () => {
        let color = [] as string[] | undefined, size = [] as string[] | undefined
        if (!this.useSizeRef.isLoading) size = this.useSizeRef.data?.map(({ sizeName }) => { return sizeName })
        if (!this.useColorRef.isLoading) color = this.useColorRef.data?.map(({ colorName }) => { return colorName })
        return { [routes["ref-colors"]]: color, [routes["ref-size"]]: size }
    }
    public useHeader = headerFunct(this.router("header"))
    public useFeatures = featuresFunct(this.router("features"))
    public useQA = qaFunct(this.router("qanda"))
    public useTestis = testisFunct(this.router("testis"))
    public useFooter = footerFunct(this.router("footer"))
    public useIndex = indexFunct(this.router("index"))
    public useAllPublicBlog = allPublicBlogFunct(this.router("allPublicBlog"))
    public useUrlPublicBlog = (url: string) => urlPublicBlogFunct(this.router("urlPublicBlog", `${url}?populate=*`))
    public useCategoryProduct = categoryProductFunct(this.router("categoryProduct"))
    public useFliterBar = filterBarFunct(this.router("filterBar"))
    public useColorRef = colorsFunct(this.router("ref-colors"))
    public useSizeRef = sizeFunct(this.router("ref-size"))
}
