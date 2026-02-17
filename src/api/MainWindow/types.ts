
import { Image } from "../Models"

export interface PopularWork {
    cover: string
    title: string
    author?: string
    publishTime?: string
    des?: string
    href:string
}

export interface SlideImage extends Image {
    style?: string
    title: string
    href: string
}

export interface ParRight {
    id: number
    icon: string
    name: string
    link?: string
}