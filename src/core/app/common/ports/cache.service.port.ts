export const CACHE_SERVICE_DI_TOKEN = Symbol('CACHE_SERVICE_DI_TOKEN');

export interface CacheService {
  get<T extends string | number = string>(key: string): Promise<T | null>;

  set<T extends string | number = string>(key: string, value: T, ttl?: number): Promise<void>;

  del(key: string): Promise<void>;

  has(key: string): Promise<boolean>;
}
