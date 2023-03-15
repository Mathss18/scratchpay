import cacheManager from "./cache-manager";

describe("Cache Manager Test", () => {
  it("should set a value in the cache", () => {
    expect(cacheManager.set("foo", "bar")).toBeTruthy();
  });

  it("should get a value from the cache", () => {
    expect(cacheManager.get("foo")).toBe("bar");
  });

  it("should delete a value from the cache by key", () => {
    expect(cacheManager.set("lorem", "ipsum")).toBeTruthy();
    expect(cacheManager.del("lorem")).toBe(1);
    expect(cacheManager.get("lorem")).toBe(undefined);
  });

  it("should flush all values from the cache", () => {
    expect(cacheManager.set("foo", "bar")).toBeTruthy();
    expect(cacheManager.set("lorem", "ipsum")).toBeTruthy();
    expect(cacheManager.set("matheus", "filho")).toBeTruthy();

    cacheManager.flush();

    expect(cacheManager.get("foo")).toBe(undefined);
    expect(cacheManager.get("lorem")).toBe(undefined);
    expect(cacheManager.get("matheus")).toBe(undefined);
  });
});
