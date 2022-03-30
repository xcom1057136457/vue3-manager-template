import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import './permission'
import '@/styles/tailwind.css'
import i18n from '@/language/i18n'
import '@/styles/index.scss'

const app = createApp(App)

app.use(i18n).use(router).use(createPinia()).mount('#app')
