<template>
  <div class="video-comments">
    <div class="header">
      <div class="navbar flex-row-ac">
        <div class="comment-title flex-row-ac">
          <h2>评论</h2>
          <div class="count">{{ rootCount }}</div>
        </div>
        <div class="hot flex-row-ac">
          <div :class="sortType == 2 ? 'hot-switch-btn hot-ac' : 'hot-switch-btn hot-unac'"
            @click="switchSortType(CommentFilter.HOTTEST)">最热</div>
          <div class="sort-div"></div>
          <div :class="sortType == 1 ? 'hot-switch-btn hot-ac' : 'hot-switch-btn hot-unac'" class="hot-switch-btn"
            @click="switchSortType(CommentFilter.UP_TO_DATE)">最新</div>
        </div>
      </div>
      <div class="comment-box flex-row">
        <div class="user-avatar">
          <img class="avatar" :src="userStore.userInfo.avatar" alt=""></img>
        </div>
        <div class="comment-area" ref="commentArea">
          <div :class="showToolBar ? 'editor textarea-ac' : 'editor textarea-unac'">
            <textarea placeholder="请友善发言" @focus="showToolBar = true" v-model="inputComment"></textarea>
          </div>
          <div class="footer flex-row-ac" v-show="showToolBar">
            <div class="tool-btn flex-row-ac jcc">
              <i class="iconfont icon-buganxingqu"></i>
            </div>
            <div class="tool-btn flex-row-ac jcc">
              <i class="iconfont icon-aite"></i>
            </div>
            <div class="tool-btn flex-row-ac jcc">
              <i class="iconfont icon-tupian"></i>
            </div>
            <el-checkbox class="check" v-model="isSynchronous" label="同时转发到我的动态" size="small" />
            <button class="pub" @click="sendComment">发送</button>
          </div>
        </div>
      </div>
    </div>
    <div class="contents">
      <!-- 置顶以及自己刚发的评论 -->
      <div class="comment-item" v-for="e in comments" v-show="e.isTop >= 1">
        <div class="body">
          <a class="c-user-avatar">
            <img :src="e.avatar" class="c-avatar"></img>
          </a>
          <div class="main">
            <div class="c-header flex-row-ac">
              <a class="user-name">{{ e.nickname }}</a>
              <div class="user-up" v-show="authorId == e.uid">
                <img src="../../assets/images/up_pb.svg" alt="">
              </div>
            </div>
            <div class="c-content">
              <p class="c-contents">
                <i class="top" v-show="e.isTop == 1">置顶</i>
                <span>{{ e.content }}</span>
              </p>
            </div>
            <div class="c-footer flex-row-ac">
              <div class="pubdate">{{ e.createTime }}</div>
              <div class="like flex-row-ac">
                <i class="iconfont icon-zan"></i>
                <span>{{ formatCount(e.love) }}</span>
              </div>
              <div class="dislike flex-row-ac">
                <i class="iconfont icon-cai"></i>
              </div>
              <div class="reply" @click="onReply(e.id, true, e, e)">回复</div>
              <el-dropdown trigger="click">
                <div class="more-operate">
                  <i class="iconfont icon-gengduo1"></i>
                </div>
                <template #dropdown>
                  <div class="be-dropdown-menu">
                    <div class="be-dropdown-item" v-show="e.uid != userStore.userInfo.uid">举报</div>
                    <div class="be-dropdown-item" v-show="e.uid == userStore.userInfo.uid" @click="onDelete(e.id)">删除
                    </div>
                  </div>
                </template>
              </el-dropdown>
            </div>
          </div>
        </div>
        <div class="expander">
          <div class="expander-contents">
            <div class="e-body" v-if="replies && replies.has(e.id)" v-for="r in replies[e.id]" :key="r.id"
              v-show="expandConfig.curExpandId.has(e.id)">
              <a href="" class="e-avatar">
                <img :src="r.avatar" alt="" width="24px" height="24px">
              </a>
              <div class="e-main">
                <div class="c-content">
                  <p class="c-contents">
                    <a class="user-name">{{ r.nickname }}</a>
                    <a class="user-up" v-show="authorId == r.uid">
                      <img src="../../assets/images/up_pb.svg" alt="">
                    </a>
                    <span class="is-reply" v-show="r.parentId != e.id">回复</span>
                    <a class="reply-target" v-show="r.parentId != e.id">{{ `@${rt.get(r.toUserId)}：` }}</a>
                    <span>{{ r.content }}</span>
                  </p>
                </div>
              </div>
              <div class="c-footer flex-row-ac">
                <div class="pubdate">{{ r.createTime }}</div>
                <div class="like flex-row-ac">
                  <i class="iconfont icon-zan"></i>
                  <span>{{ formatCount(r.love) }}</span>
                </div>
                <div class="dislike flex-row-ac">
                  <i class="iconfont icon-cai"></i>
                </div>
                <div class="reply" @click="onReply(e.id, true, e, r)">回复</div>
                <el-dropdown trigger="click">
                  <div class="more-operate">
                    <i class="iconfont icon-gengduo1"></i>
                  </div>
                  <template #dropdown>
                    <div class="be-dropdown-menu">
                      <div class="be-dropdown-item" v-show="r.uid != userStore.userInfo.uid">举报</div>
                      <div class="be-dropdown-item" v-show="r.uid == userStore.userInfo.uid" @click="onDelete(r.id)">删除
                      </div>
                    </div>
                  </template>
                </el-dropdown>
              </div>
            </div>
            <!-- 回复的分页 -->
            <div class="e-footer flex-row-ac">
              <div class="pagination flex-row-ac" v-show="e.replyCount > 0 && expandConfig.curExpandId.has(e.id)">
                <el-pagination v-model:current-page="expandConfig.curReplyPage" :page-size="5" size="small"
                  :background="false" layout="total, prev, pager, next" :total="e.replyCount"
                  @current-change="(val: number) => handleCurrentChange(val, e)" />
                <span id="fold-btn" @click="onExpand(e.id, false)">收起</span>
              </div>
              <div class="total-reply flex-row-ac" v-show="e.replyCount > 0 && !expandConfig.curExpandId.has(e.id)">
                <span>共{{ e.replyCount }}条回复，</span>
                <span class="expand-btn" @click="onExpand(e.id, true)">点击查看</span>
              </div>
            </div>
          </div>
        </div>
        <div class="reply-container" v-show="expandConfig.reply && expandConfig.curReplyId == e.id">
          <div class="comment-box flex-row">
            <div class="user-avatar">
              <img :src="userStore.userInfo.avatar" alt="" class="avatar">
            </div>
            <div class="comment-area">
              <div class="editor textarea-ac">
                <textarea placeholder="请友善发言" v-model="inputReply"></textarea>
              </div>
              <div class="footer flex-row-ac">
                <div class="tool-btn flex-row-ac jcc">
                  <i class="iconfont icon-buganxingqu"></i>
                </div>
                <div class="tool-btn flex-row-ac jcc">
                  <i class="iconfont icon-tupian"></i>
                </div>
                <button class="pub" @click="sendReply">发送</button>
              </div>
            </div>
          </div>
        </div>
        <div class="divider"></div>
      </div>
      <!-- 非置顶 -->
      <div class="comment-item" v-for="e in comments" v-show="e.isTop == 0">
        <div class="body">
          <a class="c-user-avatar">
            <img :src="e.avatar" class="c-avatar"></img>
          </a>
          <div class="main">
            <div class="c-header flex-row-ac">
              <a class="user-name">{{ e.nickname }}</a>
              <!-- <a href="" class="user-level"></a> -->
              <div class="user-up" v-show="authorId == e.uid">
                <img src="../../assets/images/up_pb.svg" alt="">
              </div>
            </div>
            <div class="c-content">
              <p class="c-contents">
                <i class="top" v-show="e.isTop">置顶</i>
                <span>{{ e.content }}</span>
                <!-- <img src="" alt="表情"> -->
              </p>
            </div>
            <div class="c-footer flex-row-ac">
              <div class="pubdate">{{ e.createTime }}</div>
              <div class="like flex-row-ac">
                <i class="iconfont icon-zan"></i>
                <span>{{ formatCount(e.love) }}</span>
              </div>
              <div class="dislike flex-row-ac">
                <i class="iconfont icon-cai"></i>
              </div>
              <div class="reply" @click="onReply(e.id, true, e, e)">回复</div>
              <el-dropdown trigger="click">
                <div class="more-operate">
                  <i class="iconfont icon-gengduo1"></i>
                </div>
                <template #dropdown>
                  <div class="be-dropdown-menu">
                    <div class="be-dropdown-item" v-show="e.uid != userStore.userInfo.uid">举报</div>
                    <div class="be-dropdown-item" v-show="e.uid == userStore.userInfo.uid" @click="onDelete(e.id)">删除
                    </div>
                  </div>
                </template>
              </el-dropdown>
            </div>
          </div>
        </div>
        <div class="expander">
          <div class="expander-contents">
            <!-- 每条回复 -->
            <div class="e-body" v-if="replies && replies.has(e.id)" v-for="r in replies[e.id]" :key="r.id"
              v-show="expandConfig.curExpandId.has(e.id)">
              <a href="" class="e-avatar">
                <img :src="r.avatar" alt="" width="24px" height="24px">
              </a>
              <div class="e-main">
                <div class="c-content">
                  <p class="c-contents">
                    <a class="user-name">{{ r.nickname }}</a>
                    <a class="user-up" v-show="authorId == r.uid">
                      <img src="../../assets/images/up_pb.svg" alt="">
                    </a>
                    <span class="is-reply" v-show="r.parentId != e.id">回复</span>
                    <a class="reply-target" v-show="r.parentId != e.id">{{ `@${rt.get(r.toUserId)}：` }}</a>
                    <span>{{ r.content }}</span>
                  </p>
                </div>
              </div>
              <div class="c-footer flex-row-ac">
                <div class="pubdate">{{ r.createTime }}</div>
                <div class="like flex-row-ac">
                  <i class="iconfont icon-zan"></i>
                  <span>{{ formatCount(r.love) }}</span>
                </div>
                <div class="dislike flex-row-ac">
                  <i class="iconfont icon-cai"></i>
                </div>
                <div class="reply" @click="onReply(e.id, true, e, r)">回复</div>
                <el-dropdown trigger="click">
                  <div class="more-operate">
                    <i class="iconfont icon-gengduo1"></i>
                  </div>
                  <template #dropdown>
                    <div class="be-dropdown-menu">
                      <div class="be-dropdown-item" v-show="r.uid != userStore.userInfo.uid">举报</div>
                      <div class="be-dropdown-item" v-show="r.uid == userStore.userInfo.uid" @click="onDelete(r.id)">删除
                      </div>
                    </div>
                  </template>
                </el-dropdown>
              </div>
            </div>
            <!-- 回复的分页 -->
            <div class="e-footer flex-row-ac">
              <div class="pagination flex-row-ac" v-show="e.replyCount > 0 && expandConfig.curExpandId.has(e.id)">
                <el-pagination v-model:current-page="expandConfig.curReplyPage" :page-size="10" size="small"
                  :background="false" layout="total, prev, pager, next" :total="e.replyCount" />
                <span id="fold-btn" @click="onExpand(e.id, false)">收起</span>
              </div>
              <div class="total-reply flex-row-ac" v-show="e.replyCount > 0 && !expandConfig.curExpandId.has(e.id)">
                <span>共{{ e.replyCount }}条回复，</span>
                <span class="expand-btn" @click="onExpand(e.id, true)">点击查看</span>
              </div>
            </div>
          </div>
        </div>
        <div class="reply-container" v-show="expandConfig.reply && expandConfig.curReplyId == e.id">
          <div class="comment-box flex-row">
            <div class="user-avatar">
              <img :src="userStore.userInfo.avatar" alt="" class="avatar">
            </div>
            <div class="comment-area">
              <div class="editor textarea-ac">
                <textarea placeholder="请友善发言" v-model="inputReply"></textarea>
              </div>
              <div class="footer flex-row-ac">
                <div class="tool-btn flex-row-ac jcc">
                  <i class="iconfont icon-buganxingqu"></i>
                </div>
                <div class="tool-btn flex-row-ac jcc">
                  <i class="iconfont icon-tupian"></i>
                </div>
                <button class="pub" @click="sendReply">发送</button>
              </div>
            </div>
          </div>
        </div>
        <div class="divider"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElMessage, ElMessageBox } from 'element-plus'

