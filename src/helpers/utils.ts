import { Handlers } from "./handlers";

export function calcSumOfDigitsInNumber(number: number): number {
  isFiniteNumber(number);

  // convert number to string, filter by regexp (get all digits in range [1-9])
  const digitsArray = number.toString(10).match(/[1-9]/g);

  // all digits was zero, cause null case was cutted by the test above
  if (!digitsArray) return 0;

  return digitsArray.reduce((a, b) => Number(a) + Number(b), 0);
}

// Only for ints
export function isEvenSimple(number: number): boolean {
  isFiniteNumber(number);

  return Math.trunc(number) % 2 === 0;
}

export function isFiniteNumber(number: number): boolean {
  if (!Number.isFinite(number)) {
    Handlers.defaultErrorHandler("Agrument must be finite number");
    throw Error("Agrument must be finite number");
  }
  return true;
}

// DD.MM.YYYY
export function getFormattedDate(date: Date): string {
  const day = date.getUTCDate();
  const month = date.getUTCMonth() + 1;
  const year = date.getUTCFullYear();
  const dayStr = day > 9 ? day : `0${day}`;
  const monthStr = month > 9 ? month : `0${month}`;
  return `${dayStr}.${monthStr}.${year}`;
}
