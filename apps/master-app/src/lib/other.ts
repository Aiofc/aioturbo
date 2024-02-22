export function toBoolean(num: number): boolean {
  return num > 0;
}

export function toNumber(bol: boolean): number {
  if (bol) return 1;
  else return 0;
}
