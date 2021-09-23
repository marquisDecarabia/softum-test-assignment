export const state: ExchangeState = {
  // Static
  currenciesList: ["USD", "EUR", "RUB", "PLN", "GBP"],
  // User selected
  chosenDate: "",
  chosenCurrency: "",
  // Parsed response
  saleRateNB: null,
  purchaseRateNB: null,
  saleRate: null,
  purchaseRate: null,
};

export type ParsedRate = {
  value: number;
  sumOfDigits: number;
  isSumEven: boolean;
};

type ExchangeState = {
  // Static
  currenciesList: Array<string>;
  // User selected
  chosenDate: string;
  chosenCurrency: string;
  // Parsed response
  saleRateNB: ParsedRate | null;
  purchaseRateNB: ParsedRate | null;
  saleRate: ParsedRate | null;
  purchaseRate: ParsedRate | null;
};

export type State = typeof state;
