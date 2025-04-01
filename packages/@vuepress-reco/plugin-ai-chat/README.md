# @vuepress-reco/plugin-ai-chat

VuePress AI 聊天插件，为你的文档站点提供基于文档内容的智能问答功能。

## 功能特点

- 自动提取文档内容，生成站点内容索引
- 基于文档内容进行智能搜索和问答
- 支持多种 AI 模型接口（如 DeepSeek）
- 美观的聊天界面，支持打字机效果
- 可保存聊天历史

## 安装

```bash
# npm
npm install @vuepress-reco/plugin-ai-chat --save

# yarn
yarn add @vuepress-reco/plugin-ai-chat

# pnpm
pnpm add @vuepress-reco/plugin-ai-chat
```

## 使用方法

### 配置插件

在 VuePress 配置文件中添加插件：

```js
// .vuepress/config.js 或 .vuepress/config.ts
import { aiChatPlugin } from '@vuepress-reco/plugin-ai-chat'

export default {
  // ...其他配置
  plugins: [
    aiChatPlugin({
      // 插件配置选项
      apiKey: process.env.DEEPSEEK_API_KEY, // 可选，AI API密钥
      // 其他选项...
    }),
  ],
}
```

### 在页面中使用

在你的主题或页面中引入 `AIChat` 组件：

```vue
<template>
  <AIChat />
</template>

<script setup>
import { AIChat } from '@vuepress-reco/plugin-ai-chat/client'
</script>
```

### 页面级配置

你也可以在页面的 frontmatter 中配置 AI 聊天功能：

```markdown
---
title: 示例页面
aiChat:
  apiKey: your-api-key-here  # 覆盖全局API密钥
  enabled: true              # 启用/禁用此页面的AI聊天
---

# 示例页面内容
```

## 配置选项

| 选项 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `apiKey` | `string` | `''` | AI服务的API密钥 |
| `model` | `string` | `'deepseek-chat'` | 使用的AI模型名称 |
| `temperature` | `number` | `0.7` | 回复的随机性 (0-1) |
| `maxTokens` | `number` | `500` | 回复的最大token数量 |

## 许可证

MIT
