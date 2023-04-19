import { h } from 'vue';
import Comments from './components/Comments';
import ValineViews from './components/ValineViews';
import WalineViews from './components/WalineViews';
export function applyClientEnhance({ app }) {
    app.component('Comments', (props) => h(Comments, { ...props }));
    app.component('ValineViews', (props) => h(ValineViews, { ...props }));
    app.component('WalineViews', (props) => h(WalineViews, { ...props }));
}
