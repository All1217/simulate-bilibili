import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
export default pinia

// 全局不动配置项 只做导出不做修改
// * 首页地址（默认）
export const LOGIN_URL = '/main_window'
// * 路由白名单
export const ROUTER_WHITE_LIST: string[] = ['/video', '/searchResult', '/searchResult/all', '/searchResult/user']