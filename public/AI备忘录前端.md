一、AI备忘录

# 1 HTML

## 1.1 Video标签的使用

`<video>` 标签是 HTML5 中新增的，用于在网页中嵌入视频内容。该标签提供了多种属性来控制视频的播放、外观和行为。下面是使用 `<video>` 标签的基本方法及一些常见的属性：

### 基本用法

```html
<video src="your-video-file.mp4" controls>
  Your browser does not support the video tag.
</video>
```

- `src`: 视频文件的路径。你可以提供多个源文件，以支持不同的浏览器。

- `controls`: 添加此属性后，用户可以使用默认的控件（播放/暂停按钮、音量调整等）与视频进行交互。

### 多媒体格式

为了使视频能够在所有浏览器上播放，建议提供多种格式的视频文件。以下是一个包含多种格式的示例：

```html
<video controls width="600">
  <source src="your-video-file.mp4" type="video/mp4">
  <source src="your-video-file.webm" type="video/webm">
  <source src="your-video-file.ogv" type="video/ogg">
  Your browser does not support the video tag.
</video>
```

- `<source>`: 可以为同一个视频提供多种格式，每个 `<source>` 元素指定一种格式。浏览器会选择它支持的第一个格式。

### 常用属性

- `controls`: 为视频添加默认的控件。
- `autoplay`: 页面加载后自动播放视频（注意：许多浏览器对自动播放有严格限制，通常需要视频静音才能自动播放）。
- `loop`: 视频结束时，从头重新播放。
- `muted`: 静音播放视频。
- `poster`: 在视频播放之前显示的图像。
- `width` 和 `height`: 指定视频播放器的宽度和高度。

### 示例：带有更多属性的 `<video>`

```html
<video controls autoplay loop muted poster="video-poster.jpg" width="640" height="360">
  <source src="your-video-file.mp4" type="video/mp4">
  <source src="your-video-file.webm" type="video/webm">
  <p>Your browser does not support the video tag.</p>
</video>
```

### JavaScript 控制

你还可以使用 JavaScript 来控制视频的播放，例如播放、暂停、改变音量等。

```html
<video id="myVideo" width="640" height="360" controls>
  <source src="your-video-file.mp4" type="video/mp4">
</video>

<button onclick="playVideo()">Play</button>
<button onclick="pauseVideo()">Pause</button>

<script>
  const video = document.getElementById('myVideo');

  function playVideo() {
    video.play();
  }

  function pauseVideo() {
    video.pause();
  }
</script>
```

### 总结

使用 `<video>` 标签可以轻松地在网页上嵌入和播放视频。通过结合使用 HTML 属性和 JavaScript，你可以全面控制视频的显示和行为。此外，为了提高兼容性，应提供多种视频格式，并注意浏览器对自动播放的限制。

## 1.2 span标签跳动

要实现这个效果，可以使用 CSS 的 `:hover` 伪类和 `@keyframes` 动画来实现跳动效果。以下是完整的代码示例：

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>跳动效果</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      margin: 0;
      background-color: #f0f0f0;
    }

    .bouncing-text {
      display: inline-block;
      font-size: 24px;
      font-weight: bold;
      color: #333;
      position: relative;
      cursor: pointer;
      transition: transform 0.2s ease;
    }

    .bouncing-text:hover {
      animation: bounce 0.4s ease forwards;
    }

    @keyframes bounce {
      0% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(-10px);
      }
      100% {
        transform: translateY(0);
      }
    }
  </style>
</head>
<body>
  <span class="bouncing-text">悬停我！</span>
</body>
</html>
```

### 解释：

1. **`.bouncing-text` 样式**:
   - 为 `span` 标签应用基本的字体样式和居中布局。
   - 鼠标悬停时，触发动画效果。

2. **`:hover` 和 `@keyframes` 动画**:
   - 定义 `@keyframes bounce` 动画，将文字向上平移 10px，再回落到原位。
   - 在 `:hover` 时触发 `bounce` 动画。

3. **过渡效果**:
   - 使用 `ease` 让动画平滑过渡，提供自然的视觉效果。

### 运行：

将此代码保存为 HTML 文件并在浏览器中打开，悬停到文字上时就会看到文字跳动的效果。

---

### 热键建议：

- **W**: 是的，继续  
  确认设计是否符合要求并进行改进  
- **D**: 改进效果  
  提出更复杂的动画，如颜色变化或多次弹跳

## 1.3 input标签获取文件

### 1.3.1 获取文件信息

将 `<input>` 标签的 `type` 属性设置为 `"file"`，可以创建一个文件选择器，允许用户从其设备中选择一个或多个文件进行上传。这种输入类型是 HTML 表单的一部分，常用于需要用户提供文件的场合，比如上传图片、文档或其他二进制数据。

### 1.3.2 主要功能和特性：

1. **文件选择对话框**：
   - 当用户点击带有 `type="file"` 的输入框时，浏览器会打开一个文件选择对话框（File Picker），用户可以通过这个对话框在设备上选择文件。

2. **多文件选择**：
   - 如果你希望用户能够一次选择多个文件，可以使用 `multiple` 属性。例如：`<input type="file" multiple>`

3. **文件类型限制**：
   - 可以通过 `accept` 属性限制用户可以选择的文件类型。比如，只允许选择图像文件：`<input type="file" accept="image/*">`

4. **文件信息访问**：
   - 一旦用户选择了文件，可以通过 JavaScript 访问文件的信息，如名称、大小、类型等。通常使用 `input` 元素的 `files` 属性，它是一个 `FileList` 对象。

5. **样式和外观**：
   - 默认情况下，文件输入按钮的样式由浏览器决定，并且各个浏览器可能略有不同。自定义样式通常涉及隐藏默认按钮，并用 CSS 和 JavaScript 实现自定义的 UI。

### 1.3.3 示例代码：

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>File Input Example</title>
</head>
<body>
    <form>
        <label for="fileInput">选择文件:</label>
        <input type="file" id="fileInput" multiple accept=".jpg,.png,image/*">
        <button type="submit">上传</button>
    </form>

    <script>
        const fileInput = document.getElementById('fileInput');

        fileInput.addEventListener('change', (event) => {
            const files = event.target.files; // 获取 FileList 对象
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                console.log(`文件名: ${file.name}`);
                console.log(`文件类型: ${file.type}`);
                console.log(`文件大小: ${file.size} 字节`);
            }
        });
    </script>
</body>
</html>
```

### 1.3.4 在表单中的作用：

- **与服务器交互**：
  - 通常与表单一起使用，将文件数据传输到服务器。服务器接收到文件后，可以进行存储、处理或分析。

- **增强用户体验**：
  - 与其他文件上传控件结合使用，如拖放区域，也可以实现更友好的用户界面。

使用 `<input type="file">` 为网页添加了强大的文件交互能力，是用户与应用程序之间交换数据的基本方式之一。

### 1.3.5 结合vue3

在 Vue 3 中，可以使用 `input[type="file"]` 来让用户选择文件，并使用 `ref` 或事件监听来获取文件对象。下面是几种常见的方法：

---

#### **方法 1：使用 `ref` 绑定 `input`**

这种方式适用于 `setup` 语法糖，并且使用 `ref` 绑定 `<input>` 元素，然后通过 `change` 事件获取文件。

##### **示例**

```vue
<template>
  <div>
    <input type="file" ref="fileInput" @change="handleFileChange" />
    <p v-if="selectedFile">已选择文件: {{ selectedFile.name }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const fileInput = ref<HTMLInputElement | null>(null);
const selectedFile = ref<File | null>(null);

const handleFileChange = () => {
  if (fileInput.value?.files?.length) {
    selectedFile.value = fileInput.value.files[0]; // 获取第一个文件
    console.log('文件信息:', selectedFile.value);
  }
};
</script>
```

##### **说明**

- 通过 `ref<HTMLInputElement | null>(null)` 绑定 `input` 元素。
- 监听 `change` 事件，在 `fileInput.value.files[0]` 里获取用户选择的文件。

---

#### **方法 2：使用 `$event.target.files` 获取文件**

这种方法不依赖 `ref`，而是直接使用 `change` 事件的 `event.target.files`。

##### **示例**

```vue
<template>
  <div>
    <input type="file" @change="handleFileChange" />
    <p v-if="selectedFile">已选择文件: {{ selectedFile.name }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const selectedFile = ref<File | null>(null);

const handleFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files?.length) {
    selectedFile.value = input.files[0]; // 获取第一个文件
    console.log('文件信息:', selectedFile.value);
  }
};
</script>
```

##### **说明**

- `event.target as HTMLInputElement` 强制转换 `target` 类型，确保 `files` 可用。
- `input.files[0]` 获取用户选择的文件。

---

#### **方法 3：支持多文件上传**

如果要支持 **多文件上传**，可以在 `input` 中添加 `multiple`，然后使用 `Array<File>` 存储文件列表。

##### **示例**

```vue
<template>
  <div>
    <input type="file" multiple @change="handleFileChange" />
    <ul>
      <li v-for="(file, index) in selectedFiles" :key="index">{{ file.name }}</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const selectedFiles = ref<File[]>([]);

const handleFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files) {
    selectedFiles.value = Array.from(input.files); // 转换 FileList 为数组
    console.log('已选择文件:', selectedFiles.value);
  }
};
</script>
```

##### **说明**

- `<input type="file" multiple />` 允许用户选择多个文件。
- 使用 `Array.from(input.files)` 将 `FileList` 转换为数组，并存入 `selectedFiles`。

---

#### **方法 4：读取文件内容（如文本/图片）**

如果要 **读取文件内容**，可以使用 `FileReader` 进行处理。

##### **示例：读取图片并预览**

```vue
<template>
  <div>
    <input type="file" accept="image/*" @change="handleFileChange" />
    <p v-if="selectedFile">文件名: {{ selectedFile.name }}</p>
    <img v-if="fileUrl" :src="fileUrl" alt="预览图片" style="max-width: 200px; margin-top: 10px;">
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const selectedFile = ref<File | null>(null);
const fileUrl = ref<string | null>(null);

const handleFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files?.length) {
    selectedFile.value = input.files[0];
    
    // 读取图片 URL
    const reader = new FileReader();
    reader.onload = () => {
      fileUrl.value = reader.result as string;
    };
    reader.readAsDataURL(selectedFile.value);
  }
};
</script>
```

##### **说明**

- `<input type="file" accept="image/*" />` 仅允许用户选择图片文件。
- 使用 `FileReader.readAsDataURL()` 读取文件，并生成可预览的 `Base64` 地址。

---

### **1.3.6 总结**

| 需求         | 解决方案                                            |
| ------------ | --------------------------------------------------- |
| 获取单个文件 | `ref<HTMLInputElement>` 或 `$event.target.files[0]` |
| 获取多个文件 | `multiple` + `Array.from(input.files)`              |
| 读取文件内容 | `FileReader`                                        |
| 预览图片     | `FileReader.readAsDataURL()`                        |

Vue 3 和 TypeScript 的结合使得文件处理更加安全和可维护，你可以根据需求选择适合的方法。 🚀

### 1.3.7 使用代码触发隐藏的input标签

要通过代码而不是用户点击来触发 `input[type="file"]` 标签，您可以使用 JavaScript 的 `click()` 方法。这通常是在需要自定义文件选择按钮的场景下使用，比如当实际的文件输入被隐藏起来，由另一个按钮或元素代替。

#### **步骤**

1. 使用 `ref` 绑定到 `input[type="file"]` 元素。
2. 创建一个方法，通过调用 `click()` 来触发文件选择对话框。
3. 绑定该方法到其他元素上，例如按钮。

#### **示例代码**

```vue
<template>
  <div>
    <!-- 隐藏的文件输入 -->
    <input type="file" ref="fileInput" style="display: none" @change="handleFileChange" />
    
    <!-- 自定义触发按钮 -->
    <button @click="triggerFileSelect">选择文件</button>

    <!-- 显示已选择的文件名 -->
    <p v-if="selectedFile">已选择文件: {{ selectedFile.name }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const fileInput = ref<HTMLInputElement | null>(null);
const selectedFile = ref<File | null>(null);

// 方法：通过代码触发文件选择
const triggerFileSelect = () => {
  if (fileInput.value) {
    fileInput.value.click();
  }
};

// 文件更改处理函数
const handleFileChange = () => {
  if (fileInput.value?.files?.length) {
    selectedFile.value = fileInput.value.files[0]; // 获取第一个文件
    console.log('文件信息:', selectedFile.value);
  }
};
</script>
```

#### **说明**

- **隐藏文件输入**：通过 `style="display: none"` 隐藏 `<input type="file">` 元素。

- **使用 `ref`**：用 `ref` 引用文件输入，以便在 JavaScript 中控制它。`ref<HTMLInputElement | null>(null)` 确保了对输入元素的类型限定并同时处理可能的空值情况。

- **触发按钮**：创建一个自定义的按钮（或者任何其他元素），将其点击事件绑定到 `triggerFileSelect` 方法，此方法会调用文件输入的 `click()` 方法，从而打开文件选择对话框。

- **处理文件变更**：在文件选择完成后，`@change` 事件会触发 `handleFileChange` 方法，从而允许你进一步处理选中的文件。

这种方法的优点是可以让界面设计更加灵活，并且能够保持用户体验的一致性。

## 1.4 video标签的使用

`<video>` 标签是 HTML5 中新增的，用于在网页中嵌入视频内容。该标签提供了多种属性来控制视频的播放、外观和行为。下面是使用 `<video>` 标签的基本方法及一些常见的属性：

### 1.4.1 基本用法

```html
<video src="your-video-file.mp4" controls>
  Your browser does not support the video tag.
</video>
```

- `src`: 视频文件的路径。你可以提供多个源文件，以支持不同的浏览器。

- `controls`: 添加此属性后，用户可以使用默认的控件（播放/暂停按钮、音量调整等）与视频进行交互。

### 1.4.2 多媒体格式

为了使视频能够在所有浏览器上播放，建议提供多种格式的视频文件。以下是一个包含多种格式的示例：

```html
<video controls width="600">
  <source src="your-video-file.mp4" type="video/mp4">
  <source src="your-video-file.webm" type="video/webm">
  <source src="your-video-file.ogv" type="video/ogg">
  Your browser does not support the video tag.
</video>
```

- `<source>`: 可以为同一个视频提供多种格式，每个 `<source>` 元素指定一种格式。浏览器会选择它支持的第一个格式。

### 1.4.3 常用属性

- `controls`: 为视频添加默认的控件。
- `autoplay`: 页面加载后自动播放视频（注意：许多浏览器对自动播放有严格限制，通常需要视频静音才能自动播放）。
- `loop`: 视频结束时，从头重新播放。
- `muted`: 静音播放视频。
- `poster`: 在视频播放之前显示的图像。
- `width` 和 `height`: 指定视频播放器的宽度和高度。

### 1.4.4 示例：带有更多属性的 `<video>`

```html
<video controls autoplay loop muted poster="video-poster.jpg" width="640" height="360">
  <source src="your-video-file.mp4" type="video/mp4">
  <source src="your-video-file.webm" type="video/webm">
  <p>Your browser does not support the video tag.</p>
</video>
```

### 1.4.5 JavaScript 控制

你还可以使用 JavaScript 来控制视频的播放，例如播放、暂停、改变音量等。

```html
<video id="myVideo" width="640" height="360" controls>
  <source src="your-video-file.mp4" type="video/mp4">
</video>

<button onclick="playVideo()">Play</button>
<button onclick="pauseVideo()">Pause</button>

<script>
  const video = document.getElementById('myVideo');

  function playVideo() {
    video.play();
  }

  function pauseVideo() {
    video.pause();
  }
</script>
```

在 Vue 3 中使用 `setup` 语法糖时，你可以通过监听 HTML5 `<video>` 元素的时间更新事件来实现对视频播放进度的监控。为了在视频播放到特定时间点（例如 2:00）时输出信息，可以使用 `timeupdate` 事件。下面是一个实现此功能的完整示例。

