import { Gender, Vip, AccountStatus, AccountRole, Auth } from "./enums"
import { User } from "./Models"
import http from '@/util/http'
import { Unread } from "./UserPage/types"

interface Popular {
    title: string
    href: string
    icon?: string
}

interface LoginData {
    username: string
    password: string
}

interface RegisterData {
    nickname: string
    password: string
}
//用户接口相关查找条件
interface ResearchCondition {
    uid: number
}

export interface Partition {
    id: number
    icon: string
    name: string
    link: string
}
export const partitonList: Partition[] = [
    { id: 1, icon: "#icon-wodezhuifan", name: "番剧", link: "" },
    { id: 2, icon: "#icon-dianying", name: "电影", link: "" },
    { id: 3, icon: "#icon-guochandonghuatuijian", name: "国创", link: "" },
    { id: 4, icon: "#icon-dianshiju", name: "电视剧", link: "" },
    { id: 5, icon: "#icon-guanggao", name: "综艺", link: "" },
    { id: 6, icon: "#icon-chun", name: "纪录片", link: "" },
    { id: 7, icon: "#icon-dong", name: "动画", link: "" },
    { id: 8, icon: "#icon-youxi", name: "游戏", link: "" },
    { id: 9, icon: "#icon-guixu", name: "鬼畜", link: "" },
    { id: 10, icon: "#icon-wodezhuifan", name: "音乐", link: "" },
    { id: 11, icon: "#icon-wodezhuifan", name: "舞蹈", link: "" },
    { id: 12, icon: "#icon-wodezhuifan", name: "影视", link: "" },
    { id: 13, icon: "#icon-yule", name: "娱乐", link: "" },
    { id: 14, icon: "#icon-wanjietuijian", name: "知识", link: "" },
    { id: 15, icon: "#icon-keji-", name: "科技", link: "" },
    { id: 16, icon: "#icon-dianshiju-", name: "资讯", link: "" },
    { id: 17, icon: "#icon-wodezhuifan", name: "美食", link: "" },
    { id: 18, icon: "#icon-shenghuo", name: "生活", link: "" },
    { id: 19, icon: "#icon-wodezhuifan", name: "汽车", link: "" },
    { id: 20, icon: "#icon-shishang", name: "时尚", link: "" },
    { id: 21, icon: "#icon-wodezhuifan", name: "运动", link: "" },
    { id: 22, icon: "#icon-fanjutuijian", name: "动物圈", link: "" },
    { id: 23, icon: "#icon-wodezhuifan", name: "VLOG", link: "" },
    { id: 24, icon: "#icon-zuixinlianzai", name: "搞笑", link: "" },
    { id: 25, icon: "#icon-wodezhuifan", name: "单机游戏", link: "" },
    { id: 26, icon: "#icon-wodezhuifan", name: "虚拟UP主", link: "" },
    { id: 27, icon: "#icon-wodezhuifan", name: "公益", link: "" },
    { id: 28, icon: "#icon-suoyin", name: "公开课", link: "" },
    { id: 29, icon: "#icon-wodezhuifan", name: "专栏", link: "" },
    { id: 30, icon: "#icon-zhibo", name: "直播", link: "" },
    { id: 31, icon: "#icon-wodezhuifan", name: "活动", link: "" },
    { id: 32, icon: "#icon-shijianbiao", name: "课堂", link: "" },
    { id: 33, icon: "#icon-wodezhuifan", name: "社区中心", link: "" },
    { id: 34, icon: "#icon-bianjituijian", name: "新歌热榜", link: "" },
]
export const avaPar: Partition[] = [
    { id: 7, icon: "#icon-dong", name: "动画", link: "" },
    { id: 8, icon: "#icon-youxi", name: "游戏", link: "" },
    { id: 9, icon: "#icon-guixu", name: "鬼畜", link: "" },
    { id: 10, icon: "#icon-wodezhuifan", name: "音乐", link: "" },
    { id: 11, icon: "#icon-wodezhuifan", name: "舞蹈", link: "" },
    { id: 12, icon: "#icon-wodezhuifan", name: "影视", link: "" },
    { id: 13, icon: "#icon-yule", name: "娱乐", link: "" },
    { id: 14, icon: "#icon-wanjietuijian", name: "知识", link: "" },
    { id: 15, icon: "#icon-keji-", name: "科技", link: "" },
    { id: 16, icon: "#icon-dianshiju-", name: "资讯", link: "" },
    { id: 17, icon: "#icon-wodezhuifan", name: "美食", link: "" },
    { id: 18, icon: "#icon-shenghuo", name: "生活", link: "" },
    { id: 19, icon: "#icon-wodezhuifan", name: "汽车", link: "" },
    { id: 20, icon: "#icon-shishang", name: "时尚", link: "" },
    { id: 21, icon: "#icon-wodezhuifan", name: "运动", link: "" },
    { id: 22, icon: "#icon-fanjutuijian", name: "动物圈", link: "" },
    { id: 23, icon: "#icon-wodezhuifan", name: "VLOG", link: "" },
    { id: 24, icon: "#icon-zuixinlianzai", name: "搞笑", link: "" },
    { id: 25, icon: "#icon-wodezhuifan", name: "单机游戏", link: "" },
    { id: 26, icon: "#icon-wodezhuifan", name: "虚拟UP主", link: "" },
    { id: 28, icon: "#icon-suoyin", name: "公开课", link: "" },
]

