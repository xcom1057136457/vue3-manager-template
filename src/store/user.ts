import { defineStore } from 'pinia'
import { getToken, setToken } from '@/utils/auth'
import { UserInfo } from '@/types/User.Interface'

export const useUserStore = defineStore({
  id: 'user',
  state: () => {
    return {
      token: getToken(),
      userInfo: { userName: '', rules: [], avatar: '' } as UserInfo
    }
  },
  getters: {},
  actions: {
    // 设置token
    useSetToken(token: string) {
      this.token = token
      setToken(token)
      this.useSetUserInfo()
    },
    // 设置用户信息
    useSetUserInfo() {
      const token = this.token

      const userInfoObj = {
        'ADMIN-TOKEN': {
          userName: 'Admin',
          rules: ['**:**:**'],
          avatar:
            'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
        } as UserInfo,
        'NORMAL-TOKEN': {
          userName: 'Normal',
          rules: [],
          avatar: 'User'
        } as UserInfo
      }

      this.userInfo = userInfoObj[token as keyof typeof userInfoObj]
    }
  }
})
