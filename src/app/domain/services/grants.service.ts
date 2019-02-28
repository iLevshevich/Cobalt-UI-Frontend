export interface IGrantsService {
  copy(grants: any): void;
  isAllow(key: string): boolean;
}

export abstract class GrantsService implements IGrantsService {
  abstract copy(grants: any): void;
  abstract isAllow(key: string): boolean;
}
