<template>
  <div class="example-component position-relative">
    <div
      v-if="description || $slots.description"
      class="mb-6"
      style="max-width: 900px;"
    >
      <slot name="description">
        <p>
          {{ description }}
        </p>
      </slot>
    </div>
    <slot name="default" />
    <div
      v-if="$slots.actions"
      class="mt-6"
    >
      <slot name="actions" />
    </div>

    <h2 class="my-4">
      Props
    </h2>
    <slot name="props">
      <VDataTable
        :headers="propHeaders"
        :items="computedPropItems"
        hide-default-footer
      >
        <template
          v-for="header in propHeaders"
          :key="header.key"
          #[`item.${header.key}`]="slotProps"
        >
          <slot
            :name="`item.${header.key}`"
            v-bind="slotProps"
          >
            {{ slotProps.value }}
          </slot>
        </template>
      </VDataTable>
    </slot>

    <h2 class="my-4">
      Events
    </h2>
    <slot name="events">
      <VDataTable
        :headers="eventHeaders"
        :items="eventItems"
        hide-default-footer
      >
        <template
          v-for="header in eventHeaders"
          :key="header.key"
          #[`item.${header.key}`]="slotProps"
        >
          <slot
            :name="`item.${header.key}`"
            v-bind="slotProps"
          >
            {{ slotProps.value }}
          </slot>
        </template>
      </VDataTable>
    </slot>

    <h2 class="my-4">
      Slots
    </h2>
    <slot name="slots">
      <VDataTable
        :headers="slotHeaders"
        :items="slotItems"
        hide-default-footer
      >
        <template
          v-for="header in slotHeaders"
          :key="header.key"
          #[`item.${header.key}`]="slotProps"
        >
          <slot
            :name="`item.${header.key}`"
            v-bind="slotProps"
          >
            {{ slotProps.value }}
          </slot>
        </template>
      </VDataTable>
    </slot>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import {
  generatePropsItems,
  getPropsHeaders,
  getEventHeaders,
  getSlotHeaders
} from '@/plugins/component-documentation/utils/docGenerator.ts';

// Define interfaces for the component's props
interface Component {
  props?: Record<string, any>;
}

interface PropItem {
  name: string;
  type: string;
  required: string;
  default: string;
}

interface Header {
  title: string;
  key: string;
  sortable?: boolean;
  align?: 'start' | 'end' | 'center';
}

// Define DataTableItem interface locally instead of importing from Vuetify
interface DataTableItem {
  [key: string]: any;
}

// Define more specific types to avoid conflicts with Vuetify's internal types
type TableHeader = Header;
type TableItem = DataTableItem;

interface Props {
  component?: Component;
  description?: string;
  eventItems?: TableItem[];
  slotItems?: TableItem[];
  propItems?: PropItem[];
}

const props = withDefaults(defineProps<Props>(), {
  component: undefined,
  description: '',
  eventItems: () => [] as TableItem[],
  slotItems: () => [] as TableItem[],
  propItems: () => [],
});

// Computed properties
const computedPropItems = computed<PropItem[]>(() => {
  // Use the propItems prop if it's provided and not empty
  if (props.propItems && props.propItems.length > 0) {
    return props.propItems;
  }
  // Otherwise, generate the props from the component if it's provided
  if (props.component) {
    return generatePropsItems(props.component);
  }
  return [];
});

const propHeaders = computed<TableHeader[]>(() => {
  return getPropsHeaders();
});

const eventHeaders = computed<TableHeader[]>(() => {
  return getEventHeaders();
});

const slotHeaders = computed<TableHeader[]>(() => {
  return getSlotHeaders();
});
</script>