<template>
  <div class="MC-container">
    <div class="c-container">
      <div class="space-left">
        <div class="side-bar">
          <div class="title flex-row-ac jcc">
            <svg
              view-box="0 0 16 12"
              class="air-craft css-1dtzbno"
            >
              <path
                d="M15.6386295,4.17014918 C16.454219,4.39885202 15.6343208,5.07824066 15.6343208,5.07824066 L12.8711365,7.09359077 L4.27181047,2.64580413 C4.27181047,2.64580413 10.0809335,6.55511522 11.8533103,7.76666817 L5.86501964,11.7253113 C4.91770244,12.2710516 4.67094307,11.8350769 4.67094307,11.8350769 L4.25489009,10.97071 L0.0325132718,0.704758608 C-0.125784343,0.348173789 0.320384239,-0.0596727945 0.798575886,0.00727624935 L15.6386295,4.17014918 Z M10.2454612,9.59252937 C10.230576,9.58092963 10.2174075,9.56728156 10.2063473,9.55199119 C10.14161,9.46249359 10.1616822,9.3374615 10.2511798,9.27272421 L11.7512731,8.18764499 C11.7871922,8.16166319 11.8307257,8.14835156 11.875033,8.14980177 C11.9854308,8.15341518 12.0719967,8.24583954 12.0683833,8.35623737 L11.9964408,10.5542479 C11.995057,10.5965255 11.9803043,10.6372757 11.9543032,10.6706411 C11.8864076,10.757767 11.7607379,10.7733563 11.673612,10.7054607 L10.2454612,9.59252937 Z"
                id="纸飞机"
                transform="translate(7.000000, 6.000000) scale(-0.9, 0.9) translate(-7.000000, -6.000000)"
                style="transform-origin: 0px 0px;"
              ></path>
            </svg>
            <div>消息中心</div>
          </div>
          <ul class="list">
            <li
              class="item rpos flex-row-ac"
              :style="curMessage==1?'color:#00aeec;':''"
              @click="curMessage=1"
            >
              <router-link
                to="/message_center/whisper"
                :style="curMessage==1?'color:#00aeec;':''"
              >我的消息</router-link>
            </li>
            <li
              class="item rpos flex-row-ac"
              :style="curMessage==2?'color:#00aeec;':''"
              @click="curMessage=2"
            >
              <a :style="curMessage==2?'color:#00aeec;':''">回复我的</a>
            </li>
            <li
              class="item rpos flex-row-ac"
              :style="curMessage==3?'color:#00aeec;':''"
              @click="curMessage=3"
            >
              <a :style="curMessage==3?'color:#00aeec;':''">@ 我的</a>
            </li>
            <li
              class="item rpos flex-row-ac"
              :style="curMessage==4?'color:#00aeec;':''"
              @click="curMessage=4"
            >
              <a :style="curMessage==4?'color:#00aeec;':''">收到的赞</a>
            </li>
            <li
              class="item rpos flex-row-ac"
              :style="curMessage==5?'color:#00aeec;':''"
              @click="curMessage=5"
            >
              <router-link
                to="/message_center/system"
                :style="curMessage==5?'color:#00aeec;':''"
              >系统通知</router-link>
            </li>
          </ul>
          <div class="divided-line"></div>
          <div
            class="setting rpos flex-row-ac"
            @click="curMessage=6"
          >
            <a :style="curMessage==6?'color:#00aeec;':''">
              <svg
                view-box="0 0 16 15"
                class="setting-icon css-1dtzbno"
                :style="curMessage==6?'fill:#00aeec;':''"
              >
                <path
                  d="M9.28219976,16.9928072 C9.00196705,16.9830213 8.62828086,16.9699719 8.35130844,16.8668237 C7.88746873,16.7570586 7.61700372,16.4670393 7.44318203,16.0868457 C7.27595707,15.5198389 7.00875552,15.1363662 6.55144084,14.8397489 C6.09417835,14.5432065 5.63033546,14.4335326 5.06659151,14.5073223 C4.68964249,14.5877082 4.22580215,14.4779613 3.95860061,14.0944886 C3.60124172,13.6144096 3.24712805,13.0408765 3.08316847,12.3803615 C2.90934424,12.0002409 3.01909171,11.5363823 3.30911036,11.2659356 C3.69910878,10.8118636 3.90228894,10.3513408 3.92186337,9.79080239 C3.94143589,9.23031872 3.77087767,8.75667164 3.41350053,8.27659204 C3.1430544,7.98655515 3.06593077,7.51618914 3.26585065,7.14902862 C3.56567348,6.59834978 3.86547872,6.04765205 4.25872173,5.50014418 C4.55202145,5.13626282 5.02238491,5.05921217 5.39281081,5.16562383 C5.95003165,5.27863158 6.42039765,5.20150795 6.89723266,4.93756668 C7.37412178,4.67364558 7.76085674,4.31302704 7.87379151,3.75580366 C8.07371138,3.38864313 8.3670111,3.02476177 8.83411428,3.04107337 C9.491296,2.97047349 10.0517797,2.99004602 10.7024357,3.1063166 C11.1695389,3.1226282 11.4367228,3.50608208 11.6104892,3.88629202 C11.7777871,4.45330134 12.044971,4.83675523 12.5022335,5.13329763 C12.9595684,5.42986082 13.4234087,5.53960766 13.9871552,5.46574495 C14.3640834,5.38543147 14.8278716,5.49510341 15.0951285,5.87855984 C15.4524295,6.35872812 15.8065249,6.93226056 15.9705606,7.59268687 C16.144327,7.9728968 16.0345801,8.43673714 15.7412798,8.80063675 C15.3545656,9.16118294 15.1514559,9.62178124 15.1318834,10.1822649 C15.1123089,10.7428033 15.2827967,11.2163749 15.6401524,11.696545 C15.9106174,11.9865643 15.9877404,12.4569486 15.7846156,12.917455 C15.4848079,13.4682257 15.1849296,14.0189209 14.7917446,14.5663395 C14.5016523,14.8368019 14.031341,14.9139275 13.6609359,14.8074435 C13.1970748,14.697769 12.6333491,14.7715593 12.1564417,15.0354798 C11.6796048,15.2994758 11.2896272,15.7534755 11.1798797,16.2173341 C11.0733957,16.5877392 10.6867331,16.9483785 10.2196299,16.9320669 C9.93611866,17.0156426 9.56245072,17.0025938 9.28219976,16.9928072 Z M9.5264564,12.7907616 C11.0220027,12.7907616 12.2372185,11.575637 12.2372185,9.9865255 C12.2372185,8.39748699 11.0220027,7.1823442 9.5264564,7.1823442 C8.03083705,7.1823442 6.81571251,8.39748699 6.81571251,9.9865255 C6.81571251,11.575637 8.03083705,12.7907616 9.5264564,12.7907616 Z"
                  transform="scale(0.9) translate(-1.5, 0)"
                ></path>
              </svg>
              消息设置
            </a>
          </div>
        </div>
      </div>
      <div class="space-right flex-col">
        <div class="space-right-top">
          <div class="title flex-row-ac">
            <span>我的消息</span>
          </div>
        </div>
        <div class="space-right-bottom rpos">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
