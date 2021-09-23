<template>
  <p>{{ titleText }}</p>
  <select v-model="selectedValue" class="select">
    <option
      v-for="(item, $i) in list"
      :key="`${item}-${$i}`"
      class="select__option"
    >
      {{ item }}
    </option>
  </select>
  <p v-if="errorText" style="color: red; font-size: 0.7em">
    {{ errorText }}
  </p>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "VSelect",
  props: {
    list: {
      type: Array,
      required: true,
      default: () => [],
    },
    titleText: {
      type: String,
      default: "Выберите",
    },
    errorText: {
      type: String,
      default: "",
    },
    modelValue: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      selectedValue: this.modelValue,
    };
  },
  watch: {
    selectedValue(): void {
      this.$emit("input", this.selectedValue);
      this.$emit("select", this.selectedValue);
      this.$emit("update:modelValue", this.selectedValue);
    },
  },
});
</script>
<style>
.select {
  width: 166px;
  height: 25px;
  margin: auto;
  outline: 0;
  border-top: 1px solid #ccc;
  border-left: 1px solid #ccc;
  border-right: 1px solid #eee;
  border-bottom: 1px solid #eee;
  padding: 2px;
}
.select:focus {
  border-color: black;
}
</style>
