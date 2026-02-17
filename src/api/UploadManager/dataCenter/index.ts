import http from '@/util/http'
import { DataResVo } from './types'
/**
 * @description 获取总播放量
 */
export function getTotalPlay(uid: number, begin: string, end: string) {
    return http.get<DataResVo>(`/main/dataCenter/total/get/play?uid=${uid}&begin=${begin}&end=${end}`)
};

export function getLike(uid: number, begin: string, end: string) {
    return http.get<DataResVo>(`/main/dataCenter/total/get/like?uid=${uid}&begin=${begin}&end=${end}`)
};