import { ref, reactive, onMounted, watch, onBeforeUnmount } from "vue";

import { CommentVo, CommentQuery, insertComment, Comment, getReply, logicDelete } from "@/api/Video/index";
import { DateStringType } from "@/api/enums"
import { formatCount, getFormatCurTime } from "@/util";
import { CommentFilter, getRootComments } from "@/api/Video/index";
import { useUserStore } from '@/util/userStore';

const rootCount = ref<number>(0)
const userStore = useUserStore()
const props = defineProps({
  authorId: Number,
  videoId: Number
})
const commentArea = ref<HTMLDivElement | null>(null)
const moreFlag = ref<boolean>(true)

//评论筛选模式
const sortType = ref(CommentFilter.HOTTEST);
//发布评论是否同步到动态
const isSynchronous = ref(false);
//是否显示评论工具栏
const showToolBar = ref(false);
// 输入的评论
const inputComment = ref("");
//回复
const inputReply = ref("");
const rootCurPage = ref<number>(1)
//回复区展开项
const expandConfig = reactive({
  curExpandId: new Set(),
  curReplyId: -1,
  curReplyPage: 1,
  reply: false,//是否显示评论输入框
  root: null,//所在根结点
  tar: null//目标结点
});
//根评论
const comments = ref<CommentVo[]>([])
//回复
const replies = ref<Map<number, CommentVo[]>>(null)
const rt = ref<Map<number, string>>(new Map<number, string>())
function onExpand(id: number, isExpand: boolean) {
  if (isExpand) {
    expandConfig.curExpandId.add(id);
    if (!replies.value || !replies.value.has(id)) {
      onGetReplies({
        current: 1,
        size: 5,
        vid: props.videoId,
        rootId: id,
      })
    }
  } else {
    expandConfig.curExpandId.delete(id);
  }
  expandConfig.curReplyPage = 1
}
function onReply(id: number, isReply: boolean, root: CommentVo, tar: CommentVo) {
  expandConfig.reply = isReply
  expandConfig.curReplyId = isReply ? id : -1;
  expandConfig.root = root
  expandConfig.tar = tar
  console.log(expandConfig)
}
function switchSortType(value: number) {
  sortType.value = value
  reset()
  onGetRootComments({
    current: 1,
    size: 10,
    sortField: sortType.value == CommentFilter.HOTTEST ? 'love' : 'create_time',
    vid: props.videoId,
  })
}
function reset() {
  comments.value = []
  rootCurPage.value = 1
  rootCurPage.value = 1
  expandConfig.curExpandId.clear()
  expandConfig.curReplyId = -1
  expandConfig.curReplyPage = 1
  expandConfig.reply = false
}
function sendComment() {
  if (inputComment.value.length == 0) {
    ElMessage({
      message: '请输入评论内容！',
      type: 'warning',
    })
    return;
  }
  const createTime = new Date()
  let comment = {
    id: 0,
    vid: props.videoId,
    uid: userStore.userInfo.uid,
    rootId: 0,
    parentId: 0,
    toUserId: 0,
    content: inputComment.value,
    love: 0,
    bad: 0,
    createTime: getFormatCurTime(createTime.getTime(), DateStringType.Y_M_D_H_M),
    isTop: 0,
    isDeleted: 0
  }
  inputComment.value = ""
  onInsertComment(comment)
}
function sendReply() {
  if (inputReply.value.length == 0) {
    ElMessage({
      message: '请输入回复内容！',
      type: 'warning',
    })
    return
  }
  const ct = new Date()
  onInsertReply({
    id: 0,
    vid: props.videoId,
    uid: userStore.userInfo.uid,
    rootId: expandConfig.root.id,
    parentId: expandConfig.tar.id,
    toUserId: expandConfig.tar.uid,
    content: inputReply.value,
    love: 0,
    bad: 0,
    createTime: getFormatCurTime(ct.getTime(), DateStringType.Y_M_D_H_M),
    isTop: 0,
    isDeleted: 0,
  }, expandConfig.root.id)
  inputReply.value = ""
  expandConfig.root.replyCount = expandConfig.root.replyCount + 1;
  ElMessage({
    message: '回复成功！',
    type: 'success'
  })
}
function handleBodyScroll() {
  const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
  if (moreFlag.value && scrollTop + clientHeight + 2 >= scrollHeight) {
    moreFlag.value = false
    rootCurPage.value += 1
    onGetRootComments({
      current: rootCurPage.value,
      size: 10,
      sortField: sortType.value == CommentFilter.HOTTEST ? 'love' : 'create_time',
      vid: props.videoId,
    })
  }
}
function onDelete(id: number) {
  ElMessageBox.confirm(
    '确定要删除该条记录？',
    '提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(() => {
      onLogicDelete({
        id: id,
        vid: props.videoId
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消删除',
      })
    })
}
const handleOutArea = (event: MouseEvent) => {
  if (commentArea.value && !commentArea.value.contains(event.target as Node)) {
    showToolBar.value = false
  }
}
const handleCurrentChange = (val: number, e: CommentVo) => {
  onGetReplies({
    current: val,
    size: 5,
    vid: props.videoId,
    rootId: e.id,
  })
};
async function onInsertComment(e: Comment) {
  try {
    const res = await insertComment(e)
    if (res.code == 200) {
      let ev: CommentVo = {
        id: res.data,//必须拿到后端自动回填的主键，不然数据库里找不到刚刚发的那条评论
        vid: e.vid,
        uid: e.uid,
        rootId: 0,
        parentId: 0,
        toUserId: 0,
        content: e.content,
        love: 0,
        bad: 0,
        createTime: e.createTime,
        isTop: 2,
        isDeleted: 0,
        nickname: userStore.userInfo.nickname,
        avatar: userStore.userInfo.avatar,
        replyCount: 0
      }
      comments.value.push(ev)
    }
  } catch (error) {
    console.log(error)
    ElMessage.error('评论失败！')
  }
}
async function onInsertReply(e: Comment, rootId: number) {
  try {
    await insertComment(e)
    onGetReplies({
      current: 1,
      size: 5,
      vid: props.videoId,
      rootId: rootId,
    })
  } catch (error) {
    ElMessage.error('回复失败！')
  }
}
async function onGetRootComments(query: CommentQuery) {
  try {
    const res = await getRootComments(query)
    rootCount.value = res.data.total
    if (res.data.records.length > 0) {
      moreFlag.value = true
      res.data.records.forEach(e => {
        comments.value.push(e)
      })
    }
  } catch (error) {
    ElMessage.error('获取根评论失败！')
  }
}
async function onGetReplies(query: CommentQuery) {
  try {
    const res = await getReply(query)
    if (!replies.value) {
      replies.value = new Map<number, CommentVo[]>()
    }
    replies.value.set(query.rootId, [])
    replies.value[query.rootId] = res.data.records
    replies.value[query.rootId].forEach(e => {
      rt.value.set(e.uid, e.nickname)
    });
  } catch (error) {
    ElMessage.error('获取回复失败！')
  }
}
async function onLogicDelete(query: CommentQuery) {
  try {
    await logicDelete(query)
    ElMessage({
      message: '操作成功',
      type: 'success'
    })
    reset()
    onGetRootComments({
      current: rootCurPage.value,
      size: 10,
      sortField: sortType.value == CommentFilter.HOTTEST ? 'love' : 'create_time',
      vid: props.videoId,
    })
  } catch (error) {
    ElMessage.error('操作失败！')
  }
}
watch(() => props.videoId, (newVal) => {
  if (newVal) {
    reset()
    onGetRootComments({
      current: rootCurPage.value,
      size: 10,
      sortField: sortType.value == CommentFilter.HOTTEST ? 'love' : 'create_time',
      vid: props.videoId,
    })
  }
})
onMounted(() => {
  window.addEventListener("scroll", handleBodyScroll)
  document.addEventListener('click', handleOutArea)
})
onBeforeUnmount(() => {
  window.removeEventListener('click', handleOutArea);
  window.removeEventListener('scroll', handleBodyScroll);
})
</script>