### 1.4.6 示例：监听 `<video>` 播放进度并输出特定时间点的信息

```vue
<template>
  <div>
    <video
      ref="video"
      width="640"
      height="360"
      controls
      @timeupdate="onTimeUpdate"
    >
      <source src="your-video-file.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const video = ref(null);

function onTimeUpdate() {
  // 检查当前播放时间是否达到120秒（2分钟）
  if (video.value && Math.floor(video.value.currentTime) === 120) {
    console.log('2:00');
  }
}

onMounted(() => {
  // 确保在组件销毁时移除事件监听器，避免内存泄漏
  video.value.addEventListener('timeupdate', onTimeUpdate);
});

onUnmounted(() => {
  if (video.value) {
    video.value.removeEventListener('timeupdate', onTimeUpdate);
  }
});
</script>
```

#### 解释：

1. **`ref` 引用**:
   - 使用 `ref` 创建对 `<video>` 元素的引用，以便我们可以访问和控制它。

2. **`timeupdate` 事件**:
   - 当视频播放位置发生改变时触发 `timeupdate` 事件。在该事件中检查 `currentTime` 是否达到特定的秒数（例如 120 秒，即 2 分钟）。

3. **`onMounted` 和 `onUnmounted`**:
   - 在组件挂载时，我们为 `<video>` 添加 `timeupdate` 事件监听器。
   - 在组件卸载时，确保移除事件监听器，避免内存泄漏。

4. **`Math.floor(video.value.currentTime)`**:
   - 使用 `Math.floor()` 将 `currentTime` 向下取整，这样可以精确地判断视频是否播放到特定的整秒。

这种方法允许你在 Vue 3 的 `setup` 函数中优雅地监听视频的播放进度，并在达到指定的时间点时执行相应的操作。根据需求，你可以修改条件以匹配其他时间点。

## 1.5 企业级音视频前端开发解决方案

在企业开发在线视频播放网站时，使用 HTML5 的 `<video>` 标签是实现视频播放的一种简单直接的方法，但并不总是最优选。企业通常需要更复杂的特性和兼容性支持，因此可能会考虑其他解决方案。以下是一些常见的方法：

### 1.5.1 使用 HTML5 `<video>` 标签

- **优点**:
  - 简单易用，无需额外的库。
  - 支持基本的播放控制（播放、暂停、音量调整等）。
  - 支持多种格式（如 MP4、WebM、Ogg）。

- **缺点**:
  - 对于复杂需求（如自定义控件、高级交互、DRM 保护）比较有限。
  - 不同浏览器对视频格式的支持可能不同，需要提供多种格式。

### 1.5.2 使用 JavaScript 视频播放器库

选择使用第三方 JavaScript 视频播放器库，可以提供更丰富的功能和更好的跨浏览器兼容性。以下是几个流行的视频播放器库：

