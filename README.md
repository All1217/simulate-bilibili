# simulate-bilibili
This is a high fidelity Bilibili front-end webpage developed using Vue3.

# start

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

# 一、注意事项

## 1.自定义滚动条

设滑条区域总高度为tHeight，在本例中tHeight与列表总高度相等，该值可能会动态变化。

设视窗区域顶部距离列表顶部的距离为scrollTop，该值会动态变化。

设视窗高度为clientHeight，该值通常固定不变。

则滑条区域内的滑块（scrollBar）的高度height为：
$$
height = \frac {clientHeight * clientHeight}{tHeight}
$$
视窗向下滑动时，滑块也会跟着滑动。滑块的滑动速度略快于视窗的滑动速度。设滑块的滑动速度为$c_{scrollBar}$，视窗的滑动速度为$c_{client}$

，则二者的比值关系为：
$$
\frac {c_{scrollBar}}{c_{client}} = scrollTop * \frac {tHeight + clientHeight}{tHeight}
$$

## 2.富文本实现

在p标签里列举a标签、span标签、svg标签等实现。

## 3.vue3借助TS导入静态资源

### 3.1 vite脚手架

> [【第12期】Vue3+TypeScript+Vite中动态引入图片等静态资源 -阿里云开发者社区](https://developer.aliyun.com/article/1412879)
>
> [静态资源处理 {#static-asset-handling} | Vite中文网](https://vitejs.cn/guide/assets.html#the-public-directory)

### 3.2 vue-cli脚手架

在 Vue 3 项目中通过 TypeScript 导入静态资源时，通常有几种方法来处理图片、样式文件、字体等静态资源。假设你使用的是基于 Vue CLI 脚手架的项目，以下是几种常见的导入方式。

### 3.3 **导入图片（或者其他静态资源）**

可以直接使用 `import` 语法来导入图片或其他资源，像这样：

```typescript
import logo from '@/assets/logo.png';
```

然后在模板中使用：

```html
<template>
  <img :src="logo" alt="Logo" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import logo from '@/assets/logo.png';

export default defineComponent({
  data() {
    return {
      logo,
    };
  },
});
</script>
```

### 3.4 **通过 `require` 导入**（Vue2）

如果你使用的是 `require` 语法，或者某些情况下想要按需导入静态资源，可以这样做：

```typescript
const logo = require('@/assets/logo.png');
```

### 3.5 **直接在模板中引用静态资源**

你也可以直接在模板中通过相对路径引用静态资源：

```html
<template>
  <img src="@/assets/logo.png" alt="Logo" />
</template>
```

Vue CLI 会处理这些静态资源的路径，并自动把它们打包到合适的目录中。

### 3.6 **导入样式（CSS/SCSS 等）**

你也可以通过 TypeScript 导入样式文件。例如，导入一个全局的 CSS 或 SCSS 文件：

```typescript
import '@/assets/styles/main.css';
```

### 3.7 **声明模块**

如果你导入的是非 JavaScript 模块（比如图片或字体），你可能需要为这些类型进行声明。你可以在 `src/shims` 目录下创建一个类型声明文件，声明图片等静态资源类型：

```typescript
// src/shims-static.d.ts
declare module '*.png' {
  const value: string;
  export default value;
}

declare module '*.jpg' {
  const value: string;
  export default value;
}

declare module '*.svg' {
  const value: string;
  export default value;
}
```

这样 TypeScript 就会知道如何处理这些类型的文件。

### 3.8 **Vue CLI 配置**

如果你使用的是 Vue CLI 进行构建，Vue CLI 会自动处理一些静态资源。你可以根据需求在 `vue.config.js` 文件中进行一些额外配置，比如 `publicPath` 或者配置静态资源的路径别名。

## 4 echarts刷新图表数据

防止新旧数据自动合并：

> https://blog.csdn.net/weixin_42122355/article/details/109516554

## 5 示例音/视频资源

有几个网站提供示例视频供开发人员下载，以便用于测试和调试。以下是一些常用资源：

1. **[Sample-Videos.com](https://sample-videos.com/)**:
   - 提供各种格式（如 MP4、AVI、3GP 等）和分辨率的视频文件。
   - 包含不同类型的多媒体文件，不仅限于视频，还有音频、文档等。

2. **[Test-Video.org](https://test-videos.co.uk/)**:
   - 提供多种格式和质量的视频文件，帮助测试网页和应用中的视频功能。
   - 视频时长和大小各异，可以根据需要选择。

3. **[Big Buck Bunny](https://peach.blender.org/download/)**:
   - 这是一部开源动画短片，由 Blender 基金会制作，广泛用于多媒体测试。
   - 提供多个格式和分辨率的下载选项。

4. **[Videvo](https://www.videvo.net/stock-video-footage/free/)**:
   - Videvo 提供免费的高清视频素材，可以用于测试和开发。
   - 需要注意阅读相关的使用许可。

5. **[Internet Archive](https://archive.org/details/movies)**:
   - 提供大量的视频内容，包括公共领域和一些开源许可的视频。
   - 视频格式多样，也包括一些历史影片和模拟测试信号。

6. **[H.264 Demo Clips (h264info)](http://www.h264info.com/clips.html)**:
   - 提供 H.264 编码的视频片段，用于测试播放器在处理 H.264 视频时的表现。

## 6 canvas流派弹幕实现

> [弹幕效果实现(canvas)，含弹幕重叠处理一.知识准备 1.动画 动画——我们的眼睛具有“视觉暂留”的特性，当我们看到 - 掘金](https://juejin.cn/post/6996976883883589662)
>
> [绘制弹幕1_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1fg411H7BL?spm_id_from=333.788.videopod.episodes&vd_source=7e1929799f2f0e3945358988a0f7b127&p=12)

除此之外，还可通过增删html元素（附加动画效果）、使用第三方弹幕插件实现弹幕效果。

# 七、TODO

1. 编辑视频稿件页面：所有异步事项未加载完成前禁用立即投稿按钮；未保存时离开页面弹出提示
1. 搜索页面的视频通道，按日期筛选精度有待调整，当起始和终点日期为同一天时，没有结果
1. 封装Video卡片
