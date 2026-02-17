<template>
    <div class="search-conditions">
        <div class="conditions-order flex-row-ac jc-spb">
            <div class="search-condition-row flex-row-ac">
                <button class="vui_button--tab" @click="sortTypeChange(1, '')"
                    :style="conditions.curVData == 1 ? 'background-color: #dff6fd;color:#00aeec;' : 'background-color: #fff;'">综合排序</button>
                <button class="vui_button--tab" @click="sortTypeChange(2, 'play')"
                    :style="conditions.curVData == 2 ? 'background-color: #dff6fd;color:#00aeec;' : 'background-color: #fff;'">最多播放</button>
                <button class="vui_button--tab" @click="sortTypeChange(3, 'danmu')"
                    :style="conditions.curVData == 3 ? 'background-color: #dff6fd;color:#00aeec;' : 'background-color: #fff;'">最多弹幕</button>
                <button class="vui_button--tab" @click="sortTypeChange(4, 'collect')"
                    :style="conditions.curVData == 4 ? 'background-color: #dff6fd;color:#00aeec;' : 'background-color: #fff;'">最多收藏</button>
                <button class="vui_button--tab" @click="sortTypeChange(5, 'upload_date')"
                    :style="conditions.curVData == 5 ? 'background-color: #dff6fd;color:#00aeec;' : 'background-color: #fff;'">最新发布</button>
            </div>
            <button class="select-condition" @click="conditions.isExpand = !conditions.isExpand">
                更多筛选
                <svg class="c-icon search-icon" aria-hidden="true"
                    :style="conditions.isExpand ? 'transform: rotate(180deg);' : ''">
                    <use xlink:href="#icon-xialaxiao"></use>
                </svg>
            </button>
        </div>
        <div :class="conditions.isExpand ? 'more-conditions expand' : 'more-conditions fold'"
            v-show="conditions.isExpand">
            <div class="search-condition-row flex-row-ac">
                <button class="vui_button--tab" @click="onDurationChange(1, null, null)"
                    :style="conditions.curL == 1 ? 'background-color: #dff6fd;color:#00aeec;' : 'background-color: #fff;'">全部时长</button>
                <button class="vui_button--tab" @click="onDurationChange(2, 0, 600)"
                    :style="conditions.curL == 2 ? 'background-color: #dff6fd;color:#00aeec;' : 'background-color: #fff;'">10分钟以下</button>
                <button class="vui_button--tab" @click="onDurationChange(3, 600, 1800)"
                    :style="conditions.curL == 3 ? 'background-color: #dff6fd;color:#00aeec;' : 'background-color: #fff;'">10-30分钟</button>
                <button class="vui_button--tab" @click="onDurationChange(4, 1800, 3600)"
                    :style="conditions.curL == 4 ? 'background-color: #dff6fd;color:#00aeec;' : 'background-color: #fff;'">30-60分钟</button>
                <button class="vui_button--tab" @click="onDurationChange(5, 3600, null)"
                    :style="conditions.curL == 5 ? 'background-color: #dff6fd;color:#00aeec;' : 'background-color: #fff;'">60分钟以上</button>
            </div>
            <div class="search-condition-row flex-row-ac">
                <button class="vui_button--tab" @click="onSelectPbDate(1)"
                    :style="conditions.curPbDate == 1 ? 'background-color: #dff6fd;color:#00aeec;' : 'background-color: #fff;'">全部日期</button>
                <div id="date-picker">
                    <el-date-picker v-model="conditions.pbDate" type="daterange" unlink-panels range-separator="To"
                        start-placeholder="Start date" end-placeholder="End date" :shortcuts="conditions.shortcuts"
                        size="default" @change="onSelectPbDate(-1)" />
                </div>
            </div>
            <div class="search-condition-row flex-row-ac">
                <button class="vui_button--tab" @click="partitionChange(0)"
                    :style="conditions.curPar == 0 ? 'background-color: #dff6fd;color:#00aeec;' : 'background-color: #fff;'">全部分区</button>
                <button class="vui_button--tab" v-for="e in pars" @click="partitionChange(e.id)"
                    :style="conditions.curPar == e.id ? 'background-color: #dff6fd;color:#00aeec;' : 'background-color: #fff;'">{{
                        e.name }}</button>
            </div>
        </div>
    </div>
    <div class="search-page-video">
        <div class="no-data flex-row-ac jcc" v-show="vList.length == 0">
            <no-data :message1="'无搜索结果'"></no-data>
        </div>
        <div class="video-list">
            <div class="video-card" v-for="e in vList">
                <div class="img" style="height: 145px;margin-bottom: 4px;" @click="onVideoClick(e)">
                    <img :src="e.coverUrl" alt="">
                    <div class="video-info">
                        <div>
                            <span>
                                <i class="iconfont icon-bofangshu"></i>&nbsp;{{ formatCount(e.play)
                                }}&nbsp;&nbsp;&nbsp;</span>
                            <span><i class="iconfont icon-danmushu"></i>&nbsp;{{ formatCount(e.danmu) }}</span>
                        </div>
                        <span>{{ formatTimeGap(e.duration) }}</span>
                    </div>
                </div>
                <h3 class="title nto2" @click="onVideoClick(e)">
                    <a class="force-line-breaks">{{ e.title }}</a>
                </h3>
                <div class="up-time">
                    <a href="">
                        <i class="iconfont icon-UPzhu"></i>&nbsp;
                        <span>{{ `${e.nickname} • ${sliceDateTime(e.uploadDate)}` }}</span>
                    </a>
                </div>
            </div>
        </div>
    </div>
    <div class="pager flex-row-ac jcc" v-show="vList.length > 0">
        <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :size="size" background
            layout="total, prev, pager, next, jumper" :total="vList.length" @current-change="handleCurrentChange" />
    </div>