- **[Video.js](https://videojs.com/)**:
  - 提供丰富的插件支持和皮肤定制能力。
  - 支持直播、字幕、多种格式和广告。

- **[Plyr](https://plyr.io/)**:
  - 轻量级，易于集成，美观的默认控件。
  - 支持音频、视频、YouTube 和 Vimeo 的嵌入。

- **[JW Player](https://www.jwplayer.com/)**:
  - 商业化产品，提供强大的功能和客户支持。
  - 支持广告、分析、DRM 和直播等高级功能。

### 1.5.3 使用流媒体协议和平台

对于大规模视频发布和实时流媒体，可能需要使用流媒体协议和平台：

- **HLS/DASH**:
  - HTTP Live Streaming (HLS) 和 Dynamic Adaptive Streaming over HTTP (DASH) 是两种常见的流媒体协议，前者由苹果公司主导，后者为开放标准。
  - 支持自适应比特率流，能根据用户的网络状况自动调整视频质量。

- **流媒体服务**:
  - 使用像 AWS Elemental Media Services、Google Cloud Video Intelligence、Azure Media Services 等可以简化工作流程，提供从编码、存储到分发的一站式服务。

- **CDN（内容分发网络）**:
  - 使用 CDN 可以确保视频快速、安全地分发到全球各地的用户，提高加载速度和可靠性。

### 1.5.4 DRM（数字版权管理）

对于需要保护内容版权的网站，集成 DRM 是必要的：

- **Widevine、PlayReady**:
  - 使用这些 DRM 解决方案可以确保只有经过授权的用户才能观看视频内容。
  - 许多视频播放器库和服务都支持这些 DRM 系统。

在使用 Vue 3 和 TypeScript 开发视频播放功能时，有多种视频播放器库可供选择。这些库通常提供丰富的功能和较好的兼容性，并且许多现代库都能很好地与 TypeScript 集成。以下是一些流行的视频播放器库以及它们在 Vue 3 应用中的使用方式：

### 1.5.5 常用视频播放器库

#### 1.5.5.1 Video.js

**Video.js** 是一个功能强大的开源 HTML5 视频播放器，支持插件扩展、皮肤定制等功能。

- **安装**:

  ```bash
  npm install video.js
  ```

- **使用**:
  创建一个 Vue 组件来集成 Video.js：

  ```vue
  <template>
    <div>
      <video ref="videoPlayer" class="video-js vjs-default-skin" controls preload="auto" width="640" height="264">
        <source src="your-video-file.mp4" type="video/mp4"/>
      </video>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  import videojs from 'video.js';
  
  const videoPlayer = ref<HTMLVideoElement | null>(null);
  
  onMounted(() => {
    if (videoPlayer.value) {
      const player = videojs(videoPlayer.value);
    }
  });
  </script>
  
  <style>
  @import "video.js/dist/video-js.css";
  </style>
  ```

#### 1.5.5.2 Plyr

**Plyr** 是一个轻量级的多媒体播放器，支持视频、音频、YouTube 和 Vimeo。

- **安装**:

  ```bash
  npm install plyr
  ```

- **使用**:
  使用 Plyr 通常需要引入其 CSS 和 JavaScript 库：

  ```vue
  <template>
    <video ref="plyr" id="player" playsinline controls data-poster="/path/to/poster.jpg">
      <source src="your-video-file.mp4" type="video/mp4">
    </video>
  </template>
  
  <script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  import Plyr from 'plyr';
  
  const plyrRef = ref<HTMLVideoElement | null>(null);
  
  onMounted(() => {
    if (plyrRef.value) {
      new Plyr(plyrRef.value);
    }
  });
  </script>
  
  <style>
  @import "plyr/dist/plyr.css";
  </style>
  ```

#### 1.5.5.3 vue-aplayer

**vue-aplayer** 是基于 APlayer 的 Vue 组件，适用于播放音频。

- **安装**:

  ```bash
  npm install vue-aplayer
  ```

- **使用**:

  ```vue
  <template>
    <vue-aplayer :audio="audio"></vue-aplayer>
  </template>
  
  <script lang="ts" setup>
  import { defineComponent } from 'vue';
  import VueAPlayer from 'vue-aplayer';
  
  const audio = [{
    name: 'Song Name',
    artist: 'Artist Name',
    url: 'path/to/audio.mp3',
    cover: 'path/to/cover.jpg'
  }];
  </script>
  
  <style>
  @import "vue-aplayer/dist/VueAPlayer.css";
  </style>
  ```

#### 1.5.5.4 hls.js

如果你需要流媒体支持，**hls.js** 可以用于在具有 HLS 支持的浏览器中播放 HLS 格式的视频（例如 Safari），并在不支持的浏览器中通过 `MediaSource Extensions` 实现播放。

- **安装**:

  ```bash
  npm install hls.js
  ```

- **使用**:

  ```vue
  <template>
    <video ref="video" controls></video>
  </template>
  
  <script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  import Hls from 'hls.js';
  
  const video = ref<HTMLVideoElement | null>(null);
  
  onMounted(() => {
    if (Hls.isSupported() && video.value) {
      const hls = new Hls();
      hls.loadSource('path/to/your/stream.m3u8');
      hls.attachMedia(video.value);
    }
  });
  </script>
  ```

## 1.6 浏览器视频缓存机制

浏览器在播放视频时通常会利用缓存机制来提高性能和用户体验。这里是一些关于 `<video>` 标签播放的视频如何被缓存在浏览器中的细节：

### 缓存机制

1. **浏览器缓存**:
   - 当你使用 `<video>` 标签播放视频文件时，浏览器会尝试将部分视频数据缓存在内存中，以便更流畅地播放。这种缓存行为类似于网页的其他资源（如图片、CSS 和 JavaScript）。
   - 浏览器可能会根据 HTTP 头部信息（例如 `Cache-Control` 和 `Expires`）来决定是否以及多久缓存视频。

2. **预加载（Preloading）**:
   - `<video>` 标签有一个 `preload` 属性，可以控制浏览器如何处理视频的预加载：
     - `none`: 不进行任何预加载。
     - `metadata`: 仅预加载元数据（如视频时间长度和尺寸），不预加载视频内容。
     - `auto`: 提示浏览器尽可能多地下载视频以优化播放性能。

3. **缓冲区**:
   - 浏览器在播放过程中会创建一个缓冲区，用于存储即将播放的片段。这种临时性缓存帮助减少因网络波动导致的播放中断。

4. **CDN 和局部缓存**:
   - 为了进一步优化，许多网站使用 CDN（内容分发网络）来加速视频传输，这样可以在用户附近保持一份缓存。

### 内存缓存的限制

- **内存大小限制**: 浏览器对缓存的内存使用有一定的限制，尤其是在移动设备上。因此，仅能缓存视频的一部分，而不是整个视频文件。

- **单个资源的大小限制**: 各个浏览器对于能够完全缓存的单个资源（如视频）的大小也有不同的限制。

- **用户设置和隐私模式**: 用户的浏览器设置或隐私浏览模式可能影响缓存行为。在隐私模式下，很多浏览器不会缓存资源。

浏览器的缓存和计算机的内存（RAM）是两个不同但相关的概念，它们在提高应用程序性能和用户体验方面扮演着重要角色。以下是它们之间的联系和区别：

1.7 浏览器缓存与计算机内存

### 浏览器缓存

- **目的**: 浏览器缓存用于存储来自网络的静态资源（例如 HTML、CSS、JavaScript 文件，图像，视频等），以便在用户再次访问这些资源时可以更快地加载。这减少了对服务器的请求次数，提高了网页加载速度。

- **存放位置**: 浏览器缓存通常存储在磁盘上，这意味着即使关闭浏览器或计算机重启，缓存内容也能保留一段时间，直到过期或被手动清除。

- **持久性**: 通常比 RAM 更持久，可以跨浏览器会话持续存在。

- **使用场景**: 主要用于加速页面加载，通过存储静态资源的副本来减少网络延迟。

### 计算机内存（RAM）

- **目的**: RAM 是一种快速的临时存储，用于当前活跃的程序和进程，以便 CPU 能快速访问数据。

- **存放位置**: RAM 是计算机硬件的一部分，与处理器直接交互。它的存取速度非常快，但断电后数据会丢失。

- **持久性**: 非持久性存储。在计算机关机或重启后，RAM 中的数据就会消失。

- **使用场景**: 用于运行操作系统及其上的应用程序，包括浏览器本身。当浏览器加载一个网页时，实际上是将网页的文档对象模型（DOM）、JavaScript 执行环境等加载到 RAM 中。

### 联系

- **协作**: 当浏览器需要加载一个网页时，它会从缓存中检索资源并加载到内存中进行渲染和执行。缓存的目的是减少对服务器的请求，而内存则用于快速处理和显示这些资源。

- **优化性能**: 两者一起工作以优化网页和应用程序的性能。缓存通过减少网络请求来加速初始加载，而 RAM 则保证了随着用户与应用互动能够迅速响应。

- **资源管理**: 浏览器会在内存中维护一个缓存池，以便临时存储一些即将使用的数据块，从而避免频繁读写磁盘。然而，当可用内存不足时，系统会开始移除一些低优先级的内存缓存。

综上所述，浏览器缓存和计算机内存虽然都是用于加速数据访问的机制，但它们在实现方式、用途以及持久性上有显著不同。理解这两者的角色有助于开发者优化应用程序的性能和资源使用效率。

# 2.CSS/LESS/SCSS

## 2.1 分离控制动画

实现当鼠标悬停在 `1号 div` 时，`2号 div` 顺时针旋转 180 度的效果，可以使用 CSS 的 `:hover` 和 `transform` 属性配合 `transition` 实现。以下是完整代码：

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>悬停旋转效果</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      margin: 0;
      background-color: #f0f0f0;
    }

    .container {
      position: relative;
      display: flex;
      gap: 50px;
    }

    .box {
      width: 100px;
      height: 100px;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      font-size: 16px;
      color: #fff;
      background-color: #007BFF;
      border-radius: 8px;
      transition: transform 0.5s ease;
    }

    .box-1 {
      background-color: #28a745;
      cursor: pointer;
    }

    .container:hover .box-2 {
      transform: rotate(180deg);
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="box box-1">1号</div>
    <div class="box box-2">2号</div>
  </div>
</body>
</html>
```

### 说明：

1. **布局结构**：
   - `container` 用于包裹 `1号` 和 `2号 div`，确保两者的关联性。
   - `1号 div` 是触发悬停事件的元素，`2号 div` 是被操作的元素。

2. **`:hover` 选择器**：
   - 使用 `.container:hover .box-2` 表示当鼠标悬停在 `container` 内（包括 `1号 div`）时，对 `box-2` 应用样式。

3. **旋转效果**：
   - 使用 `transform: rotate(180deg)` 实现顺时针旋转 180 度。
   - 配合 `transition`，实现平滑的旋转动画。

4. **独立样式**：
   - `box-1` 和 `box-2` 有独立的样式，可根据需要调整颜色、大小等。

### 测试步骤：

1. 将代码保存为 `.html` 文件并用浏览器打开。
2. 将鼠标悬停到绿色的 `1号 div` 上时，可以看到蓝色的 `2号 div` 顺时针旋转 180 度。

---

### 热键建议：

- **S**: 解释代码  
  逐行分析如何实现鼠标事件和动画效果  
- **D**: 改进动画  
  为旋转添加缩放或颜色渐变效果  
- **T**: 测试案例  
  列出多种鼠标交互场景，例如触发多个动画

## 2.2 局部动画

以下是实现鼠标悬停在 `<a>` 标签上时，只有 `<i>` 标签文字顺时针旋转 180 度，其他元素保持不动的代码：

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>鼠标悬停旋转效果</title>
  <style>
    a {
      display: flex;
      align-items: center;
      text-decoration: none;
      color: #000;
    }

    img {
      margin-right: 8px;
    }

    i {
      display: inline-block;
      transition: transform 0.5s ease;
    }

    a:hover i {
      transform: rotate(180deg);
    }
  </style>
</head>
<body>
  <a href="#">
    <img alt="" width="60px" height="28px" src="./assets/Video-LOGO.png" />
    <span>首页</span>&nbsp;
    <i>1234</i>
  </a>
</body>
</html>
```

### 说明：

1. **基础布局**：
   - 使用 `a` 标签包裹子元素，并用 `flexbox` 对齐内容。
   - `<img>` 和 `<span>` 保持原始布局不变。

2. **`i` 标签样式**：
   - `display: inline-block` 确保 `i` 标签可以旋转。
   - 使用 `transition` 为旋转效果添加平滑过渡。

3. **`:hover` 效果**：
   - 通过 `a:hover i` 选择器，只为 `<i>` 标签添加 `transform: rotate(180deg)`，其他子元素（如 `<img>` 和 `<span>`）不受影响。

4. **效果隔离**：
   - 由于 `i` 的旋转被单独定义，不会影响其他元素。

### 测试步骤：

1. 保存代码为 HTML 文件。
2. 用浏览器打开，悬停到整个链接区域时，`<i>` 标签中的数字会顺时针旋转 180 度，而图片和文字保持静止。

---

### 热键建议：

- **A**: 比较其他实现方式  
  例如直接为 `i` 标签绑定独立事件  
- **D**: 改进  
  为 `i` 标签添加渐变颜色效果  
- **T**: 测试交互  
  验证不同屏幕尺寸下的响应行为

## 2.3 分离悬停动画

> 原问题：如何使用css3的flex布局实现以下效果：一个大div里包含两个小div，两个小div横向排列，且各占大div一半的宽度？

在 Vue 3 中可以通过绑定 `:class` 和 `@mouseover`/`@mouseleave` 事件来实现鼠标悬停时背景色变化的功能。以下是完整代码：

```html
<template>
  <div class="container">
    <!-- 使用 v-for 生成多个 div -->
    <div
      v-for="(item, index) in items"
      :key="index"
      class="item"
      :class="{ active: hoveredIndex === index }"
      @mouseover="hoveredIndex = index"
      @mouseleave="hoveredIndex = null"
    >
      {{ item }}
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      items: ["第一个 DIV", "第二个 DIV", "第三个 DIV", "更多..."], // 数据源
      hoveredIndex: null, // 当前悬停的索引
    };
  },
};
</script>

<style>
.container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding: 20px;
  background-color: #f5f5f5;
}

.item {
  background-color: #007BFF;
  color: white;
  padding: 10px;
  border-radius: 5px;
  text-align: center;
  min-width: 100px;
  transition: background-color 0.3s ease;
}

.item.active {
  background-color: red;
}
</style>
```

### 实现逻辑：

1. **绑定动态类**：
   - 使用 `:class="{ active: hoveredIndex === index }"` 来判断当前 `div` 是否是鼠标悬停的目标。
   - 如果 `hoveredIndex` 与当前 `div` 的 `index` 相同，则添加 `active` 类。

2. **事件处理**：
   - 在 `@mouseover` 事件中，将鼠标悬停的 `index` 赋值给 `hoveredIndex`。
   - 在 `@mouseleave` 事件中，将 `hoveredIndex` 重置为 `null`，取消悬停效果。

3. **样式**：
   - 默认背景色为蓝色 (`#007BFF`)。
   - 悬停时添加 `active` 类，背景色变为红色。

4. **过渡效果**：
   - 使用 `transition: background-color 0.3s ease` 让颜色变化更平滑。

### 使用步骤：

1. 将代码复制到 Vue 3 项目中的组件文件（如 `App.vue`）。
2. 启动项目 (`npm run serve`)，在页面上可以看到鼠标悬停时，背景色仅对目标 `div` 生效，其他 `div` 不受影响。

---

### 热键建议：

- **A**: 添加功能  
  为 `div` 添加点击事件，动态修改内容  
- **D**: 改进效果  
  增加颜色渐变或其他样式动画  
- **T**: 测试功能  
  验证多个悬停事件能否正确独立触发

## 2.4 平分flex布局

> 原问题：如何使用css3的flex布局实现以下效果：一个大div里包含两个小div，两个小div横向排列，且各占大div一半的宽度？

以下是使用 CSS3 的 Flexbox 布局实现两个小 `div` 横向排列，且各占父容器一半宽度的完整代码：

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Flex布局</title>
  <style>
    .parent {
      display: flex;
      width: 100%;
      height: 200px;
      border: 2px solid #000;
      background-color: #f5f5f5;
    }

    .child {
      flex: 1; /* 每个子div平分父div宽度 */
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 16px;
      color: white;
    }

    .child-1 {
      background-color: #007BFF;
    }

    .child-2 {
      background-color: #28a745;
    }
  </style>
</head>
<body>
  <div class="parent">
    <div class="child child-1">小DIV 1</div>
    <div class="child child-2">小DIV 2</div>
  </div>
</body>
</html>
```

### 说明：

1. **`display: flex`**：
   - 父容器 `.parent` 使用 `display: flex` 设置为 Flexbox 布局，使子元素横向排列。

2. **`flex: 1`**：
   - 子容器 `.child` 使用 `flex: 1`，让每个子元素均分父容器的宽度。

3. **对齐方式**：
   - 使用 `justify-content: center` 和 `align-items: center`，使每个子元素内容居中。

4. **颜色与样式**：
   - 为每个子容器指定不同的背景颜色（蓝色和绿色），以便更清晰地看到布局效果。

### 运行结果：

- 页面上会显示一个大 `div`，其中两个小 `div` 横向排列，宽度各占父容器的一半，并且内容居中对齐。

---

### 热键建议：

- **S**: 解释代码  
  逐行分析 Flexbox 布局属性的作用  
- **D**: 改进  
  为子元素添加动画或响应式设计  
- **T**: 测试功能  
  验证在不同屏幕尺寸下的宽度分配

## 2.5 全局配置CSS3颜色，可实现一键换主题

在 Vue 3 框架开发中，您可以使用 CSS 变量来统一配置页面组件的背景色和字体颜色。这种方法可以将所有颜色的配置集中到一个地方，方便管理和维护。

### 实现步骤

1. **定义 CSS 变量：**
   在项目的全局样式文件中（例如 `src/assets/styles/variables.css`），定义所需的颜色变量。例如：

   ```css
   :root {
     --primary-color: #3498db;
     --secondary-color: #2ecc71;
     --background-color: #f5f5f5;
     --font-color: #333333;
   }
   ```

2. **引入 CSS 变量：**
   在 `main.js` 中引入全局样式：

   ```javascript
   import './assets/styles/variables.css';
   ```

3. **在组件中使用 CSS 变量：**
   在每个 Vue 组件中，通过 `var()` 函数使用这些 CSS 变量。例如：

   ```vue
   <template>
     <div class="example">
       <h1>统一配置颜色示例</h1>
       <p>这是一个示例段落。</p>
     </div>
   </template>
   
   <script>
   export default {
     name: "ExampleComponent",
   };
   </script>
   
   <style scoped>
   .example {
     background-color: var(--background-color);
     color: var(--font-color);
   }
   h1 {
     color: var(--primary-color);
   }
   p {
     color: var(--secondary-color);
   }
   </style>
   ```

4. **动态修改主题（可选）：**
   如果需要动态切换主题颜色，可以通过 JavaScript 动态更改 CSS 变量的值。例如：

   ```javascript
   const changeTheme = (theme) => {
     const root = document.documentElement;
     if (theme === 'dark') {
       root.style.setProperty('--background-color', '#333333');
       root.style.setProperty('--font-color', '#f5f5f5');
     } else {
       root.style.setProperty('--background-color', '#f5f5f5');
       root.style.setProperty('--font-color', '#333333');
     }
   };
   
   changeTheme('dark'); // 切换到暗色主题
   ```

### 优势

- **集中管理：** 颜色配置在一个地方，方便统一修改。
- **动态切换：** 可轻松实现主题切换功能。
- **组件化：** 每个组件可以使用全局的颜色变量，而无需重复定义。

这样就可以在 Vue 3 项目中实现全局的颜色管理，同时增强代码的可维护性和扩展性。

### 为什么使用 `:root` 定义 CSS 变量？

`root` 是 CSS 的一种固定写法，特指 **伪类选择器**，用于选择文档的根元素。

在 HTML 文档中，根元素通常是 `<html>` 标签，因此 `:root` 实际上等效于直接选择 `<html>`，但它有更高的优先级，尤其在使用 CSS 变量时非常有用。

1. **全局作用域：**  
   使用 `:root` 定义的 CSS 变量会作用于整个文档范围内的所有元素，方便统一管理和复用。

2. **易扩展性：**  
   在需要动态调整主题或全局样式时，可以直接修改 `:root` 中的变量值，无需改动大量 CSS 代码。

### 示例

以下代码在 `:root` 中定义了全局 CSS 变量，并通过子元素引用这些变量：

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CSS Variables</title>
  <style>
    :root {
      --primary-color: #3498db;
      --secondary-color: #2ecc71;
      --font-color: #333333;
    }

    body {
      background-color: var(--primary-color);
      color: var(--font-color);
    }

    h1 {
      color: var(--secondary-color);
    }
  </style>
</head>
<body>
  <h1>Hello, World!</h1>
  <p>This is a demo of using :root for global CSS variables.</p>
</body>
</html>
```

在这里，`:root` 提供了一个全局作用域，便于所有元素都能访问这些变量。

# 3 Vue2/Vue3

## 3.1 v-for单独应用样式

> 原问题：使用v-for遍历生成几个div。在刚才的基础上，实现如下功能：当鼠标悬停在某个div上时，该div背景色变为红色，但其他div保持不变。

在 Vue 3 中可以通过绑定 `:class` 和 `@mouseover`/`@mouseleave` 事件来实现鼠标悬停时背景色变化的功能。以下是完整代码：

```html
<template>
  <div class="container">
    <!-- 使用 v-for 生成多个 div -->
    <div
      v-for="(item, index) in items"
      :key="index"
      class="item"
      :class="{ active: hoveredIndex === index }"
      @mouseover="hoveredIndex = index"
      @mouseleave="hoveredIndex = null"
    >
      {{ item }}
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      items: ["第一个 DIV", "第二个 DIV", "第三个 DIV", "更多..."], // 数据源
      hoveredIndex: null, // 当前悬停的索引
    };
  },
};
</script>

<style>
.container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding: 20px;
  background-color: #f5f5f5;
}

.item {
  background-color: #007BFF;
  color: white;
  padding: 10px;
  border-radius: 5px;
  text-align: center;
  min-width: 100px;
  transition: background-color 0.3s ease;
}

.item.active {
  background-color: red;
}
</style>
```

### 实现逻辑：

1. **绑定动态类**：
   - 使用 `:class="{ active: hoveredIndex === index }"` 来判断当前 `div` 是否是鼠标悬停的目标。
   - 如果 `hoveredIndex` 与当前 `div` 的 `index` 相同，则添加 `active` 类。

2. **事件处理**：
   - 在 `@mouseover` 事件中，将鼠标悬停的 `index` 赋值给 `hoveredIndex`。
   - 在 `@mouseleave` 事件中，将 `hoveredIndex` 重置为 `null`，取消悬停效果。

3. **样式**：
   - 默认背景色为蓝色 (`#007BFF`)。
   - 悬停时添加 `active` 类，背景色变为红色。

4. **过渡效果**：
   - 使用 `transition: background-color 0.3s ease` 让颜色变化更平滑。

### 使用步骤：

1. 将代码复制到 Vue 3 项目中的组件文件（如 `App.vue`）。
2. 启动项目 (`npm run serve`)，在页面上可以看到鼠标悬停时，背景色仅对目标 `div` 生效，其他 `div` 不受影响。

---

### 热键建议：

- **A**: 添加功能  
  为 `div` 添加点击事件，动态修改内容  
- **D**: 改进效果  
  增加颜色渐变或其他样式动画  
- **T**: 测试功能  
  验证多个悬停事件能否正确独立触发

## 3.2 监听路由变化

在 Vue 3 项目中，使用 `vue-router` 模块，可以通过监听路由变化事件来检测当前路由是否发生跳转。以下是详细的实现步骤和代码：

### 实现方法

1. **使用 `onBeforeRouteUpdate` 和 `onBeforeRouteLeave`**  
   在组件内可以通过路由钩子函数直接监听路由变化。

2. **使用全局的 `router.afterEach` 钩子**  
   在路由器实例中全局监听路由的跳转。

---

### 示例代码

#### 方法 1: 在组件内部监听路由变化

使用 Vue Router 的 `onBeforeRouteUpdate` 监听当前路由变化：

```vue
<script setup>
import { onBeforeRouteUpdate } from 'vue-router';

onBeforeRouteUpdate((to, from) => {
  console.log('Route is changing!');
  console.log('From:', from.fullPath, 'To:', to.fullPath);
});
</script>

<template>
  <div>
    <h1>当前组件内容</h1>
  </div>
</template>
```

#### 方法 2: 使用全局 `afterEach` 钩子监听

在创建路由实例时，可以使用全局的 `afterEach` 钩子：

```javascript
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  { path: '/', component: () => import('./components/Home.vue') },
  { path: '/about', component: () => import('./components/About.vue') },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.afterEach((to, from) => {
  console.log('Route transition occurred');
  console.log('From:', from.fullPath, 'To:', to.fullPath);
});

export default router;
```

#### 方法 3: 在 `watch` 中监听 `route` 对象

可以在组件中通过 `watch` 监听路由对象的变化：

```vue
<script setup>
import { useRoute } from 'vue-router';
import { watch } from 'vue';

const route = useRoute();

watch(
  () => route.fullPath,
  (newPath, oldPath) => {
    console.log('Route changed from', oldPath, 'to', newPath);
  }
);
</script>

<template>
  <div>
    <h1>监听路由变化</h1>
  </div>
</template>
```

---

### 选择合适方法

- 如果需要在特定组件中监听路由变化，推荐使用 `onBeforeRouteUpdate` 或 `watch`。
- 如果需要全局监听路由跳转，推荐使用 `router.afterEach`。

---

### 热键选项

- **W:** 继续深挖相关路由细节  
- **A:** 提供其他实现方式对比  
- **S:** 逐行讲解代码原理  
- **D:** 提供优化建议或更多扩展

## 3.3 在某个组件通过ref获取到的DOM元素，如果传到另一个ts文件里使用，还是响应式吗？

如果你通过 `ref` 获取的 DOM 元素传递到另一个 TypeScript 文件使用，它 **不会** 保持响应性。Vue 的 `ref` 只会在组件的上下文中保持响应性，也就是说，它是与 Vue 的响应式系统紧密集成的。

当你将 `ref` 传递到外部文件时，它仅仅是一个普通的对象引用，而不是一个响应式的引用。在 Vue 组件内，`ref` 会被代理成响应式对象，但如果你将它传递到外部的 TypeScript 文件中并访问，它将失去 Vue 的响应式能力。

### 解决方案

如果你希望传递一个响应式的 DOM 引用，可以在外部文件中手动将它包装成响应式的对象，使用 `reactive` 或 `ref` 来处理。例如：

```typescript
import { ref } from 'vue';

export function useDomElement() {
  const myButton = ref<HTMLElement | null>(null);

  // 你可以在外部文件中直接操作 DOM
  const focusButton = () => {
    myButton.value?.focus();
  };

  return {
    myButton,
    focusButton,
  };
}
```

然后在组件中，使用 Vue 的响应式系统将 DOM 引用传递过去：

```vue
<template>
  <button ref="myButton" @click="focusButton">Click Me!</button>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useDomElement } from './externalFile';

// 通过 ref 绑定 DOM 元素
const myButton = ref(null);

// 引用外部功能
const { focusButton } = useDomElement();

// 在组件内访问 DOM 元素
onMounted(() => {
  myButton.value?.focus();
});
</script>
```

### 小结：

- `ref` 在 Vue 组件内是响应式的，但当它传递到外部文件时，它不再保持响应性。
- 如果需要让它保持响应性，可以将其包装成 Vue 的响应式对象，确保你在外部代码中通过 Vue 的 API 进行访问。

希望这个解答能帮助你！

## 3.4 vue3的template标签

在 Vue 3 中，`<template>` 标签是一个非常重要的元素，用于定义组件的模板部分。它本身不会渲染到 DOM 中，而是用来包裹其他 HTML 元素或指令代码，以下是它的一些常见用法：

---

### **3.4.1 定义模板**

`<template>` 是 Vue 组件的核心部分，用于描述组件的结构和布局：

```vue
<template>
  <div>
    <h1>Hello, {{ name }}</h1>
    <p>This is a Vue 3 component.</p>
  </div>
</template>

<script setup>
import { ref } from "vue";

const name = ref("Vue.js");
</script>
```

作用：组件的主模板必须使用 `<template>` 标签，它是一个逻辑容器，用于定义 DOM 结构。

---

### **3.4.2 条件渲染**

可以配合 `v-if` 指令，在满足条件时动态渲染部分内容：

```vue
<template v-if="isLoggedIn">
  <p>Welcome back, user!</p>
</template>
<template v-else>
  <p>Please log in to continue.</p>
</template>

<script setup>
import { ref } from "vue";

const isLoggedIn = ref(false);
</script>
```

作用：使用多个 `<template>` 标签，可在不同条件下只渲染其中之一。

---

### **3.4.3 循环渲染列表**

当需要循环渲染一组数据时，可以用 `<template>` 配合 `v-for`：

```vue
<template>
  <ul>
    <template v-for="(item, index) in items" :key="index">
      <li>{{ item }}</li>
    </template>
  </ul>
</template>

<script setup>
import { ref } from "vue";

const items = ref(["Apple", "Banana", "Cherry"]);
</script>
```

作用：`<template>` 不会生成多余的 DOM，只是用作内部逻辑控制，避免额外的嵌套标签。

---

### **3.4.4 包裹多个根节点**

Vue 3 支持**多根节点**，但如果想在某处显式地使用多个元素而不引入多余的 DOM，可以使用 `<template>`：

```vue
<template>
  <header>Header Content</header>
  <main>Main Content</main>
  <footer>Footer Content</footer>
</template>
```

作用：`<template>` 作为父级占位符，不会被渲染成实际的 DOM 节点。

---

### **3.4.5 插槽（Slot）内容分组**

在开发可复用组件时，`<template>` 也是插槽内容的重要组成部分：

#### 默认插槽

```vue
<template>
  <button>
    <slot></slot>
  </button>
</template>
```

使用：

```vue
<MyButton>Click Me</MyButton>
```

#### 具名插槽

```vue
<template>
  <div class="card">
    <header><slot name="header"></slot></header>
    <main><slot></slot></main>
    <footer><slot name="footer"></slot></footer>
  </div>
</template>
```

使用：

```vue
<MyCard>
  <template #header>Card Header</template>
  <p>Main content of the card.</p>
  <template #footer>Card Footer</template>
</MyCard>
```

作用：通过 `<template>` 包裹内容，为插槽提供逻辑分组，同时避免多余的 DOM 结构。

---

### 3.4.6 动态组件**

可以在 `<template>` 内结合 `<component>` 动态渲染组件：

```vue
<template>
  <component :is="currentComponent"></component>
</template>

<script setup>
import { ref } from "vue";
import ComponentA from "./ComponentA.vue";
import ComponentB from "./ComponentB.vue";

const currentComponent = ref("ComponentA");
</script>
```

作用：`<template>` 可以简洁地组织动态渲染的内容或组件。

---

### **3.4.7 事件修饰符或跨层嵌套逻辑**

与事件监听、修饰符等逻辑搭配使用：

```vue
<template v-on:click.self="onClickOutside">
  <div>
    This is a modal. Click outside to close.
  </div>
</template>

<script setup>
const onClickOutside = () => {
  console.log("Clicked outside the modal!");
};
</script>
```

作用：用于逻辑控制，如处理事件委托等。

---

### **3.4.8 与 `<transition>` 或 `<keep-alive>` 搭配**

可以配合动画和组件缓存功能，使用 `<template>` 来组织子内容：

```vue
<template>
  <transition name="fade">
    <div v-if="show">Animated Content</div>
  </transition>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
```

作用：`<template>` 帮助整合子节点，便于过渡或缓存控制。

---

### **3.4.9 总结**

#### **主要特点**

- **逻辑容器**：`<template>` 本身不会生成任何 DOM 节点，但能用于逻辑分组和结构化内容。
- **灵活性**：支持条件渲染、列表渲染、多根节点、插槽组合等各种场景。
- **性能友好**：减少 DOM 嵌套，保持结构清晰。

#### **最佳实践**

1. 使用 `<template>` 避免无意义的嵌套标签。
2. 合理利用 `<template>` 提升代码的可读性。
3. 配合指令（如 `v-if`、`v-for`）、插槽和动态组件，发挥其最大效用。

## 3.5 定义props并限定props的类型

在 Vue 3 组件封装时，父组件可以通过 `props` 传递数据给子组件，而在使用 TypeScript 时，我们可以对 `props` 进行类型限定。  
假设你的项目已开启 `setup` 语法糖（即 `<script setup>` 语法），可以使用 `defineProps` 来定义 `props` 并指定类型。

---

### 3.5.1 定义 `props` 并限定类型**

在 Vue 3 `setup` 语法糖下，`defineProps` 可以直接接受 TypeScript 的类型：

```vue
<script setup lang="ts">
interface Props {
  title: string;
  count: number;
  isActive?: boolean; // 可选属性
}

const props = defineProps<Props>();
</script>

<template>
  <div>
    <h1>{{ props.title }}</h1>
    <p>Count: {{ props.count }}</p>
    <p v-if="props.isActive">This is active!</p>
  </div>
</template>
```

**说明：**

- `defineProps<Props>()` 让 `props` 具备了类型约束。
- `isActive` 使用 `?` 号，表示该属性是可选的。

---

### **3.5.2 使用 `withDefaults` 提供默认值**

如果 `props` 中的某些属性是可选的，但你希望提供默认值，可以使用 `withDefaults`：

```vue
<script setup lang="ts">
interface Props {
  title: string;
  count: number;
  isActive?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  isActive: false, // 默认值
});
</script>

<template>
  <div>
    <h1>{{ props.title }}</h1>
    <p>Count: {{ props.count }}</p>
    <p v-if="props.isActive">This is active!</p>
  </div>
</template>
```

**说明：**

- `withDefaults(defineProps<Props>(), { isActive: false })` 使 `isActive` 默认值为 `false`。

---

### **3.5.3在父组件传递 `props`**

```vue
<template>
  <MyComponent title="Hello Vue 3" :count="10" :isActive="true" />
</template>

<script setup lang="ts">
import MyComponent from "@/components/MyComponent.vue";
</script>
```

---

### **3.5.4 复杂 `props` 类型**

如果 `props` 需要传递对象或数组，可以定义更复杂的类型：

```vue
<script setup lang="ts">
interface User {
  id: number;
  name: string;
}

interface Props {
  user: User;
  tags: string[];
}

const props = defineProps<Props>();
</script>

<template>
  <div>
    <h2>{{ props.user.name }}</h2>
    <ul>
      <li v-for="tag in props.tags" :key="tag">{{ tag }}</li>
    </ul>
  </div>
</template>
```

**父组件示例：**

```vue
<MyComponent :user="{ id: 1, name: 'Alice' }" :tags="['Vue', 'TypeScript']" />
```

---

### **3.5.5 结论**

- 使用 `defineProps<T>()` 定义 `props` 类型，增强类型安全性。
- 通过 `withDefaults()` 提供默认值，避免 `undefined` 问题。
- 复杂 `props` 可以使用对象和数组，TypeScript 会自动推断类型。

这样可以确保父组件向子组件传值时，TypeScript 能够进行类型检查，提高代码的可维护性和可靠性。 🚀

## 3.6 限定ref和reactive响应式变量的类型提高代码可维护性

在 Vue 3 中，使用 `ref` 和 `reactive` 创建响应式变量时，确实可以通过 TypeScript 来限制其类型，从而提高代码的可维护性和可读性。以下是如何为 `ref` 和 `reactive` 变量添加类型约束的几种常见方式。

### **3.6.1 使用 `ref` 时指定类型**

`ref` 用于创建基本类型（如 `string`、`number`、`boolean` 等）或引用对象的响应式变量。通过 TypeScript，您可以明确指定 `ref` 的类型。

#### 示例：指定基本类型的 `ref`

```vue
<script setup lang="ts">
import { ref } from 'vue';

// 指定 ref 类型
const count = ref<number>(0); // 默认值为 0，类型是 number
const title = ref<string>('Hello Vue 3'); // 默认值为字符串，类型是 string
const isActive = ref<boolean>(true); // 默认值为 true，类型是 boolean
</script>
```

#### 示例：指定对象类型的 `ref`

```vue
<script setup lang="ts">
import { ref } from 'vue';

// 对象类型的 ref
interface User {
  name: string;
  age: number;
}

const user = ref<User>({ name: 'Alice', age: 30 });
</script>
```

#### **说明：**

- `ref<number>(0)`：`count` 的类型被限定为 `number`，即使值发生变化，类型仍然是 `number`。
- `ref<string>('Hello Vue 3')`：`title` 的类型是 `string`。
- `ref<User>(...)`：可以为复杂对象（如 `User`）指定类型。

### **3.6.2 使用 `reactive` 时指定类型**

`reactive` 用于创建对象或数组的响应式数据，通常需要提供类型来确保对象的结构一致。

#### 示例：指定对象类型的 `reactive`

```vue
<script setup lang="ts">
import { reactive } from 'vue';

// 对象类型的 reactive
interface User {
  name: string;
  age: number;
}

const user = reactive<User>({
  name: 'Alice',
  age: 30,
});
</script>
```

#### 示例：指定数组类型的 `reactive`

```vue
<script setup lang="ts">
import { reactive } from 'vue';

// 数组类型的 reactive
const numbers = reactive<number[]>([1, 2, 3, 4]);  // 数组元素是 number 类型
</script>
```

#### **说明：**

- `reactive<User>(...)`：可以为一个对象（如 `user`）提供一个接口 `User` 类型，确保对象结构的类型安全。
- `reactive<number[]>([1, 2, 3])`：为数组提供类型 `number[]`，确保数组内元素都是 `number` 类型。

### **3.6.3  `ref` 和 `reactive` 的类型推断**

Vue 3 和 TypeScript 结合时，通常 Vue 会自动推断出变量的类型，尤其是在值初始化时。如果你没有显式指定类型，TypeScript 会根据初始值推断出类型。

例如：

```typescript
const count = ref(0);  // TypeScript 推断类型为 number
```

但为了提高代码可维护性和可读性，通常建议显式地指定类型，尤其是在复杂的数据结构或业务逻辑中。

### **3.6.4 使用 `readonly` 创建只读响应式变量**

你还可以使用 `readonly` 来创建只读的响应式对象，使得对象中的数据不可修改，这在某些情况下是非常有用的：

```typescript
import { reactive, readonly } from 'vue';

interface User {
  name: string;
  age: number;
}

const user = readonly(reactive<User>({
  name: 'Alice',
  age: 30,
}));

// user.name = "Bob";  // 会报错，不能修改 user 对象
```

### 3.6.5 子组件props限定复杂类型

> [vue3中关于指定props的复杂ts类型 - 致爱丽丝 - 博客园](https://www.cnblogs.com/hjk1124/p/18294034)

### 3.6.6 **总结**

通过 TypeScript 类型限定，您可以在以下方面提高代码的可维护性：

- **为 `ref` 提供类型**，特别是基本类型（如 `string`、`number`）和复杂对象（如接口或类型别名）。
- **为 `reactive` 提供类型**，确保对象或数组的结构符合预期。
- **类型推断**：TypeScript 会自动推断类型，但显式指定类型会提高代码的可读性和可维护性，尤其是在复杂的项目中。

这样做不仅可以防止类型错误，还能帮助团队成员快速理解数据结构，并减少潜在的调试和维护成本。

## 3.7 vue3多层嵌套路由

是的，Vue 3 路由（`vue-router`）完全支持多层嵌套路由。通过嵌套路由，您可以在父路由中定义子路由，并且可以继续嵌套更多子路由。

### 示例：多层嵌套路由

假设我们有一个用户页面，在用户页面下有个人资料和设置两个子页面，在设置页面下又有两个子页面：账户设置和通知设置。

#### 1. 配置路由

```javascript
import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/components/HomePage.vue'
import UserPage from '@/components/UserPage.vue'
import ProfilePage from '@/components/ProfilePage.vue'
import SettingsPage from '@/components/SettingsPage.vue'
import AccountSettings from '@/components/AccountSettings.vue'
import NotificationSettings from '@/components/NotificationSettings.vue'

const routes = [
  {
    path: '/',
    component: HomePage
  },
  {
    path: '/user',
    component: UserPage,
    children: [
      {
        path: 'profile',
        component: ProfilePage
      },
      {
        path: 'settings',
        component: SettingsPage,
        children: [
          {
            path: 'account',
            component: AccountSettings
          },
          {
            path: 'notifications',
            component: NotificationSettings
          }
        ]
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
```

#### 2. 在父组件中使用 `<router-view>`

每个父组件都需要一个 `<router-view>` 来显示其子路由的内容。

例如，在 `UserPage.vue` 中：

```vue
<template>
  <div>
    <h1>User Page</h1>
    <router-view></router-view> <!-- 子路由内容 -->
  </div>
</template>
```

在 `SettingsPage.vue` 中：

```vue
<template>
  <div>
    <h2>Settings</h2>
    <router-view></router-view> <!-- 子路由内容 -->
  </div>
</template>
```

### 路由层级解释

- `/user` 是父路由，展示 `UserPage` 组件。
- `/user/profile` 和 `/user/settings` 是 `/user` 的子路由，分别展示 `ProfilePage` 和 `SettingsPage`。
- `/user/settings/account` 和 `/user/settings/notifications` 是 `/user/settings` 的子路由，展示 `AccountSettings` 和 `NotificationSettings`。

### 总结

Vue 3 的路由支持无限嵌套，使得你可以灵活地组织和管理页面结构。通过嵌套路由，你可以构建复杂的页面布局，保持代码的清晰和可维护性。

## 3.8 vue3配置多目标跨域

在 Vue 3 的 `vue.config.js` 中，您可以为不同的 API 路径配置多个代理目标（targets）。通过将多个代理配置添加到 `proxy` 对象中，您可以实现针对不同路径的代理。

以下是如何配置多个 `target` 的示例：

```javascript
const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8090',
        changeOrigin: true,
        pathRewrite: { '^/api': '' },
      },
      '/auth': {
        target: 'http://localhost:8080', // 另一个目标地址
        changeOrigin: true,
        pathRewrite: { '^/auth': '' },
      },
      '/another-api': {
        target: 'http://localhost:8070', // 再添加一个目标地址
        changeOrigin: true,
        pathRewrite: { '^/another-api': '' },
      },
    },
  },
})
```

### 解释：

1. **`/api`**：该路径的请求会代理到 `http://localhost:8090`。
2. **`/auth`**：该路径的请求会代理到 `http://localhost:8080`。
3. **`/another-api`**：该路径的请求会代理到 `http://localhost:8070`。

### 工作方式：

- 如果请求路径以 `/api` 开头，它会被代理到 `http://localhost:8090`。
- 如果请求路径以 `/auth` 开头，它会被代理到 `http://localhost:8080`。
- 如果请求路径以 `/another-api` 开头，它会被代理到 `http://localhost:8070`。

这样，您可以根据不同的 API 路径配置多个代理目标，以实现对不同服务器的跨域请求。

### 需要注意：

- `pathRewrite` 用来重写请求路径，如果你需要去掉前缀（如示例中的 `'^/api'`），可以根据实际需求进行调整。

## 3.9 渐变消失与浮现

### 问题1：利用@keyframes动画可以让一个组件在消失时有渐变消失的效果吗？

是的，利用 `@keyframes` 动画可以让一个组件在消失时有渐变消失的效果。通过设置透明度变化（`opacity`）和其他 CSS 属性，结合 `animation` 或 `transition`，可以实现平滑的渐变消失效果。

以下是一个实现组件渐变消失效果的简单示例：

#### **代码实现**

```vue
<template>
  <div v-if="isVisible" class="fade-out-component">
    <p>这是一个渐变消失的组件。</p>
  </div>
  <button @click="toggleVisibility">切换组件显示/隐藏</button>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const isVisible = ref(true);  // 控制组件的显示和隐藏

const toggleVisibility = () => {
  isVisible.value = !isVisible.value;
};
</script>

<style scoped>
.fade-out-component {
  animation: fadeOut 3s forwards;  /* 设置渐变消失的动画 */
}

@keyframes fadeOut {
  0% {
    opacity: 1;  /* 初始时完全可见 */
  }
  100% {
    opacity: 0;  /* 完全透明，消失 */
  }
}
</style>
```

#### **实现说明**
1. **`v-if="isVisible"`**  
   我们用 `v-if` 来控制组件的显示和隐藏，当 `isVisible` 为 `true` 时，组件显示；为 `false` 时，组件消失。

2. **`toggleVisibility` 方法**  
   该方法用于切换 `isVisible` 的值，从而控制组件的显示或隐藏。

3. **`@keyframes fadeOut` 动画**  
   通过 `@keyframes` 定义了一个名为 `fadeOut` 的动画：
   - 从 `opacity: 1`（完全可见）到 `opacity: 0`（完全透明），实现渐变消失效果。
   - 动画的持续时间设置为 `3s`，你可以根据需要调整时间。

4. **`animation` 属性**  
   在组件的类名 `.fade-out-component` 上应用 `animation: fadeOut 3s forwards`，使得组件在消失时执行 `fadeOut` 动画，且在动画结束时保持 `opacity: 0`。

#### **注意事项**
- 如果你希望在组件从 DOM 中移除前实现渐变效果，`v-if` 会导致组件立即被销毁。如果需要更复杂的过渡效果，可以使用 `transition` 结合 `@keyframes`，确保在 DOM 移除前动画完成。
- `animation` 是一种关键帧动画，会在组件每次显示时重复执行，而 `transition` 是渐变过渡，通常用于属性的平滑过渡。

---

#### **使用 `transition` 配合 `@keyframes`**

如果你希望组件的渐变消失时只触发一次动画，可以将 `@keyframes` 和 `transition` 结合使用。这里是一个改进版的实现：

```vue
<template>
  <div v-if="isVisible" class="fade-out-component">
    <p>这是一个渐变消失的组件。</p>
  </div>
  <button @click="toggleVisibility">切换组件显示/隐藏</button>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const isVisible = ref(true);  // 控制组件的显示和隐藏

const toggleVisibility = () => {
  isVisible.value = !isVisible.value;
};
</script>

<style scoped>
.fade-out-component {
  transition: opacity 3s ease-out;  /* 过渡动画 */
}

.fade-out-component.leave-active {
  opacity: 0;  /* 在离开时变为透明 */
}
</style>
```

### 问题2：该方法对于v-show也可用吗？

对于 `v-show`，使用 `@keyframes` 动画并不能直接应用，因为 `v-show` 不会销毁组件，而是通过切换 `display` 属性来控制元素的显示和隐藏。因此，元素仍然存在于 DOM 中，只是不可见，无法直接通过 `@keyframes` 动画来改变 `opacity` 或其他样式属性。

不过，使用 `transition` 可以与 `v-show` 配合实现渐变消失的效果。通过结合 `v-show` 和 `transition`，你可以控制元素的透明度，并在显示和隐藏时应用动画。

#### **使用 `v-show` 和 `transition` 实现渐变消失效果**

```vue
<template>
  <div v-show="isVisible" class="fade-out-component">
    <p>这是一个渐变消失的组件。</p>
  </div>
  <button @click="toggleVisibility">切换组件显示/隐藏</button>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const isVisible = ref(true);  // 控制组件的显示和隐藏

const toggleVisibility = () => {
  isVisible.value = !isVisible.value;
};
</script>

<style scoped>
.fade-out-component {
  opacity: 1;
  transition: opacity 3s ease-out;  /* 使用过渡效果 */
}

.fade-out-component.v-leave-active {
  opacity: 0;  /* 使其渐变为透明 */
}
</style>
```

#### **解释**

1. **`v-show="isVisible"`**  
   `v-show` 用于控制组件的显示和隐藏。当 `isVisible` 为 `true` 时，元素 `display` 为 `block`，为 `false` 时，`display` 为 `none`。注意，`v-show` 不会销毁元素，仅仅是控制元素的显示/隐藏。

2. **`transition` 配合 `v-show`**  
   使用 `transition` 配合 `v-show` 时，可以利用 `transition` 动画实现元素渐变消失：
   - 设置 `.fade-out-component` 元素的 `transition` 属性，以控制 `opacity` 在 3 秒内从 `1` 过渡到 `0`，即实现渐变消失效果。
   - 通过 `.v-leave-active`（Vue 过渡钩子类名）来设置 `opacity` 为 `0`，让元素在离开时渐渐变透明。

3. **`v-show` 与 `transition` 的配合**  
   - `v-show` 切换显示时会保持元素在 DOM 中，因此你可以对其应用 `transition` 动画，而不需要销毁元素。
   - `transition`

一个成功的transition标签例子：

```
<template>
  <div :class="curView == 4 ? 'home blue' : 'home yellow'">
    <transition name="fade" mode="out-in" appear>//appear确保初次进入页面时也触发动画
    //想要确保一个消失后另一个平滑地出现，必须这样写
    //使用v-if和v-else-if确保同一时间只有一个组件被渲染出来
      <Cover v-if="curView == 0"></Cover>
      <View1 v-else-if="curView == 1"></View1>
      <View2 v-else-if="curView == 2"></View2>
    </transition>
  </div>
</template>

<script lang="ts" setup>
import Cover from "@/components/Cover.vue";
import View1 from "@/components/View1.vue";
import View2 from "@/components/View2.vue";
import { ref, onMounted } from "vue";
const curView = ref<number>(0);
onMounted(() => {
  setTimeout(() => {
    curView.value = 1
  }, 7000);
})
</script>
<style lang="less" scoped>
.home {
  position: relative;
  width: 100%;
  height: 100vh;
  transition: all 1s;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 1s ease;
}

//.fade-enter在vue3被移除不可以用
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave {
  opacity: 1;
}
</style>

```

## 3.10 外部导入less文件应用scope避免样式冲突

> 原问题：在vue3组件内部的style标签设置scope，可以避免不同组件之间样式冲突。但如果是外部导入less文件该如何继续利用这一特性呢？

在 Vue 3 中使用 `scoped` 样式标签来避免样式冲突是非常常见的做法。对于内联的 `<style scoped>`，它会自动生成独特的类名，以确保样式仅作用于当前组件。但是，如果你需要在 Vue 组件中使用外部导入的 LESS 文件，`scoped` 样式无法直接作用于外部导入的文件。

为了保持样式作用域并避免样式冲突，**你可以通过几种方法来处理外部 LESS 文件**，例如使用 Vue CLI 或 Vite 配置的方式来启用作用域样式。

### 方法 1: 使用 `lang="less"` 和 `scoped` 样式
Vue 支持在 `<style>` 标签中使用 `lang` 属性来处理不同的预处理器，如 LESS、SASS 等。如果你想确保 LESS 样式也能够在组件内生效，并避免冲突，可以采取以下做法：

#### 1. **直接在组件中引入 LESS 文件**

在 Vue 组件的 `<style>` 标签中使用 `lang="less"`，并结合 `scoped` 来限定样式作用范围：

```vue
<template>
  <div class="example">Hello, World!</div>
</template>

<script lang="ts">
export default {
  name: 'ExampleComponent',
};
</script>

<style scoped lang="less">
.example {
  color: red;
  background-color: lightgray;
}
</style>
```

这样做 **只能作用于当前组件的 `<style>` 标签内的样式**，但 **如果外部导入 LESS 文件，它不会受到 `scoped` 的影响**。

#### 2. **外部 LESS 文件的导入方式**

在 Vue 3 项目中，通常你会将 LESS 文件引入到组件中。为了避免样式冲突，你可以使用 `@import` 或 `@use` 来引入外部 LESS 文件。

```vue
<template>
  <div class="example">Hello, World!</div>
</template>

<script lang="ts">
export default {
  name: 'ExampleComponent',
};
</script>

<style scoped lang="less">
@import './styles/global.less';

.example {
  color: red;
  background-color: lightgray;
}
</style>
```

这样，`global.less` 文件的样式会在组件的 `<style>` 中生效，但会受到 `scoped` 的限制。

### 方法 2: 利用 CSS Modules 与 LESS 结合

如果你希望将 LESS 与 CSS Modules 结合，来确保外部 LESS 文件样式的作用域，可以通过 **CSS Modules** 来实现组件样式的本地作用域。CSS Modules 会为每个样式类添加一个唯一的类名。

#### 配置 CSS Modules

首先，确保你已正确配置 `css-modules`（如果你是使用 Vue CLI，Vite 或其他构建工具的话）。

对于 Vite，**CSS Modules** 可以通过 `vite.config.ts` 进行配置，确保 LESS 文件与 CSS Modules 一起使用。

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  css: {
    modules: {
      scopeBehaviour: 'local', // 使用本地作用域
    },
  },
});
```

然后在组件中使用 LESS 和 CSS Modules：

```vue
<template>
  <div :class="$style.example">Hello, World!</div>
</template>

<script lang="ts">
export default {
  name: 'ExampleComponent',
};
</script>

<style scoped lang="less" module>
.example {
  color: red;
  background-color: lightgray;
}
</style>
```

在这个例子中，`module` 属性使得 LESS 文件作为 **CSS Modules** 使用，生成的样式类会被自动编译成具有唯一类名的样式，从而避免了样式冲突。

### 方法 3: 使用 `deep` 来穿透样式作用域

如果你希望外部 LESS 文件或全局样式在 `scoped` 样式下生效，可以使用 `::v-deep` 选择器来穿透样式的作用域。

#### 例子：

```vue
<template>
  <div class="example">Hello, World!</div>
</template>

<script lang="ts">
export default {
  name: 'ExampleComponent',
};
</script>

<style scoped lang="less">
::v-deep .global-class {
  color: red;
  background-color: lightgray;
}
</style>
```

在这个例子中，`.global-class` 作为全局样式被应用，并且通过 `::v-deep` 穿透了 `scoped` 的限制。

### 方法 4: 在 `main.js` 或 `main.ts` 中全局引入 LESS 文件

如果你的 LESS 文件是全局共享的样式，你可以在 `main.js` 或 `main.ts` 中引入 LESS 文件，这样它会被应用于所有的组件：

```javascript
// main.js 或 main.ts
import { createApp } from 'vue';
import App from './App.vue';
import './styles/global.less';  // 引入全局样式

createApp(App).mount('#app');
```

这样，`global.less` 中的样式会应用到整个应用的所有组件，不受 `scoped` 限制。但需要注意， **这种做法会使得样式没有局部作用域**，如果你希望避免样式冲突，需要注意命名空间的管理。

---

### 总结：

1. **直接引入 LESS 文件**：Vue 3 的 `scoped` 样式标签仅对组件内部的 `<style>` 标签有效。对于外部 LESS 文件，`scoped` 不会直接生效，你需要将样式限制在组件内，或使用 `::v-deep` 来穿透样式作用域。
2. **CSS Modules**：结合 LESS 和 CSS Modules，可以保证样式局部作用域，避免不同组件之间的样式冲突。
3. **全局引入 LESS 文件**：如果需要共享全局样式，可以在 `main.js` 或 `main.ts` 中引入外部 LESS 文件，但这会使所有组件共享相同的样式，可能导致样式冲突。

通过这些方法，你可以在 Vue 3 中结合使用 LESS 文件和 `scoped` 样式，确保样式的隔离性和模块化。

# 4.JS/TS

## 4.1 操控window页面滑条

在 Vue 3 中，通过编程操控 `window` 页面滚动滑条，可以使用 JavaScript 的 `window.scrollTo()` 或 `window.scroll()` 方法，结合 Vue 的生命周期和事件处理功能来实现。以下是详细的实现步骤与代码：

### 4.1.1 vue2监听页面滚动事件

#### 4.1.1.1 在 Vue 组件中操控滚动

可以通过 Vue 的方法绑定到用户的交互事件，或者在生命周期钩子中调用滚动方法。

```vue
<template>
  <div>
    <button @click="scrollToTop">滚动到顶部</button>
    <button @click="scrollToBottom">滚动到底部</button>
    <div class="content">
      <!-- 模拟长页面内容 -->
      <p v-for="i in 100" :key="i">第 {{ i }} 行内容</p>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    // 滚动到页面顶部
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth', // 平滑滚动
      });
    },
    // 滚动到页面底部
    scrollToBottom() {
      window.scrollTo({
        top: document.body.scrollHeight, // 文档总高度
        behavior: 'smooth',
      });
    },
    // 滚动到特定位置
    scrollToPosition(position) {
      window.scrollTo({
        top: position,
        behavior: 'smooth',
      });
    },
  },
};
</script>

