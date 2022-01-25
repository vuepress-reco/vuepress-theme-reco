import * as babel from '@babel/core'
import { fs } from '@vuepress/utils'
import * as types from '@babel/types'
import traverse from '@babel/traverse'
import * as compiler from '@vue/compiler-sfc'
import { getModuleResolvePath } from './module-resolver'

export function analyzeDeps(absoluteFilePath) {
  let content = fs.readFileSync(absoluteFilePath, 'utf-8')

  if (/\.vue$/.test(absoluteFilePath)) {
    const { descriptor } = compiler.parse(content)
    content = (descriptor?.script?.content || descriptor.scriptSetup?.content) as string
  }

  // @ts-ignore
  const ast = babel.transformSync(content, {
    ast: true,
    plugins: [require('@babel/plugin-syntax-jsx')],
  }).ast

  const dependencies: Array<string> = []

  const addDep = function(requireStr) {
    const absPath = getModuleResolvePath({
      basePath: absoluteFilePath,
      sourcePath: requireStr,
    }) as string

    if (!absPath || absPath.includes('node_modules')) {
      return
    }

    dependencies.push(absPath)
  }

  traverse(ast, {
    CallExpression(callPath) {
      const callPathNode = callPath.node

      // traverse all require statement
      if (
        types.isIdentifier(callPathNode.callee) &&
        callPathNode.callee.name === 'require' &&
        types.isStringLiteral(callPathNode.arguments[0])
      ) {
        addDep(callPathNode.arguments[0].value)
      }
    },
    ImportDeclaration(path) {
      addDep(path.node.source.value)
    },
  })

  return dependencies
}
