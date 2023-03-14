import NodeCache from "node-cache";

class CacheManager {
  constructor(protected cacheService = new NodeCache()) {}

  public set(key: string, value: any, ttl: number = 60): boolean {
    return this.cacheService.set(key, value, ttl);
  }

  public get(key: string): any {
    return this.cacheService.get(key);
  }

  public del(keys: string | string[]): number {
    return this.cacheService.del(keys);
  }

  public flush(): void {
    return this.cacheService.flushAll();
  }
}

export default new CacheManager();
