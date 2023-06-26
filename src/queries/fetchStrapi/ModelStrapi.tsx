type indexInterface = {
    data: {
        attributes: {
            section: Array<{ name: string, link: string }>
        }
    }
}
type headerInterface = {
    data: {
        attributes: {
            Title: string, link: string, Desc: string,
            HeaderPicture: {
                data: { attributes: { formats: { small: { url: string } } } }
            }
        }
    }
}
type featuresInterface = {
    data: {
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
}
type qaInterface = {
    data: {
        attributes: {
            question: Array<{ pregunta: string, respuesta: string }>
        }
    }
}
type testiInterface = {
    data: Array<{
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
    }>
}
type footerInterface = {
    data: {
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
}
type allPublicBlogsInterface = {
    data: {
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
    }[]
}
type urlPublicBlogInterface = {
    title: string, text: string, slug: string, updatedAt: string,
    blogPicture: {
        formats: {
            small: { url: string }
        }
    }
}
type CategoryProductsInterface = {
    data: Array<{
        attributes: {
            Name: string,
            subcategory_products: {
                data: Array<{
                    id: string,
                    attributes: {
                        Name: string
                    }
                }>
            }
        }
    }>
}
type FilterBarInterface = {
    data: {
        attributes: {
            subcategoryFilterName: string
            doubleRange: {
                title: string, filterName: string, min: string, max: string, step: string
            }
            checkbox: Array<{ title: string, filterName: string, api: string }>

        }
    }
}
type ColorsInterface = {
    data: Array<{ attributes: { colorName: string, uniqueColorName: string, rgb: string } }>
}
type SizeInterface = {
    data: Array<{ attributes: { sizeName: string, uniqueSizeName: string } }>
}