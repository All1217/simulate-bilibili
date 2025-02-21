<template>
    <div class="cc-nav-wrp">
        <div class="cc-nav">
            <div class="nav-upload-btn">
                <a class="nav_upload_btn" @click="onNavItemClick(-1, -1, true, '/upload_manager/upload')">
                    <i class="iconfont icon-shangchuan"></i>
                    投稿
                </a>
            </div>
            <div class="nav-wrp">
                <div class="bcc-nav-slider-sub-menu__wrap">
                    <div class="bcc-nav-slider-sub-menu flex-row-ac" @click="curExpand = 1">
                        <span class="router_wrap flex-row-ac">
                            <i
                                :class="curNav >= 1 && curNav <= 3 ? 'menu-icon iconfont icon-tougaoguanli active' : 'menu-icon iconfont icon-tougaoguanli unac2'"></i>
                            <span
                                :class="curNav >= 1 && curNav <= 3 ? 'menu-title active' : 'menu-title unac1'">内容管理</span>
                            <i class="arrow iconfont icon-shouqida"
                                :style="curExpand == 1 ? '' : 'transform: rotate(180deg);'"></i>
                        </span>
                    </div>
                    <div class="bcc-nav-slider-sub-menu__group" v-show="curExpand == 1">
                        <div class="bcc-nav-slider-item__wrap" @click="onNavItemClick(1, 1, true, '/upload_manager/article')">
                            <span
                                :class="curNav == 1 ? 'router-item flex-row-ac active' : 'router-item flex-row-ac unac2'">稿件管理</span>
                        </div>
                        <div class="bcc-nav-slider-item__wrap" @click="curNav = 2">
                            <span
                                :class="curNav == 2 ? 'router-item flex-row-ac active' : 'router-item flex-row-ac unac2'">申诉管理</span>
                        </div>
                        <div class="bcc-nav-slider-item__wrap" @click="curNav = 3">
                            <span
                                :class="curNav == 3 ? 'router-item flex-row-ac active' : 'router-item flex-row-ac unac2'">字幕管理</span>
                        </div>
                    </div>
                </div>
                <div class="bcc-nav-slider-sub-menu__wrap">
                    <div class="bcc-nav-slider-sub-menu flex-row-ac" @click="onNavItemClick(4, -1, true, '/upload_manager/data_center')">
                        <span class="router_wrap flex-row-ac">
                            <i
                                :class="curNav == 4 ? 'menu-icon iconfont icon-shuju active' : 'menu-icon iconfont icon-shuju unac2'"></i>
                            <span :class="curNav == 4 ? 'menu-title active' : 'menu-title unac1'">数据中心</span>
                        </span>
                    </div>
                </div>
                <div class="bcc-nav-slider-sub-menu__wrap">
                    <div class="bcc-nav-slider-sub-menu flex-row-ac" @click="curExpand = 2">
                        <span class="router_wrap flex-row-ac">
                            <i
                                :class="curNav >= 5 && curNav <= 6 ? 'menu-icon iconfont icon-icon_hudong-xian active' : 'menu-icon iconfont icon-icon_hudong-xian unac2'"></i>
                            <span
                                :class="curNav >= 5 && curNav <= 6 ? 'menu-title active' : 'menu-title unac1'">互动管理</span>
                            <i class="arrow iconfont icon-shouqida"
                                :style="curExpand == 2 ? '' : 'transform: rotate(180deg);'"></i>
                        </span>
                    </div>
                    <div class="bcc-nav-slider-sub-menu__group" v-show="curExpand == 2">
                        <div class="bcc-nav-slider-item__wrap" @click="curNav = 5">
                            <span
                                :class="curNav == 5 ? 'router-item flex-row-ac active' : 'router-item flex-row-ac unac2'">评论管理</span>
                        </div>
                        <div class="bcc-nav-slider-item__wrap" @click="curNav = 6">
                            <span
                                :class="curNav == 6 ? 'router-item flex-row-ac active' : 'router-item flex-row-ac unac2'">弹幕管理</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="cc-body">
        <router-view></router-view>
    </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from 'vue-router';
const curNav = ref(1)
const curExpand = ref(1)
const router = useRouter();
const route = useRoute()
function onNavItemClick(cn: number, ce: number, jump: boolean, href: string) {
    curNav.value = cn;
    curExpand.value = ce;
    if (jump) {
        router.push(href);
    }
}
onMounted(() => {
  if (route.path == '/upload_manager/article') {
    curNav.value=1
  } else if (route.path == '/upload_manager/data_center') {
    curNav.value=4
  } else {
    curNav.value=-1
  }
});
</script>
<style scoped lang="less">
.active {
    color: var(--hover-blue);
}

.unac1 {
    color: #000;
}

.unac2 {
    color: #757575;
}

.rotate {
    transform: rotate(180deg);
}

.cc-nav-wrp {
    position: fixed;
    top: 0;
    left: 0;
    background: #fff;
    z-index: 10;
    height: 100%;
    padding-top: 60px;
    width: 200px;
    border-right: 1px solid #f4f4f4;
    overflow: hidden;
    font-family: PingFangSC-Regular, Microsoft YaHei, Arial, Helvetica, sans-serif;

    .cc-nav {
        position: relative;
        height: auto;

        .nav-upload-btn {
            width: 136px;
            margin: 24px auto 17px;

            .nav_upload_btn {
                border-radius: 2px;
                display: block;
                font-size: 16px;
                text-align: center;
                color: #fff;
                line-height: 40px;
                background: #00a1d6;
                cursor: pointer;

                i {
                    font-size: 19px;
                }
            }

            .nav_upload_btn:hover {
                background-color: var(--hover-blue);
            }
        }

        .nav-wrp {
            position: relative;
            padding-bottom: 35px;

            .bcc-nav-slider-sub-menu__wrap {
                position: relative;
                display: block;
                font-size: 16px;
                line-height: 24px;
                cursor: pointer;

                .bcc-nav-slider-sub-menu {
                    color: #212121;
                    height: 46px;
                    cursor: pointer;

                    .router_wrap {
                        padding-left: 32px;
                        padding-right: 24px;
                        width: 100%;
                        height: 100%;

                        .menu-icon {
                            margin-right: 20px;
                            font-size: 20px;
                        }

                        .menu-title {
                            width: 90px;
                            display: inline-block;
                            position: relative;
                            font-size: 14px;
                        }

                        .arrow {
                            color: silver;
                            font-size: 12px;
                        }
                    }
                }

                .bcc-nav-slider-sub-menu:hover {
                    background-color: var(--bgc3);
                }

                .bcc-nav-slider-sub-menu__group {
                    height: 114px;
                    overflow: hidden;

                    .bcc-nav-slider-item__wrap {
                        width: 100%;
                        display: inline-flex;
                        align-items: center;
                        height: 38px;
                        cursor: pointer;

                        .router-item {
                            position: relative;
                            padding-right: 24px;
                            width: 100%;
                            height: 100%;
                            font-size: 14px;
                            text-align: left;
                            line-height: 18px;
                            padding-left: 72px;
                            font-size: 14px;
                        }
                    }

                    .bcc-nav-slider-item__wrap:hover {
                        background-color: var(--bgc3);
                    }
                }
            }
        }
    }
}

.cc-body {
    padding: 60px 0 50px 0;
    background: #fafafa;
    margin-left: 200px;
    min-width: 1124px;
    min-height: 100%;
    position: relative;
}
</style>