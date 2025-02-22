<template>
    <div class="player-wrap">
        <div class="bpx-player-primary-area flex-col">
            <div ref="playerArea" class="bpx-player-video-area">
                <div ref="VideoPlayer" class="core-player" id="core-player"></div>
            </div>
            <div class="bpx-player-sending-area">
                <div class="bpx-player-sending-bar flex-row-ac jc-spb">
                    <div class="bpx-player-video-info flex-row-ac">
                        <div class="bpx-player-video-info-online">
                            <b>{{ watchCount }}</b>人正在看
                        </div>
                        <div class="bpx-player-video-info-divide">，</div>
                        <div class="bpx-player-video-info-dm nto">{{`已装填${danmuCount}条弹幕`}}</div>
                    </div>
                    <div ref="danmuEmitter" class="bpx-player-dm-root flex-row-ac">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import Artplayer from 'artplayer';
import artplayerPluginDanmuku from 'artplayer-plugin-danmuku';
import { ElMessage } from 'element-plus';

import { ref, onMounted, onBeforeUnmount, shallowRef, nextTick, watch, PropType } from "vue";

import { WebSocketService } from '@/util/webSocket'
import { UserVideoQuery, addPlay, postDanmu } from '@/api/Video';
import { DateStringType, Interaction } from '@/api/enums';
import { getFormatCurTime } from '@/util/index'
import { useUserStore } from '@/util/userStore';
import { Danmu, Danmu as MyDanmu } from '@/api/Models';

const props = defineProps({
    dynamicUrl: String,
    uid: Number,
    vid: Number,
    danmuList: {
        type: Object as PropType<MyDanmu[]>,
        default: []
    }
});
const danmuku = ref([])
const danmuCount = ref<number>(0)
const userStore = useUserStore()
const canAddPlay = ref<boolean>(true)
const watchCount = ref<number>(0)
const emit = defineEmits(['get-instance']);
const instance = shallowRef(null);
const VideoPlayer = ref<HTMLDivElement>(null);
const danmuEmitter = ref(null)
const option: Artplayer['Option'] = {
    autoSize: true,
    fullscreen: true,
    fullscreenWeb: true,
    autoOrientation: true,
    url: '',
    container: '.core-player',
    plugins: [
        artplayerPluginDanmuku({
            danmuku: danmuku.value,
            mount: '.bpx-player-dm-root',
            theme: 'light',
            beforeEmit(danmu) {
                if (!userStore.token) {
                    ElMessage({
                        message: '登录后可发送弹幕！',
                        type: 'warning'
                    })
                    return false;
                }
                if (danmu.text.length == 0) {
                    ElMessage({
                        message: '请输入弹幕内容！',
                        type: 'warning'
                    })
                    return false;
                }
                callPostDanmu(danmu)
                sendTestMessage(danmu.text)
                return true
            },
        }),
    ],
}
//websocket
const websocket = new WebSocketService('ws://localhost:8091');
const sendTestMessage = (text: string) => {
    websocket.sendMessage(text);
};
function callPostDanmu(e: Object) {
    const time = new Date()
    const query: Danmu = {
        uid: props.uid,
        vid: props.vid,
        content: e.text,
        fontsize: 14,
        mode: e.mode,
        color: e.color,
        timePoint: e.time,
        status: 1,
        createDate: getFormatCurTime(time.getTime(), DateStringType.ALL)
    }
    onPostDanmu(query)
}
async function onAddPlay(query: UserVideoQuery) {
    try {
        await addPlay(query)
    } catch (error) {
        console.log(error)
    }
}
async function onPostDanmu(query: MyDanmu) {
    try {
        const res = await postDanmu(query)
        if (res.code == 200) {
            ElMessage({
                message: '发送成功！',
                type: 'success'
            })
        }
    } catch (error) {
        console.log(error)
    }
}
watch(() => props.dynamicUrl, (newVal) => {
    if (newVal && instance && instance.value) {
        instance.value.switch = newVal
    }
}, { immediate: true, deep: true }
)
watch(() => props.danmuList, (newVal) => {
    if (newVal && instance && instance.value) {
        newVal.forEach(e=>{
            danmuku.value.push({
                text: e.content,
                time: e.timePoint,
                color: e.color,
                mode: e.mode
            })
        })
        instance.value.plugins.artplayerPluginDanmuku.load();
        danmuCount.value = newVal.length
    }
}, { immediate: true, deep: true }
)
onMounted(() => {
    instance.value = new Artplayer(option);
    nextTick(() => {
        emit('get-instance', instance.value);
    });

    websocket.connect();
    websocket.onMessage((message: string) => {
        instance.value.plugins.artplayerPluginDanmuku.emit({ text: message, time: instance.value.currentTime + 2 });
    });
    websocket.onClientCountChange((count) => {
        watchCount.value = count;
    });

    instance.value.on('play', () => {
        const time = new Date()
        const query: UserVideoQuery = {
            uid: props.uid,
            vid: props.vid,
            actionType: Interaction.PLAY,
            actionTime: getFormatCurTime(time.getTime(), DateStringType.ALL)
        }
        if (canAddPlay.value) {
            canAddPlay.value = false
            onAddPlay(query)
        }
    })
})
onBeforeUnmount(() => {
    if (instance.value) {
        instance.value.destroy(false);
    }
    websocket.close();
});
</script>
<style scoped lang="less">
.player-wrap {
    height: 476px;
    position: relative;

    .bpx-player-primary-area {
        flex-wrap: nowrap;
        height: 100%;
        width: 100%;

        .bpx-player-video-area {
            position: relative;
            background-color: var(--black);
            flex: 1;
            overflow: hidden;

            img {
                height: 100%;
                width: 100%;
                object-fit: cover;
            }

            .core-player {
                height: 100%;
                width: 100%;
            }

            .canvas {
                position: absolute;
                width: 100%;
                height: 80%;
                top: 0;
                left: 0;
                z-index: 3;
            }
        }

        .bpx-player-sending-area {
            box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1);

            .bpx-player-sending-bar {
                background: var(--white);
                height: 46px;
                position: relative;
                padding: 0 12px;

                .bpx-player-video-info {
                    margin-right: 24px;
                    width: auto;
                    flex-shrink: 1;
                    height: 16px;
                    overflow: hidden;
                    position: relative;
                    user-select: none;
                    white-space: nowrap;

                    .bpx-player-video-info-online,
                    .bpx-player-video-info-divide,
                    .bpx-player-video-info-dm {
                        font-size: 13px;
                        line-height: 18px;
                        color: var(--font-color-gray2);
                        position: relative;

                        b {
                            font-weight: 400;
                            margin-right: 3px;
                        }
                    }
                }

                .bpx-player-dm-root {
                    flex: auto;
                    height: 34px;
                }
            }
        }
    }
}
</style>