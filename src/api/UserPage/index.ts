import http from "@/util/http";
import { UserStats, VideoQueryVo, VideoVo, PageRes, User, VideoFavoriteVo, Favorite, UserVo } from "../Models";
import { UserStatsQueryVo, UserInfoQueryVo, FavoriteUpdateVo, batchUpdateVo, FollowQueryVo } from './types'

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
 * @description 更新头像
 */
export function updateAvatar(query: UserInfoQueryVo) {
    return http.post('/main/user/updateAvatar', query)
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

/**
 * @description 条件分页获取收藏视频列表
 */
export function getFavorVideoVo(fid: number, cur: number, sort: string) {
    return http.get<PageRes<VideoFavoriteVo>>(`/main/favorite/getVideoFavoritePage?current=${cur}&size=20&sortField=${sort}&fid=${fid}`)
};
/**
 * @description 新增收藏夹
 */
export function addFavorite(query: Favorite) {
    return http.post('/main/favorite/add', query)
};
/**
 * @description 删除&修改收藏夹
 */
export function updateFavor(query: FavoriteUpdateVo) {
    return http.put('/main/favorite/update', query)
};
/**
 * @description 批量移动
 */
export function batchMove(query: batchUpdateVo) {
    return http.put<number>('/main/favorite/update/batchMove', query)
};
/**
 * @description 批量复制
 */
export function batchCopy(query: batchUpdateVo) {
    return http.put<number>('/main/favorite/update/batchCopy', query)
};
/**
 * @description 批量取消收藏
 */
export function batchUnCollect(query: batchUpdateVo) {
    return http.put('/main/favorite/unCollect', query)
};
/**
 * @description 获取关注列表
 */
export function getFollowList(query: FollowQueryVo) {
    return http.get<PageRes<User>>('/main/fans/get/followList', query)
};
/**
 * @description 获取粉丝列表
 */
export function getFansList(query: FollowQueryVo) {
    return http.get<PageRes<User>>('/main/fans/get/fansList', query)
};
/**
 * @description 获取用户信息Vo
 */
export function getUserVo(query: UserInfoQueryVo) {
    return http.get<UserVo>('/main/user/getUserVoByUid', query)
};