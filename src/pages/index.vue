<template>
  <VContainer
    fluid
    class="h-100 d-flex align-center justify-center"
    style="position: relative; top: -60px;"
  >
    <div
      class="text-center mx-auto"
      style="max-width: 1295px;"
    >
      <p
        style="font-size: 9vw;"
        class="font-weight-bold text-uppercase text-break"
      >
        Frac<span
          style="font-size: 5vw; position: relative; top: -30px; transform: scaleX(-1) rotate(0deg);"
          class="mx-n6 d-inline-block"
        ><VIcon>mdi-lightning-bolt</VIcon></span>ured
      </p>
      <p
        style="font-size: 21.1vw; line-height: .75; position: relative; top: -38px;"
        class="font-weight-bold text-uppercase text-break"
      >
        Labs
      </p>
      <div>
        <VBtn
          variant="outlined"
          size="large"
          :to="{ name: 'componentDocs' }"
          target="_blank"
        >
          COMPONENT DOCS
        </VBtn>
        <VBtn
          variant="outlined"
          size="large"
          class="mx-4"
          href="http://localhost:5173/markdown-examples.html"
          target="_blank"
        >
          API DOCS
        </VBtn>
        <VBtn
          variant="flat"
          color="primary"
          size="large"
          :to="{ name: 'customerIndex' }"
        >
          Dashboard
        </VBtn>
      </div>
    </div>
  </VContainer>
</template>

<script lang="ts" setup>

</script>
