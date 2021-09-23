export interface ResponseSuccessHandler<T> {
  (data: T): void;
}

export interface ResponseErrorHandler {
  (message: string): void;
}

export type ExchangeArchive = {
  date: string;
  bank: string;
  baseCurrency: number;
  baseCurrencyLit: string;
  exchangeRate: Array<ExchangeRateForCurrency>;
};

export type ExchangeRateForCurrency = {
  baseCurrency: string;
  saleRateNB: number;
  purchaseRateNB: number;
  currency?: string;
  saleRate?: number;
  purchaseRate?: number;
};
