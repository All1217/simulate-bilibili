import http from '@/util/http'
import { Video } from '@/api/Models'

/**
 * @description 上传视频
 * @TODO 实时追踪上传进度有问题待解决 
 */
export function onUpload(file: File, callBack: (val: number) => void) {
    const formData = new FormData();
    formData.append('file', file);
    return http.post<string>('/main/file/upload/video', formData,
        {
            headers: { 'Content-Type': 'multipart/form-data' },
            onUploadProgress: progressEvent => {
                const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                console.log(`上传进度: ${percentCompleted}%`);
                callBack(percentCompleted)
            },
            timeout: 1000 * 60 * 10
        })
};

/**
 * @description 上传头像
 */
export function onUploadAvatar(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    return http.post<string>('/main/file/upload/avatar', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
};

/**
 * @description 上传封面
 */
export function onUploadCover(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    return http.post<string>('/main/file/upload/video/cover', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
};

/**
 * @description 投稿
 */
export function onSubmit(data: Video) {
    return http.post<string>('/main/file/submit', data)
}