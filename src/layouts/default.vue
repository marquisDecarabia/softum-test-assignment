<template>
  <v-header :text="headerTitle">
    <button
      v-if="routeName === 'Result'"
      @click="$router.push('/')"
      style="font-size: 1rem; height: 45px"
    >
      Вернуться на главную
    </button>
  </v-header>
  <slot />
</template>
<script>
import VHeader from "../components/VHeader";
import { defineComponent } from "vue";

export default defineComponent({
  name: "LayoutDefault",
  components: { VHeader },
  data() {
    return {
      pathTitles: {
        Home: "Добро пожаловать",
        Result: "Результат",
      },
    };
  },
  computed: {
    headerTitle() {
      switch (this.routeName) {
        case "Home":
          return "Добро пожаловать";
        case "Result":
          return "Результат";
        default:
          return "Добро пожаловать";
      }
    },
    routeName() {
      return this.$route.name;
    },
  },
});
</script>