</template>
<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue";
import { formatTimeGap, formatCount, sliceDateTime } from '@/util/index'
import { useRoute } from 'vue-router'
import router from "@/router";
import '@/styles/MainWindow/index.less'
import { Partition, VideoQueryVo, VideoVo } from "@/api/Models";
import { getRecVideoList } from '@/api/MainWindow/index'
import { ElMessage } from "element-plus";
import { getFormatCurTime } from "@/util";
import { DateStringType } from "@/api/enums"
import type { ComponentSize } from "element-plus";
import NoData from "../NoData.vue";

const route = useRoute()
const conditions = reactive({
    isExpand: false,
    curVData: 1,
    curPbDate: 1,
    pbDate: '',
    shortcuts: [
        {
            text: '最近一天',
            value: () => {
                const end = new Date()
                const start = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24)
                return [start, end]
            },
        },
        {
            text: '最近一周',
            value: () => {
                const end = new Date()
                const start = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
                return [start, end]
            },
        },
        {
            text: '最近半年',
            value: () => {
                const end = new Date()
                const start = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 180)
                return [start, end]
            },
        },
    ],
    curL: 1,
    curPar: 0,
    startDuration: 0,
    endDuration: null,
    sortField: ''
})
const pars = ref<Partition[]>([
    { id: 1, icon: "#icon-wodezhuifan", name: "番剧", href: "" },
    { id: 2, icon: "#icon-dianying", name: "电影", href: "" },
    { id: 3, icon: "#icon-guochandonghuatuijian", name: "国创", href: "" },
    { id: 4, icon: "#icon-dianshiju", name: "电视剧", href: "" },
    { id: 5, icon: "#icon-guanggao", name: "综艺", href: "" },
    { id: 6, icon: "#icon-chun", name: "纪录片", href: "" },
    { id: 7, icon: "#icon-dong", name: "动画", href: "" },
    { id: 8, icon: "#icon-youxi", name: "游戏", href: "" },
    { id: 9, icon: "#icon-guixu", name: "鬼畜", href: "" },
    { id: 10, icon: "#icon-wodezhuifan", name: "音乐", href: "" },
    { id: 11, icon: "#icon-wodezhuifan", name: "舞蹈", href: "" },
    { id: 12, icon: "#icon-wodezhuifan", name: "影视", href: "" },
    { id: 13, icon: "#icon-yule", name: "娱乐", href: "" },
    { id: 14, icon: "#icon-wanjietuijian", name: "知识", href: "" },
    { id: 15, icon: "#icon-keji-", name: "科技", href: "" },
    { id: 16, icon: "#icon-dianshiju-", name: "资讯", href: "" },
    { id: 17, icon: "#icon-wodezhuifan", name: "美食", href: "" },
    { id: 18, icon: "#icon-shenghuo", name: "生活", href: "" },
    { id: 19, icon: "#icon-wodezhuifan", name: "汽车", href: "" },
    { id: 20, icon: "#icon-shishang", name: "时尚", href: "" },
    { id: 21, icon: "#icon-wodezhuifan", name: "运动", href: "" },
    { id: 22, icon: "#icon-fanjutuijian", name: "动物圈", href: "" },
    { id: 23, icon: "#icon-wodezhuifan", name: "VLOG", href: "" },
    { id: 24, icon: "#icon-zuixinlianzai", name: "搞笑", href: "" },
    { id: 25, icon: "#icon-wodezhuifan", name: "单机游戏", href: "" },
    { id: 26, icon: "#icon-wodezhuifan", name: "虚拟UP主", href: "" },
])
//分页控件
const currentPage = ref(1);
const pageSize = ref(30);
const size = ref<ComponentSize>("default");
const handleCurrentChange = (val: number) => {
    currentPage.value = val
};
const vList = ref<VideoVo[]>([
    {
        vid: 0, uid: 0, nickname: "某UP主", title: "视频标题视频标题视频标题视频标题视频标题",
        duration: 566.12, coverUrl: "", uploadDate: "2025-2-13", play: 566987,
        danmu: 5669, good: 56698, bad: 5, coin: 1752, collect: 5890, share: 135, comment: 2564
    }
]
)
function onVideoClick(e: VideoVo) {
  if (e.vid == 0) {
    return;
  }
  let url = router.resolve({ path: `/video/${e.vid}` });
  window.open(url.href, "_blank");
}
function sortTypeChange(id: number, field: string) {
    conditions.curVData = id
    conditions.sortField = field
    geneQuery()
}
function onDurationChange(curL: number, s: number, e: number) {
    conditions.curL = curL
    conditions.startDuration = s
    conditions.endDuration = e
    geneQuery()
}
function onSelectPbDate(id: number) {
    conditions.curPbDate = id
    if (id == 1) {
        conditions.pbDate = ''
    }
    geneQuery()
}
function partitionChange(id: number) {
    conditions.curPar = id
    geneQuery()
}

