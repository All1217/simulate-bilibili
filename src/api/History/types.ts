import { BrowseHistory, Query } from "../Models"

export interface HistoryVo extends BrowseHistory {
    authorUid: number
    nickname: string
    title: string
    videoDuration: number
    coverUrl: string
}

export interface HistoryQueryVo extends Query {
    uid: number
    keyword?: string
    startDuration?: number
    endDuration?: number
    startTime?: string
    endTime?: string
    vids?: number[]
}