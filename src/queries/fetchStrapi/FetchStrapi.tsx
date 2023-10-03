import useSWR, {KeyedMutator} from "swr";
import useSWRMutation, { SWRMutationConfiguration } from "swr/mutation";
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
    SizeInterface,
    loginRegisterInterface,
    meInterface,
    uploadFileInterface
} from "./ModelStrapi"
import { useEffect, useState } from "react";

const mutateFetcher = async (params: any, { arg }: { arg?: any }) => {
    const [url, jwt, methodHTML, contentType] = params
    let auth = {}, contType = {}, methodObj = {}
    if (jwt != undefined) auth = { "Authorization": `Bearer ${jwt}` }
    if (contentType != undefined) contType = { "Content-Type": contentType }
    if (methodHTML != undefined) methodObj = { method: methodHTML }
    return await fetch(url, { ...methodObj, headers: { ...auth, ...contType }, body: arg }).then(res => res.json())
}
const fetcher = async (params: any) => {
    const [url, jwt] = params
    let auth = {}
    if (jwt != undefined) auth = { headers: { "Authorization": `Bearer ${jwt}`, } }
    return await fetch(url, auth).then((res) => res.json())
}

const url = import.meta.env.VITE_BACKEND_URL

type obtainedDataType<Type> = {
    data: Type,
    error: any,
    isLoading: boolean,
    mutate: KeyedMutator<any>
}
type mutateDataType<Type> = {
    data: Type,
    error: any,
    mutateTrigger: (args: any) => void,
    isMutating: boolean,
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

const emailRegisterFunct = (props: mutateDataType<loginRegisterInterface>) => {
    const trigger = (args: { username: string, email: string, password: string }) => props.mutateTrigger(JSON.stringify(args))
    let res = undefined
    if (!props.isMutating && props.error === undefined && props.data != undefined) {
        const { jwt, user: { id, email, username } } = props.data
        res = { jwt, id, email, username }
    }
    return { trigger, data: res, isLoading: props.isMutating, error: props.error }
}
const emailLoginFunct = (props: mutateDataType<loginRegisterInterface>) => {
    const trigger = (args: { identifier: string, password: string }) => props.mutateTrigger(JSON.stringify(args))
    let res = undefined
    if (!props.isMutating && props.error === undefined && props.data != undefined) {
        const { jwt, user: { id, email, username } } = props.data
        res = { jwt, id, email, username }
    }
    return { trigger, data: res, isLoading: props.isMutating, error: props.error }
}
const meFunct = (props: obtainedDataType<meInterface>) => {
    let res = undefined
    if (!props.isLoading && props.error === undefined) {
        const url = props.data.profilePhoto != null ? props.data.profilePhoto.formats.small.url : ""
        res = { id: props.data.id, email: props.data.email, username: props.data.username, url: url }
    }
    return { data: res, error: props.error, isLoading: props.isLoading, mutate:props.mutate }
}

const uploadFileFunct = (props: mutateDataType<uploadFileInterface[]>) => {
    const trigger = (args: { data: HTMLFormElement }) => props.mutateTrigger(new FormData(args.data))
    let res = undefined
    if (!props.isMutating && props.error === undefined && props.data != undefined) {
        const {id, formats:{large, medium, small, thumbnail}} = props.data[0]
        res = { id: props.data[0].id, large:large?.url, medium:medium?.url, small: small?.url, thumbnail:thumbnail?.url }
    }
    return { trigger, data: res, isLoading: props.isMutating, error: props.error }
}
const uploadUserFunct = (props: mutateDataType<{ id: string }>) => {
    const trigger = (args: { username?: string, email?: string, profilePhoto?: string }) => props.mutateTrigger(JSON.stringify(args))
    let res = undefined
    if (!props.isMutating && props.error === undefined && props.data != undefined) {
        res = { id: props.data.id }
    }
    return { trigger, data: res, isLoading: props.isMutating, error: props.error }
}

export default class FetchStrapi {
    private mutateRouter = (args: {
        route: keyof typeof routes,
        params?: string,
        jwt?: string,
        methodHTML?: "POST" | "PUT",
        contentType?: "application/json" | "multipart/form-data"
    }) => {
        const { route, params, jwt, methodHTML, contentType } = args
        const [data, setData] = useState<any>()
        const [error, setError] = useState<any>()
        const { trigger, isMutating } = useSWRMutation([`${url}${routes[route]}${params ? params : ""}`, jwt, methodHTML, contentType], mutateFetcher)
        const mutateTrigger = (args: any) => {
            setData(undefined)
            setError(undefined)
            trigger(args).then(n => {
                if (n.error != undefined) setError(n.error.message)
                else setData(n)
            })
        }
        return { data, error, mutateTrigger, isMutating }
    }
    private router = (args: { route: keyof typeof routes, params?: string, jwt?: string }) => {
        const { route, params, jwt } = args
        const { data, isLoading, error, mutate } = useSWR([`${url}${routes[route]}${params ? params : ""}`, jwt], fetcher)
        return { data, isLoading, error, mutate }
    }

    public selectRef = () => {
        let color = [] as string[] | undefined, size = [] as string[] | undefined
        if (!this.useSizeRef.isLoading) size = this.useSizeRef.data?.map(({ sizeName }) => { return sizeName })
        if (!this.useColorRef.isLoading) color = this.useColorRef.data?.map(({ colorName }) => { return colorName })
        return { [routes["ref-colors"]]: color, [routes["ref-size"]]: size }
    }
    public useHeader = headerFunct(this.router({ route: "header" }))
    public useFeatures = featuresFunct(this.router({ route: "features" }))
    public useQA = qaFunct(this.router({ route: "qanda" }))
    public useTestis = testisFunct(this.router({ route: "testis" }))
    public useFooter = footerFunct(this.router({ route: "footer" }))
    public useIndex = indexFunct(this.router({ route: "index" }))
    public useAllPublicBlog = allPublicBlogFunct(this.router({ route: "allPublicBlog" }))
    public useUrlPublicBlog = (url: string) => urlPublicBlogFunct(this.router({ route: "urlPublicBlog", params: `${url}?populate=*` }))
    public useCategoryProduct = categoryProductFunct(this.router({ route: "categoryProduct" }))
    public useFliterBar = filterBarFunct(this.router({ route: "filterBar" }))
    public useColorRef = colorsFunct(this.router({ route: "ref-colors" }))
    public useSizeRef = sizeFunct(this.router({ route: "ref-size" }))
    public registerEmail = emailRegisterFunct(this.mutateRouter({ route: "emailRegister", methodHTML: "POST", contentType: "application/json" }))
    public loginEmail = emailLoginFunct(this.mutateRouter({ route: "emailLogin", methodHTML: "POST", contentType: "application/json" }))
    public authMe = (jwt: string) => meFunct(this.router({ route: "me", jwt: jwt }))
    public uploadFile = (jwt: string) => uploadFileFunct(this.mutateRouter({ route: "uploadFile", jwt: jwt, methodHTML: "POST" }))
    public uploadUser = (jwt: string, id: string) => uploadUserFunct(this.mutateRouter({ route: "uploadUser", params: id, jwt: jwt, methodHTML: "PUT", contentType: "application/json" }))


}
