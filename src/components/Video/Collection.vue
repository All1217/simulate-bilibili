<template>
    <div class="rcmd-tab">
        <div class="video-pod">
            <div class="video-pod__header">
                <div class="header-top flex-row-ac jc-spb">
                    <div class="left flex-row-ac">
                        <a class="p-title nto" title="合集标题">合集标题</a>
                        <div class="amt">（12/12）</div>
                    </div>
                    <div class="right flex-row-ac">
                        <el-switch v-model="interact.isBatchPlay" active-text="自动连播" inactive-text="" />
                    </div>
                </div>
                <div class="header-bottom flex-row-ac jc-spb">
                    <div class="hb-left flex-row-ac">
                        <div class="total-view">97.8万播放</div>
                        <!-- <span>简介</span> -->
                    </div>
                    <div class="hb-right">
                        <div class="subscribe-btn flex-row-ac jcc">订阅合集</div>
                    </div>
                </div>
            </div>
            <div class="video-pod__body">
                <div class="video-pod__list">
                    <div class="pod-item flex-row-ac jc-spb" v-for="e in interact.videos"
                        :style="interact.curVideo == e.id ? 'background-color:#fff;' : ''">
                        <div class="title-txt nto" :title="e.title"
                            :style="interact.curVideo == e.id ? 'color:#00aeec;' : ''">
                            {{ e.title }}</div>
                        <div class="stats">{{ e.length }}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="recommend-list-v1">
            <div class="rec-list">
                <div class="video-card" v-for="e in recommendList">
                    <div class="pic-box" @click="onVideoClick(e)">
                        <img class="video-img" :src="e.coverUrl" alt="" />
                        <span class="duration">{{ formatTimeGap(e.duration) }}</span>
                    </div>
                    <div class="v-info">
                        <a class="v-title-box nto2" :title="e.title" @click="onVideoClick(e)">{{ e.title }}</a>
                        <div class="upname" @click="router.push(`/user_page/${e.uid}`)">
                            <a>
                                <svg class="c-icon" aria-hidden="true">
                                    <use xlink:href="#icon-UPzhu"></use>
                                </svg>
                                <span class="nto">{{ e.nickname }}</span>
                            </a>
                        </div>
                        <div class="playinfo">
                            <svg class="c-icon" aria-hidden="true">
                                <use xlink:href="#icon-bofangshu"></use>
                            </svg>{{ formatCount(e.play) }}
                            <svg class="c-icon dammu-count" aria-hidden="true">
                                <use xlink:href="#icon-danmushu"></use>
                            </svg>{{ formatCount(e.danmu) }}
                        </div>
                    </div>
                </div>
            </div>
            <div class="rec-footer" @click="expand">展开</div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { reactive, ref, onMounted } from 'vue';
import { ElMessage } from 'element-plus';

