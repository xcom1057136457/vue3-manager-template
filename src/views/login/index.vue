<template>
  <div class="w-full h-full flex justify-center items-center">
    <div class="w-4/5 shadow-2xl rounded-xl overflow-hidden flex">
      <div class="flex-1 login-bg-wrapper">
        <img
          src="@/assets/images/login-bg.png"
          class="block w-full h-full object-cover"
          alt=""
        />
      </div>
      <div class="flex-1 flex flex-col py-5">
        <div class="text-2xl text-center text-gray-600 mb-8 font-bold">{{
          $t('login.loginTitle')
        }}</div>

        <div class="px-8 flex-1">
          <el-form
            label-position="left"
            label-width="90px"
            class="mb-9"
            size="large"
          >
            <el-form-item :label="$t('login.userName')">
              <el-input
                v-model="loginForm.userName"
                :placeholder="$t('login.userNamePlaceHolder')"
              ></el-input>
            </el-form-item>

            <el-form-item :label="$t('login.password')">
              <el-input
                v-model="loginForm.password"
                :placeholder="$t('login.passwordPlaceHolder')"
              ></el-input>
            </el-form-item>

            <el-form-item :label="$t('login.selectLang')">
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
          <el-button type="primary" size="large" class="w-4/5">登陆</el-button>
        </div>
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
  import { reactive } from 'vue'
  import { useLang } from '@/utils/lang'

  const { languageList, changeLang, currentLangua } = useLang()

  const loginForm = reactive<LoginForm>({
    userName: '',
    password: '',
    selectLang: currentLangua.value
  })
</script>

<style lang="scss" scoped></style>
