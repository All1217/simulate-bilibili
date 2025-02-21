import { defineStore } from 'pinia'

export const useFileStore = defineStore('fileStore', {
  state: () => ({
    selectedFile: null as File | null, // 用于存储文件对象
    fileSrc: "" as string | ""
  }),
  actions: {
    setFile(file: File, src: string) {
      this.selectedFile = file
      this.fileSrc = src
    },
    clearFile() {
      this.selectedFile = null
      this.fileSrc = ""
    },
  },
})
