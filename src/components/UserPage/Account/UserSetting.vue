<template>
    <div class="user-setting-warp">
        <el-form :model="form" label-width="auto" style="max-width: 600px" v-loading="isLoading">
            <el-form-item label="昵称：">
                <el-input v-model="form.nickname" show-word-limit maxlength="15" />
            </el-form-item>
            <el-form-item label="用户名：">
                <span class="userinfo-descript">{{ form.uid }}</span>
            </el-form-item>
            <el-form-item label="我的签名：">
                <el-input v-model="form.desc" type="textarea" show-word-limit maxlength="100"
                    :autosize="{ minRows: 3, maxRows: 3 }" resize="none" />
            </el-form-item>
            <el-form-item label="性别：">
                <el-radio-group v-model="form.gender">
                    <el-radio :value="0">男</el-radio>
                    <el-radio :value="1">女</el-radio>
                    <el-radio :value="2">保密</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="出生日期：">
                <el-date-picker v-model="form.date" type="date" :placeholder="form.date" style="width: 100%" />
            </el-form-item>
            <el-form-item label="学校信息：">
                <el-input v-model="form.school" show-word-limit maxlength="20" />
            </el-form-item>
        </el-form>
        <div class="flex-row jcc">
            <button class="update-btn" @click="submit">保存</button>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { reactive, ref, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import { getUserVo, updateUserInfo } from '@/api/UserPage/index'
import { useUserStore } from '@/util/userStore';
import { getFormatCurTime } from '@/util';
import { DateStringType } from '@/api/enums';
const userStore = useUserStore()
const isLoading = ref<boolean>(true)
const form = reactive({
    nickname: '',
    uid: '000000000',
    gender: 2,
    desc: '',
    date: '1980-01-01',
    school: '',
})
function submit() {
    onUpdateInfo();
}
async function onGetUserVo() {
    try {
        const res = await getUserVo({ uid: userStore.userInfo.uid });
        if (res.code == 200) {
            const userVo = res.data;
            form.uid = '' + userVo.uid;
            form.nickname = userVo.nickname;
            form.desc = userVo.description == null ? '' : userVo.description;
            form.date = userVo.birthDate == null ? '1980-01-01' : res.data.birthDate;
            form.school = userVo.school == null ? '' : userVo.school;
            form.gender = userVo.gender;
            isLoading.value = false;
        }
    } catch (error) {
        console.log(error)
    }
}
async function onUpdateInfo() {
    try {
        isLoading.value = true;
        const tDate = new Date(form.date);//不这么写的话，传给后端的时间会倒退一天，不知道为什么
        let q = {
            uid: userStore.userInfo.uid,
            nickname: form.nickname,
            description: form.desc,
            birthDate: getFormatCurTime(tDate.getTime(), DateStringType.Y_M_D),
            school: form.school,
            gender: form.gender
        }
        // console.log('将要更新：', q.birthDate);
        const res = await updateUserInfo(q);
        if (res.code == 200) onGetUserVo();
    } catch (error) {
        console.log(error)
        ElMessage.error('操作失败！');
        isLoading.value = false;
    }
}
onMounted(() => {
    if (userStore.token) {
        onGetUserVo();
    }
})
</script>
<style lang="less" scoped>
.user-setting-warp {
    padding: 20px 20px 20px 80px;
    position: relative;

    .userinfo-descript {
        font-size: 14px;
        color: #898989;
        line-height: 30px;
    }

    .update-btn {
        color: #fff;
        height: 36px;
        width: 110px;
        margin: auto;
        background: #00a1d6;
        border-radius: 4px;
    }

    .update-btn:hover {
        background-color: #00aeec;
    }
}
</style>