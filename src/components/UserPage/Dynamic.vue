<template>
  <div class="no-data flex-row jc-spb">
    <div class="col-1 flex-row jcc">
      <NoData :message1="'无数据'"></NoData>
    </div>
    <div class="col-2 flex-col">
      <div class="section user-info">
        <p class="user-info-title flex-row-ac jc-spb">
          <span class="info-title">个人资料</span>
          <a href="">
            <span class="change-info-btn">修改资料</span>
          </a>
        </p>
        <div class="info-content">
          <div class="info-personal flex-row-ac jc-spb">
            <div
              class="info-wrap"
              v-for="item in UserInfoList"
              :key="item.id"
            >
              <span class="info-command">{{ item.command }}</span>
              <span class="info-value">{{ item.value }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { UserInfo } from "@/api/UserPage/types";
import NoData from "@/components/NoData.vue";

const UserInfoList: UserInfo[] = [
  { id: 1, command: "UID", value: "123456789" },
  { id: 2, command: "生日", value: "01-01" },
  { id: 3, command: "IP属地", value: "长沙市" },
];
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
    .section {
      background: #fff;
      border: 1px solid var(--bgc7);
      border-radius: 4px;
      padding: 15px 20px 18px;
      margin-bottom: 10px;
    }
    .user-info {
      .user-info-title {
        -ms-flex-pack: justify;
        box-sizing: border-box;
        padding-bottom: 18px;
        border-bottom: 1px solid var(--bgc8);
        margin-bottom: 10px;
        .info-title {
          line-height: 23px;
          font-size: 14px;
          color: var(--font-color-black2);
          font-family: Microsoft YaHei;
        }
        .change-info-btn {
          display: inline-block;
          width: 56px;
          height: 22px;
          color: var(--font-color-gray1);
          border: 0.5px solid #c0c9d4;
          text-align: center;
          font-size: 12px;
          line-height: 22px;
          border-radius: 4px;
        }
      }
      .info-content {
        vertical-align: baseline;
        .info-personal {
          flex-wrap: wrap;
          width: 100%;
          .info-wrap {
            flex-shrink: 0;
            width: 139px;
            margin: 10px 0;
            white-space: nowrap;
            .info-command {
              display: inline-block;
              min-width: 24px;
              font-size: 12px;
              font-family: Microsoft YaHei;
              line-height: 16px;
              color: var(--font-color-gray1);
              margin-right: 6px;
            }
            .info-value {
              color: #61666d;
              font-family: Microsoft YaHei;
              font-size: 12px;
              line-height: 16px;
              padding-right: 6px;
            }
          }
        }
      }
    }
  }
}
</style>