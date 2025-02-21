import http from '@/util/http'
import { Query, PageRes, UserVideo, Danmu, VideoVo, VideoQueryVo } from '../Models'
import { Interaction } from '../enums'

export interface VideoTag {
    id: number
    href: string
    name: string
}
export enum CommentFilter {
    UP_TO_DATE = 1,
    HOTTEST = 2
}
export interface Comment {
    id: number
    vid: number
    uid: number
    rootId: number//根评论ID
    parentId: number//被回复的评论ID
    toUserId: number//被回复的用户ID
    content: string
    love: number
    bad: number
    createTime: string
    isTop: number
    isDeleted: number
}
export interface CommentQuery extends Query {
    id?: number
    sortField?: string
    vid: number
    uid?: number
    rootId?: number
    toUserId?: number
    parentId?: number
}

export interface CommentVo extends Comment {
    nickname: string
    avatar: string
    replyCount: number
}
export interface UserVideoQuery {
    id?: number
    uid: number
    vid: number
    actionType?: Interaction
    actionTime?: string
}
export interface RecoQueryVo {
    uid: number
    count: number
}
export const defaultVideoVo: VideoVo = {
    uid: 0,
    nickname: "string",
    title: "string",
    duration: 1456,
    coverUrl: "",
    uploadDate: "5-21",
    vid: 0,
    play: 0,
    danmu: 0,
    good: 0,
    coin: 0,
    collect: 0,
}
/**
 * @description 获取根评论
 */
export function getRootComments(query: CommentQuery) {
    return http.get<PageRes<CommentVo>>('/main/comment/pageCommentVo', query)
};
/**
 * @description 获取回复
 */
export function getReply(query: CommentQuery) {
    return http.get<PageRes<CommentVo>>('/main/comment/pageReply', query)
};
/**
 * @description 新增评论
 */
export function insertComment(e: Comment) {
    return http.post('/main/comment/insert', e)
};
/**
 * @description 逻辑删除评论
 */
export function logicDelete(e: CommentQuery) {
    return http.put('/main/comment/logicDelete', e)
};
/**
 * @description 获取交互数据
 */
export function getInterAction(query: UserVideoQuery) {
    return http.get<UserVideo>('/main/video/getInterActionStats', query)
};
/**
 * @description 交互（播放除外）
 */
export function interactWithoutPlay(query: UserVideoQuery) {
    return http.post('/main/video/interact', query)
};
/**
 * @description 增加播放
 */
export function addPlay(query: UserVideoQuery) {
    return http.post('/main/video/public/interact', query)
};
/**
 * @description 获取弹幕列表
 * @param vid
 */
export function getDanmuList(vid: number | string) {
    return http.get<Danmu[]>(
        `/main/danmu/public/getDanmuList?vid=${vid}`,
    )
}
/**
 * @description 发送弹幕
 */
export function postDanmu(query: Danmu) {
    return http.post('/main/danmu/post', query)
}
/**
 * @description 获取默认推荐列表
 * @param vid
 */
export function getDefaultVideoList(query: VideoQueryVo) {
    return http.get<PageRes<VideoVo>>('/main/video/home/pageVideo', query)
}
/**
 * @description 获取推荐列表
 * @param vid
 */
export function getRecVideoList(query: RecoQueryVo) {
    return http.get<VideoVo[]>('/main/video/getRealTimeRecommend', query)
}