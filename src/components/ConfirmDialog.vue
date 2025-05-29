<template>
  <VDialog
    v-model="confirmDialog"
    :max-width="options.width"
    :style="{ zIndex: options.zIndex }"
    :scrim="false"
    @keydown.esc="cancel"
  >
    <VCard style="border-radius: 12px">
      <VToolbar
        style="background: none !important;"
        density="compact"
      >
        <VToolbarTitle
          :class="options.textColor"
          class="ml-0 pb-2 pl-4"
          style="border-bottom: 1px dashed;"
        >
          <VIcon
            v-if="options.titleIcon"
            :icon="options.titleIcon"
          />
          <span :class="`text-${options.color}`">{{ title }}</span>
        </VToolbarTitle>
      </VToolbar>
      <VCardText
        v-show="!!message"
        class="pa-4"
      >
        {{ message }}
        <p
          v-if="options.supportingMessage"
          class="text-body-4 mt-4"
        >
          {{ options.supportingMessage }}
        </p>
      </VCardText>
      <VCardActions class="pt-0 px-4">
        <VBtn
          variant="text"
          class="mr-2"
          @click="cancel"
        >
          {{ options.cancelBtnText }}
        </VBtn>
        <VBtn
          variant="text"
          @click="agree"
        >
          {{ options.confirmBtnText }}
        </VBtn>
      </VCardActions>
      <slot name="below-actions" />
    </VCard>
  </VDialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

interface DialogOptions {
  color?: string;
  textColor?: string;
  width?: number;
  zIndex?: number;
  confirmBtnText?: string;
  cancelBtnText?: string;
  titleIcon?: string;
  supportingMessage?: string;
}

const confirmDialog = ref(false);
const resolve = ref<((value: boolean) => void) | null>(null);
const reject = ref<((reason?: any) => void) | null>(null);
const message = ref<string | null>(null);
const title = ref<string | null>(null);
const options = ref<DialogOptions>({
  color: 'primary',
  textColor: undefined,
  width: 290,
  zIndex: 30,
  confirmBtnText: 'Yes',
  cancelBtnText: 'Cancel',
  titleIcon: undefined,
  supportingMessage: undefined,
});

const open = (dialogTitle: string, dialogMessage: string, dialogOptions?: Partial<DialogOptions>) => {
  confirmDialog.value = true;
  title.value = dialogTitle;
  message.value = dialogMessage;
  if (dialogOptions) {
    options.value = { ...options.value, ...dialogOptions };
  }

  return new Promise<boolean>((resolvePromise, rejectPromise) => {
    resolve.value = resolvePromise;
    reject.value = rejectPromise;
  });
};

const agree = () => {
  if (resolve.value) {
    resolve.value(true);
  }
  confirmDialog.value = false;
};

const cancel = () => {
  if (resolve.value) {
    resolve.value(false);
  }
  confirmDialog.value = false;
};

defineExpose({
  open: open as any
});
</script>