<style>
.content {
  height: 2000px; /* 模拟长页面 */
  background: linear-gradient(to bottom, #f3f3f3, #d3d3d3);
}
</style>
```

#### 4.1.1.2 响应式处理滚动

如果需要根据滚动条的位置执行操作（比如显示返回顶部按钮），可以监听 `scroll` 事件：

```vue
<template>
  <div>
    <button v-if="showScrollTop" @click="scrollToTop">返回顶部</button>
    <div class="content">
      <p v-for="i in 100" :key="i">第 {{ i }} 行内容</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showScrollTop: false, // 是否显示返回顶部按钮
    };
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll() {
      this.showScrollTop = window.scrollY > 200; // 距离顶部超过 200px 显示按钮
    },
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    },
  },
};
</script>
```

---

### 4.1.2 vue3利用响应式特性监听某个容器scroll滚动

在 Vue 3 中，你可以利用响应式系统结合 `ref` 或 `reactive` 来监听 DOM 元素的滚动事件，并响应地执行一些操作。为了监听某个容器的 `scroll` 滚动事件，我们可以使用 `ref` 来获取该 DOM 元素并添加事件监听器。

以下是一个简单的示例，展示了如何在 Vue 3 组件中监听一个容器的滚动事件，并使用响应式变量来跟踪滚动位置：

#### 示例代码

```vue
<template>
  <div class="scroll-container" ref="scrollContainer">
    <!-- 在这里放置你的内容 -->
    <div style="height: 200vh;">这是一个非常长的内容。</div>
  </div>
  <p>当前滚动位置: {{ scrollTop }}</p>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';

