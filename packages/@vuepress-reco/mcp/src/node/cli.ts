#!/usr/bin/env node

import { startServer } from './index.js';

// 启动 MCP 服务器
async function main() {
  try {
    await startServer();
  } catch (error) {
    console.error('启动 MCP 服务器失败:', error);
    process.exit(1);
  }
}

main();