<style lang="less" scoped>
//更多操作
.more-operate {
  padding-bottom: 1px;

  i {
    font-size: 12px;
  }
}

//评论输入区
.comment-box {
  .user-avatar {
    flex-shrink: 0;
    width: 80px;
    height: 50px;
    padding: 1px 16px;

    .avatar {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      overflow: hidden;
      object-fit: cover;
    }
  }

  .comment-area {
    position: relative;
    width: calc(100% - 80px);

    .editor {
      width: 100%;
      padding: 8px 0px;
      box-sizing: border-box;
      border-radius: 6px;
      transition: 0.2s;
      cursor: text;

      textarea {
        width: 100%;
        font-size: 14px;
        color: var(--font-color-black);
        padding: 0 8px;
        min-height: 32px;
        resize: none;
        border: none;
        outline: none;
        background-color: transparent;
      }
    }

    .editor:hover {
      background-color: #fff;
      border: 1px solid var(--bgc2);
    }

    .footer {
      width: 100%;
      height: 32px;
      margin-top: 10px;

      .tool-btn {
        position: relative;
        width: 32px;
        height: 26px;
        border: 1px solid var(--bgc5);
        background-color: var(--white);
        border-radius: 4px;
        color: var(--font-color-gray2);
        cursor: pointer;
        margin-right: 6px;
      }

      .check {
        margin-left: 10px;
      }

      .pub {
        margin-left: auto;
        background-color: var(--hover-blue);
        cursor: pointer;
        border-radius: 4px;
        outline: none;
        border: none;
        width: 70px;
        height: 100%;
        font-size: 16px;
        color: var(--white);
      }
    }
  }
}

