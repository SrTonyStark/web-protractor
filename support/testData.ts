const testData: Map<string, string> = new Map();

export const getAll = (): Map<string, string> => testData;

export const get = (key: string): string => testData.get(key);

export const set = (key: string, value: string | number): void => {
  testData.set(key, value.toString());
};

export const reset = (): void => {
  testData.clear();
};
