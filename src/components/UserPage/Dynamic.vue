<template>
  <div class="no-data flex-row jc-spb">
    <div class="col-1 flex-row jcc">
      <NoData :message1="'无数据'"></NoData>
    </div>
    <div class="col-2 flex-col">
      <PersonalInfoCard :uid="`${route.query.uid}`" :ui="userInfo" :us="userStats"></PersonalInfoCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router'
import NoData from "@/components/NoData.vue";
import PersonalInfoCard from "@/components/UserPage/PersonalInfoCard.vue";
import { UserStatsQueryVo } from "@/api/UserPage/types";
import { UserStats, User } from "@/api/Models";
import { defaultUserStats, defaultUser } from "@/api/UserPage/types";
import { getUserStatsByUid, getUserInfoByUid } from "@/api/UserPage";

// 获取当前路由对象
const route = useRoute()

const userStats = ref<UserStats>(defaultUserStats)
const userInfo = ref<User>(defaultUser)

function geneUid(param: string | string[]): number {
  return parseInt(param.toString())
}

async function onGetUserInfoByUid(query: UserStatsQueryVo) {
  try {
    const res = await getUserInfoByUid(query)
    userInfo.value = res.data
  } catch (error) {
    console.log(error)
  }
}
async function onGetUserStatsByUid(query: UserStatsQueryVo) {
  try {
    const res = await getUserStatsByUid(query)
    userStats.value = res.data
  } catch (error) {
    console.log(error)
  }
}
onMounted(() => {
  onGetUserInfoByUid({
    uid: geneUid(route.query.uid)
  })
  onGetUserStatsByUid({
    uid: geneUid(route.query.uid)
  })
});
</script>

<style lang="less" scoped>
.no-data {
  height: 450px;
  overflow: hidden;

  .col-1 {
    width: 921px;
    height: auto;
    background: var(--white);
    border: 1px solid var(--bgc7);
    border-radius: 4px;
    padding: 15px 20px;
  }

  .col-2 {
    width: 350px;
    height: auto;
  }
}
</style>