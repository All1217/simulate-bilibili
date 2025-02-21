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
                  <div :class="e.isImg ? 'message-content rpos is-img' : 'message-content rpos is-not-img'">
                    <template v-if="!e.isImg">
                      <!-- 需要表情时添加 -->
                      <!-- <a class="emotion-items">
                        <div class="img-emoji"></div>
                      </a> -->
                      {{ e.text }}
                    </template>
                    <img src="../../assets/images/无置顶视频.png" alt="" v-show="e.isImg" :width="`${e.width}px`"
                      :height="`${e.height}px`">
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
.btn-no-ac {
  background-color: #fff;
  color: #333;
  border: 1px solid #e7e7e7;
}

.btn-ac {
  background-color: #1389bf;
  color: #fff;
  border: 1px solid #1389bf;
}

.btn-ac:hover {
  background-color: #45b3e6;
  border: 1px solid #45b3e6;
}

.action-menu {
  position: absolute;
  width: 30px;
  height: 30px;
  top: 10px;
  right: 0;
  z-index: 2;
  line-height: 30px;
}

.action-menu-i {
  font-size: 18px;
  color: #999;
  text-align: center;
}

.cur-bgc {
  background-color: #e3e5e7;
}

.bili-im {
  background-color: #fff;
  box-shadow: 0 2px 4px 0 rgba(121, 146, 185, 0.54);
  border-radius: 4px;
  height: 100%;

  .left {
    width: 240px;
    border-right: 1px solid #e9eaec;

    .title {
      font-size: 12px;
      color: #666;
      padding-left: 24px;
      line-height: 35px;
      height: 36px;
      border-bottom: 1px solid #e9eaec;
      user-select: none;
      overflow: hidden;
    }

    .list-container {
      height: calc(100% - 36px);
      overflow-y: scroll;

      &::-webkit-scrollbar {
        display: none;
      }

      .list {
        .list-item {
          z-index: 1;
          width: 100%;
          padding: 19px 24px;
          position: relative;
          cursor: pointer;

          .avatar {
            touch-action: none;
            background-image: url(../../assets/images/logo.png);
            display: block;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            flex-shrink: 0;
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            background-color: #fff;
            margin-right: 8px;
          }

          .name-box {
            .name {
              width: 155px;
              color: #333;
              font-size: 14px;
              min-height: 16px;
              line-height: 1;

              .name-value {
                flex: 1;
              }
            }

            .last-word {
              color: #999;
              padding: 8px 0;
              margin-bottom: -6px;
              width: 155px;
            }
          }

          .close {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            width: 24px;
            transform: translateX(-100%);
            opacity: 0;
            transition: all 0.3s ease;
            color: #999;
          }

          .red-dot-notify {
            text-align: center;
            position: absolute;
            background-color: #fb7299;
            width: 6px;
            height: 6px;
            border-radius: 50%;
            top: 24px;
            right: 15px;
          }
        }

        .list-item:hover {
          background-color: #e3e4e5;
        }

        .list-item:hover .close {
          opacity: 1;
          transform: translateX(0);
        }

        .ps__rail-y {
          position: absolute;
          top: 0;
          right: 0px;
          height: 100%;
          width: 8px;
          overflow: hidden;
          z-index: 10;
          opacity: 0;
          transition: opacity 0.2s linear;
          background-color: #ccc;

          .ps__thumb-y {
            position: absolute;
            width: 8px;
            right: 0px;
            top: 0;
            background-color: #61666d;
            border-radius: 4px;
            z-index: 15;
          }
        }
      }

      .list:hover .ps__rail-y {
        opacity: 0.35;
      }
    }
  }

  .right {
    width: calc(100% - 240px);

    .dialog {
      height: 100%;

      .right-title {
        height: 36px;
        border-bottom: 1px solid #e9eaec;
        text-align: center;

        span {
          font-size: 14px;
          color: #333;
        }
      }

      .message-list {
        flex: 1;
        overflow-x: hidden;
        overflow-y: scroll;
        background-color: #f4f5f7;

        .message-list-content {
          min-height: 100%;
          overflow: auto;

          .msg-more {
            padding: 16px 0 0;
            text-align: center;
            color: #23ade5;
            min-height: 38px;

            .no-more {
              color: #999;
            }
          }

          .not-me {
            .msg-item-avatar {
              float: left;
            }

            .message {
              position: relative;
              float: left;
              color: #fff;

              .message-content {
                background: #fff;
                color: #333;
                border-radius: 0 16px 16px 16px;
              }
            }
          }

          .is-me {
            .msg-item-avatar {
              float: right;
            }

            .message {
              position: relative;
              float: right;
              color: #fff;

              .message-content {
                background: #80b9f2;
                color: #fff;
                border-radius: 16px 0 16px 16px;
              }
            }
          }

          .msg-item {
            min-height: 48px;
            padding: 0 16px 16px;
            overflow: hidden;

            .msg-item-avatar {
              display: block;
              width: 30px;
              height: 30px;
              border-radius: 50%;
              background-color: #fff;
              background-size: cover;
              background-position: center;
              background-repeat: no-repeat;
              background-image: url(../../assets/images/logo.png);
            }

            .message {
              max-width: 480px;
              margin: 0 10px;
              overflow: hidden;

              .is-img {
                padding: 0;
              }

              .is-not-img {
                padding: 8px 16px;
              }

              .message-content {
                z-index: 1;
                line-height: 1.5;
                font-size: 14px;
                min-height: 37px;
                word-wrap: break-word;
                word-break: break-word;
                overflow: hidden;

                img {
                  width: 276px;
                  height: 150px;
                  background: #fff;
                  vertical-align: middle;
                  cursor: pointer;
                }

                .emotion-items {
                  display: inline-block;
                  width: 20px;
                  height: 20px;
                  overflow: hidden;
                  vertical-align: bottom;

                  .img-emoji {
                    height: 20px;
                    width: 20px;
                    background: top / 20px no-repeat;
                    background-image: url(../../assets/images/logo.png);
                  }
                }
              }
            }
          }

          .msg-time {
            padding: 16px 0 16px;
            text-align: center;

            .time {
              color: #999;
              font-size: 12px;
              line-height: 22px;
              margin: 0 10px;
            }
          }
        }
      }

      .send-box {
        height: 162px;
        border-top: 1px solid #d8d8d8;
        border-bottom-right-radius: 4px;
        background-color: #f4f5f7;
        flex-shrink: 0;
        padding: 0 16px;
        position: relative;
        z-index: 2;

        .row {
          height: 48px;
          -webkit-box-orient: horizontal;
          -webkit-box-direction: normal;
          -webkit-box-align: center;

          .space-margin {
            margin-right: 16px;

            .image-upload-btn {
              display: block;
              width: 22px;
              height: 21px;
              cursor: pointer;
              background: url(../../assets/images/MC_fileInput.png) no-repeat;
              background-size: 22px;
            }

            .emotion-btn-box {
              display: block;
              width: 24px;
              height: 24px;
              cursor: pointer;
              background: url(../../assets/images/MC_emotionBtn.png) center / 24px no-repeat;
              outline: none;
            }
          }
        }

        .input-box {
          position: relative;

          .core-style {
            height: 60px;
            width: 100%;
            letter-spacing: 1px;
            white-space: pre-wrap;
            color: #222;
            resize: none;
            background-color: transparent;
            font-size: 14px;
            vertical-align: baseline;
            outline: none;
            line-height: normal;
            border: none;
            word-break: break-word;
            word-wrap: break-word;
          }

          .indicator {
            bottom: -30px;
            right: 100px;
            color: #c0c0c0;
            position: absolute;
            padding: 1px;
            font-size: 12px;
          }
        }

        .sendBtn {
          height: 46px;

          .btn {
            border-radius: 4px;
            cursor: pointer;
            margin: 0;
            width: 88px;
            height: 30px;
            text-align: center;
            transition: all .3s ease;
          }
        }
      }
    }
  }
}
</style>