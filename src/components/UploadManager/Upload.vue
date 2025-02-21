<template>
    <div class="video-up-app">
        <div class="video-entrance">
            <TopNav :as="aList"></TopNav>
            <div class="upload-body">
                <div class="upload-body-content">
                    <div class="upload-wrp" @click="triggerFileSelect">
                        <div class="bcc-upload flex-col-ac jcc">
                            <svg class="c-icon" aria-hidden="true">
                                <use xlink:href="#icon-shangchuan"></use>
                            </svg>
                            <div class="upload-btn">上传视频</div>
                            <input type="file" ref="videoInput" accept=".mp4" @change="handleFileChange"
                                style="display: none;">
                        </div>
                    </div>
                    <div class="footer-item">
                        <span>目前仅支持mp4格式</span>
                    </div>
                    <div class="footer-item">
                        <span>上传视频，即表示您已同意 <a>Video使用协议</a> 与 <a>Video社区公约</a> ，请勿上传违法视频。</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { TopNavItem } from "@/api/UploadManager/index"
import TopNav from "./TopNav.vue";
import { useFileStore } from '@/util/fileStore'
import { useRouter } from 'vue-router'

const fileStore = useFileStore()
const router = useRouter()

const aList = ref<TopNavItem[]>(
    [
        { id: 1, tagName: "视频投稿", href: "" },
        { id: 2, tagName: "图文投稿", href: "" },
    ]
)
//上传视频
const videoUrl = ref<string | null>(null);
const selectedFile = ref<File | null>(null);
const videoInput = ref<HTMLInputElement | null>(null);
const triggerFileSelect = () => {
    if (videoInput.value) {
        videoInput.value.click();
    }
};
const handleFileChange = (event: Event) => {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
        selectedFile.value = input.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            videoUrl.value = reader.result as string;
        };
        reader.readAsDataURL(selectedFile.value);
        fileStore.setFile(selectedFile.value, videoUrl.value)
        router.push('/upload_manager/edit')
    }
};
</script>
<style scoped lang="less">
.video-up-app {
    .video-entrance {
        height: 100%;

        .upload-body {
            padding: 8px 0 16px;
            height: calc(100% - 64px);
            overflow: auto;

            .upload-body-content {
                max-width: 830px;
                margin: 0 auto;
                position: relative;

                .upload-wrp {
                    margin-top: 10px;
                    position: relative;
                    border: 2px dashed var(--bgc2);
                    cursor: pointer;

                    .bcc-upload {
                        margin-top: 62px;
                        margin-bottom: 32px;
                        display: flex;
                        justify-content: center;
                        position: relative;
                        color: #999;
                        font-size: 14px;
                        text-align: center;

                        svg {
                            font-size: 40px;
                        }

                        .upload-btn {
                            color: #fff;
                            margin: 20px auto;
                            width: 200px;
                            height: 44px;
                            cursor: pointer;
                            background: #00a1d6;
                            border-radius: 4px;
                            text-align: center;
                            line-height: 40px;
                            white-space: nowrap;
                        }
                    }
                }

                .footer-item {
                    margin-top: 18px;
                    text-align: center;
                    color: #99a2aa;
                    font-size: 12px;
                    line-height: 20px;

                    a {
                        color: #00a1d6;
                        font-size: 12px;
                        background: transparent;
                        text-decoration: none;
                        outline: none;
                        cursor: pointer;
                        transition: color .2s ease;
                    }
                }
            }
        }
    }
}
</style>