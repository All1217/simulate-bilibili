<template>
    <div class="flex-row UM-top-nav">
        <a v-for="e in props.as" @click="onAClick(e.id, e.href)"
            :class="curNav == e.id ? 'top-nav-item flex-row-ac top-nav-ac' : 'top-nav-item flex-row-ac top-nav-unac'">
            <span>{{ e.tagName }}</span>
        </a>
    </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import "@/styles/UploadManager/index.less"
import { defineProps } from 'vue';
import { TopNavItem } from "@/api/UploadManager/index"
import { useRouter, useRoute } from 'vue-router';
const emit = defineEmits(['update'])
const router = useRouter();
const route = useRoute();
interface Props {
    as: TopNavItem[],
}
const props = defineProps<Props>()
const curNav = ref(1)
function onAClick(cur: number, href: string) {
    curNav.value = cur
    if (href == "") {
        return;
    }
    router.push({path: href, query: route.query})
    emit('update', cur, href)
}
onMounted(() => {
    props.as.forEach((e) => {
        if (e.href == route.path) {
            curNav.value = e.id
        }
    })
})
</script>