import { VideoQueryVo, VideoVo } from '@/api/Models';
import { formatCount, formatTimeGap } from '@/util/index'
import { useUserStore } from '@/util/userStore';
import { getDefaultVideoList, getRecVideoList, RecoQueryVo } from '@/api/Video/index'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
//视频参数
const interact = reactive({
    isCollection: true,//是否是合集
    isBatchPlay: false,//是否连播
    curVideo: 1,//当前合集视频
    videos: [
        {
            id: 1,
            title: "合集内视频标题合集内视频标题合集内视频标题合集内视频标题",
            length: "12:17"
        },
        {
            id: 2,
            title: "合集内视频标题合集内视频标题合集内视频标题合集内视频标题",
            length: "12:17"
        },
        {
            id: 3,
            title: "合集内视频标题合集内视频标题合集内视频标题合集内视频标题",
            length: "12:17"
        },
        {
            id: 4,
            title: "合集内视频标题合集内视频标题合集内视频标题合集内视频标题",
            length: "12:17"
        },
        {
            id: 5,
            title: "合集内视频标题合集内视频标题合集内视频标题合集内视频标题",
            length: "12:17"
        },
        {
            id: 6,
            title: "合集内视频标题合集内视频标题合集内视频标题合集内视频标题",
            length: "12:17"
        },
        {
            id: 7,
            title: "合集内视频标题合集内视频标题合集内视频标题合集内视频标题",
            length: "12:17"
        },
        {
            id: 8,
            title: "合集内视频标题合集内视频标题合集内视频标题合集内视频标题",
            length: "12:17"
        },
        {
            id: 9,
            title: "合集内视频标题合集内视频标题合集内视频标题合集内视频标题",
            length: "12:17"
        },
    ],//合集内视频列表
});
const recommendList = ref<VideoVo[]>([])
function expand() {
    ElMessage({
        type: 'warning',
        message: "敬请期待！"
    })
}
function onVideoClick(e: VideoVo) {
    if (e.vid == 0) {
        return;
    }
    let url = router.resolve({ path: `/video/${e.vid}` });
    window.open(url.href, "_blank");
}
async function onGetDefaultVideoList(query: VideoQueryVo) {
    try {
        const { data } = await getDefaultVideoList(query)
        recommendList.value = data.records
    } catch (error) {
        console.log(error)
        ElMessage.error('获取默认推荐失败！')
    }
}
async function onGetRecVideoList(query: RecoQueryVo) {
    try {
        const { data } = await getRecVideoList(query)
        recommendList.value = data
    } catch (error) {
        console.log(error)
        ElMessage.error('获取推荐视频列表失败！')
    }
}
onMounted(() => {
    if (userStore.token) {
        onGetRecVideoList({ uid: userStore.userInfo.uid, count: 3 })
    } else {
        onGetDefaultVideoList({ size: 5, current: 1 })
    }
})
</script>
<style scoped lang="less">
.rcmd-tab {
    .video-pod {
        margin-bottom: 18px;
        padding: 0 16px 8px;
        background-color: var(--bgc5);
        border-radius: 6px;

        .video-pod__header {
            padding: 14px 0px 12px;

            .header-top {
                .left {
                    margin-right: 10px;

                    .p-title {
                        color: var(--font-color-black);
                        font-size: 16px;
                        font-weight: 500;
                        line-break: anywhere;
                        cursor: pointer;
                        transition: color 0.3s;
                    }

                    .amt {
                        font-size: 12px;
                        color: var(--font-color-gray2);
                    }
                }
            }

            .header-bottom {
                padding: 10px 0 12px 0;
                border-bottom: 1px solid var(--bgc4);

                .hb-left {
                    .total-view {
                        font-size: 14px;
                        color: var(--font-color-gray1);
                        margin-right: 10px;
                    }
                }

                .hb-right {
                    .subscribe-btn {
                        cursor: pointer;
                        font-size: 14px;
                        color: var(--hover-blue);
                        width: 70px;
                        height: 24px;
                        border-radius: 2px;
                        border: 1px solid var(--hover-blue);
                        transition: all 0.3s;
                    }
                }
            }
        }

        .video-pod__body {
            margin: 0 -16px;
            max-height: 250px;
            overflow-x: hidden;
            overflow-y: auto;
            scroll-behavior: smooth;
            overscroll-behavior: contain;

            .video-pod__list {
                position: relative;
                height: auto;
                width: calc(100% - 12px);
                margin: 0 auto;

                .pod-item {
                    width: 100%;
                    margin-bottom: 4px;
                    padding: 0 10px;
                    line-height: 31px;
                    cursor: pointer;
                    border-radius: 3px;

                    .title-txt {
                        height: 31px;
                        font-size: 15px;
                        transition: color 0.2s;
                        color: var(--font-color-black);
                    }

                    .stats {
                        margin-left: 10px;
                        font-size: 14px;
                        color: var(--font-color-gray1);
                    }
                }

                .pod-item:hover .title-txt {
                    color: var(--hover-blue);
                }
            }
        }
    }

    .recommend-list-v1 {
        margin-top: 18px;

        .rec-list {
            margin-top: 18px;

            .video-card {
                display: flex !important;
                flex-direction: row !important;
                justify-content: start !important;
                overflow: hidden;
                margin-bottom: 12px;

                .pic-box {
                    position: relative;
                    width: 141px;
                    min-width: 141px;
                    height: 83px;
                    border-radius: 6px;
                    overflow: hidden;
                    background: #c9ccd0;

                    .video-img {
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                    }

                    .duration {
                        position: absolute;
                        bottom: 6px;
                        right: 6px;
                        color: var(--white);
                        height: 20px;
                        line-height: 20px;
                        transition: opacity 0.3s;
                        z-index: 5;
                        font-size: 13px;
                        background-color: rgba(0, 0, 0, 0.4);
                        border-radius: 2px;
                        padding: 0 4px;
                    }
                }

                .v-info {
                    margin-left: 10px;
                    font-size: 13px;

                    svg {
                        font-size: 16px;
                        margin-right: 5px;
                    }

                    .v-title-box {
                        color: #222;
                        cursor: pointer;
                        font-size: 15px;
                        font-weight: 500;
                        line-height: 19px;
                    }

                    .v-title-box:hover {
                        color: var(--hover-blue);
                    }

                    .upname {
                        cursor: pointer;
                        margin: 2px 0;
                        height: 20px;

                        a {
                            color: var(--font-color-gray1);
                            display: inline-flex;
                            align-items: center;
                            width: 100%;
                            height: 100%;

                            span {
                                transition: color .3s ease;
                                color: var(--font-color-gray1);
                            }
                        }
                    }

                    .upname:hover a,
                    .upname:hover span {
                        color: var(--hover-blue);
                    }

                    .playinfo {
                        color: var(--font-color-gray1);
                        display: inline-flex;
                        align-items: center;

                        .dammu-count {
                            margin-left: 10px;
                        }
                    }
                }
            }
        }

        .rec-footer {
            height: 42px;
            background: var(--bgc5);
            color: var(--font-color-black);
            margin-top: 10px;
            text-align: center;
            line-height: 42px;
            cursor: pointer;
            border-radius: 6px;
            user-select: none;
            transition: background-color 0.3s;
        }

        .rec-footer:hover {
            background-color: #dfdfdf;
        }
    }
}
</style>