<template>
    <div class="content">
        <div class="header flex-row-ac">
            <div class="header-nav flex-row">
                <div class="item" :style="curNav == 1 ? 'color: #00aeec;' : ''" @click="curNav = 1">数据概览<div
                        class="cursor" v-show="curNav == 1"></div>
                </div>
                <div class="item" :style="curNav == 2 ? 'color: #00aeec;' : ''" @click="curNav = 2">数据周报<div
                        class="cursor" v-show="curNav == 2"></div>
                </div>
                <div class="item" :style="curNav == 3 ? 'color: #00aeec;' : ''" @click="curNav = 3">稿件分析<div
                        class="cursor" v-show="curNav == 3"></div>
                </div>
            </div>
        </div>
        <div class="video-tab">
            <div class="core-data">
                <div class="title flex-row-ac jc-spb">
                    <div class="left flex-row-ac">
                        <span class="name">核心数据概览</span>
                    </div>
                    <div class="right flex-row-ac">
                        <div class="pop-menu-left">时间选择</div>
                        <el-dropdown trigger="click">
                            <div class="pop-menu-right flex-row-ac jcc">
                                <span>{{ titleConfig.dataRangeTag }}</span>
                                <svg class="c-icon" aria-hidden="true">
                                    <use xlink:href="#icon-bofangqi-bofang"></use>
                                </svg>
                            </div>
                            <template #dropdown>
                                <div class="be-dropdown-menu">
                                    <div class="be-dropdown-item" @click="onRangeChange(1, '昨日')"
                                        :style="titleConfig.dataRange == 1 ? 'color: #00aeec;' : ''">昨日</div>
                                    <div class="be-dropdown-item" @click="onRangeChange(2, '近7天')"
                                        :style="titleConfig.dataRange == 2 ? 'color: #00aeec;' : ''">近7天</div>
                                    <div class="be-dropdown-item" @click="onRangeChange(3, '近30天')"
                                        :style="titleConfig.dataRange == 3 ? 'color: #00aeec;' : ''">近30天</div>
                                    <div class="be-dropdown-item" @click="onRangeChange(4, '近90天')"
                                        :style="titleConfig.dataRange == 4 ? 'color: #00aeec;' : ''">近90天</div>
                                    <div class="be-dropdown-item" @click="onRangeChange(5, '历史累计')"
                                        :style="titleConfig.dataRange == 5 ? 'color: #00aeec;' : ''">历史累计</div>
                                </div>
                            </template>
                        </el-dropdown>
                        <span class="export">
                            <img src="../../assets/images/export-blue.png" alt="">
                            <span>导出数据</span>
                        </span>
                    </div>
                </div>
                <div class="info">
                    <div class="cell" v-for="(e, index) in cellItem" @click="onCellChange(index, e.tagName)"
                        :style="curCell == index || hoverCell == index || hoverCell == index ? 'background-color:#f69;' : ''"
                        @mouseenter="hoverCell = index" @mouseleave="hoverCell = -1">
                        <svg class="c-icon cell-bg" aria-hidden="true" v-show="curCell == index || hoverCell == index">
                            <use :xlink:href="`#${e.icon}`"></use>
                        </svg>
                        <div class="top flex-row-ac jc-spb">
                            <div class="cell-title flex-row-ac">
                                <span :style="curCell == index || hoverCell == index ? 'color:#fff;' : ''">{{ e.tagName
                                    }}</span>
                            </div>
                            <div class="cell-diff flex-row-ac" v-show="e.variation != 0">
                                <svg class="c-icon diff-icon" aria-hidden="true"
                                    :class="e.isIncrease ? 'diff-num cell-di-up' : 'diff-num cell-di-down'"
                                    :style="curCell == index || hoverCell == index ? 'color:#fff;' : ''">
                                    <use xlink:href="#icon-bofang"></use>
                                </svg>
                                <span :class="e.isIncrease ? 'diff-num cell-dn-up' : 'diff-num cell-dn-down'"
                                    :style="curCell == index || hoverCell == index ? 'color:#fff;' : ''">{{
                                        e.variationStr
                                    }}</span>
                            </div>
                        </div>
                        <div class="value" :style="curCell == index || hoverCell == index ? 'color:#fff;' : ''">{{
                            e.valueStr }}</div>
                    </div>
                </div>
                <div class="chart">
                    <div class="chart-header flex-row-ac">
                        <span class="charts-title">{{ titleConfig.dataRangeTag + curCellTag }}</span>
                        <div class="legends flex-row-ac" v-show="curCell == 0">
                            <div class="self legends flex-row-ac">总播放量</div>
                            <div class="fans legends flex-row-ac">粉丝播放量</div>
                        </div>
                    </div>
                    <div class="wrapper">
                        <div ref="canvas" class="canvas"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { CellItem } from '@/api/UploadManager/index'
