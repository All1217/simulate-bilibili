<template>
    <div class="top-header">
        <div class="top-img"></div>
        <div class="security_content flex-row">
            <div class="security-left">
                <span class="security-title">个人中心</span>
                <ul class="security-ul">
                    <li :class="curLi == li.index ? 'security-list on' : 'security-list'" v-for="li in liList"
                        @click="onLiClick(li)">
                        <i class="security-icon"
                            :style="curLi == li.index ? backImg[li.index][0] : backImg[li.index][1]"></i>
                        <span class="security-nav-name">{{ li.name }}</span>
                    </li>
                </ul>
            </div>
            <div class="security-right">
                <div class="security-right-title">
                    <span class="security-right-title-icon"></span>
                    <span class="security-right-title-text">{{ curLiName }}</span>
                </div>
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()
const curLi = ref<number>(0)
const curLiName = ref<string>('我的信息')
const liList = [
    { index: 0, name: '我的信息', href: '/account/userSetting' },
    { index: 1, name: '我的头像', href: '/account/changeAvatar' },
]
const backImg = {
    0: ['background-position: -87px -80px !important;', 'background-position: -23px -80px !important;'],
    1: ['background-position: -87px -144px !important;', 'background-position: -23px -144px !important;'],
}
function onLiClick(li: Object) {
    curLi.value = li.index
    curLiName.value = li.name
    router.push(li.href)
}
onMounted(() => {
    if (route.path.endsWith('/userSetting')) {
        curLi.value = 0
        curLiName.value = '我的信息'
    } else if (route.path.endsWith('/changeAvatar')) {
        curLi.value = 1
        curLiName.value = '我的头像'
    }
});
</script>

<style scoped lang="less">
.on {
    background-color: #00a1d7 !important;

    .security-nav-name {
        color: #fff !important;
    }
}

.top-header {
    margin-top: 64px;
    width: 100%;
    height: 106px;
    background: url(../../assets/images/rl_topbackground.png) repeat-x;

    .top-img {
        width: 980px;
        height: 106px;
        margin: 0 auto;
        background: url(../../assets/images/rl_top.png) no-repeat;
    }
}

.security_content {
    width: 980px;
    height: auto;
    padding-bottom: 60px;
    margin: 10px auto 100px;
    border: 1px solid #e1e2e5;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .14);
    background: #fafafa;
    border-radius: 4px;

    .security-left {
        width: 150px;
        height: auto;

        .security-title {
            display: block;
            width: 150px;
            height: 50px;
            text-align: center;
            line-height: 50px;
            font-size: 16px;
            color: #99a2aa;
            cursor: default;
            border-bottom: 1px solid #e1e2e5;
        }

        .security-ul {
            border-bottom: 1px solid #e1e2e5;

            .security-list {
                overflow: hidden;
                width: 150px;
                height: 48px;
                line-height: 48px;

                .security-icon {
                    vertical-align: middle;
                    display: inline-block;
                    width: 18px;
                    height: 36px;
                    margin-left: 16px;
                    background: url(../../assets/images/icons_m_2.png);
                }

                .security-nav-name {
                    margin-left: 12px;
                    font-size: 14px;
                }
            }

            .security-list:hover {
                background-color: #e3e5e7;
            }
        }
    }

    .security-right {
        width: 829px;
        border-left: 1px solid #ddd;
        background: #fff;

        .security-right-title {
            height: 50px;
            padding-left: 30px;
            border-bottom: 1px solid #ddd;

            .security-right-title-icon {
                float: left;
                width: 4px;
                height: 16px;
                margin-top: 18px;
                background-color: #00a1d6;
                border-radius: 4px;
            }

            .security-right-title-text {
                float: left;
                margin: 15px 0 0 5px;
                color: #00a1d6;
                font-size: 14px;
                cursor: default;
            }
        }
    }
}
</style>