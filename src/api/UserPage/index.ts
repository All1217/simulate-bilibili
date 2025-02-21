import http from "@/util/http";
import { UserStats, VideoQueryVo, VideoVo, PageRes, User } from "../Models";
import { UserStatsQueryVo, UserInfoQueryVo } from './types'

/**
 * @description 获取用户信息
 */
export function getUserInfoByUid(query: UserStatsQueryVo) {
    return http.get<User>('/main/user/getById', query)
};
/**
 * @description 获取用户额外信息
 */
export function getUserStatsByUid(query: UserStatsQueryVo) {
    return http.get<UserStats>('/main/user/getUserStatsByUid', query)
};
/**
 * @description 获取该用户视频
 */
export function getVideoListOfUser(query: VideoQueryVo) {
    return http.get<PageRes<VideoVo>>('/main/video/pageVideo', query)
};
/**
 * @description 更新公告
 */
export function updateNotice(query: UserStatsQueryVo) {
    return http.post('/main/user/updateNotice', query)
};
/**
 * @description 更新个性签名
 */
export function updateDescription(query: UserInfoQueryVo) {
    return http.post('/main/user/updateDescription', query)
};
/**
 * @description 更新综合信息
 */
export function updateMulti(query: UserInfoQueryVo) {
    return http.get('/main/user/updateMultiStats', query)
};
/**
 * @description 更新用户信息
 */
export function updateUserInfo(query: UserInfoQueryVo) {
    return http.post('/main/user/updateUserInfo', query)
};