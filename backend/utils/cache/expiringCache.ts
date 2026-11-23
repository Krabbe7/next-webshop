import type { Cache } from "./type";

export class ExpiringCache<T> {
  private entries = new Map<string, Cache<T>>();
  private pendingLoads = new Map<string, Promise<T>>();

  constructor(
    private lifetimeMs: number,
    private maxEntries: number,
  ) {}

  async getOrLoad(key: string, load: () => Promise<T>): Promise<T> {
    const cached = this.entries.get(key);

    if (cached && cached.expiresAt > Date.now()) {
      this.entries.delete(key);
      this.entries.set(key, cached);
      return cached.value;
    }

    if (cached) this.entries.delete(key);

    const pending = this.pendingLoads.get(key);
    if (pending) return pending;

    const promise = load()
      .then((value) => {
        this.entries.set(key, {
          value,
          expiresAt: Date.now() + this.lifetimeMs,
        });

        while (this.entries.size > this.maxEntries) {
          const oldest = this.entries.keys().next().value;
          if (oldest === undefined) break;
          this.entries.delete(oldest);
        }

        return value;
      })
      .finally(() => {
        this.pendingLoads.delete(key);
      });

    this.pendingLoads.set(key, promise);

    return promise;
  }
}
