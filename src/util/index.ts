import { DateStringType } from "@/api/enums"

//修改DOM元素style
export function changeStyle(element: any, map: Map<string, string>) {
    const keys = map.keys();
    for (const key of keys) {
        element.style[key] = map.get(key);
    }
}
//仅vite可用
// export function GSR(name: string) {
//     return new URL(`${name}`, import.meta.url).href
// }
// export const GSR = (fileName: string, type: string = 'png') => {
//     const path = `${fileName}.${type}`;
//     const modules = import.meta.glob('@/assets/images/home/*.{png,svg,jpg,jpeg}', { eager: true });
//     if (modules[path]) return modules[path].default;
//     else {
//         console.error("Error url is wrong path");
//     }
// };

//获取元素的translateX偏移量
export function getTranslateX(element: HTMLElement) {
    // 获取元素的计算样式
    const style = window.getComputedStyle(element);
    // 获取 transform 属性
    const transform = style.transform;
    if (transform && transform !== 'none') {
        // 解析 matrix 或者 matrix3d 格式
        const matrix = transform.match(/^matrix(3d)?\((.+)\)$/);
        if (matrix) {
            // 如果是 3d 向量，则 translateX 在第13个位置，否则在第5个位置
            const is3D = matrix[1] === '3d';
            const values = matrix[2].split(', ');
            const translateX = parseFloat(is3D ? values[12] : values[4]);
            return translateX;
        }
    }
    // 默认情况下，返回 0
    return 0;
}

//获取像素比和放大比例
export function getPixelRatio(context: any) {
    var backingStore = context.backingStorePixelRatio ||
        context.webkitBackingStorePixelRatio ||
        context.mozBackingStorePixelRatio ||
        context.msBackingStorePixelRatio ||
        context.oBackingStorePixelRatio ||
        context.backingStorePixelRatio || 1;
    return (window.devicePixelRatio || 1) / backingStore;
};

//获取时间字符串
export function getFormatCurTime(timeStamp: number, type: DateStringType): string {
    const date = new Date(timeStamp)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    const seconds = String(date.getSeconds()).padStart(2, '0')

    switch (type) {
        case DateStringType.Y_M_D:
            return `${year}-${month}-${day}`
        case DateStringType.MON_D_H_MIN:
            return `${month}-${day} ${hours}:${minutes}`
        case DateStringType.M_D:
            return `${month}-${day}`
        default:
            return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
    }
}
//登录账号校验
export function validateAccount(str: string): boolean {
    // 检查字符串的长度是否等于 length，并且只包含数字字符
    return str.length === 9 && /^[0-9]+$/.test(str);
}
//密码校验
export function validatePass(str: string): boolean {
    // 检查字符串长度是否大于等于6，且仅包含大写/小写字母、数字和特定字符
    const regex = /^[A-Za-z0-9,.?!]+$/;
    return str.length >= 6 && regex.test(str);
}
export function openNewPage(href: string, isBlank: boolean) {
    if (isBlank) {
        window.open(href, "_blank");
    } else {
        window.open(href);
    }
}
export function getVideoDuration(file: File): Promise<number> {
    return new Promise((resolve, reject) => {
        const videoElement = document.createElement('video');
        const fileURL = URL.createObjectURL(file);

        videoElement.src = fileURL;
        videoElement.preload = 'metadata';

        videoElement.onloadedmetadata = () => {
            // 获取视频时长
            const duration = videoElement.duration;
            // 释放对象URL
            URL.revokeObjectURL(fileURL);
            resolve(duration);
        };

        videoElement.onerror = () => {
            URL.revokeObjectURL(fileURL);
            reject(new Error('无法加载视频文件'));
        };
    });
}
//格式化视频时长
export function formatVideoDuration(seconds: number): string {
    if (seconds < 0 || isNaN(seconds)) {
        throw new Error('Invalid input: seconds must be a non-negative number.');
    }
    const totalSeconds = Math.floor(seconds);
    // 计算分钟和秒钟
    const minutes = Math.floor(totalSeconds / 60);
    const remainingSeconds = totalSeconds % 60;
    // 格式化为 mm:ss，确保分钟和秒钟都为两位数
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');
    return `${formattedMinutes}:${formattedSeconds}`;
}
//格式化数据
export function formatCount(count: number): string {
    if (count < 0 || isNaN(count)) {
        throw new Error('Invalid input: play count must be a non-negative number.');
    }
    if (count < 10000) {
        return count.toString();
    } else if (count < 100_000_000) {
        const countInWan = count / 10_000;
        return `${countInWan.toFixed(1)}万`;
    } else {
        const countInYi = Math.floor(count / 100_000_000);
        return `${countInYi}亿`;
    }
}
export function sliceDateTime(dateTime: string): string {
    if (dateTime.length == 0) {
        return dateTime;
    }
    return dateTime.split(' ')[0]
}
export function formatStringDate(input: string, type: DateStringType): string {
    const regex = /^(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})$/;
    const match = input.match(regex);
    if (match) {
        const month = match[2];
        const day = match[3];
        const hour = match[4];
        const minute = match[5];

        switch (type) {
            case DateStringType.MON_D_H_MIN:
                return `${month}-${day} ${hour}:${minute}`;
            case DateStringType.M_D:
                return `${month}-${day}`;
            default:
                return `${month}-${day} ${hour}:${minute}`
        }
    } else {
        return ''
        // throw new Error("Invalid date format. Please use yyyy-MM-dd HH:mm:ss format.");
    }
}