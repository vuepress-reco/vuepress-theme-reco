/**
 * MCP 工具配置接口
 */
export interface MCPToolOptions {
  /**
   * 工具名称
   */
  name: string;
  
  /**
   * 工具描述
   */
  description: string;
  
  /**
   * 工具执行函数
   */
  execute: (params: any) => Promise<any>;
  
  /**
   * 工具参数定义
   */
  parameters?: Record<string, any>;
}

/**
 * 项目初始化配置接口
 */
export interface ProjectInitOptions {
  /**
   * 项目名称
   */
  name: string;
  
  /**
   * 项目描述
   */
  description: string;
  
  /**
   * 项目类型
   */
  type: 'blog' | 'docs' | 'custom';
  
  /**
   * 是否包含国际化
   */
  i18n: boolean;
  
  /**
   * 是否使用TypeScript
   */
  typescript: boolean;
  
  /**
   * 插件列表
   */
  plugins: string[];
}

/**
 * 功能配置选项接口
 */
export interface FeatureConfigOptions {
  /**
   * 是否启用AI聊天功能
   */
  enableAIChat?: boolean;
  
  /**
   * AI聊天配置
   */
  aiChatConfig?: {
    apiKey?: string;
    model?: string;
    temperature?: number;
    maxTokens?: number;
  };
  
  /**
   * 是否启用评论功能
   */
  enableComments?: boolean;
  
  /**
   * 评论功能配置
   */
  commentsConfig?: {
    provider?: 'giscus' | 'waline' | 'twikoo';
    options?: Record<string, any>;
  };
  
  /**
   * 是否启用代码复制功能
   */
  enableCodeCopy?: boolean;
  
  /**
   * 是否启用公告弹窗功能
   */
  enableBulletinPopover?: boolean;
  
  /**
   * 公告弹窗配置
   */
  bulletinPopoverConfig?: {
    title?: string;
    body?: string;
    footer?: string;
  };
  
  /**
   * 是否启用Vue组件预览功能
   */
  enableVuePreview?: boolean;
  
  /**
   * 是否启用Markdown任务列表功能
   */
  enableMarkdownTask?: boolean;
}
