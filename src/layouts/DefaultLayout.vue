<template>
  <AppBar />
  <AppNavigation />
  <VMain id="main">
    <VContainer>
      <div
        v-if="props.headline || props.supportingCopy"
        class="mx-4 mb-8"
        style="max-width: 900px;"
      >
        <h1
          v-if="props.headline"
          class="mb-4"
        >
          {{ props.headline }}
        </h1>
        <p
          v-if="props.supportingCopy"
          class="ma-auto"
        >
          {{ props.supportingCopy }}
          <a
            v-if="props.docsLink"
            :href="props.docsLink"
            target="_blank"
          >
            Learn More
            <VIcon size="small">
              mdi-open-in-new
            </VIcon>
          </a>
        </p>
      </div>
    </VContainer>
    <slot name="default" />
  </VMain>
<!--  <AppFooter style="height: 60px" />-->
</template>

<script lang="ts" setup>
 const props = defineProps<{
   headline?: string;
   supportingCopy?: string;
   docsLink?: string;
 }>();
</script>
