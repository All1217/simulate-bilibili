<template>
    <div class="danmaku-box">
        <div class="danmaku-wrap">
            <div class="bui-collapse-header flex-row-ac" v-show="danmuMode == 3">
                <div class="bpx-player-filter flex-row-ac">
                    <span>您与TA的共同点：</span>
                </div>
            </div>
            <div class="bui-collapse-tag-container">
                <el-tag type="primary" v-show="danmuMode == 3" size="small" style="margin-right: 10px;" v-for="tag in commonTags">{{ tag }}</el-tag>
            </div>
            <div class="bui-collapse-header flex-row-ac" @click="expand = !expand">
                <div class="bui-collapse-arrow" :style="expand ? 'transform:rotate(180deg);' : ''">
                    <i class="iconfont icon-arrow"></i>
                </div>
                <div class="bpx-player-filter flex-row-ac">
                    <span>弹幕列表</span>
                    <!-- <i class="iconfont "></i> -->
                    <el-tag type="success" v-show="danmuMode == 0" size="small">高质量弹幕贡献者优先</el-tag>
                    <el-tag type="success" v-show="danmuMode == 1" size="small">干货贡献者优先</el-tag>
                    <el-tag type="success" v-show="danmuMode == 3" size="small">{{ curSelected }}</el-tag>
                </div>
            </div>
            <div class="bui-collapse-body" v-show="expand">
                <div class="bpx-player-wraplist">
                    <div class="bpx-player-dm-function flex-row">
                        <div class="bpx-player-dm time">时间</div>
                        <div class="bpx-player-dm dmc">弹幕内容</div>
                        <div class="bpx-player-dm date">发送时间</div>
                    </div>
                    <div class="bpx-player-dm-wrap">
                        <ul class="bui-long-list-list">
                            <li class="bui-long-list-item flex-row-ac" v-for="e in danmu">
                                <span class="dm-info-time text">{{ formatTimeGap(e.timePoint) }}</span>
                                <span class="dm-info-dm nto text" :title="e.content">{{ e.content }}</span>
                                <span class="dm-info-date text">{{ formatStringDate(e.createDate,
                                    DateStringType.MON_D_H_MIN) }}</span>
                                <span class="dm-info-block-btn dmibb-left">举报</span>
                                <span class="dm-info-block-btn dmibb-right">屏蔽用户</span>
                            </li>
                        </ul>
                    </div>
                    <div class="bpx-player-dm-btn-footer bpx-dm-btn-color">查看历史弹幕</div>
                </div>
            </div>
            <div class="bui-collapse-ext" v-show="expand">
                <div class="bpx-player-dm-btn-footer bpx-rec-btn-color" @click="onDanmuTag(0)" v-show="danmuMode == 2">
                    优先查看“高质量弹幕贡献者”的弹幕
                </div>
                <div class="bpx-player-dm-btn-footer bpx-rec-btn-color" @click="onDanmuTag(1)" v-show="danmuMode == 2">
                    优先查看“干货贡献者”的弹幕
                </div>
                <div class="bpx-player-dm-btn-footer bpx-rec-btn-color" @click="onCancelFilter" v-show="danmuMode != 2">
                    取消筛选
                </div>
                <div class="bpx-player-dm-btn-footer bpx-rec-btn-color" @click="onSimilarUsers">查看与自己最相似的用户的弹幕</div>
                <div class="bpx-user-list-wrap" v-if="userList.length != 0">
                    <ul>
                        <li class="bpx-user-list-user-item" v-for="user in userList">
                            <RouterLink class="bpx-user-avatar" :to="{ name: 'UserPage', params: { uid: user.uid } }"
                                target="_blank">
                                <img :src="user.avatar" alt="" width="48" height="48">
                            </RouterLink>
                            <div class="bpx-user-info">
                                <div>
                                    <RouterLink :to="{ name: 'UserPage', params: { uid: user.uid } }"
                                        class="nto bpx-user-name" target="_blank">
                                        {{ user.nickname }}
                                    </RouterLink>
                                </div>
                                <div>
                                    <span class="nto bpx-user-description">{{ user.description }}</span>
                                </div>
                            </div>
                            <div class="bpx-filter-btn" @click="onFilterDanmuByUser(user.uid, user.nickname)">筛选</div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { Danmu, Video, User } from "@/api/Models";
