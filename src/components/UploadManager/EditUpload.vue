<template>
    <div class="video-basic">
        <div class="video-upload">
            <div class="upload-header flex-row-ac jc-spb">
                <span>编辑视频信息</span>
            </div>
            <div class="upload-queue">
                <div class="file-item flex-row-ac">
                    <div class="file-item-icon"></div>
                    <div class="file-item-content">
                        <div class="file-item-content-detail flex-row-ac jc-spb">
                            <div class="file-item-content-text">
                                <div class="title nto">{{ fileVo.fileName }}</div>
                                <div class="file-item-content-status flex-row-ac">
                                    <svg class="c-icon" aria-hidden="true" v-show="uploadPercent == 100">
                                        <use xlink:href="#icon-wancheng"></use>
                                    </svg>
                                    <span v-show="uploadPercent == 100">上传完成</span>
                                    <span v-show="uploadPercent < 100">上传中{{ ` ${uploadPercent}%` }}</span>
                                </div>
                            </div>
                            <div class="file-item-content-operate flex-row-ac">
                                <svg class="c-icon" aria-hidden="true">
                                    <use xlink:href="#icon-shuaxin1"></use>
                                </svg>
                                <span>更换视频</span>
                            </div>
                        </div>
                        <div class="file-item-content-progress">
                            <div class="file-item-content-progress-inner" :style="`width: ${uploadPercent}%;`"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="form">
            <div class="form-item flex-row">
                <div class="section-title-container">
                    <p class="section-title-deg">
                        <span>*</span>
                    </p>
                    <h3 class="section-title-content-main">封面</h3>
                </div>
                <div class="cover-content" @click="triggerFileSelect">
                    <img v-if="imgUrl" :src="imgUrl" alt="预览图片" width="100%" height="100%">
                    <span v-else>暂无封面</span>
                </div>
                <input type="file" ref="coverInput" @change="handleFileChange" accept=".png,.svg,.jpg,.jpeg"
                    style="display: none;">
            </div>
            <div class="form-item flex-row">
                <div class="section-title-container">
                    <p class="section-title-deg">
                        <span>*</span>
                    </p>
                    <h3 class="section-title-content-main">标题</h3>
                </div>
                <div class="video-title-content">
                    <div
                        :class="isTitleFocus ? 'input-container flex-row-ac title-focus' : 'input-container flex-row-ac title-unfocus'">
                        <div class="input-instance">
                            <input type="text" maxlength="80" placeholder="请输入稿件标题" class="input-val"
                                @focus="isTitleFocus = true" @blur="isTitleFocus = false" v-model.trim="inputText.text">
                        </div>
                        <p class="input-max-tip">{{ inputText.length }}/80</p>
                    </div>
                    <div class="msg"></div>
                </div>
            </div>
            <div class="form-item flex-row">
                <div class="section-title-container">
                    <p class="section-title-deg">
                        <span>*</span>
                    </p>
                    <h3 class="section-title-content-main">类型</h3>
                </div>
                <div class="video-type">
                    <el-radio-group v-model="videoType">
                        <el-radio :value="1" size="large">自制</el-radio>
                        <el-radio :value="2" size="large">转载</el-radio>
                    </el-radio-group>
                </div>
            </div>
            <div class="form-item flex-row">
                <div class="section-title-container">
                    <p class="section-title-deg">
                        <span>*</span>
                    </p>
                    <h3 class="section-title-content-main">分区</h3>
                </div>
                <div>
                    <el-dropdown>
                        <el-button size="large">
                            {{ parType.curTag }}<el-icon class="el-icon--right"><arrow-down /></el-icon>
                        </el-button>
                        <template #dropdown>
                            <div class="be-dropdown-menu par-menu">
                                <div v-for="e in avaPar" class="be-dropdown-item" @click="onParTypeChange(e.id, e.name)"
                                    :style="parType.curType == e.id ? 'color: var(--cur-blue);' : ''">{{ e.name }}</div>
                            </div>
                        </template>
                    </el-dropdown>
                </div>
            </div>
            <div class="form-item flex-row">
                <div class="section-title-container">
                    <p class="section-title-deg">
                        <span> </span>
                    </p>
                    <h3 class="section-title-content-main">标签</h3>
                </div>
                <div>
                    <el-input-tag v-model="inputTags" placeholder="按回车键Enter创建标签" aria-label="按回车键Enter创建标签" :max="10"
                        size="large" />
                    <!-- <button @click="inputTags.push('abc')">测试</button> -->
                </div>
            </div>
            <div class="form-item flex-row">
                <div class="section-title-container">
                    <p class="section-title-deg">
                        <span> </span>
                    </p>
                    <h3 class="section-title-content-main">简介</h3>
                </div>
                <div class="ql-editor">
                    <textarea placeholder="请输入简介" maxlength="500" v-model="inputText.intro"></textarea>
                    <p class="input-intro-tip">{{ inputText.introLength }}/500</p>
                </div>
            </div>
            <div class="form-item flex-row">
                <div class="section-title-container">
                    <p class="section-title-deg">
                        <span> </span>
                    </p>
                    <h3 class="section-title-content-main">可见范围</h3>
                </div>
                <div class="video-type">
                    <el-radio-group v-model="visibleRange">
                        <el-radio :value="1" size="large">公开可见</el-radio>
                        <el-radio :value="2" size="large">仅自己可见</el-radio>
                    </el-radio-group>
                </div>
            </div>
            <div class="form-item">
                <div class="submit-container flex-row-ac" @click="submit">
                    <span class="submit-add">立即投稿</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, reactive, watch, onMounted } from 'vue';
