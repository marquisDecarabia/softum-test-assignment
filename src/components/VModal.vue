<template>
  <div>
    <div v-if="isShow" :class="{ show: isShow, modal: true }">
      <div class="modal__dialog">
        <button
          @click="onClose"
          aria-label="Close"
          class="modal__close"
          type="button"
        >
          X
        </button>
        <div class="modal__header">
          <slot name="header" />
        </div>
        <div class="modal__body">
          <slot name="body" />
        </div>
        <div class="modal__footer">
          <p v-if="error" style="color: red; font-size: 0.7em">{{ error }}</p>
          <slot name="footer" />
        </div>
      </div>
    </div>
    <div class="modal-background" :class="{ show: isShow }" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "VModal",
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
    error: {
      type: String,
      default: "",
    },
  },
  methods: {
    onClose(): void {
      this.$emit("onClose");
    },
  },
});
</script>

<style scoped>
.modal {
  display: none;
  z-index: 1111;
  position: fixed;
  overflow: hidden;
  height: 100%;
  width: 100%;
  outline: 0;
  left: 0;
  top: 0;
}
.modal.show {
  display: flex;
  align-items: center;
}
.modal__close {
  box-sizing: content-box;
  width: 1em;
  height: 1em;
  padding: 0.25em 0.25em;
  color: #000;
  border: 0;
  border-radius: 1rem;
  opacity: 0.5;
  position: absolute;
  right: 1rem;
  top: 1rem;
  z-index: 1;
  cursor: pointer;
}
.modal__close:focus {
  outline: none;
}
.modal__close:hover {
  opacity: 0.9;
}
.modal__dialog {
  max-width: 600px;
  width: 100%;
  margin: 0 auto;
  padding: 0 1rem;
  border-radius: 0.3rem;
  background-color: #ffffff;
  overflow: hidden;
  position: relative;
}
.modal__header {
  padding: 1rem 3rem 1rem 1rem;
  margin-left: -1rem;
  margin-right: -1rem;
  text-align: center;
  font-size: 1.2rem;
  border-bottom: 1px solid black;
}
.modal__body {
  display: flex;
  flex-direction: column;
  padding: 1rem 0;
  text-align: center;
  margin-left: -1rem;
  margin-right: -1rem;
  flex-wrap: wrap;
}
.modal__footer {
  justify-content: center;
  padding: 1rem;
  margin-left: -1rem;
  margin-right: -1rem;
}
.modal-background {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1040;
  width: 100vw;
  height: 100vh;
  background-color: #000000;
  opacity: 0;
  display: none;
}
.modal-background.show {
  opacity: 0.33;
  display: block;
}
</style>
