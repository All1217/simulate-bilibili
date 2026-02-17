<template>
  <div class="col-full flex-row">
    <div class="contribution-sidenav rpos">
      <div class="contribution-list-container rpos">
        <ul>
          <li
            :class="curActivatedLi == 1 ? 'contribution-item rpos ac-li' : curHoverLi == 1 ? 'contribution-item rpos hover-li' : 'contribution-item rpos normal-li'"
            @mouseenter="curHoverLi = curActivatedLi == 1 ? -1 : 1" @mouseleave="curHoverLi = -1">
            <a :class="curActivatedLi == 1 ? 'ac-a' : curHoverLi == 1 ? 'hover-a' : 'normal-a'"
              @click="themeChange(1)">视频</a>
            <span class="num" :style="curActivatedLi == 1 ? 'color: #fff' : ''">{{ total }}</span>
          </li>
          <li
            :class="curActivatedLi == 2 ? 'contribution-item rpos ac-li' : curHoverLi == 2 ? 'contribution-item rpos hover-li' : 'contribution-item rpos normal-li'"
            @mouseenter="curHoverLi = curActivatedLi == 2 ? -1 : 2" @mouseleave="curHoverLi = -1">
            <a :class="curActivatedLi == 2 ? 'ac-a' : curHoverLi == 2 ? 'hover-a' : 'normal-a'"
              @click="themeChange(2)">图文</a>
            <span class="num" :style="curActivatedLi == 2 ? 'color: #fff' : ''">0</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="main-content">
      <div class="submit-page-head flex-row-ac jc-spb">
        <div class="submit-page-head-left flex-row-ac">
          <p class="video-title">{{ curActivatedLi == 1 ? '视频列表' : '图文列表' }}</p>
          <div class="be-tab" v-show="curActivatedLi == 1">
            <ul>
              <li v-for="e in regularList" :key="e.id" :style="e.id == curRegularId ? 'color: #00aeec' : 'color: #000'"
                @click="regularChange(e.column, e.id)">{{ e.tag }}</li>
            </ul>
          </div>
        </div>
        <div class="submit-page-head-right flex-row-ac" v-show="curActivatedLi == 1">
          <i class="iconfont icon-datubiao list"
            :style="curArrangeRegular == VideoArrangeRegular.BIG_ICON ? 'color: #00aeec;' : ''"
            @click="curArrangeRegular = VideoArrangeRegular.BIG_ICON"></i>
          <i class="iconfont icon-liebiaopaixu"
            :style="curArrangeRegular == VideoArrangeRegular.LIST ? 'color: #00aeec;' : ''"
            @click="curArrangeRegular = VideoArrangeRegular.LIST"></i>
        </div>
      </div>
      <div class="waterfall-content flex-row jcc" v-show="curActivatedLi == 2">
        <NoData :message1="'无数据'"></NoData>
      </div>
      <div class="submit-video-type-filter flex-row-ac" v-show="curActivatedLi == 1">
        <a v-for="e in pList" :style="curPartition == e.id ? 'color: #00aeec;' : ''" class="flex-row-ac"
          @click="partitionTagChange(e.id)">{{ e.name }}<span class="count">{{ e.count }}</span></a>
      </div>
      <div class="submit-video" v-show="curActivatedLi == 1">
        <div class="waterfall-content flex-row jcc" v-show="curVideoList.length == 0">
          <NoData :message1="'无数据'"></NoData>
        </div>
        <VideoCard v-for="e in curVideoList" :width="'100%'" :height="'100%'" :videoVo="e" :img-height="'120px'"
        :datetype="DateStringType.M_D"></VideoCard>
      </div>
      <div class="be-pager flex-row-ac jcc" v-show="curActivatedLi == 1">
        <div class="demo-pagination-block">
          <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :size="size" background
            layout="total, prev, pager, next, jumper" :total="total" @current-change="handleCurrentChange" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import NoData from "@/components/NoData.vue";
import VideoCard from "@/components/VideoCard.vue";
import type { ComponentSize } from "element-plus";
import { Regular, VideoArrangeRegular, Partition } from "@/api/UserPage/types";
import { VideoVo, VideoQueryVo } from "@/api/Models";
import { geneId } from "@/util";
import { DateStringType } from "@/api/enums"
import { getVideoListOfUser } from "@/api/UserPage";
import { useRoute } from "vue-router";
import { ElMessage } from "element-plus";

const route = useRoute();

//投稿-当前悬浮li
const curHoverLi = ref(-1);
//投稿-当前激活li
const curActivatedLi = ref(1);
function themeChange(id: number) {
  curActivatedLi.value = id
  if (id == 2) ElMessage.warning('敬请期待！')
  else if (id == 1) {
    onGetVideoListOfUser({
      size: 30,
      current: 1,
      uid: geneId(route.params.uid.toString()),
      sortField: curRegularCol.value
    })
  }
}
/**
 * @description: 视频功能
 */
function regularChange(col: string, id: number) {
  curRegularCol.value = col;
  curRegularId.value = id
  onGetVideoListOfUser({
    size: 30,
    current: 1,
    uid: geneId(route.params.uid.toString()),
    sortField: curRegularCol.value
  })
}
//视频排序规则
const curRegularId = ref<number>(1);
const curRegularCol = ref<string>('upload_date');
const regularList: Regular[] = [
  { id: 1, tag: "最新发布", column: 'upload_date' },
  { id: 2, tag: "最多播放", column: 'play' },
  { id: 3, tag: "最多收藏", column: 'collect' },
];
//视频排列规则
const curArrangeRegular = ref(1);
//当前选择视频分区
const curPartition = ref(1);
const show = ref<boolean>(false);
async function onGetVideoListOfUser(query: VideoQueryVo) {
  try {
    const res = await getVideoListOfUser(query);
    curVideoList.value = res.data.records;
    total.value = res.data.total;
    //加载完数据后显示VideoCard
    show.value = true;
  } catch (error) {
    console.log(error)
  }
}
// 分区列表
const pList: Partition[] = [
  { id: 1, name: "全部", count: 0, href: "" },
  { id: 2, name: "娱乐", count: 0, href: "" },
  { id: 3, name: "美食", count: 0, href: "" },
  { id: 4, name: "科技", count: 0, href: "" },
];
function partitionTagChange(id:number){
  curPartition.value = id
  ElMessage.warning('分区功能尚在建设中……')
}
//视频列表
const curVideoList = ref<VideoVo[]>([])
//分页控件
const total = ref<number>(0);
const currentPage = ref(1);
const pageSize = ref(30);
const size = ref<ComponentSize>("default");
const handleCurrentChange = (val: number) => {
  onGetVideoListOfUser({
    size: 30,
    current: val,
    uid: geneId(route.params.uid.toString()),
    sortField: curRegularCol.value
  })
};
onMounted(() => {
  onGetVideoListOfUser({
    size: 30,
    current: 1,
    uid: geneId(route.params.uid.toString()),
    sortField: curRegularCol.value
  })
})
</script>

<style lang="less" scoped>
@import "@/styles/UserPage/index.less";
@import "@/styles/UserPage/submit.less";
</style>