//热搜列表
export const popular_list: Popular[] = [
    {
        title: "见证哪吒2冲击百亿票房",
        href: "https://search.bilibili.com/all?vt=17020326&keyword=%E8%A7%81%E8%AF%81%E5%93%AA%E5%90%922%E5%86%B2%E5%87%BB%E7%99%BE%E4%BA%BF%E7%A5%A8%E6%88%BF&from_source=webtop_search&spm_id_from=333.1007&search_source=4",
    },
    {
        title: "哪吒2进入全球票房榜前20",
        href: "https://search.bilibili.com/all?vt=17057587&keyword=%E5%93%AA%E5%90%922%E8%BF%9B%E5%85%A5%E5%85%A8%E7%90%83%E7%A5%A8%E6%88%BF%E6%A6%9C%E5%89%8D20&from_source=webtop_search&spm_id_from=333.1007&search_source=4",
    },
    {
        title: "外交部回应哪吒2票房连破纪录",
        href: "https://search.bilibili.com/all?vt=17080152&keyword=%E5%A4%96%E4%BA%A4%E9%83%A8%E5%9B%9E%E5%BA%94%E5%93%AA%E5%90%922%E7%A5%A8%E6%88%BF%E8%BF%9E%E7%A0%B4%E7%BA%AA%E5%BD%95&from_source=webtop_search&spm_id_from=333.1007&search_source=4",
    },
    {
        title: "鸣潮2.1新版本",
        href: "https://search.bilibili.com/all?vt=17107573&keyword=%E9%B8%A3%E6%BD%AE2.1%E6%96%B0%E7%89%88%E6%9C%AC&from_source=webtop_search&spm_id_from=333.1007&search_source=4",
    },
    {
        title: "潜水员戴夫DLC公布预告",
        href: "https://search.bilibili.com/all?vt=17126214&keyword=%E6%BD%9C%E6%B0%B4%E5%91%98%E6%88%B4%E5%A4%ABDLC%E5%85%AC%E5%B8%83%E9%A2%84%E5%91%8A&from_source=webtop_search&spm_id_from=333.1007&search_source=4",
    },
    {
        title: "HLE大战T1前瞻",
        href: "https://search.bilibili.com/all?keyword=HLE%E5%A4%A7%E6%88%98T1%E5%89%8D%E7%9E%BB&from_source=webtop_search&spm_id_from=333.1007&search_source=5",
    },
    {
        title: "我独自升级男主成为黄金矿工",
        href: "https://search.bilibili.com/all?vt=17216989&keyword=%E6%88%91%E7%8B%AC%E8%87%AA%E5%8D%87%E7%BA%A7%E7%94%B7%E4%B8%BB%E6%88%90%E4%B8%BA%E9%BB%84%E9%87%91%E7%9F%BF%E5%B7%A5&from_source=webtop_search&spm_id_from=333.1007&search_source=4",
    },
    {
        title: "怪物猎人荒野 泡狐龙回归",
        href: "https://search.bilibili.com/all?vt=17239157&keyword=%E6%80%AA%E7%89%A9%E7%8C%8E%E4%BA%BA%E8%8D%92%E9%87%8E%20%E6%B3%A1%E7%8B%90%E9%BE%99%E5%9B%9E%E5%BD%92&from_source=webtop_search&spm_id_from=333.1007&search_source=4",
    },
    {
        title: "今日天庭无人值班",
        href: "https://search.bilibili.com/all?vt=17262246&keyword=%E4%BB%8A%E6%97%A5%E5%A4%A9%E5%BA%AD%E6%97%A0%E4%BA%BA%E5%80%BC%E7%8F%AD&from_source=webtop_search&spm_id_from=333.1007&search_source=4",
    },
    {
        title: "18岁球员海外拉练脑死亡",
        href: "https://search.bilibili.com/all?vt=17283610&keyword=18%E5%B2%81%E7%90%83%E5%91%98%E6%B5%B7%E5%A4%96%E6%8B%89%E7%BB%83%E8%84%91%E6%AD%BB%E4%BA%A1&from_source=webtop_search&spm_id_from=333.1007&search_source=4",
    }
]

export var defaultUser: User = {
    uid: 0,
    username: "123123123",
    nickname: "用户名",
    avatar: "../assets/images/logo.png",
    gender: Gender.UNKNOWN,
    description: "",
    coin: 0,
    status: AccountStatus.NORMAL,
    role: AccountRole.NORMAL,
    createDate: new Date(),
    deleteDate: new Date(),
}

export const DefaultUnread: Unread = {
    uid: 0,
    reply: 0,
    at: 0,
    love: 0,
    system: 0,
    whisper: 0,
    dynamic: 0
}

// 消息类型列表
export const msg_type = ([
    { id: 1, name: "回复我的", link: "", key: 'reply' },
    { id: 2, name: "@我的", link: "", key: 'at' },
    { id: 3, name: "收到的赞", link: "", key: 'love' },
    { id: 4, name: "系统消息", link: "", key: 'system' },
    { id: 5, name: "我的消息", link: "", key: 'whisper' },
])

/**
 * @description 登录
 */
export function onLogin(data: LoginData) {
    return http.post<string>('/main/login', data)
}
/**
 * @description 获取登录用户信息
 */
export function getUserInfoByUid() {
    return http.get<User>('/main/info')
}
/**
 * @description 注册
 */
export function onRegister(data: RegisterData) {
    return http.post<string>('/main/user/register', data)
}
/**
 * @description 获取未读信息统计
 */
export function getUnreadByUid(param: ResearchCondition) {
    return http.get<Unread>('/main/user/getUnreadById', param)
}