<template>
  <div class="header">
    <slot />
    <h3 class="header__text">{{ text }}</h3>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "VHeader",
  props: {
    text: String,
  },
});
</script>

<style scoped>
.header {
  display: grid;
  grid-template-columns: 150px 2fr 150px;
  grid-template-rows: 1fr;
  gap: 0 0;
  grid-template-areas: ". text .";
  border-bottom: 1px solid black;
  margin-bottom: 5rem;
  font-size: 1.33rem;
  height: 45px;
}
.header__text {
  margin: auto;
  grid-area: text;
}
</style>
