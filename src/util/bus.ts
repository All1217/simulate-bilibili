import { defineStore } from 'pinia'
import {TubeMessage} from '@/api/Models'

export const useNotifyStore = defineStore('notify', {
    state: () => ({
        message: null,
    }),
    actions: {
        notifyB(payload: TubeMessage) {
            this.message = payload
        },
        clearMessage() {
            this.message = null
        }
    }
})
