<template>
    <div class="danmaku-box">
        <div class="danmaku-wrap">
            <div class="bui-collapse-header flex-row-ac" @click="expand = !expand">
                <div class="bui-collapse-arrow" :style="expand ? 'transform:rotate(180deg);' : ''">
                    <i class="iconfont icon-arrow"></i>
                </div>
                <div class="bpx-player-filter flex-row-ac">
                    <span>弹幕列表</span>
                    <!-- <i class="iconfont "></i> -->
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
                            <li class="bui-long-list-item flex-row-ac" v-for="e in props.danmuList">
                                <span class="dm-info-time text">{{ parseFloat(e.timePoint).toFixed(2) }}</span>
                                <span class="dm-info-dm nto text" :title="e.content">{{ e.content }}</span>
                                <span class="dm-info-date text">{{ formatStringDate(e.createDate, DateStringType.MON_D_H_MIN) }}</span>
                                <span class="dm-info-block-btn dmibb-left">举报</span>
                                <span class="dm-info-block-btn dmibb-right">屏蔽用户</span>
                            </li>
                        </ul>
                    </div>
                    <div class="bpx-player-dm-btn-footer">查看历史弹幕</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { Danmu } from "@/api/Models";
import { ref, PropType, watch } from "vue";
import { formatStringDate } from '@/util/index'
import { DateStringType } from "@/api/enums";

const props = defineProps({
    danmuList: {
        type: Object as PropType<Danmu[]>,
        default: []
    }
});
//弹幕信息
const danmu = ref<Danmu[]>([])
const expand = ref<boolean>(false)

watch(() => props.danmuList, (newVal) => {
if (newVal) {
    danmu.value = newVal
}
}, { immediate: true, deep: true }
)
</script>
<style scoped lang="less">
.danmaku-box {
    margin-bottom: 18px;
    position: relative;

    .danmaku-wrap {
        width: 100%;

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

                .bpx-player-dm-btn-footer {
                    height: 31px;
                    width: 100%;
                    margin-top: 8px;
                    border-radius: 6px;
                    background-color: var(--bgc5);
                    color: var(--font-color-gray2);
                    cursor: pointer;
                    line-height: 31px;
                    text-align: center;
                }
            }
        }
    }
}
</style>