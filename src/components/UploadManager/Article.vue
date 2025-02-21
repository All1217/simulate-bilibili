<template>
    <div class="cc-content-body">
        <TopNav :as="aList"></TopNav>
        <div class="article-v2-wrap">
            <div class="cc-article-wrp">
                <div class="article-header flex-row-ac jc-spb">
                    <div class="flex-row-ac tabs">
                        <a :class="curManuscript == 1 ? 'txt-item m-ac' : 'txt-item'" @click="curManuscript = 1">全部稿件
                            1</a>
                        <a :class="curManuscript == 2 ? 'txt-item m-ac' : 'txt-item'" @click="curManuscript = 2">进行中
                            0</a>
                        <a :class="curManuscript == 3 ? 'txt-item m-ac' : 'txt-item'" @click="curManuscript = 3">已通过
                            1</a>
                        <a :class="curManuscript == 4 ? 'txt-item m-ac' : 'txt-item'" @click="curManuscript = 4">未通过
                            0</a>
                    </div>
                    <div class="header-operate flex-row-ac">
                        <el-dropdown>
                            <el-button style="margin-left: 12px;">
                                {{ partitionType.curTag }}<el-icon class="el-icon--right"><arrow-down /></el-icon>
                            </el-button>
                            <template #dropdown>
                                <div class="be-dropdown-menu">
                                    <div class="be-dropdown-item"
                                        :style="partitionType.curType == 1 ? 'color: var(--cur-blue);' : ''"
                                        @click="onParTypeChange(1, '全部分区')">全部分区(1)</div>
                                    <div class="be-dropdown-item"
                                        :style="partitionType.curType == 2 ? 'color: var(--cur-blue);' : ''"
                                        @click="onParTypeChange(2, '娱乐')">娱乐(1)</div>
                                </div>
                            </template>
                        </el-dropdown>
                        <el-dropdown>
                            <el-button style="margin-left: 12px;">
                                {{ sortType.curTag }}<el-icon class="el-icon--right"><arrow-down /></el-icon>
                            </el-button>
                            <template #dropdown>
                                <div class="be-dropdown-menu">
                                    <div class="be-dropdown-item" @click="onSortTypeChange(1, '投稿时间排序')"
                                        :style="sortType.curType == 1 ? 'color: var(--cur-blue);' : ''">投稿时间排序</div>
                                    <div class="be-dropdown-item" @click="onSortTypeChange(2, '播放数排序')"
                                        :style="sortType.curType == 2 ? 'color: var(--cur-blue);' : ''">播放数排序</div>
                                    <div class="be-dropdown-item" @click="onSortTypeChange(3, '收藏数排序')"
                                        :style="sortType.curType == 3 ? 'color: var(--cur-blue);' : ''">收藏数排序</div>
                                    <div class="be-dropdown-item" @click="onSortTypeChange(4, '弹幕数排序')"
                                        :style="sortType.curType == 4 ? 'color: var(--cur-blue);' : ''">弹幕数排序</div>
                                    <div class="be-dropdown-item" @click="onSortTypeChange(5, '评论数排序')"
                                        :style="sortType.curType == 5 ? 'color: var(--cur-blue);' : ''">评论数排序</div>
                                </div>
                            </template>
                        </el-dropdown>
                    </div>
                </div>
                <div>
                    <div class="article-list_wrap">
                        <div class="article-card flex-row" v-for="e in articles.articleList">
                            <a class="cover-wrp">
                                <!-- <img src="" alt=""> -->
                                <div class="duration">{{e.length}}</div>
                            </a>
                            <div class="meta-wrp flex-col">
                                <div class="meta-title">
                                    <a class="name nto">{{e.title}}</a>
                                </div>
                                <div class="meta-middle flex-row-ac jc-spb">
                                    <div class="meta-status flex-row">
                                        <span class="meta-item pub-time" v-show="e.status==Status.SUCCESS">{{e.publishTime}}</span>
                                        <span class="meta-item scanning" v-show="e.status==Status.WAIT">审核中</span>
                                        <span class="meta-item fail" v-show="e.status==Status.REJECT">未通过</span>
                                    </div>
                                    <div class="meta-view flex-row">
                                        <el-button :icon="EditPen">编辑</el-button>
                                        <el-button :icon="DataLine" style="margin-right: 12px;">数据</el-button>
                                        <el-dropdown>
                                            <el-button :icon="MoreFilled" />
                                            <template #dropdown>
                                                <div class="be-dropdown-menu">
                                                    <div class="be-dropdown-item">删除稿件</div>
                                                    <div class="be-dropdown-item">可见范围</div>
                                                </div>
                                            </template>
                                        </el-dropdown>
                                    </div>
                                </div>
                                <div class="meta-footer flex-row-ac">
                                    <div class="view-stat flex-row-ac">
                                        <img src="../../assets/images/icon-biliTV-filled.png" alt="">
                                        <span>{{ e.count }}</span>
                                    </div>
                                    <div class="view-stat flex-row-ac">
                                        <img src="../../assets/images/icon-recommend-filled.png" alt="">
                                        <span>{{ e.recommend }}</span>
                                    </div>
                                    <div class="view-stat flex-row-ac">
                                        <img src="../../assets/images/icon-danmu-filled.png" alt="">
                                        <span>{{ e.danmuCount }}</span>
                                    </div>
                                    <div class="view-stat flex-row-ac">
                                        <img src="../../assets/images/icon-comments-filled.png" alt="">
                                        <span>{{ e.comments }}</span>
                                    </div>
                                    <div class="view-stat flex-row-ac">
                                        <img src="../../assets/images/icon-toubi-filled.png" alt="">
                                        <span>{{ e.toubi }}</span>
                                    </div>
                                    <div class="view-stat flex-row-ac">
                                        <img src="../../assets/images/icon-fav-filled.png" alt="">
                                        <span>{{ e.fav }}</span>
                                    </div>
                                    <div class="view-stat flex-row-ac">
                                        <img src="../../assets/images/icon-share-filled.png" alt="">
                                        <span>{{ e.share }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="bcc-pagination-container flex-row jce">
                        <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :size="size"
                            background layout="total, prev, pager, next, jumper" :total="totalPages"
                            @current-change="handleCurrentChange" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, reactive } from "vue";
