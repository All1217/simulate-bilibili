<script lang="ts" setup>
import { watch } from 'vue'
import { useNotifyStore } from '@/util/bus'
import http from '@/util/http'
// import { PageRes } from '@/api/Models'

const notifyStore = useNotifyStore()
watch(
    () => notifyStore.message,
    (newVal, oldVal) => {
        if (newVal) {
            switch (newVal.type) {
                case 'post':
                    post(newVal);
                    break;
                default:
                    console.warn('未知事件类型:', newVal.type);
            }
            notifyStore.clearMessage()
        }
    }
)

async function post(param: any) {
    await http.post(param.url, param.data)
};
</script>