// 创建一个引用来存储滚动容器的 DOM 元素
const scrollContainer = ref<HTMLElement | null>(null);

// 响应式数据，用于存储滚动位置
const scrollTop = ref(0);

// 处理滚动事件的函数
const handleScroll = () => {
  if (scrollContainer.value) {
    scrollTop.value = scrollContainer.value.scrollTop;
  }
};

// 在组件挂载时添加滚动事件监听器
onMounted(() => {
  if (scrollContainer.value) {
    scrollContainer.value.addEventListener('scroll', handleScroll);
  }
});

// 在组件卸载前移除滚动事件监听器，防止内存泄漏
onBeforeUnmount(() => {
  if (scrollContainer.value) {
    scrollContainer.value.removeEventListener('scroll', handleScroll);
  }
});

// 可选：观察 scrollTop 的变化进行某些操作
watch(scrollTop, (newVal) => {
  console.log('滚动位置改变:', newVal);
});
</script>

<style scoped>
.scroll-container {
  width: 100%;
  height: 300px;
  overflow-y: scroll;
  border: 1px solid #ccc;
}
</style>
```

#### 说明：

1. **DOM 引用**：
   - 使用 `ref` 获取滚动容器的 DOM 元素，以便在组件生命周期中进行操作。

2. **响应式数据**：
   - `scrollTop` 是一个响应式变量，用于存储和显示当前的滚动位置。

3. **滚动事件处理**：
   - 定义 `handleScroll` 函数，在每次滚动时更新 `scrollTop` 的值。
   - 在 `onMounted` 钩子中为滚动容器添加 `scroll` 事件监听器。
   - 在 `onBeforeUnmount` 钩子中移除事件监听器，以避免内存泄漏。

4. **样式**：
   - `.scroll-container` 类定义了一个固定高度和可滚动的区域，用于测试滚动效果。

通过这种方式，你可以轻松地监听容器的滚动事件，并利用 Vue 3 的响应式特性对滚动行为做出响应。本示例展示了如何动态显示滚动位置，但你也可以根据需要添加其他逻辑，例如懒加载、无限滚动等功能。



## 4.2 TS空对象

> 原问题1：在typescript中，空对象如何定义？它可以像布尔值一样直接用于逻辑判断吗？

在 TypeScript 中，空对象的定义方法有多种，常见的定义方式包括：

### 4.2.1 使用空对象字面量：

```typescript
const emptyObject = {};
```

这种方式会推导出 `emptyObject` 的类型为 `{}`，即一个空对象类型。需要注意，虽然这是一种有效的定义，但它在某些情况下可能会导致类型不明确。

### 4.2.2 使用 `Record<string, never>`：

```typescript
const emptyObject: Record<string, never> = {};
```

这种方式通过 `Record<string, never>` 明确指定了 `emptyObject` 是一个键名为 `string` 且没有任何值的对象。`never` 表示这个对象不能有任何值。

### 4.2.3 使用 `Object` 类型：

```typescript
const emptyObject: Object = {};
```

`Object` 是 JavaScript 中所有对象的超类，但这个类型在 TypeScript 中相对较宽松，通常不推荐用这种方式来指定空对象。

### 4.2.4 空对象的逻辑判断

空对象本身在 JavaScript 和 TypeScript 中的行为与布尔值类似。在逻辑判断中，空对象是被视为真值的。所以，空对象 **不能** 像布尔值那样直接用于逻辑判断。

例如：

```typescript
const emptyObject = {};

