<template>
  <div class="mt-16">
    <VRow
      justify="center"
      class="mt-16"
    >
      <VCol
        cols="12"
        sm="6"
        md="4"
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
          @keypress.enter="submitPasswordReset"
          @submit.prevent
        >
          <VCard>
            <VCardText>
              <VContainer>
                <ul>
                  <li>
                    Minimum 12 characters
                  </li>
                  <li>
                    Minimum one lowercase letter
                  </li>
                  <li>
                    Minimum one uppercase letter
                  </li>
                  <li>
                    Minimum one number
                  </li>
                  <li>
                    Minimum one of these special characters:
                    <p class="mt-1">
                      . - # @ ! / : ; ( ) $ & " ? ' + * _
                    </p>
                  </li>
                </ul>
              </VContainer>
              <VTextField
                v-model="newPassword"
                :append-icon="showPassword ? 'fas fa-eye' : 'fas fa-eye-slash'"
                label="New Password"
                :type="showPassword ? 'text' : 'password'"
                :rules="rules.passwordResetRules"
                validate-on="input"
                bg-color="surface-light"
                @click:append="showPassword = !showPassword"
              />
              <VTextField
                v-model="newPasswordConfirmation"
                validate-on="input"
                label="Confirm New Password"
                :append-icon="showConfirmPassword ? 'fas fa-eye' : 'fas fa-eye-slash'"
                :type="showConfirmPassword ? 'text' : 'password'"
                :rules="rules.confirmPasswordRules"
                :error-messages="newPasswordConfirmation.length > 0 && newPassword !== newPasswordConfirmation ? 'Passwords Must Match' : ''"
                bg-color="surface-light"
                @click:append="showConfirmPassword = !showConfirmPassword"
              />
              <VScaleTransition>
                <VAlert
                  v-show="confirmationMessage.length"
                  variant="text"
                  :color="confirmationMessageColor"
                >
                  {{ confirmationMessage }}
                </VAlert>
              </VScaleTransition>
            </VCardText>
            <VCardActions class="justify-center px-4 pb-5">
              <VBtn
                :disabled="!isFormValid || isSubmittingNewPassword"
                :loading="isSubmittingNewPassword"
                class="w-100"
                color="primary"
                variant="flat"
                @click="submitPasswordReset"
              >
                Reset Password
              </VBtn>
            </VCardActions>
            <VCardItem>
              <RouterLink :to="{name: 'login'}">
                Back To Login
              </RouterLink>
            </VCardItem>
          </VCard>
        </VForm>
      </VCol>
    </VRow>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { passwordResetRules, required } from '@/utils/validationMethods';
// import user from '@/services/userAPIService';

// Define types
type ValidationRule = (v: string) => boolean | string;

// Setup reactive state
const isFormValid = ref<boolean>(false);
const newPassword = ref<string>('');
const newPasswordConfirmation = ref<string>('');
const isSubmittingNewPassword = ref<boolean>(false);
const confirmationMessage = ref<string>('');
const confirmationMessageColor = ref<string>('');
const showPassword = ref<boolean>(false);
const showConfirmPassword = ref<boolean>(false);

// Setup route
const route = useRoute();

// Computed properties
const token = computed<string | undefined>(() => {
  return route.query.token as string | undefined;
});

// Setup validation rules
const rules = {
  passwordResetRules,
  confirmPasswordRules: [
    required,
    (v: string) => v === newPassword.value || 'Passwords Must Match'
  ] as ValidationRule[]
};

// Methods
const setConfirmationMessage = (message: string, textColor: string = 'error'): void => {
  confirmationMessage.value = message;
  confirmationMessageColor.value = textColor;
};

const submitPasswordReset = async (): Promise<void> => {
  isSubmittingNewPassword.value = true;
  setConfirmationMessage('');
  try {
    console.log('submitPasswordReset');
    // const response = await user.resetPassword(newPassword.value, token.value);
    // if(response.status === 200) {
    //   setConfirmationMessage('Password Updated Successfully', 'success');
    // }
  } catch (error: any) {
    const message = error.response?.data;
    if(message === 'ErrorRepeatPassword') {
      setConfirmationMessage('Password submission failed, repeated password. Please select a new password');
    } else {
      setConfirmationMessage('Password submission failed. Please try again or contact an admin');
    }
  } finally {
    isSubmittingNewPassword.value = false;
  }
};
</script>
