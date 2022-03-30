import Cookie from 'js-cookie'

const TEMPLATE_TOKEN_KEY = '__TEMPLATE__'

export function getToken() {
  return Cookie.get(TEMPLATE_TOKEN_KEY)
}

export function setToken(token: string) {
  Cookie.set(TEMPLATE_TOKEN_KEY, token)
}

export function removeToken() {
  Cookie.remove(TEMPLATE_TOKEN_KEY)
}
