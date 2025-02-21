<template>
  <div class="dialog-container" :style="dc_style">
    <slot name="head"></slot>
    <slot name="body"></slot>
    <slot name="foot"></slot>
  </div>
</template>

<script>
export default {
name: 'Dialog',
data(){
    return {
        dc_style: `width: ${this.dWidth}; height: ${this.dHeight}; ${this.dPos}`
    }
},
props: ['dWidth', 'dHeight', 'dPos']
}
</script>

<style lang="less" scoped>
.dialog-container {
    position: absolute;
    min-width: 100px;
    min-height: 80px;
    padding: 16px 0;
    border-radius: 10px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    animation: emerge .5s ease;
}
@keyframes emerge {
    0% {
        box-shadow: none;
        opacity: 0;
        transform: translateY(-50px);
    }
    100% {
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        opacity: 1;
        transform: translateY(0);
    }
}
</style>