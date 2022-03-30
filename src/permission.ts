import router from './router'
import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'

router.beforeEach(
  (
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
  ) => {
    next()
  }
)
