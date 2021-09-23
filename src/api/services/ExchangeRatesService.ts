import { ServiceBase } from "../core";
import {
  ExchangeArchive,
  ResponseErrorHandler,
  ResponseSuccessHandler,
} from "../types";

export class ExchangeRatesService extends ServiceBase {
  static getExchangeByDate(
    date: string,
    onSuccess: ResponseSuccessHandler<ExchangeArchive>,
    onError?: ResponseErrorHandler
  ): Promise<void> {
    return ServiceBase.callApi(
      ServiceBase.GetConfig("GET"),
      `/exchange_rates?json&date=${date}`,
      onSuccess,
      onError
    );
  }
}
