export type WithId<T extends unknown> = T & {
  id: string;
};