import { ref, PropType, watch } from "vue";
import { formatStringDate, formatTimeGap } from '@/util/index'
import { DateStringType } from "@/api/enums";
import { getSimilarUsers, getDanmuByTag, RecoQueryVo, getCommonTags } from "@/api/Video/index"
import { defaultVideo } from "@/api";
import { useUserStore } from '@/util/userStore';
const vi = ref<Video>(defaultVideo)
const userStore = useUserStore()
const props = defineProps({
    danmuList: {
        type: Object as PropType<Danmu[]>,
        default: []
    },
    videoInfo: {
        type: Object as PropType<Video>,
        default: defaultVideo
    }
});
//相似用户
const userList = ref<User[]>([])
//弹幕信息
const danmu = ref<Danmu[]>([])
const expand = ref<boolean>(false)

watch(() => props.danmuList, (newVal) => {
    if (newVal) {
        danmu.value = newVal
    }
}, { immediate: true, deep: true }
)
watch(() => props.videoInfo, (newVal) => {
    if (newVal) {
        vi.value = newVal
    }
}, { immediate: true, deep: true }
)

async function onSimilarUsers() {
    let query: RecoQueryVo = {
        uid: userStore.userInfo.uid,
        vid: vi.value.vid
    }
    try {
        const res = await getSimilarUsers(query)
        if (res.code == 200) {
            userList.value = res.data
        }
    } catch (error) {
        console.log(error)
    }
}
//弹幕显示模式,0高质量，1干货，2默认,3指定用户
const danmuMode = ref<number>(2);
const curSelected = ref<string>('');
const commonTags = ref<string[]>(['null'])
async function onDanmuTag(tag: number) {
    let query: RecoQueryVo = {
        vid: vi.value.vid,
        tag: tag
    }
    try {
        const res = await getDanmuByTag(query)
        if (res.code == 200) {
            danmu.value = res.data
            danmuMode.value = tag
        }
    } catch (error) {
        console.log(error)
    }
}
async function onGetCommonTags(uid: number) {
    let query: RecoQueryVo = {
        vid: userStore.userInfo.uid,
        uid: uid
    }
    try {
        const res = await getCommonTags(query)
        if (res.code == 200) {
            commonTags.value = res.data
        }
    } catch (error) {
        console.log(error)
    }
}
function onCancelFilter() {
    danmu.value = props.danmuList;
    danmuMode.value = 2;
}
function onFilterDanmuByUser(uid: number, nickname: string) {
    danmuMode.value = 3
    curSelected.value = nickname
    let temp: Danmu[] = [];
    props.danmuList.forEach(e => {
        if (e.uid == uid) temp.push(e);
    })
    danmu.value = temp;
    onGetCommonTags(uid);
}
</script>
<style scoped lang="less">
.danmaku-box {
    margin-bottom: 18px;
    position: relative;

    .danmaku-wrap {
        width: 100%;

        .bui-collapse-tag-container {
            padding: 10px;
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            flex-direction: row;
        }

        .bui-collapse-header {
            border-radius: 6px;
            background: var(--bgc5);
            cursor: pointer;
            height: 44px;
            position: relative;
            width: 100%;

            .bui-collapse-arrow {
                position: absolute;
                width: 18px;
                height: 18px;
                right: 16px;
                top: 13px;
                bottom: 8px;
                transition: transform .3s ease;
                text-align: center;

                i {
                    line-height: 18px;
                    font-size: 15px;
                }
            }

            .bpx-player-filter {
                border-radius: 6px;
                height: 44px;
                line-height: 44px;
                padding: 0 10px 0 16px;
                position: relative;
                z-index: 2;

                span {
                    font-weight: 500;
                    font-size: 15px;
                    font-weight: 500;
                    color: var(--font-color-black);
                    margin-right: 15px;
                }
            }
        }

        .bui-collapse-body {
            background-color: var(--white);
            position: relative;
            overflow: hidden;
            width: 100%;

            .bpx-player-wraplist {
                display: block;
                overflow: hidden;
                height: 430px;

                .bpx-player-dm-function {
                    position: relative;
                    height: 32px;
                    background-color: #fff;

                    .bpx-player-dm {
                        color: var(--font-color-gray2);
                        cursor: pointer;
                        display: inline-block;
                        font-size: 12px;
                        line-height: 32px;
                        text-align: left;
                    }

                    .dmc {
                        flex: 1;
                    }

                    .time {
                        padding-left: 16px;
                        width: 72px;
                    }

                    .date {
                        width: 82px;
                    }
                }

                .bpx-player-dm-wrap {
                    overflow-x: hidden;
                    overflow-y: scroll;
                    height: 359px;
                    background-color: var(--white);
                    position: relative;

                    .bui-long-list-list {
                        width: 100%;

                        .bui-long-list-item {
                            height: 24px;
                            cursor: pointer;
                            position: relative;

                            .text {
                                display: inline-block;
                                font-size: 12px;
                                line-height: 24px;
                                padding: 0 6px;
                                vertical-align: top;
                            }

                            .dm-info-time {
                                overflow: hidden;
                                position: relative;
                                text-align: center;
                                min-width: 66px;
                                color: var(--font-color-gray2);
                            }

                            .dm-info-dm {
                                width: 100%;
                                color: var(--font-color-black);
                            }

                            .dm-info-date {
                                min-width: 88px;
                                color: var(--font-color-gray2);
                            }

                            .dm-info-block-btn {
                                position: absolute;
                                top: 1px;
                                width: 70px;
                                display: none;
                                color: var(--hover-blue);
                                font-size: 12px;
                                background-color: #fff;
                                border: 1px solid var(--hover-blue);
                                border-radius: 2px;
                                height: 20px;
                                line-height: 20px;
                                margin-left: 10px;
                                text-align: center;
                                cursor: pointer;
                            }

                            .dmibb-left {
                                right: 90px;
                            }

                            .dmibb-right {
                                right: 10px;
                            }
                        }

                        .bui-long-list-item:hover .dm-info-block-btn {
                            display: inline-block;
                        }
                    }
                }

                .bpx-dm-btn-color {
                    color: var(--font-color-gray2);
                }
            }
        }

        .bpx-player-dm-btn-footer {
            height: 31px;
            width: 100%;
            margin-top: 8px;
            border-radius: 6px;
            background-color: var(--bgc5);
            cursor: pointer;
            line-height: 31px;
            text-align: center;
        }

        .bpx-rec-btn-color {
            background-color: var(--cur-blue);
            color: #fff;
        }

        .bpx-user-list-wrap {
            width: 100%;

            .bpx-user-list-user-item {
                display: flex;
                flex-direction: row;
                position: relative;
                height: 48px;
                margin-top: 15px;

                .bpx-user-avatar {
                    display: inline-block;
                    width: 48px;
                    height: 48px;
                    border-radius: 50%;
                    overflow: hidden;
                    cursor: pointer;
                }

                .bpx-user-info {
                    width: 300px;
                    max-width: 300px;

                    .bpx-user-name {
                        color: #FB7299;
                        font-size: 15px;
                        font-weight: 500;
                        margin-left: 15px;
                        display: inline-block;
                        max-width: 140px;
                    }

                    .bpx-user-description {
                        margin-left: 15px;
                        display: inline-block;
                        max-width: 140px;
                    }
                }

                .bpx-filter-btn {
                    position: absolute;
                    background-color: var(--cur-blue);
                    color: #fff;
                    border-radius: 6px;
                    width: 45px;
                    height: 24px;
                    right: 20px;
                    top: 12px;
                    text-align: center;
                    line-height: 24px;
                    cursor: pointer;
                }
            }
        }
    }
}
</style>