if (emptyObject) {
  console.log('This is true');  // 这条语句会被执行，因为空对象在布尔值判断中是 true。
}
```

但需要注意的是，空对象 `({})` 和 `null` 或 `undefined` 不一样。`null` 和 `undefined` 在逻辑判断中会被视为 `false`，而空对象会被视为 `true`。

> 原问题2：如何在逻辑判断中判断一个对象是否是空对象字面量“{}”？

#### 1. 使用 `Object.keys()` 判断

`Object.keys()` 方法返回一个给定对象自身的所有可枚举属性的名称的数组。如果该数组为空，则说明对象没有任何属性，可以认为是一个空对象。

```typescript
const isEmptyObject = (obj: object): boolean => {
  return Object.keys(obj).length === 0;
};

const emptyObj = {};
const nonEmptyObj = { name: "Grimoire" };

console.log(isEmptyObject(emptyObj)); // true
console.log(isEmptyObject(nonEmptyObj)); // false
```

#### 2. 使用 `JSON.stringify()` 判断

另一种方法是使用 `JSON.stringify()` 将对象转换为 JSON 字符串。如果对象为空对象字面量，`JSON.stringify()` 将返回 `"{}"`。

```typescript
const isEmptyObject = (obj: object): boolean => {
  return JSON.stringify(obj) === '{}';
};

const emptyObj = {};
const nonEmptyObj = { name: "Grimoire" };

console.log(isEmptyObject(emptyObj)); // true
console.log(isEmptyObject(nonEmptyObj)); // false
```

### 4.2.5 小结

- 使用 `Object.keys(obj).length === 0` 来判断对象是否为空对象字面量是推荐的方法，因为它直接检查对象的属性。
- `JSON.stringify(obj) === '{}'` 也可以判断对象是否为空，但通常性能不如 `Object.keys()` 方法。

在 TypeScript 文件中导出一个变量有多种方式，主要取决于你是想进行命名导出（named export）还是默认导出（default export）。下面是两种常见的导出方式：

## 4.3 TS文件导出变量（或其他）

### 4.3.1 命名导出（Named Export）

命名导出允许你从模块中导出多个变量或函数。使用命名导出时，你需要在导入时使用相同的名称。

#### 示例：

```typescript
// utils.ts

export const myVariable = 42;

export function myFunction() {
  console.log('This is a function.');
}

export class MyClass {
  greet() {
    console.log('Hello');
  }
}
```

在另一个文件中可以这样导入：

```typescript
// main.ts

import { myVariable, myFunction, MyClass } from './utils';

console.log(myVariable); // 输出：42
myFunction();            // 输出：This is a function.
const myClassInstance = new MyClass();
myClassInstance.greet(); // 输出：Hello
```

### 4.3.2 默认导出（Default Export）

默认导出允许你从模块中导出一个默认的变量、函数或者类。导入时可以随意命名，但一个模块只能有一个默认导出。

#### 示例：

```typescript
// config.ts

const defaultConfig = {
  apiUrl: 'https://api.example.com',
  timeout: 1000,
};

export default defaultConfig;
```

在另一个文件中可以这样导入：

```typescript
// main.ts

import config from './config';

console.log(config.apiUrl); // 输出：https://api.example.com
```

### 4.3.3 注意事项

- **混合使用**: 你可以在一个模块中同时使用命名导出和默认导出。例如，在一个配置文件中可以默认导出一个配置对象，同时命名导出一些辅助函数。

  ```typescript
  // settings.ts
  
  export const VERSION = '1.0.0';
  
  export default {
    apiUrl: 'https://api.example.com',
    timeout: 1000,
  };
  ```

  导入时：

  ```typescript
  // main.ts
  
  import settings, { VERSION } from './settings';
  
  console.log(VERSION);          // 输出：1.0.0
  console.log(settings.apiUrl);  // 输出：https://api.example.com
  ```

选择哪种导出方式通常取决于你模块的设计和使用场景。如果一个模块主要提供某个功能，可以使用默认导出；如果模块提供多个功能，使用命名导出则更为合适。

## 4.4 动态获取和监听元素宽高

### 4.4.1 获取宽高

在 Vue 3 中，你可以使用 `ref` 来获取 DOM 元素的实例，然后通过 JavaScript 的属性和方法来访问该元素的宽度和高度。通常情况下，这涉及到使用 `offsetWidth` 和 `offsetHeight` 属性，它们分别返回元素的布局宽度和高度（包括内边距和边框，但不包括外边距）。

下面是一个简单的示例，展示如何在 Vue 3 组件中获取某个元素的宽和高：

#### 示例代码

```vue
<template>
  <div ref="myElement" class="box">
    这是一个测试盒子。
  </div>
  <button @click="getDimensions">获取宽高</button>
  <p>宽度: {{ width }}px，高度: {{ height }}px</p>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';

// 创建引用，绑定到 DOM 元素
const myElement = ref<HTMLElement | null>(null);

// 响应式变量，用于存储宽度和高度
const width = ref(0);
const height = ref(0);

// 函数用于获取元素的宽度和高度
const getDimensions = () => {
  if (myElement.value) {
    width.value = myElement.value.offsetWidth;
    height.value = myElement.value.offsetHeight;
  }
};

// 可以在组件挂载完成后自动获取一次
onMounted(() => {
  getDimensions();
});
</script>

<style scoped>
.box {
  width: 200px;
  height: 100px;
  background-color: lightblue;
  margin: 20px;
}
</style>
```

#### 说明：

1. **引用 DOM 元素**：
   - 使用 `ref` 为目标元素创建一个引用 `myElement`，并在模板中通过 `ref` 属性绑定到 `div` 元素。

2. **响应式数据**：
   - 定义两个响应式变量 `width` 和 `height`，用于保存从 DOM 元素获取的宽度和高度。

3. **获取元素尺寸**：
   - 在 `getDimensions` 方法中，通过 `myElement.value` 获取实际的 DOM 元素，并使用其 `offsetWidth` 和 `offsetHeight` 属性来获取元素的宽度和高度。

4. **事件绑定**：
   - 添加一个按钮，点击时调用 `getDimensions` 函数，以便用户可以手动获取元素的最新宽高。

5. **生命周期钩子**：
   - 在 `onMounted` 钩子中调用 `getDimensions`，确保在组件挂载后立即获取初始的宽高。

这种方式适用于需要动态获取元素尺寸的场景，例如在响应式布局或动画效果中进行调整。如果元素大小会动态变化（例如窗口调整、内容变更等），你可能需要监听相关事件，或使用 Resize Observer API 来自动更新尺寸信息。

### 4.4.2 动态更新宽高

如果元素的宽高会动态更新，最佳的方法是使用 `ResizeObserver` API。`ResizeObserver` 可以监听元素的尺寸变化，并在尺寸发生改变时触发回调。这种方式非常适合需要实时监控元素大小变化的场景。

下面是一个示例，展示如何在 Vue 3 项目中使用 `ResizeObserver` 来监听元素宽高的动态变化：

#### 示例代码

```vue
<template>
  <div ref="myElement" class="box">
    这是一个测试盒子。
  </div>
  <p>当前宽度: {{ width }}px，高度: {{ height }}px</p>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

// 创建引用，绑定到 DOM 元素
const myElement = ref<HTMLElement | null>(null);

// 响应式变量，用于存储宽度和高度
const width = ref(0);
const height = ref(0);

let resizeObserver: ResizeObserver | null = null;

onMounted(() => {
  if (myElement.value) {
    // 初始化 ResizeObserver 实例
    resizeObserver = new ResizeObserver(entries => {
      for (let entry of entries) {
        const { offsetWidth, offsetHeight } = entry.target as HTMLElement;
        width.value = offsetWidth;
        height.value = offsetHeight;
      }
    });

    // 开始观察目标元素的尺寸变化
    resizeObserver.observe(myElement.value);
  }
});

onBeforeUnmount(() => {
  // 在组件卸载前停止观察，以防止内存泄漏
  if (resizeObserver && myElement.value) {
    resizeObserver.unobserve(myElement.value);
    resizeObserver.disconnect();
  }
});
</script>

<style scoped>
.box {
  width: 200px;
  height: 100px;
  background-color: lightblue;
  margin: 20px;
  resize: both; /* 允许用户调整大小 */
  overflow: auto;
}
</style>
```

#### 说明：

1. **创建 DOM 引用**：
   - 使用 `ref` 为目标元素创建一个引用 `myElement`，并在模板中通过 `ref` 属性绑定到 `div` 元素。

2. **响应式数据**：
   - 定义两个响应式变量 `width` 和 `height`，用于保存从 DOM 元素获取的宽度和高度。

3. **使用 `ResizeObserver`**：
   - 在 `onMounted` 钩子中初始化 `ResizeObserver` 实例，并为每个观察到的元素条目更新响应式变量。
   - 当目标元素的尺寸发生变化时，将自动触发回调函数，在此处更新宽度和高度。

4. **停止观察**：
   - 在 `onBeforeUnmount` 钩子中，使用 `unobserve` 和 `disconnect` 方法停止对元素的观察，避免内存泄漏。

5. **样式调整**：
   - 使用 `resize: both` 和 `overflow: auto` 使得元素可以手动调整尺寸，以便进行测试。

`ResizeObserver` 是现代浏览器提供的内置 API，目前在大多数主流浏览器中都得到了支持。如果需要在不支持 `ResizeObserver` 的环境中使用，可以考虑使用 polyfill 或者其他兼容性方案。

### 4.4.3 动态监听多个元素

是的，一个 `ResizeObserver` 实例可以同时观察多个元素的尺寸变化。你只需要调用 `observe()` 方法多次，每次传入不同的目标元素。`ResizeObserver` 会为它所观察的每个元素触发回调函数，使得你可以在同一个回调中处理这些元素的尺寸变化。

#### 示例代码

下面是一个示例，展示如何使用单个 `ResizeObserver` 实例来监听多个元素的尺寸变化：

```vue
<template>
  <div ref="element1" class="box">
    盒子1
  </div>
  <p>盒子1 - 宽度: {{ width1 }}px，高度: {{ height1 }}px</p>

  <div ref="element2" class="box">
    盒子2
  </div>
  <p>盒子2 - 宽度: {{ width2 }}px，高度: {{ height2 }}px</p>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

// 创建引用，绑定到 DOM 元素
const element1 = ref<HTMLElement | null>(null);
const element2 = ref<HTMLElement | null>(null);

// 响应式变量，用于存储宽度和高度
const width1 = ref(0);
const height1 = ref(0);
const width2 = ref(0);
const height2 = ref(0);

let resizeObserver: ResizeObserver | null = null;

onMounted(() => {
  resizeObserver = new ResizeObserver(entries => {
    for (let entry of entries) {
      const target = entry.target as HTMLElement;
      if (target === element1.value) {
        width1.value = target.offsetWidth;
        height1.value = target.offsetHeight;
      } else if (target === element2.value) {
        width2.value = target.offsetWidth;
        height2.value = target.offsetHeight;
      }
    }
  });

  if (element1.value) {
    resizeObserver.observe(element1.value);
  }

  if (element2.value) {
    resizeObserver.observe(element2.value);
  }
});

onBeforeUnmount(() => {
  if (resizeObserver) {
    if (element1.value) {
      resizeObserver.unobserve(element1.value);
    }
    if (element2.value) {
      resizeObserver.unobserve(element2.value);
    }
    resizeObserver.disconnect();
  }
});
</script>

<style scoped>
.box {
  width: 200px;
  height: 100px;
  background-color: lightblue;
  margin: 20px;
  resize: both; /* 允许用户调整大小 */
  overflow: auto;
}
</style>
```

#### 说明：

- **观察多个元素**：
  - 在 `onMounted` 钩子中，我们创建了一个 `ResizeObserver` 实例，并通过调用 `observe()` 将两个不同的元素添加到观察列表中。

- **尺寸变化处理**：
  - 在回调函数中，我们遍历 `entries` 数组，该数组包含了所有被观察到发生尺寸变化的元素。
  - 通过检查 `entry.target` 确定哪个元素的尺寸发生了变化，并更新相应的响应式数据。

- **停止观察**：
  - 在 `onBeforeUnmount` 钩子中，我们确保对每个元素调用 `unobserve()`，并最终断开 `ResizeObserver` 来防止内存泄漏。

这种方法有效地利用了 `ResizeObserver` 的能力，可以让你更高效地监控多个元素的尺寸变化，而不必为每个元素创建独立的观察器实例。

## 4.5 鼠标拖拽元素

在 Vue 3 组件中，使用 TypeScript 实现一个可拖拽的 `div` 盒子，可以利用 `mousedown`、`mousemove` 和 `mouseup` 事件来监听鼠标行为，并更新盒子的 `left` 和 `top` 位置。以下是一个完整的 Vue 3 组件实现：

### 4.5.1 无边界检查

#### **实现步骤**

1. **监听 `mousedown` 事件**：记录初始鼠标位置和盒子位置。
2. **监听 `mousemove` 事件**：根据鼠标移动的偏移量更新盒子位置。
3. **监听 `mouseup` 事件**：移除 `mousemove` 监听，停止拖拽。

---

#### **完整代码**

```vue
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

// 定义盒子位置和拖拽状态
const boxRef = ref<HTMLElement | null>(null);
const position = ref({ x: 100, y: 100 }); // 初始位置
const dragging = ref(false);
const startMouse = ref({ x: 0, y: 0 });
const startPosition = ref({ x: 0, y: 0 });

// 按下鼠标时触发
const onMouseDown = (event: MouseEvent) => {
  if (!boxRef.value) return;

  dragging.value = true;
  startMouse.value = { x: event.clientX, y: event.clientY };
  startPosition.value = { x: position.value.x, y: position.value.y };

  // 监听鼠标移动和松开事件
  document.addEventListener("mousemove", onMouseMove);
  document.addEventListener("mouseup", onMouseUp);
};

// 拖动时触发
const onMouseMove = (event: MouseEvent) => {
  if (!dragging.value) return;

  // 计算鼠标移动的距离
  const deltaX = event.clientX - startMouse.value.x;
  const deltaY = event.clientY - startMouse.value.y;

  // 更新盒子位置
  position.value.x = startPosition.value.x + deltaX;
  position.value.y = startPosition.value.y + deltaY;
};

