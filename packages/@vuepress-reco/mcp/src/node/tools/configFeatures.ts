import path from 'path';
import fs from 'fs-extra';
import type { FeatureConfigOptions } from '../../types/index.js';
import { logger, updatePackageJson, createSpinner } from '../utils.js';

/**
 * 功能配置处理函数
 */
export async function configFeaturesHandler(options: FeatureConfigOptions): Promise<any> {
  const spinner = createSpinner('正在配置功能...');
  
  try {
    // 获取当前目录
    const cwd = process.cwd();
    
    // 检查是否在 vuepress-theme-reco 项目中
    const docsDir = path.join(cwd, 'docs');
    const vuepressDir = path.join(docsDir, '.vuepress');
    
    if (!fs.existsSync(docsDir) || !fs.existsSync(vuepressDir)) {
      spinner.fail('未找到有效的 vuepress-theme-reco 项目');
      logger.error('请在 vuepress-theme-reco 项目根目录下运行此命令');
      return { success: false, message: '未找到有效的 vuepress-theme-reco 项目' };
    }
    
    // 读取配置文件
    const configPath = path.join(vuepressDir, 'config.ts');
    if (!fs.existsSync(configPath)) {
      spinner.fail('未找到配置文件');
      logger.error('未找到 .vuepress/config.ts 文件');
      return { success: false, message: '未找到配置文件' };
    }
    
    let configContent = await fs.readFile(configPath, 'utf-8');
    
    // 需要添加的依赖
    const dependencies: Record<string, string> = {};
    
    // 需要添加的插件配置
    const pluginsToAdd: Record<string, any> = {};
    
    // 配置 AI 聊天功能
    if (options.enableAIChat) {
      dependencies['@vuepress-reco/plugin-ai-chat'] = '2.0.0-beta.67';
      dependencies['gray-matter'] = '^4.0.3';
      
      pluginsToAdd['@vuepress-reco/plugin-ai-chat'] = {
        apiKey: options.aiChatConfig?.apiKey || '',
        model: options.aiChatConfig?.model || 'deepseek-chat',
        temperature: options.aiChatConfig?.temperature || 0.7,
        maxTokens: options.aiChatConfig?.maxTokens || 500
      };
    }
    
    // 配置评论功能
    if (options.enableComments) {
      dependencies['@vuepress-reco/plugin-comments'] = '2.0.0-beta.67';
      
      if (options.commentsConfig) {
        pluginsToAdd['@vuepress-reco/plugin-comments'] = {
          provider: options.commentsConfig.provider,
          options: options.commentsConfig.options
        };
      } else {
        pluginsToAdd['@vuepress-reco/plugin-comments'] = {
          provider: 'Giscus',
          options: {
            repo: '',
            repoId: '',
            category: 'Announcements',
            categoryId: '',
            mapping: 'pathname'
          }
        };
      }
    }
    
    // 配置代码复制功能
    if (options.enableCodeCopy) {
      dependencies['@vuepress-reco/plugin-code-copy'] = '2.0.0-beta.67';
      pluginsToAdd['@vuepress-reco/plugin-code-copy'] = {};
    }
    
    // 配置公告弹窗功能
    if (options.enableBulletinPopover) {
      dependencies['@vuepress-reco/plugin-bulletin-popover'] = '2.0.0-beta.67';
      
      const bulletinConfig = options.bulletinPopoverConfig || {
        title: '公告',
        body: '欢迎使用 vuepress-theme-reco！',
        footer: '关闭'
      };
      
      pluginsToAdd['@vuepress-reco/plugin-bulletin-popover'] = {
        title: bulletinConfig.title,
        body: [
          {
            type: 'text',
            content: bulletinConfig.body,
            style: 'font-size: 12px;'
          }
        ],
        footer: [
          {
            type: 'button',
            text: bulletinConfig.footer,
            link: '/'
          }
        ]
      };
    }
    
    // 配置 Vue 组件预览功能
    if (options.enableVuePreview) {
      dependencies['@vuepress-reco/plugin-vue-preview'] = '2.0.0-beta.67';
      pluginsToAdd['@vuepress-reco/plugin-vue-preview'] = {};
    }
    
    // 配置 Markdown 任务列表功能
    if (options.enableMarkdownTask) {
      dependencies['@vuepress-reco/plugin-markdown-task'] = '2.0.0-beta.67';
      pluginsToAdd['@vuepress-reco/plugin-markdown-task'] = {};
    }
    
    // 更新 package.json
    if (Object.keys(dependencies).length > 0) {
      await updatePackageJson(cwd, {
        dependencies
      });
    }
    
    // 更新配置文件
    if (Object.keys(pluginsToAdd).length > 0) {
      // 检查配置文件中是否已有 plugins 配置
      if (configContent.includes('plugins:')) {
        // 已有 plugins 配置，在最后一个插件后添加新插件
        const pluginsEndIndex = configContent.indexOf('],', configContent.indexOf('plugins:'));
        
        if (pluginsEndIndex !== -1) {
          let pluginsToAddString = '';
          
          for (const [pluginName, pluginOptions] of Object.entries(pluginsToAdd)) {
            pluginsToAddString += `\n      ['${pluginName}', ${JSON.stringify(pluginOptions, null, 6).replace(/^/gm, '      ')}],`;
          }
          
          configContent = configContent.slice(0, pluginsEndIndex) + 
                         pluginsToAddString + 
                         configContent.slice(pluginsEndIndex);
        }
      } else {
        // 没有 plugins 配置，在 theme 配置中添加
        const themeConfigEndIndex = configContent.lastIndexOf('}),');
        
        if (themeConfigEndIndex !== -1) {
          let pluginsString = `\n    plugins: [`;
          
          for (const [pluginName, pluginOptions] of Object.entries(pluginsToAdd)) {
            pluginsString += `\n      ['${pluginName}', ${JSON.stringify(pluginOptions, null, 6).replace(/^/gm, '      ')}],`;
          }
          
          pluginsString += `\n    ],`;
          
          configContent = configContent.slice(0, themeConfigEndIndex) + 
                         pluginsString + 
                         configContent.slice(themeConfigEndIndex);
        }
      }
      
      // 写入更新后的配置文件
      await fs.writeFile(configPath, configContent);
    }
    
    spinner.succeed('功能配置成功！');
    
    // 生成配置结果信息
    const configuredFeatures: string[] = [];
    
    if (options.enableAIChat) configuredFeatures.push('AI聊天功能');
    if (options.enableComments) configuredFeatures.push('评论功能');
    if (options.enableCodeCopy) configuredFeatures.push('代码复制功能');
    if (options.enableBulletinPopover) configuredFeatures.push('公告弹窗功能');
    if (options.enableVuePreview) configuredFeatures.push('Vue组件预览功能');
    if (options.enableMarkdownTask) configuredFeatures.push('Markdown任务列表功能');
    
    logger.success(`
已成功配置以下功能：
${configuredFeatures.map(feature => `- ${feature}`).join('\n')}

请运行以下命令安装新依赖：

  pnpm install

然后启动开发服务器：

  pnpm dev
`);
    
    return { 
      success: true, 
      message: '功能配置成功',
      configuredFeatures
    };
  } catch (error) {
    spinner.fail('功能配置失败');
    logger.error(`配置功能时发生错误: ${error instanceof Error ? error.message : String(error)}`);
    
    return { 
      success: false, 
      message: `配置功能失败: ${error instanceof Error ? error.message : String(error)}`
    };
  }
}
