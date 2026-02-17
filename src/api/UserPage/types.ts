
import { UserStats, User, Query } from "../Models"

export const defaultUser: User = {
    uid: 0,
    username: "",
    nickname: "string",
    avatar: "https://morton321.oss-cn-hangzhou.aliyuncs.com/%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE%202025-02-11%20232613.png",
    gender: 2,
    description: "",
    coin: 0,
    status: 0,
    role: 0,
    createDate: new Date(),
    deleteDate: new Date()
}

//个人主页导航栏a标签
export interface UserNav {
    id: number
    icon: string
    tag: string
    href: string
}
//视频排序规则
export interface Regular {
    id: number
    tag: string
    column: string
}
//视频
export interface Video {
    id: number
    imgSrc: string
    href: string
    title: string
    publishTime: string
    count: string
    length: string
    author?: string
}
// 视频视图排序规则
export enum VideoArrangeRegular {
    BIG_ICON = 1,
    LIST = 2
}
//分区
export interface Partition {
    id: number
    name: string
    count: number
    href: string
}
//合集
export interface Series {
    id: number
    imgSrc: string
    href: string
    title: string
    publishTime: string
    count: number
}
//是否显示合集详情
export enum DisplaySeriesDetail {
    SHOW = 1,
    HIDDEN = 2
}
//分区tag
export interface PartitionTag {
    id: number
    name: string
    count: number
    href?: string
    icon?: string
}
//粉丝/关注页当前状态
export enum CurState {
    FOLLOW = 1,
    FANS = 2,
    ALL_FOLLOW = 3
}

export interface Unread {
    uid: number
    reply: number
    at: number
    love: number
    system: number
    whisper: number
    dynamic: number
}

export const defaultUserStats: UserStats = {
    uid: 0,
    fansCount: 0,
    followCount: 0,
    likeCount: 0,
    playCount: 0,
    videoCount: 0,
    collectionCount: 0,
    collectCount: 0,
    birthDate: new Date(),
    school: "",
    notice: ""
}
export interface UserStatsQueryVo {
    uid?: number
    notice?: string
}
export interface UserInfoQueryVo {
    uid?: number
    description?: string
    avatar?: string
    birthDate?: string
    nickname?: string
    gender?: number
    school?: string
}
export interface FavoriteUpdateVo {
    fid: number
    uid?: number
    visible?: number
    cover?: string
    title?: string
    description?: string
    count?: number
    isDelete?: number
}
export interface batchUpdateVo {
    vids: number[]
    preFid: number
    newFid: number
}
export interface FollowQueryVo extends Query {
    followerId: number
    followeeId: number
    sortField: string
}