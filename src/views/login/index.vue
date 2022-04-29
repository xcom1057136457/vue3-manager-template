<template>
  <div class="w-full h-full flex">
    <div class="flex-1 login-bg-wrapper overflow-hidden">
      <img
        src="@/assets/images/login-bg.png"
        class="block w-full h-full object-cover"
        alt=""
      />
    </div>
    <div class="flex flex-col py-5 justify-center" style="width: 500px">
      <div class="text-2xl text-center text-gray-600 mb-12 font-bold">{{
        $t('login.loginTitle')
      }}</div>

      <div class="px-8 mb-10">
        <el-form
          ref="ruleForm"
          label-position="left"
          :label-width="currentLangua == 'en' ? '130px' : '90px'"
          :model="loginForm"
          :rules="loginRules"
          size="large"
          hide-required-asterisk
          status-icon
        >
          <el-form-item :label="$t('login.userName') + ':'" prop="userName">
            <el-input
              v-model="loginForm.userName"
              :placeholder="$t('login.userNamePlaceHolder')"
              @keyup.enter="loginHandler(ruleForm)"
            ></el-input>
          </el-form-item>

          <el-form-item :label="$t('login.password') + ':'" prop="password">
            <el-input
              v-model="loginForm.password"
              :placeholder="$t('login.passwordPlaceHolder')"
              @keyup.enter="loginHandler(ruleForm)"
            ></el-input>
          </el-form-item>

          <el-form-item :label="$t('login.selectLang') + ':'">
            <el-select
              v-model="loginForm.selectLang"
              class="w-full"
              :placeholder="$t('login.selectLangPlaceHolder')"
              @change="changeLang"
            >
              <el-option
                v-for="item in languageList"
                :key="item.value"
                :label="item.label"
                :value="(item.value as string)"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>

      <div class="text-center">
        <el-button
          type="primary"
          size="large"
          class="w-4/5 shadow-lg"
          @click="loginHandler(ruleForm)"
          >{{ $t('login.loginText') }}</el-button
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'LoginPage'
  }
</script>

<script lang="ts" setup>
  import { LoginForm } from '@/types/User.Interface'
  import {
    ComponentInternalInstance,
    getCurrentInstance,
    reactive,
    ref
  } from 'vue'
  import { useLang } from '@/hooks/lang'
  import { useRoute, useRouter } from 'vue-router'
  import { useUserStore } from '@/store/user'
  import type { FormInstance, FormRules } from 'element-plus'

  const route = useRoute()
  const router = useRouter()

  const { redirect } = route.query

  // 获取设置token Store
  const { useSetToken } = useUserStore()

  const { proxy } = getCurrentInstance() as ComponentInternalInstance

  // 语言hooks
  const { languageList, changeLang, currentLangua } = useLang()

  // 登录表单数据
  const loginForm = reactive<LoginForm>({
    userName: 'admin',
    password: 'admin123',
    selectLang: currentLangua.value
  })

  // 登录规则
  const loginRules = reactive<FormRules>({
    userName: [{ required: true, message: '请输入用户名!', trigger: 'blur' }],
    password: [{ required: true, message: '请输入密码!', trigger: 'blur' }]
  })

  // 表单实例
  const ruleForm = ref<FormInstance>()

  // 登录点击事件
  const loginHandler = async (formEl: FormInstance | undefined) => {
    if (!formEl) {
      return
    }
    await formEl.validate((valid) => {
      if (valid) {
        if (loginForm.userName == 'admin') {
          if (loginForm.password == 'admin123') {
            useSetToken('ADMIN-TOKEN')
            router.replace({
              path: (redirect as string) || '/'
            })
            proxy?.$message({
              type: 'success',
              message: '登录成功！'
            })
          } else {
            proxy?.$message({
              type: 'error',
              message: '密码错误！'
            })
          }
        } else {
          useSetToken('NORMAL-TOKEN')
          router.replace({
            path: (redirect as string) || '/'
          })
          proxy?.$message({
            type: 'success',
            message: '登录成功！'
          })
        }
      }
    })
  }
</script>

<style lang="scss" scoped></style>
