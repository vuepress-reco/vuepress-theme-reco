import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { logger } from './utils.js';
import { FeatureConfigOptions, ProjectInitOptions } from '../types/index.js';

/**
 * vuepress-reco MCP 服务器入口
 * 提供项目初始化和功能配置工具
 */

// 创建 MCP 服务器实例
const server = new McpServer({
  name: "vuepress-reco",
  version: "2.0.0"
});

// 注册工具
// 初始化项目工具
server.tool("init-project", async (args: any) => {
  try {
    // 动态导入处理函数
    const { initProjectHandler } = await import('./tools/initProject.js');
    const result = await initProjectHandler(args as ProjectInitOptions);

    return {
      content: [{
        type: "text",
        text: result.success
          ? `项目 ${args?.name || '新'} 创建成功！\n\n${result.message}`
          : `项目创建失败：${result.message}`
      }]
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logger.error(`初始化项目时发生错误: ${errorMessage}`);
    return {
      content: [
        {
          type: "text",
          text: `初始化项目时发生错误: ${errorMessage}`
        }
      ]
    };
  }
});

// 定义初始化项目工具的参数
// 注意：这里只是定义参数，但实际上 MCP SDK 可能不支持这种方式
// 直接在代码中保留参数定义，作为文档目的
type InitProjectParams = {  
  name: string;
  description: string;
  type: "blog" | "docs" | "custom";
  i18n: boolean;
  typescript: boolean;
  plugins: string[];
};

// 功能配置工具
server.tool("config-features", async (args: any) => {
  try {
    // 动态导入处理函数
    const { configFeaturesHandler } = await import('./tools/configFeatures.js');
    const result = await configFeaturesHandler(args as FeatureConfigOptions);

    return {
      content: [
        {
          type: "text",
          text: result.success
            ? `功能配置成功！\n\n${result.message}\n\n已配置的功能：\n${result.configuredFeatures?.map((feature: string) => `- ${feature}`).join('\n') || '无'}`
            : `功能配置失败：${result.message}`
        }
      ]
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logger.error(`配置功能时发生错误: ${errorMessage}`);
    return {
      content: [
        {
          type: "text",
          text: `配置功能时发生错误: ${errorMessage}`
        }
      ]
    };
  }
});

// 定义功能配置工具的参数
// 注意：这里只是定义参数，但实际上 MCP SDK 可能不支持这种方式
// 直接在代码中保留参数定义，作为文档目的
type ConfigFeaturesParams = {
  enableAIChat?: boolean;
  aiChatConfig?: {
    apiKey?: string;
    model?: string;
    temperature?: number;
    maxTokens?: number;
  };
  enableComments?: boolean;
  commentsConfig?: {
    provider?: "giscus" | "waline" | "twikoo";
    options?: Record<string, any>;
  };
  enableCodeCopy?: boolean;
  enableBulletinPopover?: boolean;
  bulletinPopoverConfig?: {
    title?: string;
    body?: string;
    footer?: string;
  };
  enableVuePreview?: boolean;
  enableMarkdownTask?: boolean;
};

/**
 * 启动 MCP 服务器
 */
export async function startServer() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("vuepress-theme-reco MCP 服务器已启动，运行在 stdio 上");
}
