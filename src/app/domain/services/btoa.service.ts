export interface IBtoaService {
  set(btoa: string): void;
  get(): string;
  isEmpty(): boolean;
  clean(): void;
}

export abstract class BtoaService implements IBtoaService {
  abstract set(btoa: string): void;
  abstract get(): string;
  abstract isEmpty(): boolean;
  abstract clean(): void;
}

