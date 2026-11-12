import { describe, expect, it } from "vitest";
import { createRateLimiter } from "./rate-limit";

describe("createRateLimiter", () => {
  it("permite hasta el límite y bloquea después", () => {
    const rl = createRateLimiter({ limit: 2, windowMs: 1000 });
    expect([rl.check("a", 0), rl.check("a", 1), rl.check("a", 2)]).toEqual([true, true, false]);
  });
  it("cada visitante cuenta por separado", () => {
    const rl = createRateLimiter({ limit: 1, windowMs: 1000 });
    expect(rl.check("a", 0)).toBe(true);
    expect(rl.check("b", 0)).toBe(true);
  });
  it("libera cuando pasa la ventana", () => {
    const rl = createRateLimiter({ limit: 1, windowMs: 1000 });
    rl.check("a", 0);
    expect(rl.check("a", 500)).toBe(false);
    expect(rl.check("a", 1001)).toBe(true);
  });
});
