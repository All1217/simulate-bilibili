<template>
    <div class="upload-wrp" @click="triggerFileSelect">
        <div class="bcc-upload flex-col-ac jcc">
            <svg class="c-icon" aria-hidden="true">
                <use xlink:href="#icon-shangchuan"></use>
            </svg>
            <div class="upload-btn">上传视频</div>
            <input type="file" ref="videoInput" accept=".mp4" @change="handleFileChange" style="display: none;">
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
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
    }
    console.log(selectedFile.value)
    console.log(videoUrl.value)
};
</script>

<style scoped lang="less">
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
</style>