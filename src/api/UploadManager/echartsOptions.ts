import * as echarts from 'echarts';
interface optionContainer {
    "播放量": echarts.EChartsOption
    "空间访客": echarts.EChartsOption
    "净增粉丝": echarts.EChartsOption
    "点赞": echarts.EChartsOption
    "收藏": echarts.EChartsOption
    "硬币": echarts.EChartsOption
    "评论": echarts.EChartsOption
    "弹幕": echarts.EChartsOption
    "分享": echarts.EChartsOption
    "充电": echarts.EChartsOption
}
export const options: optionContainer = {
    "播放量": {
        xAxis: {
            type: 'category',
            boundaryGap: true,
            data: [],
            axisLine: {//设置轴线
                show: false,
            },
            axisTick: {
                show: false, // 设置刻度线
            },
            axisLabel: {//设置标签
                color: '#9499a0',
                fontWeight: 'bold',
                interval: 'auto', // 自动调整间隔
            },
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                color: '#9499a0',
                fontWeight: 'bold'
            },
        },
        grid: {
            left: '0',
            right: '0',
            bottom: '0',
            containLabel: true
        },
        series: [
            {
                name: '总播放量',
                type: 'line',
                stack: 'Total',
                data: [],
                itemStyle: {
                    color: '#ff4684',
                },
                symbolSize: 13,
                showSymbol: false,
                emphasis: {
                    focus: 'series',
                },
                lineStyle: {
                    width: 3,
                    shadowBlur: 40,
                    shadowColor: '#ff4684',
                    shadowOffsetY: 10
                }
            },
            {
                name: '粉丝播放量',
                type: 'line',
                data: [],
                itemStyle: {
                    color: '#00aeec',
                },
                symbolSize: 13,
                showSymbol: false,
                emphasis: {
                    focus: 'series',
                },
                lineStyle: {
                    width: 3,
                    shadowBlur: 40,
                    shadowColor: '#00aeec',
                    shadowOffsetY: 10
                }
            }
        ],
        tooltip: {
            trigger: 'axis'
        },
    },
    "空间访客": {
        xAxis: {
            type: 'category',
            boundaryGap: true,
            data: [],
            axisLine: {
                show: false,
            },
            axisTick: {
                show: false,
            },
            axisLabel: {
                color: '#9499a0',
                fontWeight: 'bold',
                interval: 'auto',
            },
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                color: '#9499a0',
                fontWeight: 'bold'
            },
        },
        grid: {
            left: '0',
            right: '0',
            bottom: '0',
            containLabel: true
        },
        series: [
            {
                name: '空间访客',
                type: 'line',
                data: [],
                itemStyle: {
                    color: '#ff4684',
                },
                symbolSize: 13,
                showSymbol: false,
                emphasis: {
                    focus: 'series',
                },
                lineStyle: {
                    width: 3,
                    shadowBlur: 40,
                    shadowColor: '#ff4684',
                    shadowOffsetY: 10
                }
            },
        ],
        tooltip: {
            trigger: 'axis'
        },
    },
    "净增粉丝": {
        xAxis: {
            type: 'category',
            boundaryGap: true,
            data: [],
            axisLine: {
                show: false,
            },
            axisTick: {
                show: false,
            },
            axisLabel: {
                color: '#9499a0',
                fontWeight: 'bold',
                interval: 'auto',
            },
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                color: '#9499a0',
                fontWeight: 'bold'
            },
        },
        grid: {
            left: '0',
            right: '0',
            bottom: '0',
            containLabel: true
        },
        series: [
            {
                name: '净增粉丝',
                type: 'line',
                data: [],
                itemStyle: {
                    color: '#ff4684',
                },
                symbolSize: 13,
                showSymbol: false,
                emphasis: {
                    focus: 'series',
                },
                lineStyle: {
                    width: 3,
                    shadowBlur: 40,
                    shadowColor: '#ff4684',
                    shadowOffsetY: 10
                }
            },
        ],
        tooltip: {
            trigger: 'axis'
        },
    },
    "点赞": {
        xAxis: {
            type: 'category',
            boundaryGap: true,
            data: [],
            axisLine: {
                show: false,
            },
            axisTick: {
                show: false,
            },
            axisLabel: {
                color: '#9499a0',
                fontWeight: 'bold',
                interval: 'auto',
            },
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                color: '#9499a0',
                fontWeight: 'bold'
            },
        },
        grid: {
            left: '0',
            right: '0',
            bottom: '0',
            containLabel: true
        },
        series: [
            {
                name: '点赞',
                type: 'line',
                data: [],
                itemStyle: {
                    color: '#ff4684',
                },
                symbolSize: 13,
                showSymbol: false,
                emphasis: {
                    focus: 'series',
                },
                lineStyle: {
                    width: 3,
                    shadowBlur: 40,
                    shadowColor: '#ff4684',
                    shadowOffsetY: 10
                }
            },
        ],
        tooltip: {
            trigger: 'axis'
        },
    },
    "收藏": {
        xAxis: {
            type: 'category',
            boundaryGap: true,
            data: [],
            axisLine: {
                show: false,
            },
            axisTick: {
                show: false,
            },
            axisLabel: {
                color: '#9499a0',
                fontWeight: 'bold',
                interval: 'auto',
            },
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                color: '#9499a0',
                fontWeight: 'bold'
            },
        },
        grid: {
            left: '0',
            right: '0',
            bottom: '0',
            containLabel: true
        },
        series: [
            {
                name: '收藏',
                type: 'line',
                data: [],
                itemStyle: {
                    color: '#ff4684',
                },
                symbolSize: 13,
                showSymbol: false,
                emphasis: {
                    focus: 'series',
                },
                lineStyle: {
                    width: 3,
                    shadowBlur: 40,
                    shadowColor: '#ff4684',
                    shadowOffsetY: 10
                }
            },
        ],
        tooltip: {
            trigger: 'axis'
        },
    },
    "硬币": {
        xAxis: {
            type: 'category',
            boundaryGap: true,
            data: [],
            axisLine: {
                show: false,
            },
            axisTick: {
                show: false,
            },
            axisLabel: {
                color: '#9499a0',
                fontWeight: 'bold',
                interval: 'auto',
            },
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                color: '#9499a0',
                fontWeight: 'bold'
            },
        },
        grid: {
            left: '0',
            right: '0',
            bottom: '0',
            containLabel: true
        },
        series: [
            {
                name: '硬币',
                type: 'line',
                data: [],
                itemStyle: {
                    color: '#ff4684',
                },
                symbolSize: 13,
                showSymbol: false,
                emphasis: {
                    focus: 'series',
                },
                lineStyle: {
                    width: 3,
                    shadowBlur: 40,
                    shadowColor: '#ff4684',
                    shadowOffsetY: 10
                }
            },
        ],
        tooltip: {
            trigger: 'axis'
        },
    },
    "评论": {
        xAxis: {
            type: 'category',
            boundaryGap: true,
            data: [],
            axisLine: {
                show: false,
            },
            axisTick: {
                show: false,
            },
            axisLabel: {
                color: '#9499a0',
                fontWeight: 'bold',
                interval: 'auto',
            },
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                color: '#9499a0',
                fontWeight: 'bold'
            },
        },
        grid: {
            left: '0',
            right: '0',
            bottom: '0',
            containLabel: true
        },
        series: [
            {
                name: '评论',
                type: 'line',
                data: [],
                itemStyle: {
                    color: '#ff4684',
                },
                symbolSize: 13,
                showSymbol: false,
                emphasis: {
                    focus: 'series',
                },
                lineStyle: {
                    width: 3,
                    shadowBlur: 40,
                    shadowColor: '#ff4684',
                    shadowOffsetY: 10
                }
            },
        ],
        tooltip: {
            trigger: 'axis'
        },
    },
    "弹幕": {
        xAxis: {
            type: 'category',
            boundaryGap: true,
            data: [],
            axisLine: {
                show: false,
            },
            axisTick: {
                show: false,
            },
            axisLabel: {
                color: '#9499a0',
                fontWeight: 'bold',
                interval: 'auto',
            },
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                color: '#9499a0',
                fontWeight: 'bold'
            },
        },
        grid: {
            left: '0',
            right: '0',
            bottom: '0',
            containLabel: true
        },
        series: [
            {
                name: '弹幕',
                type: 'line',
                data: [],
                itemStyle: {
                    color: '#ff4684',
                },
                symbolSize: 13,
                showSymbol: false,
                emphasis: {
                    focus: 'series',
                },
                lineStyle: {
                    width: 3,
                    shadowBlur: 40,
                    shadowColor: '#ff4684',
                    shadowOffsetY: 10
                }
            },
        ],
        tooltip: {
            trigger: 'axis'
        },
    },
    "分享": {
        xAxis: {
            type: 'category',
            boundaryGap: true,
            data: [],
            axisLine: {
                show: false,
            },
            axisTick: {
                show: false,
            },
            axisLabel: {
                color: '#9499a0',
                fontWeight: 'bold',
                interval: 'auto',
            },
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                color: '#9499a0',
                fontWeight: 'bold'
            },
        },
        grid: {
            left: '0',
            right: '0',
            bottom: '0',
            containLabel: true
        },
        series: [
            {
                name: '分享',
                type: 'line',
                data: [],
                itemStyle: {
                    color: '#ff4684',
                },
                symbolSize: 13,
                showSymbol: false,
                emphasis: {
                    focus: 'series',
                },
                lineStyle: {
                    width: 3,
                    shadowBlur: 40,
                    shadowColor: '#ff4684',
                    shadowOffsetY: 10
                }
            },
        ],
        tooltip: {
            trigger: 'axis'
        },
    },
    "充电": {
        xAxis: {
            type: 'category',
            boundaryGap: true,
            data: [],
            axisLine: {
                show: false,
            },
            axisTick: {
                show: false,
            },
            axisLabel: {
                color: '#9499a0',
                fontWeight: 'bold',
                interval: 'auto',
            },
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                color: '#9499a0',
                fontWeight: 'bold'
            },
        },
        grid: {
            left: '0',
            right: '0',
            bottom: '0',
            containLabel: true
        },
        series: [
            {
                name: '充电',
                type: 'line',
                data: [],
                itemStyle: {
                    color: '#ff4684',
                },
                symbolSize: 13,
                showSymbol: false,
                emphasis: {
                    focus: 'series',
                },
                lineStyle: {
                    width: 3,
                    shadowBlur: 40,
                    shadowColor: '#ff4684',
                    shadowOffsetY: 10
                }
            },
        ],
        tooltip: {
            trigger: 'axis'
        },
    }
}