import { EditPen, DataLine, MoreFilled } from '@element-plus/icons-vue'
import type { ComponentSize } from "element-plus";
import { Status } from "@/api/UploadManager/index"
import "@/styles/UploadManager/index.less"
import TopNav from "./TopNav.vue";
import {TopNavItem} from "@/api/UploadManager/index"
const aList = ref<TopNavItem[]>(
    [
        { id: 1, tagName: "视频管理", href: "" },
        { id: 2, tagName: "图文管理", href: "" },
    ]
)
const curManuscript = ref(1)
const partitionType = reactive({
    curType: 1,
    curTag: "全部分区"
})
function onParTypeChange(id: number, str: string) {
    partitionType.curType = id;
    partitionType.curTag = str;
}
const sortType = reactive({
    curType: 1,
    curTag: "投稿时间排序"
})
function onSortTypeChange(id: number, str: string) {
    sortType.curType = id;
    sortType.curTag = str;
}
const articles = reactive({
    articleList: [
        {
            title: "稿件视频标题稿件视频标题稿件视频标题稿件视频标题稿件视频标题稿件视频标题稿件视频标题稿件视频标题稿件视频标题",
            publishTime: "2025年02月04日 16:29:47",
            count: 5,
            length: "02:01",
            danmuCount: 5,
            fav: 5,
            share: 55,
            comments: 20,
            toubi: 100,
            recommend: 5,
            status: Status.WAIT,
        },
        {
            title: "稿件视频标题稿件视频标题稿件视频标题稿件视频标题稿件视频标题稿件视频标题稿件视频标题稿件视频标题稿件视频标题",
            publishTime: "2025年02月04日 16:29:47",
            count: 5,
            length: "02:01",
            danmuCount: 5,
            fav: 5,
            share: 55,
            comments: 20,
            toubi: 100,
            recommend: 5,
            status: Status.REJECT,
        },
        {
            title: "稿件视频标题稿件视频标题稿件视频标题稿件视频标题稿件视频标题稿件视频标题稿件视频标题稿件视频标题稿件视频标题",
            publishTime: "2025年02月04日 16:29:47",
            count: 5,
            length: "02:01",
            danmuCount: 5,
            fav: 5,
            share: 55,
            comments: 20,
            toubi: 100,
            recommend: 5,
            status: Status.SUCCESS,
        },
        {
            title: "稿件视频标题稿件视频标题稿件视频标题稿件视频标题稿件视频标题稿件视频标题稿件视频标题稿件视频标题稿件视频标题",
            publishTime: "2025年02月04日 16:29:47",
            count: 5,
            length: "02:01",
            danmuCount: 5,
            fav: 5,
            share: 55,
            comments: 20,
            toubi: 100,
            recommend: 5,
            status: Status.SUCCESS,
        },
        {
            title: "稿件视频标题稿件视频标题稿件视频标题稿件视频标题稿件视频标题稿件视频标题稿件视频标题稿件视频标题稿件视频标题",
            publishTime: "2025年02月04日 16:29:47",
            count: 5,
            length: "02:01",
            danmuCount: 5,
            fav: 5,
            share: 55,
            comments: 20,
            toubi: 100,
            recommend: 5,
            status: Status.SUCCESS,
        },
        {
            title: "稿件视频标题稿件视频标题稿件视频标题稿件视频标题稿件视频标题稿件视频标题稿件视频标题稿件视频标题稿件视频标题",
            publishTime: "2025年02月04日 16:29:47",
            count: 5,
            length: "02:01",
            danmuCount: 5,
            fav: 5,
            share: 55,
            comments: 20,
            toubi: 100,
            recommend: 5,
            status: Status.SUCCESS,
        },
    ]
})
//分页控件
const currentPage = ref(1);
const pageSize = ref(10);
const size = ref<ComponentSize>("default");
const totalPages = ref(100)
const handleCurrentChange = (val: number) => {
    console.log(`current page: ${val}`);
};
</script>
<style scoped lang="less">
.m-ac {
    color: var(--cur-blue);
}

