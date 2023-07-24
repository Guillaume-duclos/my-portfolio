import { createApp, h } from 'vue';
import router from './router.ts';
import App from './App.vue';
import './style.sass';

const app = createApp({
  render: () => h(App),
});

app.use(router);

app.mount('#app');
