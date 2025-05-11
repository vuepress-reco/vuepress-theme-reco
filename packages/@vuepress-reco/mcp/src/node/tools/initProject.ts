import path from 'path';
import fs from 'fs-extra';
import type { ProjectInitOptions } from '../../types/index.js';
import { logger, copyTemplate, generateVuepressConfig, updatePackageJson, createSpinner, ensureDir } from '../utils.js';

/**
 * 项目初始化处理函数
 */
export async function initProjectHandler(options: ProjectInitOptions): Promise<any> {
  const { name, description, type, i18n, typescript, plugins } = options;
  
  // 创建项目目录
  const projectDir = path.resolve(process.cwd(), name);
  
  // 检查目录是否已存在
  if (fs.existsSync(projectDir)) {
    logger.error(`目录 "${name}" 已存在，请选择一个新的项目名称`);
    return { success: false, message: `目录 "${name}" 已存在` };
  }
  
  // 创建项目目录
  const spinner = createSpinner('正在创建项目...');
  
  try {
    // 创建基础目录结构
    await ensureDir(projectDir);
    await ensureDir(path.join(projectDir, 'docs'));
    await ensureDir(path.join(projectDir, 'docs', '.vuepress'));
    await ensureDir(path.join(projectDir, 'docs', '.vuepress', 'public'));
    
    // 如果启用国际化，创建英文目录
    if (i18n) {
      await ensureDir(path.join(projectDir, 'docs', 'en'));
    }
    
    // 根据项目类型选择不同的模板
    const templateName = type === 'blog' ? 'blog' : type === 'docs' ? 'docs' : 'custom';
    
    // 复制模板文件
    await copyTemplate(templateName, path.join(projectDir, 'docs'), {
      PROJECT_NAME: name,
      PROJECT_DESCRIPTION: description
    });
    
    // 创建 package.json
    const dependencies: Record<string, string> = {
      "vue": "^3.3.4",
      "vuepress": "2.0.0-beta.67",
      "vuepress-theme-reco": "2.0.0-beta.67"
    };
    
    const devDependencies: Record<string, string> = {};
    
    // 如果使用 TypeScript，添加相关依赖
    if (typescript) {
      devDependencies["typescript"] = "^5.2.2";
      devDependencies["@types/node"] = "^20.8.2";
    }
    
    // 添加选择的插件
    if (plugins && plugins.length > 0) {
      for (const plugin of plugins) {
        // 使用类型断言来避免TypeScript错误
        (dependencies as Record<string, string>)[`@vuepress-reco/${plugin}`] = "2.0.0-beta.67";
      }
    }
    
    await updatePackageJson(projectDir, {
      name,
      description,
      scripts: {
        "dev": "vuepress dev docs",
        "build": "vuepress build docs",
        "docs:dev": "vuepress dev docs",
        "docs:build": "vuepress build docs"
      },
      dependencies,
      devDependencies
    });
    
    // 生成 VuePress 配置
    const pluginsConfig: Record<string, any> = {};
    
    if (plugins && plugins.length > 0) {
      for (const plugin of plugins) {
        if (plugin === 'plugin-ai-chat') {
          pluginsConfig['@vuepress-reco/plugin-ai-chat'] = {
            apiKey: '',
            model: 'deepseek-chat',
            temperature: 0.7,
            maxTokens: 500
          };
        } else if (plugin === 'plugin-comments') {
          pluginsConfig['@vuepress-reco/plugin-comments'] = {
            provider: 'Giscus',
            options: {
              repo: '',
              repoId: '',
              category: 'Announcements',
              categoryId: '',
              mapping: 'pathname'
            }
          };
        } else if (plugin === 'plugin-bulletin-popover') {
          pluginsConfig['@vuepress-reco/plugin-bulletin-popover'] = {
            title: '公告',
            body: [
              {
                type: 'text',
                content: '欢迎使用 vuepress-theme-reco！',
                style: 'font-size: 12px;'
              }
            ],
            footer: [
              {
                type: 'button',
                text: '打赏',
                link: '/donate'
              }
            ]
          };
        } else if (plugin === 'plugin-code-copy') {
          pluginsConfig['@vuepress-reco/plugin-code-copy'] = {};
        } else if (plugin === 'plugin-vue-preview') {
          pluginsConfig['@vuepress-reco/plugin-vue-preview'] = {};
        } else if (plugin === 'plugin-markdown-task') {
          pluginsConfig['@vuepress-reco/plugin-markdown-task'] = {};
        }
      }
    }
    
    await generateVuepressConfig(path.join(projectDir, 'docs'), {
      title: name,
      description,
      i18n,
      plugins: pluginsConfig
    });
    
    // 创建 README.md
    const readmePath = path.join(projectDir, 'README.md');
    await fs.writeFile(
      readmePath,
      `# ${name}\n\n${description}\n\n## 开发\n\n\`\`\`bash\n# 克隆项目\ngit clone [your-project-url]\n\n# 安装依赖\npnpm install\n\n# 启动开发服务器\npnpm dev\n\`\`\`\n\n## 构建\n\n\`\`\`bash\npnpm build\n\`\`\`\n`
    );
    
    // 创建 .gitignore
    const gitignorePath = path.join(projectDir, '.gitignore');
    await fs.writeFile(
      gitignorePath,
      `node_modules\n.temp\n.cache\ndist\n.DS_Store\n`
    );
    
    spinner.succeed('项目创建成功！');
    
    logger.success(`
项目 "${name}" 已成功创建！

使用以下命令开始开发：

  cd ${name}
  pnpm install
  pnpm dev

构建项目：

  pnpm build
`);
    
    return { 
      success: true, 
      message: '项目创建成功',
      projectPath: projectDir
    };
  } catch (error) {
    spinner.fail('项目创建失败');
    logger.error(`创建项目时发生错误: ${error instanceof Error ? error.message : String(error)}`);
    
    // 尝试清理失败的项目目录
    try {
      if (fs.existsSync(projectDir)) {
        await fs.remove(projectDir);
      }
    } catch (cleanupError) {
      logger.error(`清理项目目录失败: ${cleanupError instanceof Error ? cleanupError.message : String(cleanupError)}`);
    }
    
    return { 
      success: false, 
      message: `创建项目失败: ${error instanceof Error ? error.message : String(error)}` 
    };
  }
}
