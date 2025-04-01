import { h, App } from 'vue';
import AIChat from './components/AIChat.vue';

interface EnhanceContext {
    app: App
}

export function applyClientEnhance({ app }: EnhanceContext): void {
    // 注册全局组件
    app.component('AIChat', (props) => h(AIChat, { ...props }));
}
