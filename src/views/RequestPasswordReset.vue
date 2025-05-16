<template>
  <div
    class="mt-16"
    hide-navigation
  >
    <VRow justify="center">
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
          <p class="font-weight-bold text-h5">
            Atomic Docs
          </p>
        </div>
        <VForm
          v-model="isFormValid"
          @keypress.enter="submitPasswordResetRequest"
        >
          <VCard>
            <VCardText>
              <VTextField
                v-model="username"
                label="Username"
                bg-color="surface-light"
                :rules="[(v) => !!v || 'Required']"
              />
              <VScaleTransition>
                <VAlert
                  v-show="statusMessage.length"
                  class="w-100"
                  variant="text"
                  :color="statusMessageColor"
                >
                  {{ statusMessage }}
                </VAlert>
              </VScaleTransition>
            </VCardText>
            <VCardActions class="px-4 pb-5">
              <VBtn
                v-if="!hideSubmitButton"
                class="w-100"
                :loading="isRequestingPasswordReset"
                :disabled="isRequestingPasswordReset"
                color="primary"
                variant="flat"
                @click="submitPasswordResetRequest"
              >
                Submit
              </VBtn>
            </VCardActions>
          </VCard>
          <RouterLink
            :to="{ name: 'login' }"
            class="mt-4 d-block text-center"
          >
            Back To Login
          </RouterLink>
        </VForm>
      </VCol>
    </VRow>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const username = ref<string>('');
const isFormValid = ref<boolean>(false);
const isRequestingPasswordReset = ref<boolean>(false);
const statusMessage = ref<string>('');
const statusMessageColor = ref<string>('');
const hideSubmitButton = ref<boolean>(false);

const submitPasswordResetRequest = async (): Promise<void> => {
  isRequestingPasswordReset.value = true;
  statusMessage.value = '';
  try {
    console.log('Requesting password reset for', username.value);
    router.push({ name: 'dashboard' });
    // Simulate API call
    // await user.requestPasswordReset(username.value);
    // statusMessage.value = 'Please check your email for next steps to reset your password.';
    // statusMessageColor.value = 'success';
    // hideSubmitButton.value = true;
  } catch (error) {
    statusMessage.value = 'Reset request failed. Please try again or contact an admin';
    statusMessageColor.value = 'error';
  } finally {
    isRequestingPasswordReset.value = false;
  }
};
</script>
