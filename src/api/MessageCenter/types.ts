import { User } from "@/api/Models";
import { Image } from "@/api/Models";
//私信用户
export interface WhisperUser extends User {
    wid: number
    lastWord?: string
    isRead: boolean
}
//消息
export interface Message extends Image {
    id: number
    text?: string
    isImg: boolean
    isMe: boolean
    avatar?: string
    isShowTime?: boolean
    time: string
}
// 系统通知
export interface Notice {
    id: number
    text: string
    sText?: any
    time: string
    title: string
    isHtml: boolean
}