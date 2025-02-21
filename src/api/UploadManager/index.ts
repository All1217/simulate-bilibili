import { Video } from "../Models";
export enum Status {
    WAIT = 1,
    REJECT = 2,
    SUCCESS = 3
}
export enum Visible {
    SHOW = 1,
    HIDDEN = 2,
}
export interface Articles extends Video {
    aid: number
    status: Status
    visible: Visible
}
export interface TopNavItem {
    id: number
    tagName: string
    href: string
}
export interface CellItem {
    tagName: string

    variation: number
    variationStr: string

    value: number
    valueStr: string

    isIncrease: boolean
    icon: string
}