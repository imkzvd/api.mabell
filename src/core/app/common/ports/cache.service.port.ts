export const CACHE_SERVICE_DI_TOKEN = Symbol('CACHE_SERVICE_DI_TOKEN');

export interface CacheService {
  get<T>(key: string): Promise<T | null>;

  set<T>(key: string, value: T, ttlSeconds?: number): Promise<void>;

  del(key: string): Promise<void>;

  has(key: string): Promise<boolean>;
}
