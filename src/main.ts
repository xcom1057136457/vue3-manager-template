import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import './permission'
import '@/styles/tailwind.css'
import i18n from '@/language/i18n'
import '@/styles/index.scss'
import * as Sentry from '@sentry/vue'
import { Integrations } from '@sentry/tracing'
import '@/assets/styles/element-plus.js'
import { ElMessage } from 'element-plus'

const app = createApp(App)

app.config.globalProperties.$message = ElMessage

Sentry.init({
  app,
  dsn: 'https://c01d1da0aa0c42079999ffe93c5aea1c@o1160957.ingest.sentry.io/6320394',
  integrations: [new Integrations.BrowserTracing()],
  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0
})

app.config.errorHandler = (err) => {
  Sentry.captureException(err)
}
window.addEventListener('error', (event) => {
  Sentry.captureException(event)
})
window.addEventListener('unhandledrejection', (event) => {
  Sentry.captureException(event)
})

app.use(i18n).use(router).use(createPinia()).mount('#app')
