import { createI18n } from 'vue-i18n'
import messages from './index'

const i18n = createI18n({
  globalInjection: true,
  locale: localStorage.getItem('lang') || 'zhCn',
  messages,
  legacy: false
})

export default i18n