// 松开鼠标时触发
const onMouseUp = () => {
  dragging.value = false;

  // 移除事件监听，防止内存泄漏
  document.removeEventListener("mousemove", onMouseMove);
  document.removeEventListener("mouseup", onMouseUp);
};

// 组件销毁时清除事件监听
onUnmounted(() => {
  document.removeEventListener("mousemove", onMouseMove);
  document.removeEventListener("mouseup", onMouseUp);
});
</script>

<template>
  <div
    ref="boxRef"
    class="draggable-box"
    :style="{ left: `${position.x}px`, top: `${position.y}px` }"
    @mousedown="onMouseDown"
  ></div>
</template>

<style scoped>
.draggable-box {
  position: absolute;
  width: 100px;
  height: 100px;
  background-color: red;
  cursor: grab;
  border-radius: 10px;
}
</style>
```

---

#### **解释**

1. `ref` 定义了 `position` 用于存储 `div` 盒子的 `x` 和 `y` 坐标。
2. `onMouseDown` 记录鼠标按下时的位置，并添加 `mousemove` 和 `mouseup` 监听事件。
3. `onMouseMove` 计算鼠标移动的偏移量，并更新 `div` 位置。
4. `onMouseUp` 释放鼠标时，清除 `mousemove` 监听，防止内存泄漏。
5. `onUnmounted` 确保组件销毁时清除监听事件，防止内存泄漏。

---

#### **优化**

- **限制拖动范围**：可在 `onMouseMove` 事件中增加边界检查，避免 `div` 超出屏幕范围。
- **动画优化**：可以使用 `requestAnimationFrame` 进行优化，提高性能。
- **移动端支持**：可以增加 `touchstart`、`touchmove`、`touchend` 事件，支持触屏设备。

### 4.5.2边界检查

在盒子外围再添加一个盒子，要求红色盒子不超过外围盒子的范围。

#### **限制拖拽范围**

为了让红色盒子的移动范围不超过外围盒子，我们需要进行**边界检查**：

- 获取**外围盒子的尺寸和位置**。
- 在 `onMouseMove` 事件中，**限制红色盒子的位置**，确保它不会超出外围盒子的边界。

---

#### **完整代码**

```vue
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

// 盒子和外围容器的引用
const boxRef = ref<HTMLElement | null>(null);
const containerRef = ref<HTMLElement | null>(null);

// 盒子位置
const position = ref({ x: 100, y: 100 });

// 记录拖拽状态
const dragging = ref(false);
const startMouse = ref({ x: 0, y: 0 });
const startPosition = ref({ x: 0, y: 0 });

// 外围盒子的边界
const bounds = ref({ minX: 0, minY: 0, maxX: 0, maxY: 0 });

// 计算边界
const updateBounds = () => {
  if (!containerRef.value || !boxRef.value) return;

  const containerRect = containerRef.value.getBoundingClientRect();
  const boxRect = boxRef.value.getBoundingClientRect();

  bounds.value = {
    minX: containerRect.left,
    minY: containerRect.top,
    maxX: containerRect.right - boxRect.width,
    maxY: containerRect.bottom - boxRect.height,
  };

  // 适配初始位置
  position.value.x = Math.max(bounds.value.minX, Math.min(position.value.x, bounds.value.maxX));
  position.value.y = Math.max(bounds.value.minY, Math.min(position.value.y, bounds.value.maxY));
};

// 监听窗口变化，更新边界
onMounted(() => {
  window.addEventListener("resize", updateBounds);
  updateBounds();
});

onUnmounted(() => {
  window.removeEventListener("resize", updateBounds);
});

// 按下鼠标时触发
const onMouseDown = (event: MouseEvent) => {
  if (!boxRef.value) return;

  dragging.value = true;
  startMouse.value = { x: event.clientX, y: event.clientY };
  startPosition.value = { x: position.value.x, y: position.value.y };

  document.addEventListener("mousemove", onMouseMove);
  document.addEventListener("mouseup", onMouseUp);
};

// 拖动时触发
const onMouseMove = (event: MouseEvent) => {
  if (!dragging.value) return;

  // 计算鼠标移动的距离
  const deltaX = event.clientX - startMouse.value.x;
  const deltaY = event.clientY - startMouse.value.y;

  // 计算新位置，并进行边界检查
  const newX = Math.max(bounds.value.minX, Math.min(startPosition.value.x + deltaX, bounds.value.maxX));
  const newY = Math.max(bounds.value.minY, Math.min(startPosition.value.y + deltaY, bounds.value.maxY));

  position.value.x = newX;
  position.value.y = newY;
};

// 松开鼠标时触发
const onMouseUp = () => {
  dragging.value = false;
  document.removeEventListener("mousemove", onMouseMove);
  document.removeEventListener("mouseup", onMouseUp);
};
</script>

<template>
  <div ref="containerRef" class="container">
    <div
      ref="boxRef"
      class="draggable-box"
      :style="{ left: `${position.x}px`, top: `${position.y}px` }"
      @mousedown="onMouseDown"
    ></div>
  </div>
</template>

<style scoped>
/* 外围盒子 */
.container {
  position: relative;
  width: 500px;
  height: 300px;
  background-color: lightgray;
  border: 2px solid black;
  margin: 50px auto;
  overflow: hidden;
}

/* 可拖拽盒子 */
.draggable-box {
  position: absolute;
  width: 100px;
  height: 100px;
  background-color: red;
  cursor: grab;
  border-radius: 10px;
}
</style>
```

---

#### **核心优化点**

1. **计算拖拽边界**：
   - 通过 `getBoundingClientRect()` 获取 **外围盒子** 和 **红色盒子** 的尺寸。
   - 计算 `minX`, `minY`, `maxX`, `maxY` 确保红色盒子不会超出边界。

2. **动态适应窗口变化**：
   - 使用 `window.addEventListener("resize", updateBounds)` 监听窗口大小变化，确保边界实时更新。

3. **拖拽时进行边界检测**：
   - 计算新位置后，使用 `Math.max()` 和 `Math.min()` 限制 `position.x` 和 `position.y` 在合法范围内。

## 4.6 TS使用import导入图片

> https://blog.csdn.net/yuliwen0418/article/details/121141130

## 4.7 防抖和节流

当然！**debounce**（防抖）和 **throttle**（节流）都是前端常用的优化手段，可以显著提升滚动等高频事件的性能。下面给你详细介绍二者，并给出实际代码示例。

---

### 1. 防抖（Debounce）

**含义：** 一段时间内只响应最后一次事件触发。

**典型场景：** 用户输入搜索、窗口调整大小等。

**实现代码：**

```javascript
function debounce(fn, delay) {
    let timer = null;
    return function(...args) {
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(this, args);
        }, delay);
    };
}

// 使用方式
window.addEventListener('scroll', debounce(function() {
    // 判断是否滚动到底部
    const documentHeight = document.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;
    const scrollPosition = window.scrollY || window.pageYOffset;
    if (scrollPosition + windowHeight >= documentHeight - 1) {
        console.log('debounce: 到底了');
    }
}, 200)); // 200毫秒防抖
```

---

### 2. 节流（Throttle）

**含义：** 保证在一定时间间隔内只执行一次回调。

**典型场景：** 页面滚动、窗口resize、拖拽等高频事件。

**实现代码：**

```javascript
function throttle(fn, interval) {
    let lastTime = 0;
    return function(...args) {
        const now = Date.now();
        if (now - lastTime >= interval) {
            lastTime = now;
            fn.apply(this, args);
        }
    };
}

// 使用方式
window.addEventListener('scroll', throttle(function() {
    // 判断是否滚动到底部
    const documentHeight = document.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;
    const scrollPosition = window.scrollY || window.pageYOffset;
    if (scrollPosition + windowHeight >= documentHeight - 1) {
        console.log('throttle: 到底了');
    }
}, 200)); // 200毫秒节流
```

---

### 3. 选择建议

- **debounce**：适合只需要响应最后一次的场景（如搜索、输入）。
- **throttle**：适合希望高频率但又要降低性能消耗的场景（如滚动、resize）。

---

### 4. 也可以直接用 Lodash

如果你项目里有 `lodash`，直接用它自带的 `_.debounce` 和 `_.throttle` 更方便：

```javascript
import _ from 'lodash';

window.addEventListener('scroll', _.throttle(function() {
    // ...同上
}, 200));
```

---

如需其它优化建议或更复杂的应用场景，可以随时问我！

# 5 使用echarts

如果你在 Vue 3 中开启了 `setup` 并使用 TypeScript，使用 ECharts 会有一些细微的区别，主要是需要正确类型化 ECharts 实例和相关的配置项。以下是如何在 Vue 3 + TypeScript 中使用 ECharts 的完整步骤。

## 5.1 基本使用

### 步骤 1: 安装 ECharts 和 TypeScript 类型

首先，安装 `echarts` 和对应的 TypeScript 类型。

```bash
npm install echarts
npm install --save-dev @types/echarts
```

### 步骤 2: 创建 ECharts 组件

在 Vue 3 中的 `setup` 语法中使用 ECharts 时，你需要定义类型并确保类型安全。以下是一个用 TypeScript 的例子。

#### 创建 `EChartsComponent.vue` 文件

```vue
<template>
  <div ref="chart" style="width: 100%; height: 400px;"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import * as echarts from 'echarts';
import { ECharts, EChartOption } from 'echarts';

export default defineComponent({
  name: 'EChartsComponent',
  setup() {
    const chart = ref<HTMLDivElement | null>(null);  // 定义 chart 的类型为 HTMLDivElement

    const initChart = () => {
      // 确保 chart 不为空
      if (chart.value) {
        const myChart: ECharts = echarts.init(chart.value);

        // 定义 ECharts 配置项
        const option: EChartOption = {
          title: {
            text: 'ECharts 示例',
          },
          tooltip: {},
          xAxis: {
            data: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
          },
          yAxis: {},
          series: [
            {
              name: '示例数据',
              type: 'bar',
              data: [5, 20, 36, 10, 10, 20, 30],
            },
          ],
        };

        // 使用配置项
        myChart.setOption(option);

        // 窗口大小变化时更新图表
        window.addEventListener('resize', () => {
          myChart.resize();
        });
      }
    };

    onMounted(() => {
      initChart();
    });

    return { chart };
  },
});
</script>

<style scoped>
/* 样式可以根据需要调整 */
</style>
```

### 解释：

1. **使用 `lang="ts"`：**
   - 通过在 `<script>` 标签中添加 `lang="ts"`，我们告诉 Vue 使用 TypeScript 编译器。

2. **`ref<HTMLDivElement | null>` 类型：**
   - `chart` 是一个引用，指向 DOM 元素，类型是 `HTMLDivElement`，并且初始化时为 `null`。

3. **类型化 ECharts 实例：**
   - `const myChart: ECharts = echarts.init(chart.value)`：通过类型注解 `ECharts`，确保 `myChart` 是一个有效的 ECharts 实例。

4. **`EChartOption` 类型：**
   - 使用 `EChartOption` 来类型化 ECharts 的配置项，确保配置项符合 ECharts 的要求。

5. **`onMounted` 生命周期钩子：**
   - 在组件挂载后初始化图表。

### 步骤 3: 在父组件中使用

同样，你可以在父组件中使用这个 `EChartsComponent` 组件：

```vue
<template>
  <div>
    <h1>Vue3 + TypeScript ECharts 示例</h1>
    <EChartsComponent />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import EChartsComponent from './components/EChartsComponent.vue';

export default defineComponent({
  name: 'App',
  components: {
    EChartsComponent,
  },
});
</script>
```

### 步骤 4: 启动项目

在项目中完成上述步骤后，你可以启动项目并查看效果：

```bash
npm run serve
```

### 总结

- 通过使用 TypeScript，我们可以为 `ECharts` 实例和配置项定义严格的类型，确保开发过程中类型的正确性。
- `ref` 类型可以被显式声明为 `HTMLDivElement | null`，确保 Vue 会知道引用的是一个 DOM 元素。
- 配置项 `option` 使用了 `EChartOption` 类型，这样 TypeScript 就能帮助检查你的配置项是否符合 ECharts 的要求。

这就是如何在 Vue 3 + TypeScript 中使用 ECharts 的基本步骤。如果你有更复杂的需求，可以继续扩展和自定义。

# 6.websocket

为了将 WebSocket 的常用功能（如实例创建、连接、消息收发等）封装在一个独立的 TypeScript 文件中，便于在 Vue 组件中按需导入并使用，你可以创建一个 WebSocket 服务类。这个类将提供对 WebSocket 连接的封装，包括创建连接、发送消息、接收消息等常用方法。

## 6.1 封装与导入

### 6.1.1 步骤：

1. **创建 WebSocket 服务类**

我们首先创建一个独立的 TypeScript 文件，封装 WebSocket 的相关操作。这个类将包括方法：`connect`、`sendMessage`、`onMessage`、`close` 等。

#### `websocketService.ts` 文件

```typescript
// websocketService.ts

export class WebSocketService {
  private socket: WebSocket | null = null;
  private url: string;
  private messageCallbacks: ((message: string) => void)[] = [];

  constructor(url: string) {
    this.url = url;
  }

  // 创建 WebSocket 连接
  public connect() {
    if (this.socket) {
      console.log('WebSocket 已连接');
      return;
    }

    this.socket = new WebSocket(this.url);

    // 监听 WebSocket 连接打开事件
    this.socket.onopen = () => {
      console.log('WebSocket 连接已打开');
    };

    // 监听 WebSocket 错误事件
    this.socket.onerror = (error: Event) => {
      console.error('WebSocket 错误:', error);
    };

    // 监听 WebSocket 消息事件
    this.socket.onmessage = (event: MessageEvent) => {
      const message = event.data;
      console.log('收到消息:', message);
      this.messageCallbacks.forEach(callback => callback(message));
    };

    // 监听 WebSocket 连接关闭事件
    this.socket.onclose = () => {
      console.log('WebSocket 连接已关闭');
    };
  }

  // 发送消息
  public sendMessage(message: string) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(message);
      console.log('发送消息:', message);
    } else {
      console.error('WebSocket 未连接');
    }
  }

  // 注册消息接收回调
  public onMessage(callback: (message: string) => void) {
    this.messageCallbacks.push(callback);
  }

  // 关闭连接
  public close() {
    if (this.socket) {
      this.socket.close();
      console.log('WebSocket 已关闭');
    }
  }
}
```

### 6.1.2 **在 Vue 组件中按需导入并使用**

你可以在 Vue 组件中导入 `WebSocketService` 类，并根据需要使用它的功能。

#### 示例 Vue 组件：

```typescript
<template>
  <div>
    <h1>实时消息</h1>
    <div v-for="(message, index) in messages" :key="index">
      <p>{{ message }}</p>
    </div>
    <button @click="sendTestMessage">发送测试消息</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onBeforeUnmount } from 'vue';
import { WebSocketService } from './websocketService'; // 导入 WebSocketService 类

