<template>
  <div class="home">
    <v-header :text="headerText" />
    <v-modal
      :isShow="showModal"
      :error="serverErrorText"
      @onClose="handleModalClose"
    >
      <template #header>
        {{ modalHeaderText }}
      </template>
      <template #body>
        <v-select
          v-model="selectedCurrency"
          :list="currenciesList"
          :error-text="currencyError"
          title-text="Выберите валюту"
        />
        <p>Введите дату</p>
        <v-date-input
          :date-start="dateStart"
          :date-end="dateEnd"
          @validate="(isValid) => (this.isDateValid = isValid)"
          @success="(chosenDate) => (this.selectedDate = chosenDate)"
          @submit="onSubmit"
        />
      </template>
      <template #footer>
        <button
          :disabled="!isButtonActive"
          @click="handleModalSubmit"
          type="button"
        >
          Проверить
        </button>
      </template>
    </v-modal>
    <button @click="handleModalShow" type="button">Выберите дату</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapState } from "vuex";
import VHeader from "../components/VHeader.vue";
import VModal from "../components/VModal.vue";
import VDateInput from "../components/VDateInput.vue";
import VSelect from "../components/VSelect.vue";

export default defineComponent({
  name: "Home",
  components: {
    VSelect,
    VHeader,
    VDateInput,
    VModal,
  },
  data() {
    return {
      // date section start
      selectedDate: "",
      dateStart: new Date(),
      dateEnd: new Date(),
      isDateValid: false,
      //========================
      // currency section start
      currencyError: "",
      selectedCurrency: "",
      // ======================
      // view section start
      headerText: "Добро пожаловать",
      showModal: false,
      modalHeaderText: "Пожалуйста, выберите дату и валюту",
      serverErrorText: "",
    };
  },
  mounted() {
    // В случае если пользователь зашел на страницу раньше, чем появилась статистика за этот день, ставим предыдущий день как последний возможный для выбора.
    if (this.dateEnd.getUTCHours() < 10) {
      const time = this.dateEnd.getTime() - 86400000;
      this.dateEnd = new Date(time);
    }
    // Обозначаю границы времени в максимальной дате для последующего сравнения
    this.dateEnd.setUTCHours(23, 59, 59, 999);
    // Обозначаю минимальную границу (сегодняшний день - 2 года)
    this.dateStart.setUTCFullYear(this.dateStart.getUTCFullYear() - 2);
    // Обозначаю границы времени в минимальной дате для последующего сравнения
    this.dateStart.setUTCHours(0, 0, 0, 0);
  },
  watch: {
    selectedCurrency(): void {
      this.currencyError = "";
    },
  },
  computed: {
    ...mapState("exchange", {
      currenciesList: "currenciesList",
    }),
    isButtonActive(): boolean {
      return this.isDateValid && this.selectedCurrency.length > 0;
    },
  },
  methods: {
    ...mapActions("exchange", {
      getExchangeRatesByDate: "GET_EXCHANGE_RATES_BY_DATE",
      getExchangeRatesMock: "GET_EXCHANGE_MOCK",
    }),
    async onSubmit(): Promise<void> {
      if (!this.selectedCurrency) {
        this.currencyError = "Необходимо выбрать валюту";
        return;
      }
      await this.getRatesByDate();
    },
    async handleModalSubmit(): Promise<void> {
      await this.getRatesByDate();
    },
    handleModalClose(): void {
      this.showModal = false;
    },
    handleModalShow(): void {
      this.showModal = true;
    },
    async getRatesByDate(): Promise<void> {
      const request = {
        date: this.selectedDate,
        currency: this.selectedCurrency,
      };
      if (process.env.VUE_APP_MOCK_ENABLED === "true")
        await this.getExchangeRatesMock(request);
      else {
        try {
          await this.getExchangeRatesByDate(request);
        } catch (e) {
          this.serverErrorText = "Ошибка сервера";
          return;
        }
      }

      await this.$router.push("/result");
    },
  },
});
</script>