import { useFileStore } from '@/util/fileStore'
import { ElMessage } from 'element-plus'
import { defaultVideo, UploadVideo } from "@/api/UploadManager/edit/types";
import { avaPar } from '@/api/app'
import { onUpload, onSubmit, onUploadCover } from '@/api/UploadManager/edit';
import { Video } from '@/api/Models';
import { useUserStore } from '@/util/userStore'
import { getVideoDuration } from '@/util';
import router from '@/router';

const userStore = useUserStore()
const fileStore = useFileStore()
const uploadVideo = ref<File | null>();
const fileVo = ref<UploadVideo>(defaultVideo)
const uploadPercent = ref<number>(0)
const videoUrl = ref<string>("")
const coverUrl = ref<string>("")
const videoDuration = ref<number>(0)

//上传封面
const coverInput = ref<HTMLInputElement | null>(null);
const triggerFileSelect = () => {
    if (coverInput.value) {
        coverInput.value.click();
    }
};
//预览图片路径
const imgUrl = ref<string | null>(null);
const selectedFile = ref<File | null>(null);
const handleFileChange = async (event: Event) => {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
        selectedFile.value = input.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            imgUrl.value = reader.result as string;
        };
        reader.readAsDataURL(selectedFile.value);
        const { data } = await onUploadCover(selectedFile.value)
        coverUrl.value = data
    }
};

const isTitleFocus = ref<boolean>(false);
const inputText = reactive({
    text: "",
    length: 0,
    intro: "",
    introLength: 0
});
const videoType = ref<number>(1)
watch(inputText, (newValue: any) => {
    inputText.length = newValue.text.length;
    inputText.introLength = newValue.intro.length;
});
//选择分区
const parType = reactive({
    curType: -1,
    curTag: "选择分区"
})
function onParTypeChange(id: number, str: string) {
    parType.curType = id;
    parType.curTag = str;
}
//输入标签
const inputTags = ref<string[]>([])//初始化为空数组防止报空错
//可见范围
const visibleRange = ref<number>(1)
function submit() {
    if (coverUrl.value == "" || !imgUrl) {
        ElMessage.error('请上传封面！')
        return;
    }
    if (inputText.text.length == 0) {
        ElMessage.error('请输入标题！')
        return;
    }
    if (parType.curType == -1) {
        ElMessage.error('请选择分区！')
        return;
    }
    const video = {
        vid: 0,
        uid: userStore.userInfo.uid,
        title: inputText.text,
        type: videoType.value,
        auth: 0,
        duration: videoDuration.value,
        mcId: parType.curType,
        scId: 1,
        status: 1,
        visible: 0,
        tags: inputTags.value.join(' '),
        descr: inputText.intro,
        coverUrl: coverUrl.value,
        videoUrl: videoUrl.value
    }
    callSubmit(video)
}
const onUpdatePercent = (progress: number) => {
    if (uploadComplete.value) {
        uploadPercent.value = 100;
        console.log("percent(onUpdatePercent): ", uploadPercent.value);
        return;
    }
    uploadPercent.value = uploadPercent.value >= 90 ? 90 : progress;
}
async function callSubmit(video: Video) {
    try {
        if (!uploadComplete.value) {
            ElMessage.warning('视频正在上传中！');
            return;
        }
        await onSubmit(video)
        ElMessage({ message: '发布成功！', type: 'success', })
        router.replace('/upload_manager/upload')
    } catch (error) {
        console.log(error)
    }
}
/**
 * @description 上传视频
 * @TODO 实时追踪上传进度有问题待解决 
 */
