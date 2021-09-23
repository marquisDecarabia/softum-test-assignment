<template>
  <div class="date-input">
    <p class="info">Важно!</p>
    <p class="info">
      Дата должна принадлежать промежутку [{{ formattedStartDate }} -
      {{ formattedEndDate }}]
    </p>
    <input
      v-model="chosenDate"
      v-maska="`##.##.####`"
      :placeholder="regTemplate"
      @keyup.enter="onEnter"
      class="date-input__input"
      pattern="\d{2}\.\d{2}\.\d{4}"
      title="Дата должна соответствовать заявленному описаниию"
      type="text"
    />
    <p class="error">{{ errorMessage }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { getFormattedDate } from "../helpers/utils";

export default defineComponent({
  name: "VDateInput",
  props: {
    regTemplate: {
      type: String,
      default: "31.12.1999",
    },
    date: {
      type: String,
      default: "",
    },
    dateStart: {
      type: Date,
      default: new Date(),
    },
    dateEnd: {
      type: Date,
      default: new Date(),
    },
  },
  data() {
    return {
      chosenDate: "",
      errorMessage: "",
      formattedEndDate: "",
      formattedStartDate: "",
    };
  },
  watch: {
    chosenDate(): void {
      this.validateDate();
    },
    errorMessage(): void {
      this.$emit("validate", this.isValid);
      if (this.isValid) this.$emit("success", this.chosenDate);
    },
  },
  computed: {
    isValid(): boolean {
      return this.errorMessage.length === 0 && this.chosenDate.length > 0;
    },
  },
  mounted() {
    this.formattedEndDate = getFormattedDate(this.dateEnd);
    this.formattedStartDate = getFormattedDate(this.dateStart);
  },
  methods: {
    onEnter(): void {
      this.validateDate();
      if (this.isValid) this.$emit("submit");
    },
    validateDate(): void {
      // regExp два числа, точка, два числа, точка, 4 числа
      const dateRegExp = new RegExp(/^\d{2}\.\d{2}\.\d{4}$/gi);

      if (!dateRegExp.test(this.chosenDate)) {
        this.errorMessage = "Несоответствующий формат";
        return;
      }
      // Получаем объект Date из форматированной строки
      const date = new Date(this.chosenDate.split(".").reverse().join("."));

      if (isNaN(date.getTime())) {
        this.errorMessage = "Не валидная дата";
        return;
      }

      if (date.getTime() > this.dateEnd.getTime()) {
        this.errorMessage = `Дата не должна быть позже ${this.formattedEndDate}`;
        return;
      }

      if (date.getTime() <= this.dateStart.getTime()) {
        this.errorMessage = `Дата не должна быть раньше ${this.formattedStartDate}`;
        return;
      }

      this.errorMessage = "";
    },
  },
});
</script>

<style scoped>
.date-input__input {
  border-top: 1px solid #ccc;
  border-left: 1px solid #ccc;
  border-right: 1px solid #eee;
  border-bottom: 1px solid #eee;
  width: 160px;
  height: 21px;
}
.date-input__input:focus {
  outline: 0;
  border-color: black;
}
.error {
  content: "";
  color: red;
  font-size: 0.7rem;
}
.info {
  color: gray;
  margin-top: -0.5rem;
  font-size: 0.6rem;
}
</style>
