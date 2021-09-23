import { createLogger, createStore } from "vuex";
import exchange from "./exchange";

export default createStore({
  strict: true,
  plugins: process.env.NODE_ENV === "development" ? [createLogger()] : [],
  modules: {
    exchange,
  },
});