import { options } from '@/api/UploadManager/echartsOptions'
import * as echarts from 'echarts';
import { ElMessage } from 'element-plus'
const curNav = ref<number>(1);
const titleConfig = reactive({
    dataRangeTag: "昨日",
    dataRange: 1,
    pop: false
})
function onRangeChange(id: number, tag: string) {
    titleConfig.dataRange = id
    titleConfig.dataRangeTag = tag
}
//cellItem
const curCell = ref<number>(0);
const curCellTag = ref<string>('播放量')
const hoverCell = ref<number>(-1);
const cellItem = ref<CellItem[]>([
    {
        tagName: '播放量',
        variation: 138,
        variationStr: '138',
        value: 1466,
        valueStr: '1466',
        isIncrease: true,
        icon: 'icon-bofangqi-bofangxiaodianshi'
    },
    {
        tagName: '空间访客',
        variation: 5,
        variationStr: '5',
        value: 1466,
        valueStr: '1466',
        isIncrease: false,
        icon: 'icon-bofangqi-zantingxiaodianshi'
    },
    {
        tagName: '净增粉丝',
        variation: 5,
        variationStr: '5',
        value: 1466,
        valueStr: '1466',
        isIncrease: false,
        icon: 'icon-fensi'
    },
    {
        tagName: '点赞',
        variation: 5,
        variationStr: '5',
        value: 1466,
        valueStr: '1466',
        isIncrease: false,
        icon: 'icon-dianzan_kuai'
    },
    {
        tagName: '收藏',
        variation: 5,
        variationStr: '5',
        value: 1466,
        valueStr: '1466',
        isIncrease: false,
        icon: 'icon-shoucangtianchong'
    },
    {
        tagName: '硬币',
        variation: 5,
        variationStr: '5',
        value: 1466,
        valueStr: '1466',
        isIncrease: false,
        icon: 'icon-toubix'
    },
    {
        tagName: '评论',
        variation: 5,
        variationStr: '5',
        value: 1466,
        valueStr: '1466',
        isIncrease: false,
        icon: 'icon-jiaoliuxuanzhong'
    },
    {
        tagName: '弹幕',
        variation: 5,
        variationStr: '5',
        value: 1466,
        valueStr: '1466',
        isIncrease: false,
        icon: 'icon-danmushu'
    },
    {
        tagName: '分享',
        variation: 0,
        variationStr: '0',
        value: 0,
        valueStr: '0',
        isIncrease: false,
        icon: 'icon-fenxiang1'
    },
    {
        tagName: '充电',
        variation: 0,
        variationStr: '0',
        value: 0,
        valueStr: '0',
        isIncrease: false,
        icon: 'icon-BMLdingdan'
    },
])
function onCellChange(id: number, tag: string) {
    curCell.value = id
    curCellTag.value = tag
    option = options[curCellTag.value]
    if(curCell.value==0){
        option.xAxis['data'] = ['2025/1/31', '2025/2/1', '2025/2/2', '2025/2/3', '2025/2/4', '2025/2/5']
        option.series[0]['data'] = ['85', '87', '127', '190', '150', '54']
        option.series[1]['data'] = ['95', '107', '167', '250', '190', '64']
    }else{
        option.xAxis['data'] = ['2025/1/31', '2025/2/1', '2025/2/2', '2025/2/3', '2025/2/4', '2025/2/5']
        option.series[0]['data'] = ['197', '87', '127', '190', '150', '267']
    }
    myChart.setOption(option, true)
}

type EChartsOption = echarts.EChartsOption;
const canvas = ref<HTMLDivElement | null>(null);
var myChart = null;
var option: EChartsOption = null
function initChart() {
    if (canvas.value) {
        myChart = echarts.init(canvas.value);
        option = options[curCellTag.value]
        option.xAxis['data'] = ['2025/1/31', '2025/2/1', '2025/2/2', '2025/2/3', '2025/2/4', '2025/2/5']
        option.series[0]['data'] = ['85', '87', '127', '190', '150', '54']
        option.series[1]['data'] = ['95', '107', '167', '250', '190', '64']
        if (option) {
            myChart.setOption(option);
        } else {
            ElMessage.error('Echarts配置信息获取失败！')
        }
        window.addEventListener('resize', () => {
            myChart.resize();
        });
    } else {
        ElMessage.error('Echarts画布为空！')
    }
}
onMounted(() => {
    initChart();
});
</script>
<style scoped lang="less">
.cell-ac {
    background-color: #f69;
}

.cell-di-down {
    transform: rotate(90deg);
    color: #2ac864;
}

.cell-di-up {
    transform: rotate(-90deg);
    color: #f69;
}

.cell-dn-down {
    color: #2ac864;
}

.cell-dn-up {
    color: #f69;
}