//当前要查看的消息类型
const curMessage = ref(1);

const route = useRoute();
onMounted(() => {
  if (route.path == "/message_center/system") {
    curMessage.value = 5
  } else if (route.path == "/message_center/whisper") {
    curMessage.value = 1
  }
});
</script>

<style lang="less" scoped>
.MC-container {
  overflow: hidden;
  width: 100vw;
  height: 100vh;
  background: url(../../assets/images/MessageCenterBackground.png) top / cover
    no-repeat fixed;
  font-size: 12px;
  line-height: 12px;
  color: var(--font-color-gray2);
}
.c-container {
  display: flex;
  flex-direction: row;
  align-items: stretch;
  width: 1143px;
  max-width: 1143px;
  height: calc(100vh - 64px);
  margin: 0 auto;
  margin-top: 64px;
}
.css-1dtzbno {
  width: 1em;
  height: 1em;
}
.space-left {
  width: 140px;
  min-width: 140px;
  background-color: rgba(255, 255, 255, 0.8);
  .side-bar {
    width: 100%;
    font-size: 14px;
    font-weight: 700;
    color: var(--font-color-gray2);
    .title {
      height: 62px;
      color: var(--font-color-black2);
      .air-craft {
        margin-right: 10px;
      }
    }
    .list {
      padding: 0 0 0 20px;
      .item {
        height: 40px;
        a {
          display: inline-block;
          padding-left: 10px;
          line-height: 40px;
        }
      }
      .item::before {
        content: "\25cf";
        line-height: 20px;
        width: 10px;
        height: 20px;
        text-align: center;
      }
      .item:hover {
        color: var(--hover-blue);
      }
      .item:hover a {
        color: var(--hover-blue);
      }
    }
    .divided-line {
      border-top: 1px solid #fff;
      margin: 10px 0;
    }
    .setting {
      height: 40px;
      a {
        display: inline-block;
        line-height: 40px;
        padding-left: 20px;
      }
      .setting-icon {
        display: inline-block;
        margin-right: 5px;
        fill: #6b758b;
      }
    }
    .setting:hover a {
      color: var(--hover-blue);
    }
    .setting:hover .setting-icon {
      fill: var(--hover-blue);
    }
  }
}
.space-right {
  width: calc(100% - 140px);
  background-color: rgba(255, 255, 255, 0.5);
  -webkit-box-flex: 1;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  .space-right-top {
    padding: 10px 10px 0;
    z-index: 11;
    .title {
      height: 42px;
      background-color: #fff;
      box-shadow: 0 2px 4px 0 rgba(121, 146, 185, 0.54);
      padding: 0 16px;
      border-radius: 4px;
      span {
        font-size: 15px;
        color: #666;
      }
    }
  }
  .space-right-bottom {
    padding: 10px;
    height: calc(100% - 66px);
  }
}
</style>