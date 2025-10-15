// Safe array utilities to prevent undefined errors

export function safeSlice<T>(array: T[] | undefined | null, start?: number, end?: number): T[] {
  if (!array) return [];
  return array.slice(start, end);
}

export function safeMap<T, U>(array: T[] | undefined | null, callback: (item: T, index: number) => U): U[] {
  if (!array) return [];
  return array.map(callback);
}

export function safeFilter<T>(array: T[] | undefined | null, callback: (item: T, index: number) => boolean): T[] {
  if (!array) return [];
  return array.filter(callback);
}

export function safeFind<T>(array: T[] | undefined | null, callback: (item: T, index: number) => boolean): T | undefined {
  if (!array) return undefined;
  return array.find(callback);
}
