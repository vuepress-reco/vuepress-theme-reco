import fs from 'fs-extra'
import path from 'path'
import chalk from 'chalk'
import ora from 'ora'
import { fileURLToPath } from 'url'

// 在ES模块中获取当前文件的目录路径
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/**
 * 获取模板目录路径
 */
export const getTemplatesDir = (): string => {
  return path.resolve(__dirname, '../../templates')
}

/**
 * 日志工具
 */
export const logger = {
  info: (message: string): void => {
    console.log(chalk.blue(`ℹ️ ${message}`))
  },
  success: (message: string): void => {
    console.log(chalk.green(`✅ ${message}`))
  },
  warning: (message: string): void => {
    console.log(chalk.yellow(`⚠️ ${message}`))
  },
  error: (message: string): void => {
    console.log(chalk.red(`❌ ${message}`))
  }
}

/**
 * 创建一个加载指示器
 */
export const createSpinner = (text: string) => {
  return ora(text).start()
}

/**
 * 确保目录存在
 */
export const ensureDir = async (dir: string): Promise<void> => {
  await fs.ensureDir(dir)
}

/**
 * 复制模板文件到目标目录
 */
export const copyTemplate = async (
  templateName: string,
  targetDir: string,
  variables: Record<string, string> = {}
): Promise<void> => {
  const templateDir = path.join(getTemplatesDir(), templateName)
  
  // 确保模板目录存在
  if (!fs.existsSync(templateDir)) {
    throw new Error(`模板 "${templateName}" 不存在`)
  }
  
  // 确保目标目录存在
  await ensureDir(targetDir)
  
  // 复制文件并替换变量
  const files = await fs.readdir(templateDir, { withFileTypes: true })
  
  for (const file of files) {
    const srcPath = path.join(templateDir, file.name)
    const destPath = path.join(targetDir, file.name)
    
    if (file.isDirectory()) {
      // 递归复制子目录
      await copyTemplate(
        path.join(templateName, file.name),
        destPath,
        variables
      )
    } else {
      // 读取文件内容
      let content = await fs.readFile(srcPath, 'utf-8')
      
      // 替换变量
      for (const [key, value] of Object.entries(variables)) {
        content = content.replace(new RegExp(`\\{\\{\\s*${key}\\s*\\}\\}`, 'g'), value)
      }
      
      // 写入目标文件
      await fs.writeFile(destPath, content)
    }
  }
}

/**
 * 生成 vuepress 配置文件
 */
export const generateVuepressConfig = async (
  targetDir: string,
  options: Record<string, any>
): Promise<void> => {
  const configPath = path.join(targetDir, '.vuepress/config.ts')
  
  // 确保 .vuepress 目录存在
  await ensureDir(path.join(targetDir, '.vuepress'))
  
  // 生成配置内容
  let configContent = `import { defineUserConfig } from 'vuepress'
import { recoTheme } from 'vuepress-theme-reco'

export default defineUserConfig({
  title: '${options.title || 'vuepress-theme-reco'}',
  description: '${options.description || 'A VuePress Theme'}',
  theme: recoTheme({
    // 主题配置
    style: '@vuepress-reco/style-default',
    logo: '/logo.png',
    author: '${options.author || 'reco_luan'}',
    docsRepo: '${options.docsRepo || ''}',
    docsBranch: '${options.docsBranch || 'main'}',
    docsDir: '${options.docsDir || 'example'}',
    lastUpdatedText: '${options.lastUpdatedText || '上次更新'}',`
  
  // 添加插件配置
  if (options.plugins && Object.keys(options.plugins).length > 0) {
    configContent += `\n    plugins: [`
    
    for (const [pluginName, pluginOptions] of Object.entries(options.plugins)) {
      configContent += `\n      ['${pluginName}', ${JSON.stringify(pluginOptions, null, 6).replace(/^/gm, '      ')}],`
    }
    
    configContent += `\n    ],`
  }
  
  // 添加国际化配置
  if (options.i18n) {
    configContent += `\n    locales: {
      '/': {
        lang: 'zh-CN',
        title: '${options.title || 'vuepress-theme-reco'}',
        description: '${options.description || 'A VuePress Theme'}',
      },
      '/en/': {
        lang: 'en-US',
        title: '${options.title || 'vuepress-theme-reco'}',
        description: '${options.description || 'A VuePress Theme'}',
      },
    },`
  }
  
  // 结束配置
  configContent += `\n  }),
})`
  
  // 写入配置文件
  await fs.writeFile(configPath, configContent)
}

/**
 * 更新 package.json 文件
 */
export const updatePackageJson = async (
  targetDir: string,
  updates: Record<string, any>
): Promise<void> => {
  const packageJsonPath = path.join(targetDir, 'package.json')
  
  // 检查 package.json 是否存在
  if (!fs.existsSync(packageJsonPath)) {
    // 创建新的 package.json
    const defaultPackage = {
      name: path.basename(targetDir),
      version: '1.0.0',
      description: '',
      main: 'index.js',
      scripts: {
        dev: 'vuepress dev docs',
        build: 'vuepress build docs',
        "docs:dev": "vuepress dev docs",
        "docs:build": "vuepress build docs"
      },
      keywords: [],
      author: '',
      license: 'MIT',
      dependencies: {},
      devDependencies: {}
    }
    
    await fs.writeFile(packageJsonPath, JSON.stringify({ ...defaultPackage, ...updates }, null, 2))
    return
  }
  
  // 读取现有的 package.json
  const packageJson = JSON.parse(await fs.readFile(packageJsonPath, 'utf-8'))
  
  // 更新 package.json
  for (const [key, value] of Object.entries(updates)) {
    if (typeof value === 'object' && !Array.isArray(value) && value !== null) {
      packageJson[key] = { ...packageJson[key], ...value }
    } else {
      packageJson[key] = value
    }
  }
  
  // 写入更新后的 package.json
  await fs.writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2))
}