.cc-content-body {
    width: inherit;
    margin-left: 72px;
    margin-right: 72px;
    height: 100%;
    background: #fff;
    margin-top: 16px;
    padding-bottom: 20px;

    .article-v2-wrap {
        padding: 0 40px 20px 40px;
        position: relative;

        .cc-article-wrp {
            .article-header {
                margin-bottom: 26px;
                height: 32px;
                margin-top: 8px;
                position: relative;

                .tabs {
                    .txt-item {
                        font-size: 14px;
                        letter-spacing: .5px;
                        text-align: left;
                        line-height: 18px;
                        cursor: pointer;
                        position: relative;
                        padding-right: 16px;
                    }

                    .txt-item:hover {
                        color: var(--cur-blue);
                    }
                }
            }

            .article-list_wrap {
                margin-top: 8px;

                .article-card {
                    padding: 24px 0;
                    position: relative;
                    width: 100%;
                    min-height: 140px;
                    border-radius: 4px;
                    background: #fff;
                    border-bottom: 1px solid #e7e7e7;

                    .cover-wrp {
                        align-self: center;
                        width: 154px;
                        height: 87px;
                        margin-right: 24px;
                        position: relative;
                        border-radius: 4px;
                        overflow: hidden;
                        background-color: var(--bgc5);

                        img {
                            width: 100%;
                            height: 100%;
                            border-radius: 4px;
                            object-fit: cover;
                        }

                        .duration {
                            background: rgba(0, 0, 0, .5);
                            border-radius: 4px 0 4px 0;
                            position: absolute;
                            bottom: 0;
                            right: 0;
                            height: 18px;
                            line-height: 18px;
                            padding: 0 4px;
                            color: #fff;
                        }
                    }

                    .meta-wrp {
                        width: calc(100% - 178px);
                        position: relative;

                        .meta-title {
                            height: 24px;
                            line-height: 24px;

                            .name {
                                font-size: 16px;
                                color: #212121;
                                line-height: 20px;
                                vertical-align: middle;
                                display: inline-block;
                                max-width: 420px;
                            }
                        }

                        .meta-middle {
                            width: 100%;

                            .meta-status {
                                padding: 18px 0 16px 0;
                                font-size: 14px;
                                line-height: 16px;
                                margin-right: 4px;

                                .meta-item {
                                    font-size: 14px;
                                    line-height: 20px;
                                    padding-right: 24px;
                                    display: inline-block;
                                    font-weight: 400;
                                    vertical-align: middle;
                                }

                                .pub-time {
                                    color: #505050;
                                    min-width: 175px;
                                }

                                .scanning {
                                    color: rgb(251, 218, 98);
                                }

                                .fail {
                                    color: #e42626;
                                }
                            }
                        }

                        .meta-footer {
                            position: relative;
                            font-size: 12px;

                            .view-stat {
                                margin-right: 25px;

                                img {
                                    width: 16px;
                                    height: 16px;
                                }

                                span {
                                    color: #99a2aa;
                                    margin-left: 5px;
                                    vertical-align: top;
                                }
                            }
                        }
                    }
                }
            }

            .bcc-pagination-container {
                padding-top: 32px;
            }
        }
    }
}
</style>