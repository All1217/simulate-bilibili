<template>
    <div class="bh-head">
        <div :class="cur_bh == '视频' ? 'activated-bh' : 'unActivated-bh'" @click="cur_bh = '视频'">视频</div>
        <div :class="cur_bh == '直播' ? 'activated-bh' : 'unActivated-bh'" @click="cur_bh = '直播'">直播</div>
        <div :class="cur_bh == '专栏' ? 'activated-bh' : 'unActivated-bh'" @click="cur_bh = '专栏'">专栏</div>
    </div>
    <div class="bh-list">
        <!-- 视频、直播 -->
        <div class="bh-list-item" v-show="cur_bh == '视频' || cur_bh == '直播'" v-for="item in bh_list[cur_bh]"
            @click="openVideoPage(`/video/${item.vid}`)">
            <div class="img">
                <img :src="item.coverUrl" alt="">
                <span class="tag time-tag" v-show="cur_bh === '视频'">
                    {{ formatTimeGap(item.duration) + '/' + formatTimeGap(item.videoDuration) }}
                </span>
                <span class="tag isLiving" v-show="cur_bh === '直播' && item.is_living">直播中</span>
                <span class="tag unLiving" v-show="cur_bh === '直播' && !item.is_living">未开播</span>
            </div>
            <div class="des">
                <div class="title">{{ item.title }}</div>
                <div class="time">
                    <i class="iconfont icon-lishijilu"></i>
                    &nbsp;<span>{{ item.viewTime }}</span>
                </div>
                <div class="name">
                    <i class="iconfont icon-UPzhu"></i>
                    &nbsp;<span>{{ item.nickname }}</span>
                </div>
            </div>
        </div>
        <!-- 专栏 -->
        <div class="bh-list-item" v-for="item in bh_list[cur_bh]" v-show="cur_bh == '专栏'">
            <div class="des" :style="cur_bh == '专栏' ? 'min-width:220px;' : ''">
                <div class="title">{{ item.title }}</div>
                <div class="time">
                    <i class="iconfont icon-lishijilu"></i>
                    &nbsp;<span>{{ item.hisTime }}</span>
                </div>
                <div class="name">
                    <i class="iconfont icon-UPzhu"></i>
                    &nbsp;<span>{{ item.name }}</span>
                </div>
            </div>
            <div class="img-right"></div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { reactive, ref, watch } from 'vue';
import { useUserStore } from '@/util/userStore';
import { getHistoryList } from '@/api/History/index'
import { HistoryQueryVo, HistoryVo } from '@/api/History/types';
import { ElMessage } from 'element-plus';
import { formatTimeGap } from '@/util/index'
import { useRouter } from 'vue-router';

const props = defineProps({
    canGetHistory: Boolean
});
const router = useRouter()
const userStore = useUserStore();

const cur_bh = ref("视频")//当前激活tab
const bh_list = reactive({
    视频: [] as HistoryVo[],
    直播: [],
    专栏: [],
})
function openVideoPage(href: string) {
    if (cur_bh.value == '视频') {
        const url = router.resolve({ path: href });
        window.open(url.href, "_blank");
    }
}
const canGet = ref<boolean>(true);//防抖
async function onGetHistoryList(params: HistoryQueryVo) {
    if (!userStore.token) return;
    try {
        const res = await getHistoryList(params);
        bh_list['视频'] = res.data.records;
        canGet.value = true;
    } catch (error) {
        ElMessage.error('获取历史记录失败！');
        console.log(error)
        canGet.value = true;
    }
}

watch(() => props.canGetHistory, (newVal) => {
    if (newVal) {
        if (canGet.value) {
            canGet.value = false;
            onGetHistoryList({ current: 1, size: 10, uid: userStore.userInfo.uid });
        }
    }
}, { immediate: true })
</script>
<style lang="less" scoped>
@import '@/styles/app.less';
</style>