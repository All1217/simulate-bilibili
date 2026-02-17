import http from '@/util/http'
import { PageRes } from '@/api/Models'
import { HistoryQueryVo, HistoryVo } from '@/api/History/types'
/**
 * @description 获取历史记录列表
 */
export function getHistoryList(query: HistoryQueryVo) {
    return http.get<PageRes<HistoryVo>>('/main/history/getHistory/page', query)
};
/**
 * @description 清空历史记录
 */
export function deleteByUid(query: HistoryQueryVo) {
    return http.delete('/main/history/deleteByUid', query)
};
/**
 * @description 删除一条历史记录
 */
export function deleteSingle(query: HistoryQueryVo) {
    return http.delete('/main/history/deleteSingle', query)
};