const uploadComplete = ref<boolean>(false);
async function callUpload() {
    try {
        const { data } = await onUpload(uploadVideo.value, onUpdatePercent)
        videoUrl.value = data
        uploadComplete.value = true;
        console.log('completed!')
        console.log("url: ", data);
        console.log("flag: ", uploadComplete.value);
        if (uploadPercent.value < 100) uploadPercent.value = 100;
        console.log("percent(callUpload): ", uploadPercent.value);
    } catch (error) {
        console.log(error)
    }
}
async function getVideoLength() {
    const durationPromise: Promise<number> = getVideoDuration(uploadVideo.value);
    videoDuration.value = await durationPromise;
}
onMounted(() => {
    if (fileStore.selectedFile) {
        uploadVideo.value = fileStore.selectedFile
        fileVo.value.fileName = uploadVideo.value.name
        getVideoLength()
        //上传视频
        callUpload()
    } else {
        ElMessage.error('获取视频文件失败！')
    }
})
</script>
<style scoped lang="less">
.par-menu {
    max-height: 300px;
    overflow-x: hidden;
    overflow-y: auto;
}

.title-focus {
    border: 1px solid var(--hover-blue);
}

.title-unfocus {
    border: 1px solid #ccd0d7;
}

.video-basic {
    position: relative;
    min-width: 1000px;
    max-width: 1100px;
    min-height: 100%;
    margin: 50px auto 0;
    background: #fff;

    .video-upload {
        .upload-header {
            height: 100%;
            padding: 0 32px;
            position: relative;
            font-size: 16px;
            line-height: 28px;
            height: 70px;
            box-shadow: 0 1px 0 #e7e7e7;

            span {
                font-weight: 600;
                color: #212121;
            }
        }

        .upload-queue {
            margin: 23px 32px 6px;
            position: relative;
            height: 82px;
            transition: height .5s ease-in-out;
            overflow: hidden;

            .file-item {
                width: 838px;
                height: 76px;

                .file-item-icon {
                    margin: 0 12px 0 0;
                    width: 30px;
                    height: 38px;
                    background: url(../../assets/images/upload_video.png) no-repeat;
                    background-size: 100% 100%;
                }

                .file-item-content {
                    width: 838px;

                    .file-item-content-detail {
                        .file-item-content-text {
                            line-height: 18px;
                            width: 100%;
                            overflow: hidden;
                            margin-right: 10px;

                            .title {
                                max-width: 645px;
                                padding: 6px 0 6px 6px;
                                color: #222;
                                font-weight: 400;
                                font-size: 13px;
                            }

                            .file-item-content-status {
                                margin-left: 6px;

                                svg {
                                    font-size: 5px;
                                    line-height: 14px;
                                    width: 14px;
                                    height: 14px;
                                    margin-right: 8px;
                                }

                                span {
                                    color: #999;
                                    font-size: 10px;
                                    line-height: 14px;
                                }
                            }
                        }

                        .file-item-content-operate {
                            width: 120px;
                            margin-top: 10px;
                            cursor: pointer;

                            svg {
                                margin-right: 5px;
                                font-size: 24px;
                            }

                            span {
                                font-size: 14px;
                                color: var(--cur-blue);
                            }
                        }
                    }

                    .file-item-content-progress {
                        margin-top: 6px;
                        margin-left: 6px;
                        height: 3px;
                        width: calc(100% - 6px);
                        border-radius: 4px;
                        background-color: #e7e7e7;

                        .file-item-content-progress-inner {
                            height: 100%;
                            background-color: #43ce5b;
                            transition: all .3sease-in-out;
                        }
                    }
                }
            }
        }
    }

    .form {
        margin: 30px 30px 0 0;
        background: #fff;
        width: 80%;
        min-width: 900px;

        .form-item {
            margin: 24px 0 0 20px;

            .section-title-container {
                display: inline-flex;
                align-items: center;
                position: relative;
                flex-wrap: wrap;
                width: 134px;

                .section-title-deg {
                    line-height: 16px;
                    width: 12px;

                    span {
                        font-size: 16px;
                        color: #ff3b30;
                    }
                }

                .section-title-content-main {
                    font-size: 14px;
                    color: #212121;
                    line-height: 21px;
                    font-weight: 400;
                }
            }

            .cover-content {
                width: 169px;
                height: 127px;
                position: relative;
                border-radius: 4px;
                cursor: pointer;
                overflow: hidden;
                background-color: var(--bgc5);

                span {
                    line-height: 127px;
                    text-align: center;
                    color: #fff;
                    font-weight: 700;
                    font-size: 25px;
                    display: block;
                    width: 100%;
                    height: 100%;
                }

                img {
                    object-fit: cover;
                }
            }

            .video-title-content {
                width: 80%;

                .input-container {
                    background: hsla(0, 0%, 84.7%, 0);
                    border-radius: 4px;
                    padding: 0 12px;
                    flex-wrap: wrap;
                    transition: border .3s ease;

                    .input-instance {
                        width: 93%;
                        min-width: 200px;
                        margin: 6px 0;

                        .input-val {
                            display: block;
                            width: 100%;
                            color: #222;
                            line-height: 22px;
                            height: 22px;
                            font-size: 14px;
                            outline: 0;
                            appearance: none;
                            border: 0;
                            background-color: transparent;
                        }
                    }

                    .input-max-tip {
                        font-size: 14px;
                        color: #9ba4ac;
                        margin: 8px 0 8px 5px;
                    }
                }

                .input-container:hover {
                    border: 1px solid var(--hover-blue);
                }

                .msg {
                    color: #fc403c;
                    font-family: PingFang SC;
                    font-size: 12px;
                    font-weight: 400;
                    line-height: 18px;
                    text-align: left;
                    margin: 5px 0;
                }
            }

            .ql-editor {
                position: relative;
                margin-top: 12px;
                padding: 12px 60px 12px 15px;
                height: 160px;
                width: 80%;
                min-width: 700px;
                border-radius: 8px;
                border: 1px solid #ccc;
                line-height: 1.42;

                .input-intro-tip {
                    position: absolute;
                    right: 8px;
                    bottom: 0;
                    font-size: 14px;
                    color: #9ba4ac;
                    margin: 8px 0 8px 5px;
                }

                textarea {
                    width: 100%;
                    height: 100%;
                    font-size: 15px;
                    color: #222;
                    resize: none;
                    background-color: transparent;
                    border: none;
                    outline: none;
                    white-space: pre-wrap;
                    word-wrap: break-word;
                }
            }

            .submit-container {
                padding: 32px 0 32px 134px;
                position: relative;

                .submit-add {
                    line-height: 40px;
                    color: #fff;
                    background: #00a1d6;
                    display: inline-block;
                    height: 40px;
                    font-size: 14px;
                    border-radius: 4px;
                    text-align: center;
                    vertical-align: middle;
                    width: 120px;
                    cursor: pointer;
                    user-select: none;
                    transition: all .3s ease;
                }

                .submit-add:hover {
                    background: #13b9f0;
                }
            }
        }
    }
}
</style>