<!-- 备份原版whisper -->
<template>
    <div class="bili-im flex-row">
        <div class="left rpos">
            <div class="title">
                <span>近期消息</span>
            </div>
            <div class="list-container rpos" ref="scrollContainer">
                <div class="list  rpos" ref="dynamic">
                    <div :class="curUser == e.wid ? 'list-item flex-row rpos cur-bgc' : 'list-item flex-row rpos'"
                        v-for="e in listReactive.WUL" :key="e.wid" @click="curUser = e.wid">
                        <div class="avatar rpos"></div>
                        <div class="name-box flex-col jcc forbid-select">
                            <div class="name flex-row-ac">
                                <div class="name-value nto">{{ e.name }}</div>
                            </div>
                            <div class="last-word nto">{{ e.lastWord }}</div>
                        </div>
                        <div class="close flex-row-ac jcc">
                            <i class="iconfont icon-guanbixiao"></i>
                        </div>
                        <div class="red-dot-notify" v-show="!e.isRead"></div>
                    </div>
                    <div class="ps__rail-y" ref="targetScroll">
                        <div class="ps__thumb-y" ref="scrollbar"
                            :style="`transform: translateY(${scrollTop * ((sh2 + ch1) / sh2)}px);height:${ch1 / sh2 * ch1}px;`"
                            @mousedown="onMouseDown"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="right">
            <div class="dialog flex-col-st">
                <div class="right-title jcc flex-row-ac rpos">
                    <span>金刚狼迷</span>
                    <div class="action-menu">
                        <el-dropdown trigger="click">
                            <i class="iconfont icon-gengduo1 action-menu-i"></i>
                            <template #dropdown>
                                <div class="be-dropdown-menu">
                                    <div class="be-dropdown-item">置顶聊天</div>
                                    <div class="be-dropdown-item">开启免打扰</div>
                                    <div class="be-dropdown-item">加入黑名单</div>
                                    <div class="be-dropdown-item">举报该用户</div>
                                    <div class="be-dropdown-item">不接收推送</div>
                                </div>
                            </template>
                        </el-dropdown>
                    </div>
                </div>
                <div class="message-list rpos">
                    <div class="message-list-content">
                        <div class="msg-more">
                            <span class="no-more">没有更多消息了~</span>
                        </div>
                        <template v-for="e in listReactive.messages" :key="e.id">
                            <div class="msg-time" v-show="e.isShowTime">
                                <span class="time">{{ e.time }}</span>
                            </div>
                            <div :class="e.isMe ? 'msg-item rpos is-me' : 'msg-item rpos not-me'">
                                <a class="msg-item-avatar"></a>
                                <div class="message">
                                    <div
                                        :class="e.isImg ? 'message-content rpos is-img' : 'message-content rpos is-not-img'">
                                        <template v-if="!e.isImg">
                                            <!-- 需要表情时添加 -->
                                            <!-- <a class="emotion-items">
                          <div class="img-emoji"></div>
                        </a> -->
                                            {{ e.text }}
                                        </template>
                                        <img src="../../assets/images/无置顶视频.png" alt="" v-show="e.isImg"
                                            :width="`${e.width}px`" :height="`${e.height}px`">
                                    </div>
                                </div>
                            </div>
                        </template>
                    </div>
                </div>
                <div class="send-box">
                    <div class="row flex-row-ac">
                        <div class="space-margin">
                            <label class="image-upload-btn"></label>
                        </div>
                        <div class="space-margin" @click="addList">
                            <button class="emotion-btn-box"></button>
                        </div>
                    </div>
                    <div class="input-box">
                        <textarea class="core-style" maxlength="500" v-model.trim="inputText.text"></textarea>
                        <div class="indicator"><span>{{ inputText.length }}/500</span></div>
                    </div>
                    <div class="sendBtn flex-row-ac jce">
                        <button
                            :class="inputText.length > 0 && inputText.length <= 500 ? 'btn btn-ac' : 'btn btn-no-ac'">发送</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import "@/styles/MessageCenter/index.less";