.pop-menu-right {
    padding: 5px 12px;
    margin-left: 12px;
    border: 1px solid #c9ccd0;
    border-radius: 6px;
    cursor: pointer;

    span {
        font-size: 13px;
        white-space: nowrap;
        font-weight: 700;
        color: #000;
    }

    svg {
        transform: rotate(90deg);
        margin-left: 4px;
        width: 12px;
        height: 12px;
    }
}

.content {
    width: 1040px;
    margin: 0 auto;

    .header {
        .header-nav {
            margin: 0 0 40px;
            padding-top: 32px;

            .item {
                position: relative;
                font-weight: 500;
                font-size: 18px;
                line-height: 25px;
                cursor: pointer;

                .cursor {
                    position: absolute;
                    bottom: -7px;
                    height: 4px;
                    width: 24px;
                    background-color: var(--hover-blue);
                    border-radius: 2px;
                    margin: 0 24px;
                }
            }

            .item:nth-child(n+2) {
                margin-left: 40px;
            }

            .item:hover {
                color: var(--hover-blue);
            }
        }
    }

    .video-tab {
        padding-bottom: 56px;

        .core-data {
            background-color: #fff;
            padding: 24px;
            border-radius: 12px;
            margin-bottom: 24px;

            .title {
                .left {
                    .name {
                        margin-right: 4px;
                        color: #18191c;
                        font-weight: 600;
                        font-size: 18px;
                        line-height: 25px;
                    }
                }

                .right {
                    .pop-menu-left {
                        font-size: 13px;
                        color: #61666d;
                        padding: 0 13px;
                        border-width: 0;
                        border-right-width: 1px;
                        border-color: #c9ccd0;
                        border-style: solid;
                    }

                    .export {
                        display: inline-block;
                        width: 94px;
                        height: 32px;
                        margin-left: 16px;
                        padding: 6px 10px;
                        line-height: 20px;
                        cursor: pointer;
                        border-radius: 6px;

                        img {
                            width: 16px;
                            height: 16px;
                            vertical-align: -3px;
                        }

                        span {
                            font-size: 13px;
                            color: #00aeec;
                            margin-left: 6px;
                            font-weight: 500;
                        }
                    }

                    .export:hover {
                        background-color: #dbf5ff;
                    }
                }
            }

            .info {
                display: grid;
                grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
                grid-template-rows: 1fr 1fr;
                gap: 15px;
                margin: 24px 0 15px 0;

                .cell {
                    position: relative;
                    display: inline-block;
                    width: 186px;
                    height: 80px;
                    padding: 12px 16px 16px 16px;
                    background-color: #fafafa;
                    cursor: pointer;
                    border-radius: 12px;
                    white-space: nowrap;
                    overflow: hidden;

                    .cell-bg {
                        position: absolute;
                        color: #fff;
                        width: 100px;
                        height: 80px;
                        right: -10px;
                        top: -10px;
                        transform: rotate(-20deg);
                        opacity: 0.4;
                        z-index: 1;
                    }

                    .top {
                        .cell-title {
                            line-height: 20px;

                            span {
                                color: #666;
                                font-size: 14px;
                                font-weight: 700;
                            }
                        }

                        .cell-diff {
                            z-index: 2;

                            .diff-icon {
                                width: 7px;
                                height: 7px;
                                fill: currentColor;
                                vertical-align: -.15em;
                                overflow: hidden;
                            }

                            .diff-num {
                                margin-left: 4px;
                                font-size: 15px;
                                font-weight: 700;
                            }
                        }
                    }

                    .value {
                        color: #000;
                        line-height: 24px;
                        font-size: 18px;
                        font-weight: 700;
                    }
                }

                .cell:hover {
                    background-color: #f69;
                }

                .cell:hover .cell-title span,
                .cell:hover .value,
                .cell:hover .diff-num {
                    color: #fff;
                }
            }

            .chart {
                margin-top: 8px;
                padding: 24px 24px 36px 24px;
                border: 1px solid #f1f2f3;
                border-radius: 12px;

                .chart-header {
                    height: 22px;
                    line-height: 22px;

                    .charts-title {
                        color: #18191c;
                        font-weight: 600;
                        font-size: 16px;
                    }

                    .legends {
                        margin-left: 40px;

                        .legends {
                            color: var(--font-color-black);
                            font-size: 14px;
                            font-weight: 400;
                        }

                        .legends::before {
                            content: " ";
                            display: inline-block;
                            width: 16px;
                            height: 4px;
                            border-radius: 2px;
                            margin-right: 10px;
                        }

                        .self::before {
                            background-color: #ff4684;
                        }

                        .fans::before {
                            background-color: #00aeec;
                        }
                    }
                }

                .wrapper {
                    position: relative;

                    .canvas {
                        width: 953px;
                        height: 300px;
                    }
                }
            }
        }
    }
}
</style>