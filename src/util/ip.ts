import { defineStore } from 'pinia'
import type { IP } from '@/api/Models'

export function CLEARIP() {
    const ipStore = useIPStore()
    ipStore.$reset()
    localStorage.removeItem('ip')
}

export const useIPStore = defineStore({
    id: 'ip',
    state: (): IP => ({
        ip: '',
    }),
    actions: {
        setIP(ip: string) {
            this.ip = ip
        },
        async CLEAR() {
            CLEARIP()
        },
    },
    persist: true,
})