function geneQuery() {
    const st = new Date(conditions.pbDate[0])
    const et = new Date(conditions.pbDate[1])
    const query: VideoQueryVo = {
        current: currentPage.value,
        size: 30,
        title: route.query.keyword.toString(),
        sortType: conditions.curVData,
        startTime: conditions.pbDate == '' ? null : getFormatCurTime(st.getTime(), DateStringType.ALL),
        endTime: conditions.pbDate == '' ? null : getFormatCurTime(et.getTime(), DateStringType.ALL),
        startDuration: conditions.startDuration,
        endDuration: conditions.endDuration,
        mcId: conditions.curPar,
        sortField: conditions.sortField
    }
    callGetRecVideoList(query)
}

async function callGetRecVideoList(query: VideoQueryVo) {
    try {
        const { data } = await getRecVideoList(query)
        vList.value = data.records
    } catch (error) {
        console.log(error)
        ElMessage.error('无法拉取视频列表！')
    }
}

onMounted(() => {
    callGetRecVideoList({
        current: 1,
        size: 30,
        title: route.query.keyword.toString(),
    })
})
</script>
<style scoped lang="less">
#date-picker {
    padding-top: 9px;
    margin-left: 15px;
    width: 300px;
}

.search-page-video {
    padding: 0 64px;
    width: 100%;
    max-width: 2200px;
    margin: 30px auto 0;
    padding-bottom: 30px;

    .no-data {
        width: 100%;
        height: auto;
    }

    .video-list {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
        gap: 20px;
    }
}
</style>