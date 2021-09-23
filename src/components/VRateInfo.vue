<template>
  <span v-if="title"> {{ title }}</span>
  <span v-if="isValueExists"> {{ rateObject.value }}</span>
  <span v-if="isSumExists"> {{ rateObject.sumOfDigits }}</span>
  <span v-if="isSumEvenExists"> {{ rateObject.isSumEven }}</span>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "VRateInfo",
  props: {
    rateObject: {
      type: Object,
      required: true,
      default: () => {
        return { value: 0, sumOfDigits: 0, isSumEven: false };
      },
    },
    title: {
      type: String,
      required: true,
      default: "None",
    },
  },
  computed: {
    isValueExists(): boolean {
      return Object.prototype.hasOwnProperty.call(this.rateObject, "value");
    },
    isSumExists(): boolean {
      return Object.prototype.hasOwnProperty.call(
        this.rateObject,
        "sumOfDigits"
      );
    },
    isSumEvenExists(): boolean {
      return Object.prototype.hasOwnProperty.call(this.rateObject, "isSumEven");
    },
  },
});
</script>
<style scoped>
span {
  padding: 8px 4px;
  border-left: 1px solid black;
  border-bottom: 1px solid black;
}
</style>
