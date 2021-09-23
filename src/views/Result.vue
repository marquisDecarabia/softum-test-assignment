<template>
  <div class="result">
    <div>
      <p>Выбранная валюта: {{ chosenCurrency }}</p>
      <p>Выбранная дата: {{ chosenDate }}</p>
    </div>
    <div class="grid">
      <!--      в случае отсутствия одного из коэффициентов, дополнительных проверок не предусмотрено на данный момент      -->
      <!--      TODO: проверка на присутствие всех коэф-тов?    -->
      <span><strong>Название</strong></span>
      <span><strong>Значение 1</strong></span>
      <span><strong>Значение 2</strong></span>
      <span><strong>Значение 3</strong></span>
      <v-rate-info
        v-if="!!saleRateNB"
        :rate-object="saleRateNB"
        title="saleRateNB"
      />
      <v-rate-info v-if="!!saleRate" :rate-object="saleRate" title="saleRate" />
      <v-rate-info
        v-if="!!purchaseRateNB"
        :rate-object="purchaseRateNB"
        title="purchaseRateNB"
      />
      <v-rate-info
        v-if="!!purchaseRate"
        :rate-object="purchaseRate"
        title="purchaseRate"
      />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapState } from "vuex";
import VRateInfo from "../components/VRateInfo.vue";

export default defineComponent({
  name: "Result",
  components: {
    VRateInfo,
  },
  created() {
    if (!this.isAllSet) this.$router.go(-1);
  },
  computed: {
    ...mapState("exchange", {
      chosenCurrency: "chosenCurrency",
      chosenDate: "chosenDate",
      saleRateNB: "saleRateNB",
      saleRate: "saleRate",
      purchaseRateNB: "purchaseRateNB",
      purchaseRate: "purchaseRate",
    }),
    isAllSet(): boolean {
      return this.chosenCurrency.length > 0 && this.chosenDate.length > 0;
    },
  },
  methods: {
    ...mapActions("exchange", {
      getExchangeRatesByDate: "GET_EXCHANGE_RATES_BY_DATE",
      getExchangeRates: "GET_EXCHANGE_MOCK",
    }),
  },
});
</script>
<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  border-top: 1px solid black;
  border-right: 1px solid black;
}
.grid > span {
  padding: 8px 4px;
  border-left: 1px solid black;
  border-bottom: 1px solid black;
}
</style>