export default defineComponent({
  name: 'RealTimeMessages',
  setup() {
    const messages = ref<string[]>([]);
    const websocket = new WebSocketService('ws://your-websocket-server-url');

    // 在组件挂载时连接 WebSocket
    onMounted(() => {
      websocket.connect();
      
      // 注册消息回调
      websocket.onMessage((message: string) => {
        messages.value.push(message);
      });
    });

    // 发送测试消息
    const sendTestMessage = () => {
      websocket.sendMessage('Hello, WebSocket!');
    };

    // 在组件销毁时关闭 WebSocket 连接
    onBeforeUnmount(() => {
      websocket.close();
    });

    return {
      messages,
      sendTestMessage,
    };
  },
});
</script>
```

### 6.1.3 **解释代码结构**

- **`WebSocketService.ts`**：
  - `WebSocketService` 类封装了所有与 WebSocket 相关的操作。
  - `connect`: 用于创建和连接 WebSocket。
  - `sendMessage`: 用于向 WebSocket 发送消息。
  - `onMessage`: 注册回调函数以便处理从 WebSocket 接收到的消息。
  - `close`: 关闭 WebSocket 连接。

- **Vue 组件中使用 `WebSocketService`**：
  - 在 `setup` 中实例化 `WebSocketService`，并使用 `connect()` 方法建立连接。
  - 使用 `onMessage()` 方法注册一个回调，以便处理从 WebSocket 服务器接收到的消息，并将消息推送到 Vue 组件的响应式 `messages` 数组中。
  - 使用 `sendTestMessage` 方法来发送消息。
  - 在组件销毁时（`onBeforeUnmount` 钩子）关闭 WebSocket 连接。

### 6.1.4 **按需导入**

当你需要使用 WebSocket 服务时，只需按需导入 `WebSocketService` 类，并调用它的方法。这种做法使 WebSocket 的使用变得更加模块化和可重用。

---

### 6.1.5 总结

通过将 WebSocket 的常用功能封装在一个独立的 TypeScript 文件中，你可以在 Vue 3 组件中按需导入并使用它，保持代码的简洁和模块化。这种结构方便扩展和维护，能够在多个组件中重用相同的 WebSocket 连接管理逻辑。

## 6.2 部署端口

在 `new WebSocketService('ws://your-websocket-server-url')` 中传入的 **WebSocket 服务器 URL** 需要符合以下条件和规则，否则可能会导致连接失败：

---

### 1. **协议（Protocol）限制**

WebSocket 连接的 URL 必须使用 `ws://` 或 `wss://` 协议：

- **`ws://`（不加密）**：适用于 **HTTP（80端口）** 环境的 WebSocket 连接。
- **`wss://`（加密）**：适用于 **HTTPS（443端口）** 环境的 WebSocket 连接，使用 SSL/TLS 加密。

如果你的网页运行在 `https://`，但 WebSocket URL 使用 `ws://`，浏览器会阻止连接，必须改用 `wss://`。

---

### 2. **域名或 IP 限制**

传入的 WebSocket 服务器地址可以是：

- **域名**（推荐）：`ws://example.com/socket`
- **IP 地址**：`ws://192.168.1.100:8080/socket`
- **本地测试**：`ws://localhost:8080/socket`

⚠ **跨域注意**：
WebSocket 默认支持跨域连接，但服务器可能会进行 **Origin 限制**，例如仅允许特定的 `Origin` 连接，若连接被拒绝，需要检查服务器的跨域策略。

---

### 3. **端口（Port）要求**

- 默认端口：

  - `ws://` 使用 **80** 端口（如果未显式指定）。
  - `wss://` 使用 **443** 端口（如果未显式指定）。

- 如果 WebSocket 服务器运行在非默认端口（如 8080），则 URL 需要明确写出端口号，如：

  ```ts
  new WebSocketService('ws://example.com:8080')
  ```

⚠ **浏览器安全限制**：
某些端口（如 21, 22, 25, 1080 等）可能被浏览器 **阻止**，无法建立 WebSocket 连接。

---

### 4. **路径（Path）规则**

- WebSocket URL **可以包含路径**，如：

  ```ts
  new WebSocketService('ws://example.com/chat')
  ```

  服务器需要正确解析 `/chat` 这个 WebSocket 连接路径，否则会返回 `404` 或 `403`。

---

### 5. **查询参数（Query Params）**

WebSocket URL **可以包含查询参数**，用于身份认证或特定连接配置：

```ts
new WebSocketService('ws://example.com/socket?token=abc123&userId=42')
```

服务器端需要解析 `token` 或 `userId` 并进行身份验证。

---

### 6. **子协议（Subprotocol）支持**

WebSocket 允许指定 **子协议**：

```ts
new WebSocket('ws://example.com', ['protocol1', 'protocol2'])
```

如果服务器支持 `protocol1`，连接会按该协议建立，否则可能会失败。

---

### 7. **服务器支持**

**确保 WebSocket 服务器正确运行！**  
如果服务器没有正确配置 WebSocket 端点，可能会出现：

- `Error during WebSocket handshake`
- `403 Forbidden`
- `Connection refused`

可以用 **浏览器控制台** 或 **WebSocket 客户端工具（如 Postman, wscat）** 进行调试。

---

### ✅ **总结**

| 限制类型       | 详细说明                                                     |
| -------------- | ------------------------------------------------------------ |
| **协议**       | 必须使用 `ws://` 或 `wss://`，`wss://` 适用于 HTTPS 站点     |
| **域名/IP**    | 可以使用域名（`example.com`）、IP（`192.168.1.100`）、localhost |
| **端口**       | 若非标准端口（80/443），需要手动指定，如 `ws://example.com:8080` |
| **路径**       | 可加路径，如 `ws://example.com/chat`，服务器需正确解析       |
| **查询参数**   | 可带参数，如 `ws://example.com/socket?token=abc123`          |
| **子协议**     | 可在 `new WebSocket(url, ['subprotocol'])` 指定              |
| **服务器支持** | 服务器端需要正确处理 WebSocket 连接，否则会失败              |

如果 WebSocket 连接失败，建议检查：

- **浏览器控制台（F12 → Network → WS）** 是否报错？
- **服务器日志** 是否有错误？
- **是否跨域受限**？
- **是否使用了正确的协议（`ws://` vs `wss://`）**？

---

🚀 **推荐调试工具**

- **Postman**（支持 WebSocket 测试）

- **wscat**（命令行工具，安装：`npm install -g wscat`）

  ```sh
  wscat -c ws://example.com/socket
  ```

## 6.3 websocket服务端与客户端联动

要实现 WebSocket 服务器在收到某个已连接终端的消息后，给所有已连接的终端发送回信，并让每个终端在控制台打印这条回信，我们可以按照以下步骤进行设计：

### 1. **服务器端：构建 WebSocket 服务器**

我们需要一个 WebSocket 服务器来管理多个客户端连接，并在收到消息时广播给所有客户端。这里以 Node.js 的 `ws` 库为例。

#### 创建 WebSocket 服务器

```javascript
// wsServer.js

const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 8080 });

server.on('connection', (ws) => {
  console.log('新终端连接');

  // 监听收到的消息
  ws.on('message', (message) => {
    console.log(`收到消息: ${message}`);
    
    const reply = `回信: ${message}`;

    // 向所有已连接的终端发送回信
    server.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(reply);
      }
    });
  });

  // 监听关闭事件
  ws.on('close', () => {
    console.log('终端断开连接');
  });
});

console.log('WebSocket 服务器正在运行在 ws://localhost:8080');
```

### 2. **客户端：使用封装好的 WebSocketService**

在客户端，我们使用之前封装好的 `WebSocketService` 类来连接到该服务器，并注册一个回调函数处理从服务器接收到的回信。

#### 客户端 Vue 组件示例

```typescript
<template>
  <div>
    <h1>实时消息</h1>
    <div v-for="(message, index) in messages" :key="index">
      <p>{{ message }}</p>
    </div>
    <button @click="sendTestMessage">发送测试消息</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onBeforeUnmount } from 'vue';
import { WebSocketService } from './websocketService'; // 导入 WebSocketService 类

export default defineComponent({
  name: 'RealTimeMessages',
  setup() {
    const messages = ref<string[]>([]);
    const websocket = new WebSocketService('ws://localhost:8080');

    // 在组件挂载时连接 WebSocket
    onMounted(() => {
      websocket.connect();
      
      // 注册消息回调
      websocket.onMessage((message: string) => {
        console.log('收到回信:', message);  // 打印回信到控制台
        messages.value.push(message);
      });
    });

    // 发送测试消息
    const sendTestMessage = () => {
      const testMessage = 'Hello, WebSocket!';
      websocket.sendMessage(testMessage);
    };

    // 在组件销毁时关闭 WebSocket 连接
    onBeforeUnmount(() => {
      websocket.close();
    });

    return {
      messages,
      sendTestMessage,
    };
  },
});
</script>
```

### 3. **解释工作流程**

- **服务器端 (`wsServer.js`)**：
  - 启动 WebSocket 服务器，监听来自客户端的连接。
  - 当某个客户端发送消息时，服务器将该消息附加上“回信”字样，然后广播给所有已连接的客户端。

- **客户端**：
  - 使用 `WebSocketService` 类连接到 WebSocket 服务器。
  - 通过 `onMessage` 方法注册一个回调，以便在接收到服务器的回信时打印到浏览器控制台，并更新到消息列表中显示。

### 4. **运行指引**

- 确保在相同网络环境下运行（如本地开发环境）。

- 启动 WebSocket 服务器：

  ```bash
  node wsServer.js
  ```

- 启动你的 Vue 应用并打开浏览器，点击发送测试消息按钮以触发全局消息广播。

## 6.4 联动启动

在开发环境中，WebSocket 服务器和 Vue 3 项目通常是作为两个独立的进程运行的。一个常见的做法是通过不同的工具或脚本来分别启动它们。然而，你可以通过几种方式在启动 Vue 项目的同时自动启动 WebSocket 服务。

### 方法一：使用 `concurrently` 工具

你可以使用 `concurrently` 这样的工具来并行启动多个命令。这对于开发时非常有用，可以让你同时启动前端和后端服务。

1. **安装 `concurrently`**

   在你的项目中安装 `concurrently`：

   ```bash
   npm install concurrently --save-dev
   ```

2. **配置 `package.json`**

   修改你的 `package.json`，在 `scripts` 中添加一个新的脚本，使用 `concurrently` 启动 Vue 和 WebSocket 服务器。例如：

   ```json
   {
     "scripts": {
       "serve": "vue-cli-service serve",
       "start-server": "node wsServer.js",
       "dev": "concurrently \"npm run serve\" \"npm run start-server\""
     }
   }
   ```

3. **运行**

   使用以下命令来同时启动 Vue 项目和 WebSocket 服务器：

   ```bash
   npm run dev
   ```

### 方法二：在 Vue 项目中集成 Node.js 服务

如果你的 WebSocket 服务比较简单，并且你希望将其与前端代码打包在一起，你可以直接在 Vue 项目中使用 Node.js 来启动服务器。不过，这种方法不太适合生产环境，因为前后端分开处理更为灵活和安全。

1. **创建一个启动脚本**

   在项目根目录新建一个文件，比如 `server.js`，用于启动 WebSocket 服务：

   ```javascript
   // server.js
   const WebSocket = require('ws');
   
   const server = new WebSocket.Server({ port: 8080 });
   
   server.on('connection', (ws) => {
     ws.on('message', (message) => {
       const reply = `回信: ${message}`;
       server.clients.forEach(client => {
         if (client.readyState === WebSocket.OPEN) {
           client.send(reply);
         }
       });
     });
   });
   
   console.log('WebSocket 服务器正在运行在 ws://localhost:8080');
   ```

2. **修改 `package.json`**

   修改 `package.json` 中的 `scripts`，以便在 Vue 项目启动时也运行 `server.js`：

   ```json
   {
     "scripts": {
       "serve": "node server.js & vue-cli-service serve"
     }
   }
   ```

3. **运行 Vue 项目**

   ```bash
   npm run serve
   ```

这个方法利用了操作系统的能力，通过 `&` 符号使得 `node server.js` 和 `vue-cli-service serve` 并行运行。

### 注意事项

- **开发 vs. 生产**：在开发中，将两者结合起来启动很方便，但在生产环境中最好还是将前后端分离部署，以提高性能、安全性和可维护性。

- **端口冲突**：确保 WebSocket 服务器和 Vue 应用使用不同的端口（例如，Vue 通常在 `8080` 或 `3000` 上运行，而 WebSocket 可以在其他端口，如 `8081`）。

- **日志查看**：如果使用并行运行工具，确保能够有效地查看和管理来自两个进程的输出日志。

通过以上方法，你可以在开发环境中方便地同时运行前端和后端服务。

## 6.5 给客户端命名

在 WebSocket 应用程序中，为每个客户端连接分配一个唯一的标识符是很常见的需求。这样可以区分不同的连接，并实现对特定客户端的消息发送或管理。下面介绍几种常用的方法来实现这一功能：

### 方法 1：使用 UUID

使用 UUID（通用唯一标识符）为每个客户端生成一个唯一的 ID。这种方法简单直接。

#### 在服务器端生成 UUID

你可以使用一个 UUID 库来生成唯一的标识符。在 Node.js 中，你可以使用 `uuid` 包：

1. **安装 UUID 库**

   ```bash
   npm install uuid
   ```

2. **为每个连接生成 UUID**

   ```javascript
   const WebSocket = require('ws');
   const { v4: uuidv4 } = require('uuid');
   
   const server = new WebSocket.Server({ port: 8080 });
   
   const clients = new Map();
   
   server.on('connection', (ws) => {
     const clientId = uuidv4();
     clients.set(ws, clientId);
     console.log(`Client connected: ${clientId}`);
   
     ws.on('message', (message) => {
       console.log(`Message from ${clientId}: ${message}`);
     });
   
     ws.on('close', () => {
       clients.delete(ws);
       console.log(`Client disconnected: ${clientId}`);
     });
   });
   
   console.log('WebSocket server is running on ws://localhost:8080');
   ```

### 方法 2：客户端提供标识符

客户端可以在首次连接时通过 URL 查询参数或消息格式发送其标识符。

#### 客户端发送标识符

客户端在连接时附带一个唯一标识符，例如：

```javascript
const uniqueId = 'client-123'; // 这个 ID 可以是用户 ID、设备 ID 等
const socket = new WebSocket(`ws://localhost:8080?clientId=${uniqueId}`);

socket.onopen = () => {
  console.log('Connection opened');
};

socket.onmessage = (event) => {
  console.log('Received:', event.data);
};
```

#### 服务器解析查询参数

服务器解析连接 URL 的查询参数：

```javascript
const WebSocket = require('ws');
const url = require('url');

const server = new WebSocket.Server({ port: 8080 });

server.on('connection', (ws, req) => {
  const parameters = url.parse(req.url, true);
  const clientId = parameters.query.clientId || 'unknown';
  console.log(`Client connected: ${clientId}`);

  ws.on('message', (message) => {
    console.log(`Message from ${clientId}: ${message}`);
  });

  ws.on('close', () => {
    console.log(`Client disconnected: ${clientId}`);
  });
});

console.log('WebSocket server is running on ws://localhost:8080');
```

### 方法 3：初始消息传递标识符

如果不想使用 URL 查询参数，客户端可以在连接后立即发送一个初始消息，将标识符传递给服务器。

```javascript
// Client-side
const socket = new WebSocket('ws://localhost:8080');

socket.onopen = () => {
  const clientId = 'client-123';
  socket.send(JSON.stringify({ type: 'init', clientId }));
};

// Server-side
const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 8080 });
const clients = new Map();

server.on('connection', (ws) => {
  ws.on('message', (message) => {
    const data = JSON.parse(message);
    if (data.type === 'init') {
      const clientId = data.clientId;
      clients.set(ws, clientId);
      console.log(`Client initialized: ${clientId}`);
    }
  });

  ws.on('close', () => {
    const clientId = clients.get(ws);
    clients.delete(ws);
    console.log(`Client disconnected: ${clientId}`);
  });
});

console.log('WebSocket server is running on ws://localhost:8080');
```

### 总结

选择哪一种方法取决于你的具体需求：

- **UUID** 是最简单的，对于无法从客户端获取 ID 的场景特别有用。
- **客户端提供标识符** 适用于客户端能够准确识别自己，比如用户登录后的会话。
- **初始消息传递标识符** 是一种灵活且不需依赖 URL 的方式。

这些方法都可以帮助你有效管理和区分 WebSocket 连接中的各个客户端。



# 二、其他注意事项

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
