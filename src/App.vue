<template>
  <layout-default>
    <router-view />
  </layout-default>
</template>

<script>
import LayoutDefault from "@/layouts/default";
export default {
  components: { LayoutDefault },
};
</script>

<style>
@import "~normalize.css";
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