import { ref, onMounted, onBeforeUnmount, reactive, watch } from "vue";
//当前激活的通话
const curUser = ref(1);
//左侧近期通信用户列表和右侧消息列表
const listReactive = reactive({
    WUL: [
        {
            id: 1,
            name: "金刚狼迷",
            intro: "",
            imgSrc: "",
            wid: 1,
            lastWord: "保佑",
            isRead: true,
        },
        {
            id: 1,
            name: "金刚狼迷",
            intro: "",
            imgSrc: "",
            wid: 2,
            lastWord: "保佑",
            isRead: false,
        },
        {
            id: 1,
            name: "金刚狼迷",
            intro: "",
            imgSrc: "",
            wid: 3,
            lastWord: "保佑",
            isRead: false,
        },
        {
            id: 1,
            name: "金刚狼迷",
            intro: "",
            imgSrc: "",
            wid: 4,
            lastWord: "保佑",
            isRead: false,
        },
        {
            id: 1,
            name: "金刚狼迷",
            intro: "",
            imgSrc: "",
            wid: 5,
            lastWord: "保佑",
            isRead: false,
        },
        {
            id: 1,
            name: "金刚狼迷",
            intro: "",
            imgSrc: "",
            wid: 6,
            lastWord: "保佑",
            isRead: false,
        },
        {
            id: 1,
            name: "金刚狼迷",
            intro: "",
            imgSrc: "",
            wid: 7,
            lastWord: "保佑",
            isRead: false,
        },
        {
            id: 1,
            name: "金刚狼迷",
            intro: "",
            imgSrc: "",
            wid: 8,
            lastWord: "保佑",
            isRead: false,
        },
        {
            id: 1,
            name: "金刚狼迷",
            intro: "",
            imgSrc: "",
            wid: 9,
            lastWord: "保佑",
            isRead: false,
        },
    ],
    messages: [
        {
            id: 1,
            text: "测试数据测试数据测试数据测试数据",
            isImg: false,
            isMe: false,
            isShowTime: true,
            time: "2021年12月23日 19:24",
            width: 0,
            height: 0,
        },
        {
            id: 2,
            text: "测试数据测试数据测试数据测试数据",
            isImg: false,
            isMe: false,
            isShowTime: false,
            time: "",
            width: 0,
            height: 0,
        },
        {
            id: 3,
            text: "测试数据测试数据测试数据测试数据测试数据测试数据测试数据测试数据测试数据测试数据测试数据测试数据测试数据测试数据测试数据测试数据测试数据测试数据测试数据测试数据测试数据测试数据测试数据测试数据测试数据测试数据测试数据测试数据测试数据测试数据测试数据测试数据测试数据测试数据测试数据测试数据测试数据测试数据测试数据测试数据测试数据测试数据测试数据测试数据测试数据测试数据测试数据测试数据测试数据测试数据测试数据测试数据测试数据测试数据测试数据测试数据测试数据测试数据测试数据测试数据测试数据测试数据测试数据测试数据",
            isImg: false,
            isMe: true,
            isShowTime: true,
            time: "2021年12月23日 19:24",
            width: 0,
            height: 0,
        },
        {
            id: 4,
            text: "测试数据测试数据测试数据测试数据",
            isImg: true,
            isMe: true,
            isShowTime: false,
            time: "2021年12月23日 19:24",
            width: 276,
            height: 150,
        },
    ],
});
const inputText = reactive({
    text: "",
    length: 0,
});
watch(inputText, (newValue: any) => {
    inputText.length = newValue.text.length;
});
//自定义滚动条
const scrollContainer = ref<HTMLElement | null>(null);
const targetScroll = ref<HTMLElement | null>(null);
const scrollbar = ref<HTMLElement | null>(null);
const dynamic = ref<HTMLElement | null>(null);

const scrollTop = ref(0);
const sh1 = ref(0);
const ch1 = ref(0);
const sh2 = ref(0);
const ch2 = ref(0);

const mouse = reactive({ sy: 0 });
const dragging = ref(false);

const updateScrollbar = () => {
    if (scrollContainer.value) {
        scrollTop.value = scrollContainer.value.scrollTop;
    }
};

const onMouseDown = (event: MouseEvent) => {
    if (!scrollbar.value) return;
    dragging.value = true;
    mouse.sy = event.clientY;
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
};

const onMouseMove = (event: MouseEvent) => {
    if (!dragging.value || !scrollContainer.value) return;
    const deltaY = event.clientY - mouse.sy;
    let newScrollTop = scrollContainer.value.scrollTop + (deltaY * sh2.value) / ch1.value;
    newScrollTop = Math.max(0, Math.min(newScrollTop, sh1.value - ch1.value));
    scrollContainer.value.scrollTop = newScrollTop;
    mouse.sy = event.clientY;
};

const onMouseUp = () => {
    dragging.value = false;
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
};

onMounted(() => {
    document.body.ondragstart = () => false;

    if (scrollContainer.value && targetScroll.value) {
        const resizeObserver = new ResizeObserver((entries) => {
            for (let entry of entries) {
                const target = entry.target as HTMLElement;
                if (target === scrollContainer.value) {
                    sh1.value = target.scrollHeight;
                    ch1.value = target.clientHeight;
                } else if (target === targetScroll.value) {
                    sh2.value = target.scrollHeight;
                    ch2.value = target.clientHeight;
                } else if (target == dynamic.value) {
                    sh1.value = scrollContainer.value!.scrollHeight;
                    updateScrollbar();
                }
            }
            updateScrollbar();
        });

        resizeObserver.observe(scrollContainer.value);
        resizeObserver.observe(targetScroll.value);
        resizeObserver.observe(dynamic.value);

        scrollContainer.value.addEventListener("scroll", updateScrollbar);

        onBeforeUnmount(() => {
            scrollContainer.value?.removeEventListener("scroll", updateScrollbar);
            resizeObserver.disconnect();
        });
    }
});

function addList() {
    const t = listReactive.WUL[listReactive.WUL.length - 1];
    listReactive.WUL.push({
        id: 1,
        name: "长沙市",
        intro: "",
        imgSrc: "",
        wid: t.wid + 1,
        lastWord: "测试",
        isRead: true,
    });
}
</script>

<style lang="less" scoped>
@import '@/styles/MessageCenter/whisper.less';
</style>