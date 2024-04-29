export function maxValue(value1: number, value2: number): number {
  if (value1 < value2) return value2;
  if (value1 > value2) return value1;
  return value1;
}

export function minValue(value1: number, value2: number): number {
  if (value1 < value2) return value1;
  if (value1 > value2) return value2;
  return value1;
}