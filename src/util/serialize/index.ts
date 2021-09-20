import './cycle';

export interface Serializable<T> {
  serialize(optional?: boolean): T;
}

export abstract class Serializable<T> {
  public serialize(optional?: boolean): T {
    return JSON.decycle(this as unknown as Record<string, unknown>) as T;
  }
}
