<template>
    <div class="search-conditions">
        <div class="conditions-order flex-row-ac">
            <div class="search-condition-row flex-row-ac">
                <button class="vui_button--tab" @click="curCondition = 1"
                    :style="curCondition == 1 ? 'background-color: #dff6fd;color:#00aeec;' : 'background-color: #fff;'">默认排序</button>
                <button class="vui_button--tab" @click="curCondition = 2"
                    :style="curCondition == 2 ? 'background-color: #dff6fd;color:#00aeec;' : 'background-color: #fff;'">粉丝数由高到低</button>
                <button class="vui_button--tab" @click="curCondition = 3"
                    :style="curCondition == 3 ? 'background-color: #dff6fd;color:#00aeec;' : 'background-color: #fff;'">粉丝数由低到高</button>
            </div>
        </div>
    </div>
    <div class="search-page-user flex-row">
        <div class="user-item" v-for="e in userList">
            <div class="b-user-info-card flex-row-ac">
                <a class="mr_md">
                    <img src="../../assets/images/首页背景图.jpg" alt="" width="86px" height="86px">
                </a>
                <div class="user-info-box">
                    <h2 class="user-name-container">
                        <a class="user-name nto">{{ e.nickname }}</a>
                    </h2>
                    <p class="user-info">
                        139万粉丝 ·123个视频
                        <span>{{ e.description }}</span>
                    </p>
                    <div>
                        <button class="follow-btn" v-show="!e.isFollow">关注</button>
                        <button class="unfollow-btn" v-show="e.isFollow">已关注</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="pager flex-row-ac jcc">
        <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :size="size" background
            layout="total, prev, pager, next, jumper" :total="userList.length"
            @current-change="handleCurrentChange" />
    </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import '@/styles/MainWindow/index.less'
import { User } from "@/api/Models";
import type { ComponentSize } from "element-plus";
const curCondition = ref<number>(1)
//分页控件
const currentPage = ref(1);
const pageSize = ref(30);
const size = ref<ComponentSize>("default");
const handleCurrentChange = (val: number) => {
    console.log(`current page: ${val}`);
};
const userList = ref<User[]>([
    {
        uid: 0,
        username: "",
        nickname: "某UP主",
        avatar: "",
        gender: 2,
        description: "",
        status: 0,
        role: 0,
        createDate: new Date(),
        deleteDate: new Date(),
        isFollow: false,
        isFan: false
    },
    {
        uid: 0,
        username: "",
        nickname: "某UP主",
        avatar: "",
        gender: 2,
        description: "",
        status: 0,
        role: 0,
        createDate: new Date(),
        deleteDate: new Date(),
        isFollow: false,
        isFan: false
    },
])
</script>
<style scoped lang="less">
.search-page-user {
    margin: 40px 16px 0;
    flex-wrap: wrap;

    .user-item {
        margin-bottom: 60px;
        position: relative;
        width: 100%;
        padding: 0 16px;
        flex: 0 0 50%;
        max-width: 50%;

        .b-user-info-card {
            padding-left: 30px;

            .mr_md {
                position: relative;
                display: block;
                width: 86px;
                height: 86px;
                margin-right: 15px;
                border-radius: 50%;
                overflow: hidden;

                img {
                    object-fit: cover;
                }
            }

            .user-info-box {
                width: calc(100%-101px);
                padding-right: 15px;

                .user-name-container {
                    margin: 10px 0 5px;

                    .user-name {
                        max-width: 500px;
                        font-size: 18px;
                        font-weight: 700;
                        color: var(--font-color-black);
                        line-height: 1.25;
                        display: inline-block;
                        vertical-align: text-top;
                    }

                    .user-name:hover {
                        color: var(--hover-blue);
                    }
                }

                .user-info {
                    line-height: 1.35;
                    margin: 5px 0;
                    font-weight: 400;
                    width: auto;
                    max-width: 100%;
                    font-size: 13px;
                    color: var(--font-color-gray2);

                    span {
                        margin-left: 3px;
                        font-weight: 400;
                        font-size: 13px;
                        color: var(--font-color-gray2);
                    }
                }

                .follow-btn {
                    height: 32px;
                    padding: 0;
                    width: 100px;
                    color: #fff;
                    background-color: var(--hover-blue);
                    border-radius: 8px;
                    font-size: 14px;
                }

                .follow-btn:hover {
                    background-color: #1bc2ff;
                }

                .unfollow-btn {
                    height: 32px;
                    padding: 0;
                    width: 100px;
                    color: var(--font-color-gray2);
                    background-color: var(--bgc4);
                    border-radius: 8px;
                    font-size: 14px;
                }

                .unfollow-btn:hover {
                    background-color: #dadada;
                }
            }
        }
    }
}
</style>