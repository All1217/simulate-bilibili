/*
 * @Author: 朽木白
 * @Date: 2023-02-06 11:02:58
 * @LastEditors: 1547702880@@qq.com
 * @LastEditTime: 2023-03-10 15:22:05
 * @Description: 用户store
 */
import { defineStore } from 'pinia'
import type { UserState, User } from '@/api/Models'

export function RESEETSTORE() {
    const userStore = useUserStore()
    userStore.$reset()
    // 清除用户信息缓存
    localStorage.removeItem('main-user')
}

export const useUserStore = defineStore({
    id: 'main-user',
    state: (): UserState => ({
        token: '',
        userInfo: {} as User,
    }),
    actions: {
        // setToken
        setToken(token: string) {
            this.token = token
        },
        // setUserInfo
        setUserInfo(userInfo: User) {
            this.userInfo = userInfo
        },
        async Logout() {
            RESEETSTORE()
        },
    },
    // 设置为true，缓存state
    persist: true,
})