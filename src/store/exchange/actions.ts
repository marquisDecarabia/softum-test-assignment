import { ActionTree, Commit } from "vuex";
import { State } from "./state";
import { ActionTypes, MutationTypes } from "./exchange.types";
import { ExchangeRatesService } from "../../api/services/ExchangeRatesService";
import { responseExamples } from "../../mock/response";

export interface Actions {
  [ActionTypes.GET_EXCHANGE_RATES_BY_DATE](
    { commit }: { commit: Commit },
    payload: { date: string; currency: string }
  ): Promise<void>;
  [ActionTypes.GET_EXCHANGE_MOCK](
    { commit }: { commit: Commit },
    payload: { date: string; currency: string }
  ): Promise<void>;
}

export const actions: ActionTree<State, State> & Actions = {
  // For mock data
  async [ActionTypes.GET_EXCHANGE_MOCK]({ commit }, { date, currency }) {
    commit(MutationTypes.SET_CHOSEN_DATA, { date, currency });
    if (!Object.prototype.hasOwnProperty.call(responseExamples, date)) return;
    const response = responseExamples[date];

    const result = response.exchangeRate.find(
      (rate) => (rate?.currency || null) === currency
    );

    if (!result) return;

    commit(MutationTypes.SET_EXCHANGE_RATE, result);
  },
  //
  //====================================================================
  // For real usage
  async [ActionTypes.GET_EXCHANGE_RATES_BY_DATE](
    { commit },
    { date, currency }
  ) {
    commit(MutationTypes.SET_CHOSEN_DATA, { date, currency });
    await ExchangeRatesService.getExchangeByDate(date, (data) => {
      const result = data.exchangeRate.find(
        (rate) => (rate?.currency || null) === currency
      );
      if (!result) return;
      commit(MutationTypes.SET_EXCHANGE_RATE, result);
    });
  },
};
