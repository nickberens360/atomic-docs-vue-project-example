<template>
  <ExampleComponentUsage
    :component="null"
    :event-items="eventItems"
    :slot-items="slotItems"
    :prop-items="propItems"
    expand-props-table
    description="A confirmation dialog component that can be used to ask for user confirmation."
  >
    <div class="dialog-container">
      <v-btn @click="showDialog">Open Dialog</v-btn>
      <ConfirmDialog ref="dialogRef" />
    </div>
  </ExampleComponentUsage>
</template>
<script setup lang="ts">
import ConfirmDialog from "@/components/ConfirmDialog.vue";
import { ref } from 'vue';

// Define an interface for the exposed methods of ConfirmDialog
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

interface ConfirmDialogInstance {
  open: (
    dialogTitle: string, 
    dialogMessage: string, 
    dialogOptions?: Partial<DialogOptions>
  ) => Promise<boolean>;
}

// Type the ref with the interface
const dialogRef = ref<ConfirmDialogInstance | null>(null);

const showDialog = async () => {
  if (dialogRef.value) {
    const result = await dialogRef.value.open(
      'Confirm Action',
      'Are you sure you want to proceed with this action?',
      { color: 'primary' }
    );
    console.log('Dialog result:', result);
  }
};

const propItems = [
  {
    name: 'options.color',
    type: 'String',
    required: 'false',
    default: '"primary"',
  },
  {
    name: 'options.textColor',
    type: 'String',
    required: 'false',
    default: 'undefined',
  },
  {
    name: 'options.width',
    type: 'Number',
    required: 'false',
    default: '290',
  },
  {
    name: 'options.zIndex',
    type: 'Number',
    required: 'false',
    default: '30',
  },
  {
    name: 'options.confirmBtnText',
    type: 'String',
    required: 'false',
    default: '"Yes"',
  },
  {
    name: 'options.cancelBtnText',
    type: 'String',
    required: 'false',
    default: '"Cancel"',
  },
  {
    name: 'options.titleIcon',
    type: 'String',
    required: 'false',
    default: 'undefined',
  },
  {
    name: 'options.supportingMessage',
    type: 'String',
    required: 'false',
    default: 'undefined',
  },
];

const eventItems = [
  {
    event: 'keydown.esc',
    payload: 'Event',
    description: 'Emitted when the escape key is pressed while the dialog is open.',
  },
];

const slotItems = [
  {
    name: 'below-actions',
    content: 'null',
    description: 'Slot for content below the action buttons.',
  },
];
</script>
<style
  lang="scss"
  scoped
>
.dialog-container {
  display: flex;
}
</style>
