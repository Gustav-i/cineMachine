export const average = (arr: number[]): number =>
  arr.length === 0 ? 0 : arr.reduce((acc, cur) => acc + cur, 0) / arr.length