//评论输入框激活
.textarea-ac {
  background-color: #fff;
  border: 1px solid var(--bgc2);
}

.textarea-unac {
  background-color: var(--bgc5);
  border: 1px solid var(--bgc5);
}

//评论排序规则按钮——激活与否
.hot-ac {
  color: var(--font-color-black);
}

.hot-unac {
  color: var(--font-color-gray1);
}

.video-comments {
  .header {
    .navbar {
      height: 28px;
      margin-bottom: 22px;

      .comment-title {
        h2 {
          color: var(--font-color-black);
          font-weight: 500;
          font-size: 20px;
        }

        .count {
          margin: 0px 30px 0px 6px;
          font-size: 13px;
          font-weight: 400;
          color: var(--font-color-gray1);
        }
      }

      .hot {
        .hot-switch-btn {
          cursor: pointer;
        }

        .hot-switch-btn:hover {
          color: var(--hover-blue);
        }

        .sort-div {
          display: inline-block;
          height: 11px;
          margin: 0px 13px;
          border-left: solid 1px var(--font-color-gray1);
          vertical-align: -2px;
        }
      }
    }
  }

  .contents {
    padding-top: 14px;
    position: relative;

    .comment-item {
      .body {
        position: relative;
        padding-left: 80px;
        padding-top: 22px;

        .c-user-avatar {
          position: absolute;
          left: 20px;
          top: 22px;
          width: 48px;
          height: 48px;
          transform-origin: left top;

          // transform: var(--bili-comments-avatar-size);
          .c-avatar {
            border-radius: 50%;
            overflow: hidden;
            width: 48px;
            height: 48px;
            object-fit: cover;
          }
        }

        .main {
          width: 100%;

          .c-header {
            margin-bottom: 4px;
          }
        }
      }

      .c-content {
        width: 100%;
        overflow: hidden;
        font-size: 15px;
        line-height: 24px;
        color: var(--font-color-black);

        .top {
          display: inline;
          width: 30px;
          height: 18px;
          font-size: 12px;
          padding: 0 2px;
          border: 1px solid #ff6699;
          border-radius: 3px;
          color: #ff6699;
          vertical-align: middle;
          margin-right: 5px;
        }

        .c-contents {
          display: inline;
          line-height: 24px;
          white-space: pre-line;
          word-break: break-word;

          a {
            margin-right: 5px;
          }

          span {
            font-size: 15px;
            color: var(--font-color-black);
          }

          .is-reply {
            margin: 0 5px;
          }

          .reply-target {
            color: var(--hover-blue);
          }
        }
      }

      .c-footer {
        width: 100%;
        position: relative;
        margin-top: 3px;
        font-size: 13px;
        color: var(--font-color-gray1);

        .pubdate,
        span,
        .reply {
          font-size: 13px;
          color: var(--font-color-gray1);
        }

        .like,
        .dislike,
        .reply {
          cursor: pointer;
        }

        .like:hover,
        .dislike:hover,
        .reply:hover,
        .like:hover span {
          color: var(--hover-blue);
        }

        .like i {
          margin-right: 4px;
        }

        div {
          margin-right: 20px;
        }
      }

      .user-name {
        color: #fb7299;
        font-size: 13px;
        font-weight: 500;
      }

      .expander {
        padding-left: 80px;
        margin-top: 2px;

        .expander-contents {
          position: relative;

          .e-body {
            position: relative;
            padding: 8px 0px 8px 34px;
            border-radius: 4px;

            .e-avatar {
              position: absolute;
              top: 8px;
              left: 5px;
              width: 24px;
              height: 24px;

              img {
                background-color: #ffcece;
                border-radius: 50%;
              }
            }

            .e-main {
              width: 100%;
              display: block;
              overflow: hidden;

              .e-info p {
                line-height: 24px;
                font-size: 15px;
                color: var(--font-color-black);
              }
            }
          }

          .e-footer {
            .pagination {
              #fold-btn {
                font-size: 13px;
                cursor: pointer;
                color: var(--font-color-black);
              }

              #fold-btn:hover {
                color: var(--hover-blue);
              }
            }

            .total-reply {
              .expand-btn:hover {
                color: var(--hover-blue);
              }

              span {
                font-size: 13px;
                cursor: pointer;
                color: var(--font-color-gray1);
              }
            }
          }
        }
      }

      .reply-container {
        padding: 25px 0px 10px 80px;
      }

      .divider {
        padding-bottom: 14px;
        margin-left: 80px;
        border-bottom: 1px solid var(--bgc4);
      }

      .user-up {
        width: 24px;
        height: 24px;

        img {
          width: 24px;
          height: 24px;
        }
      }
    }
  }
}
</style>