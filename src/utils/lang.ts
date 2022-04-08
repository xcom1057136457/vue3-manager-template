import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

interface LanguageList {
  label?: string
  value?: string
}

export function useLang() {
  const router = useRouter()
  const route = useRoute()

  // 目前所用的语言
  const currentLangua = ref<string>(localStorage.lang || 'zhCn')

  // 语言列表
  const languageList = ref<LanguageList[]>([
    {
      label: '中文',
      value: 'zhCn'
    },
    {
      label: 'English',
      value: 'en'
    }
  ])

  // 相对应的中文
  const languageCn = computed(() => {
    const langArr = languageList.value.filter(
      (item: LanguageList) => item.value == currentLangua.value
    )
    return langArr[0].label
  })

  // 切换语言
  const changeLang = (lang: 'en' | 'zhCn') => {
    currentLangua.value = lang
    localStorage.setItem('lang', lang)
    // 保持数据
    router.push({
      query: route.query,
      params: route.params
    })
    setTimeout(() => {
      router.go(0)
    }, 0)
  }

  return {
    currentLangua,
    languageList,
    languageCn,
    changeLang
  }
}
