<template>
  <div class="header">
    <p>{{ text }}</p>
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
  border-bottom: 1px solid black;
  margin-bottom: 5rem;
  font-size: 1.33rem;
}
</style>
