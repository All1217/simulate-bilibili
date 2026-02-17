<template>
    <div class="search-result-page">
        <div class="search-header">
            <div class="search-input">
                <div class="search-input-wrap flex-row-ac"
                    :style="isFocus ? 'background-color:#fff;border:1px solid #00aeec' : ''">
                    <svg class="c-icon search-icon" aria-hidden="true">
                        <use xlink:href="#icon-faxianweixuanzhongxuanzhong"></use>
                    </svg>
                    <i class="iconfont close-icon icon-guanbixiao" @click="searchText = ''"
                        :style="isFocus && searchText.length > 0 ? 'opacity:1;' : 'opacity:0;'"></i>
                    <input type="text" v-model="searchText" class="search-input-el" placeholder="输入关键字搜索"
                        @focus="isFocus = true" @blur="isFocus = false">
                    <button class="vui_button" @click="wait">搜索</button>
                </div>
            </div>
            <TopNav :as="aList" @update="onNavUpdate"></TopNav>
        </div>
        <router-view></router-view>
    </div>
</template>
<script setup lang="ts">
import TopNav from "@/components/UploadManager/TopNav.vue";
import { TopNavItem } from "@/api/UploadManager/index"
import { ref, onMounted } from "vue";
import { useRoute } from 'vue-router';
import { ElMessage } from "element-plus";

const route = useRoute();
const searchObject = ref<number>(1);
const aList = ref<TopNavItem[]>(
    [
        { id: 1, tagName: "视频", href: "/searchResult/all" },
        { id: 2, tagName: "用户", href: "/searchResult/user" },
    ]
)
const searchText = ref<string>("")
const isFocus = ref<boolean>(false)

function onNavUpdate(id: number, href: string) {
    searchObject.value = id
}

function wait() {
    ElMessage.warning('该搜索框尚待建设，请使用导航栏顶部的搜索框！')
}

onMounted(() => {
    if (route.path == "/searchResult/user") {
        searchObject.value = 2
    } else {
        searchObject.value = 1
    }
})
</script>
<style scoped lang="less">
.vui_tabs--nav-num {
    padding: 1px 6px;
    border-radius: 6px;
    font-size: 12px;
    color: var(--font-color-gray2);
    background-color: var(--bgc5);
}

.search-result-page {
    padding-top: 64px;
    height: auto;

    .search-header {
        .search-input {
            margin: 30px 0 20px;
            height: 48px;

            .search-input-wrap {
                position: relative;
                width: 640px;
                height: 48px;
                margin: 0 auto;
                padding: 5px;
                background-color: var(--bgc3);
                border: 1px solid var(--bgc5);
                border-radius: 6px;
                transition: all .3s;

                .search-icon {
                    width: 20px;
                    font-size: 18px;
                    color: var(--hover-blue);
                    margin-left: 15px;
                    margin-right: 10px;
                }

                .close-icon {
                    position: absolute;
                    display: inline-block;
                    top: 50%;
                    font-size: 9px;
                    color: #fff;
                    right: 115px;
                    width: 18px;
                    height: 18px;
                    padding: 3px 0 0 4px;
                    cursor: pointer;
                    transform: translateY(-50%);
                    background-color: #c9ccd0;
                    border-radius: 50%;
                    transition: all .2s;
                }

                .search-input-el {
                    width: calc(100% - 160px);
                    height: 36px;
                    font-size: 18px;
                    color: var(--font-color-black);
                    margin-right: 15px;
                    border: none;
                    outline: none;
                    background: transparent;
                }

                .vui_button {
                    width: 100px;
                    height: 38px;
                    color: #fff;
                    background-color: var(--hover-blue);
                    padding: 0 20px;
                    border-radius: 8px;
                    font-size: 16px;
                    transition: all .2s;
                }

                .vui_button:hover {
                    background-color: #17c1ff;
                }
            }

            .search-input-wrap:hover {
                background-color: #fff;
            }
        }
    }
}
</style>