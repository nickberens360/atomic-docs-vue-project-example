<template>
  <VContainer fluid>
    <VRow
      justify="center"
      class="mt-16"
    >
      <VCol
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <div class="d-flex align-center mb-4 justify-center">
          <div class="mr-4">
            <VImg
              src="@/assets/atomic-logo.svg"
              alt="Logo"
              width="200"
            />
          </div>
        </div>
        <VForm
          ref="loginForm"
          v-model="isFormValid"
          @keypress.enter="login"
        >
          <VCard class="bg-white">
            <VCardText>
              <VTextField
                v-model="username"
                label="Username"
                :rules="[(v) => !!v || 'Required']"
                class="mb-4"
                bg-color="surface-light"
              />
              <VTextField
                v-model="password"
                label="Password"
                type="password"
                variant="solo"
                :rules="[(v) => !!v || 'Required']"
                bg-color="surface-light"
              />
            </VCardText>
            <VCardActions class="pr-4 pb-5">
              <VSpacer />
              <VBtn
                :disabled="!isFormValid || isLoggingIn"
                :loading="isLoggingIn"
                variant="flat"
                color="primary"
                @click="login"
              >
                Login
              </VBtn>
            </VCardActions>
          </VCard>
          <RouterLink
            :disabled="isLoggingIn"
            :to="{name: 'requestPasswordReset'}"
            class="text-center mt-4 d-block"
          >
            Forgot Password
          </RouterLink>
        </VForm>
      </VCol>
    </VRow>
  </VContainer>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import {useAppStore} from "@/stores";

const router = useRouter()
const userStore = useUserStore()
const appStore = useAppStore()

const loginForm = ref(null)
const username = ref('')
const password = ref('')
const isFormValid = ref(false)
const isLoggingIn = ref(false)
const invalidCredentials = ref(false)

const login = async () => {
  const { valid } = await loginForm.value?.validate() || { valid: false }

  if (!valid) return

  try {
    isLoggingIn.value = true
    invalidCredentials.value = false

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Call the store's login action directly
    userStore.login(username.value)

    // Redirect to home page
    router.push({ name: 'componentDocs' })
    // appStore.setSnackbar({
    //   message: 'Login Successful',
    // })


  } catch (error) {
    console.error('Login failed:', error)
    invalidCredentials.value = true
    appStore.setSnackbar({
      message: 'Login Failed',
      color: 'error',
    })
  } finally {
    isLoggingIn.value = false
  }
}
</script>