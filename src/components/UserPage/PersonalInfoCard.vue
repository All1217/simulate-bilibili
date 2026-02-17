<template>
    <div class="section user-info">
        <p class="user-info-title flex-row-ac jc-spb">
            <span class="info-title">个人资料</span>
            <router-link :to="{ name: 'UserAccount' }">
                <span class="change-info-btn">修改资料</span>
            </router-link>
        </p>
        <div class="info-content">
            <div class="info-personal flex-row-ac jc-spb">
                <div class="info-wrap">
                    <span class="info-command">uid</span>
                    <span class="info-value">{{ uid }}</span>
                </div>
                <div class="info-wrap">
                    <span class="info-command" v-show="userStats.birthDate">生日</span>
                    <span class="info-value" v-show="userStats.birthDate">
                        {{ userStats.birthDate == null ? '' : userStats.birthDate }}
                    </span>
                </div>
                <div class="info-wrap">
                    <span class="info-command" v-show="userStats.school && userStats.school != ''">学校</span>
                    <span class="info-value" v-show="userStats.school && userStats.school != ''">{{ userStats.school
                    }}</span>
                </div>
                <div class="info-wrap">
                    <span class="info-command" v-show="userInfo.gender < 2">性别</span>
                    <span class="info-value" v-show="userInfo.gender < 2">
                        {{ userInfo.gender == 0 ? '男' : '女' }}
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { watch, PropType, ref } from "vue";
import { UserStats, User } from "@/api/Models";
import { defaultUserStats, defaultUser } from "@/api/UserPage/types";
const userStats = ref<UserStats>(defaultUserStats)
const userInfo = ref<User>(defaultUser)
const props = defineProps({
    uid: String,
    ui: {
        type: Object as PropType<User>,
        default: defaultUser
    },
    us: {
        type: Object as PropType<UserStats>,
        default: defaultUserStats
    }
});
watch(
    () => props.ui, (newVal) => {
        if (newVal) {
            userInfo.value = newVal
        }
    }, { immediate: true, deep: true }
)
watch(
    () => props.us, (newVal) => {
        if (newVal) {
            userStats.value = newVal
        }
    }, { immediate: true, deep: true }
)
</script>

<style lang="less" scoped>
@import '@/styles/UserPage/index.less';
</style>