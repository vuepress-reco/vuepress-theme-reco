#!/usr/bin/env node

/**
 * 探索 @modelcontextprotocol/sdk 的 API 结构
 */
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

// 创建 MCP 服务器实例
try {
  console.log('正在创建 McpServer 实例...');
  const server = new McpServer({
    name: "api-explorer",
    version: "1.0.0"
  });

  console.log('\n== 实例创建成功 ==');
  
  // 查看实例属性
  console.log('\n== McpServer 实例的属性 ==');
  console.log(Object.keys(server));

  // 查看实例方法
  console.log('\n== McpServer 实例的方法 ==');
  const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(server))
    .filter(name => name !== 'constructor');
  console.log(methods);

  // 探索 server.server 属性
  if (server.server) {
    console.log("\n== server.server 的属性 ==");
    console.log(Object.keys(server.server));
    
    console.log("\n== server.server 的方法 ==");
    const serverMethods = Object.getOwnPropertyNames(Object.getPrototypeOf(server.server))
      .filter(name => name !== 'constructor');
    console.log(serverMethods);
    
    // 查看 setRequestHandler 的签名
    if (typeof server.server.setRequestHandler === 'function') {
      console.log("\n== setRequestHandler 函数存在 ==");
      console.log("函数签名:", server.server.setRequestHandler.toString().split('\n')[0]);
    }
  }
  
  // 检查工具相关方法
  console.log("\n== 检查工具相关 API ==");
  const toolMethods = [
    'registerTool', 'defineBasicTool', 'addTool', 'defineTool', 'addToolHandler'
  ];
  
  for (const method of toolMethods) {
    if (typeof server[method] === 'function') {
      console.log(`找到方法: server.${method}`);
    } else {
      console.log(`未找到方法: server.${method}`);
    }
  }
  
  // 检查连接相关方法
  console.log("\n== 检查连接相关方法 ==");
  const connectionMethods = ['connect', 'listen'];
  
  for (const method of connectionMethods) {
    if (typeof server[method] === 'function') {
      console.log(`找到方法: server.${method}`);
    } else {
      console.log(`未找到方法: server.${method}`);
    }
  }
  
  // 搜索所有可用方法
  console.log("\n== 搜索所有 server 实例方法 ==");
  console.log(methods);
  
} catch (error) {
  console.error("\n探索 SDK API 时出错:", error);
}

console.log("\n探索完成！");
