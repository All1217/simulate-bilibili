import http from '@/util/http'
import { FavoriteQueryVo, PageRes, Favorite, VideoVo } from "./Models"
import {BatchCollectVo} from './Video/index'

/**
 * @description 获取收藏夹列表
 */
export function getFavoriteList(param: FavoriteQueryVo) {
    return http.get<PageRes<Favorite>>('/main/favorite/getFavoriteListPage', param)
}

/**
 * @description 获取收藏夹列表
 */
export function getVideoInfavor(param: number) {
    return http.get<VideoVo[]>(`/main/favorite/getVideoByFavor?fid=${param}`)
}
/**
 * @description 获取视频与收藏夹关联信息
 */
export function getFVByUidAndVid(uid: number, vid: number) {
    return http.get<number[]>(`/main/favorite/getFVByUidAndVid?uid=${uid}&vid=${vid}`);
}
/**
 * @description 收藏操作
 */
export function collect(q: BatchCollectVo) {
    return http.put(`/main/favorite/collect`, q);
}