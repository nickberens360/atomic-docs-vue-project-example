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
<script>
import {generatePropsItems, getPropsHeaders, getEventHeaders, getSlotHeaders} from '@/plugins/component-documentation/utils/docGenerator.js';
export default {
  props: {
    component: {
      type: Object,
      required: false,
      default: () => undefined,
    },
    description: {
      type: String,
      default: '',
    },
    eventItems: {
      type: Array,
      default: () => [],
    },
    slotItems: {
      type: Array,
      default: () => [],
    },
    propItems: {
      type: Array,
      default: () => [],
    },
  },

  computed: {
    computedPropItems() {
      // Use the propItems prop if it's provided and not empty
      if (this.propItems && this.propItems.length > 0) {
        return this.propItems;
      }
      // Otherwise, generate the props from the component if it's provided
      if (this.component) {
        return generatePropsItems(this.component);
      }
      return [];
    },
    propHeaders() {
      return getPropsHeaders();
    },
    eventHeaders() {
      return getEventHeaders();
    },
    slotHeaders() {
      return getSlotHeaders();
    },
  },
};
</script>
