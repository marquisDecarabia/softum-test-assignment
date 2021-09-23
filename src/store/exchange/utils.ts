import { calcSumOfDigitsInNumber, isEvenSimple } from "../../helpers/utils";
import { ParsedRate } from "./state";

export function getDefinedValuesObject(number: number): ParsedRate {
  const sum = calcSumOfDigitsInNumber(number);
  const isEven = isEvenSimple(sum);
  return {
    value: number,
    sumOfDigits: sum,
    isSumEven: isEven,
  };
}
