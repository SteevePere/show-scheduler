import { plainToClass } from 'class-transformer';

export declare type ClassConstructor<T> = {
  new (...args: unknown[]): T;
};

export function createFromClass<T>(cls: ClassConstructor<T>, plain: T): T {
  return plainToClass(cls, plain);
}
