<template>
  <VDialog
    v-model="dialogModel"
    fullscreen
    class="resource-detail-layout"
  >
    <VCard
      v-click-outside="onClickOutside"
      class="bg-grid resource-detail-layout__card pt-4"
    >
      <v-btn
        icon
        variant="text"
        class="position-absolute"
        style="top: 8px; right: 8px;"
        color="primary"
        @click="closeDialog"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <VCardTitle>
        <slot name="title">
          {{ title }}
        </slot>
      </VCardTitle>
      <VCardText>
        <slot name="text">
          {{ text }}
        </slot>
      </VCardText>
      <VCardText>
        <v-container max-width="800">
          <slot name="default" />
        </v-container>
      </VCardText>
      <slot name="actions">
        <VFooter class="flex-grow-0 justify-end">
          <VBtn
            variant="outlined"
            class="mr-4"
            @click="closeDialog"
          >
            Cancel
          </VBtn>
          <VBtn
            color="primary"
            @click="handleSave"
          >
            Save
          </VBtn>
        </VFooter>
      </slot>
    </VCard>
  </VDialog>
</template>

<script setup lang="ts">

const props = defineProps<{
  modelValue: boolean,
  title?: string,
  text?: string
}>();

const emit = defineEmits<{
  (e: 'update:model-value', value: boolean): void,
  (e: 'close'): void
  (e: 'save'): void
}>();

const dialogModel = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:model-value', value)
});

const onClickOutside = () => {
  closeDialog();
};

const handleSave = () => {
  emit('save');
  closeDialog();
};

const closeDialog = () => {
  dialogModel.value = false;
  emit('close');
};

</script>

<style lang="scss" scoped>
.resource-detail-layout {
  top: 24px;
  left: 24px;
  right: 24px;
  bottom: 24px;
  &__card {
    overflow: hidden !important;
    border-radius: 16px !important;
  }
}
</style>