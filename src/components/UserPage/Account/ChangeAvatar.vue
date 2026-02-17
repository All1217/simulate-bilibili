<template>
    <div class="model">
        <div class="modal-content">
            <div class="img-clip-wrap">
                <div class="container-bg" style="margin-bottom: 10px;" @click="localBtnClick">选择本地图像</div>
                <div class="container-bg">敬请期待</div>
                <input type="file" ref="coverInput" @change="handleFileChange" accept=".png,.jpg,.jpeg"
                    style="display: none;">
            </div>
            <div class="border-line"></div>
            <div class="img-preview-wrap">
                <img :src="coverUrl" alt="">
                <div class="pre-info">{{ btnFlag ? '预览头像' : '当前头像' }}</div>
            </div>
        </div>
        <p class="descript">请选择图片上传：大小180 * 180像素支持JPG、PNG等格式，图片需小于2M</p>
        <div class="modal-footer">
            <input type="button" value="更新" :disabled="!btnFlag" :class="btnFlag ? 'modal-btn on' : 'modal-btn off'"
                @click="onUpload">
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useUserStore } from '@/util/userStore';
import { onUploadAvatar } from '@/api/UploadManager/edit';
import { ElMessage } from 'element-plus';
import { getUserInfoByUid, updateAvatar } from '@/api/UserPage/index'
import { UserStatsQueryVo } from '@/api/UserPage/types'

const userStore = useUserStore()
const coverUrl = ref<string | null>(null);
const selectedFile = ref<File | null>(null);
const coverInput = ref<HTMLInputElement | null>(null);
const btnFlag = ref<boolean>(false)
const handleFileChange = async (event: Event) => {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
        selectedFile.value = input.files[0];
        const maxSize = 2 * 1024 * 1024;
        if (selectedFile.value.size > maxSize) {
            ElMessage.error('文件大小不能超过2MB');
            return;
        }
        const reader = new FileReader();
        reader.onload = () => {
            coverUrl.value = reader.result as string;
        };
        reader.readAsDataURL(selectedFile.value);
        btnFlag.value = true
    }
};
function localBtnClick() {
    coverInput.value.click()
}
async function onUpload() {
    btnFlag.value = false
    try {
        const { data } = await onUploadAvatar(selectedFile.value)
        coverUrl.value = data
        const res = await updateAvatar({ uid: userStore.userInfo.uid, avatar: coverUrl.value })
        if (res.code == 200) {
            ElMessage({
                type: 'success',
                message: '修改成功！'
            })
            onGetUserInfoByUid({ uid: userStore.userInfo.uid })
        }
    } catch (error) {
        console.log(error)
    }
}
async function onGetUserInfoByUid(params: UserStatsQueryVo) {
    try {
        const { data } = await getUserInfoByUid(params)
        userStore.setUserInfo(data)
    } catch (error) {
        console.log(error)
    }
}
onMounted(() => {
    coverUrl.value = userStore.userInfo.avatar
})
</script>
<style scoped lang="less">
.on {
    background: #00aeec;
    color: #fff;
}

.off {
    background: #f4f5f7;
    color: #ccd0d7;
}

.model {
    width: 830px;
    padding-bottom: 30px;
    text-align: center;

    .descript {
        line-height: 16px;
        color: #99a2aa;
    }

    .modal-footer {
        text-align: center;
        margin-top: 40px;

        .modal-btn {
            display: inline-block;
            width: 140px;
            height: 40px;
            font-size: 14px;
            line-height: 32px;
            border-radius: 4px;
            text-decoration: none;
            border-color: #f4f5f7;
            cursor: auto;
        }
    }
}

.modal-content {
    padding: 80px 20px 56px;
    display: inline-block;

    .img-clip-wrap {
        height: 182px;
        float: left;
        position: relative;
        margin-right: 40px;

        .container-bg {
            height: 84px;
            width: 180px;
            background-color: #f1f2f5;
            font-size: 16px;
            line-height: 84px;
            text-align: center;
            border-radius: 4px;
            border: 1px solid #e5e9ef;
            cursor: pointer;
        }
    }

    .border-line {
        height: 182px;
        width: 1px;
        background: #e5e9ef;
        float: left;
    }

    .img-preview-wrap {
        margin-left: 40px;
        margin-top: 30px;
        float: left;

        img {
            width: 96px;
            height: 96px;
            overflow: hidden;
            border-radius: 50%;
            border: 1px solid #e6eaf0;
            object-fit: cover;
        }

        .pre-info {
            margin-top: 20px;
            font-size: 12px;
            color: #99a2aa;
        }
    }
}
</style>