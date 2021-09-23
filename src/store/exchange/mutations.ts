import { MutationTree } from "vuex";
import { MutationTypes } from "./exchange.types";
import { State } from "./state";
import { getDefinedValuesObject } from "./utils";

export type Mutations<S = State> = {
  [MutationTypes.SET_CHOSEN_DATA](
    state: S,
    payload: { date: string; currency: string }
  ): void;
  [MutationTypes.SET_EXCHANGE_RATE](
    state: S,
    payload: {
      saleRateNB: number;
      purchaseRateNB: number;
      saleRate: number;
      purchaseRate: number;
    }
  ): void;
};

export const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.SET_CHOSEN_DATA](state, { date, currency }) {
    state.chosenDate = date;
    state.chosenCurrency = currency;
  },
  [MutationTypes.SET_EXCHANGE_RATE](
    state,
    payload: {
      saleRateNB: number;
      purchaseRateNB: number;
      saleRate: number;
      purchaseRate: number;
    }
  ) {
    // TODO: проверка на присутствие всех полей?
    state.saleRateNB = getDefinedValuesObject(payload.saleRateNB);
    state.saleRate = getDefinedValuesObject(payload.saleRate);
    state.purchaseRateNB = getDefinedValuesObject(payload.purchaseRateNB);
    state.purchaseRate = getDefinedValuesObject(payload.purchaseRate);
  },
};
