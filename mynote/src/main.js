import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router'
import { vueFullcalendar } from 'vue-fullcalendar'

createApp(App)
    .use(createPinia())
    .use(router)
    .use(vueFullcalendar)
    .mount("#app");
