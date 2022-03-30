import router from './router'
import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import nprogress from 'nprogress'

router.beforeEach(
  (
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
  ) => {
    nprogress.start
    next()
  }
)

router.afterEach(() => {
  nprogress.done()
})
