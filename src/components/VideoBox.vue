<template>
    <div class="video-box">
        <div class="cover-box" @click="$emit('jump', '123')">

        </div>
        <a class="title">
            标题十五字标题十五字标题十五字标题十五字标题十五字标题十五字标题十五字标题十五字标题十五字标题十五字标题十五字标题十五字标题十五字
        </a>
        <div class="meta"></div>
    </div>
</template>
<script lang="ts" setup>
/**
 * @description: 需要指定：
 * 封面高度、标题高度、信息条高度、字体大小、
 */
</script>
<style lang="less" scoped>
.video-box {
    position: relative;
    width: 100%;
    height: auto;
    cursor: pointer;
}

.cover-box {
    position: relative;
    width: 100%;
    height: 120px;
    background-color: #ff9f9f;
}

.title {
    display: -webkit-box;
    height: 38px;
    width: 100%;
    margin-top: 5px;
    line-height: 19px;
    color: #18191c;
    font-size: 13px;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-all;
    line-break: anywhere;
}
.title:hover{
    color: #00aeec;
}

.meta {
    width: 100%;
    margin-top: 5px;
    height: 16px;
    background-color: #a470e0;
}
</style>