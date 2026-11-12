/**
 * Límite de uso en memoria (ventana deslizante). Sirve para frenar abuso y controlar costo.
 * Limitación: cada instancia del servidor lleva su propia cuenta (en hosting sin servidor es
 * "mejor esfuerzo"). Para un tope estricto, añadir un almacén compartido o el firewall del hosting.
 */
export type RateLimiter = { check(key: string, now?: number): boolean };

export function createRateLimiter({ limit, windowMs, maxKeys = 5000 }: { limit: number; windowMs: number; maxKeys?: number }): RateLimiter {
  const hits = new Map<string, number[]>();
  return {
    check(key, now = Date.now()) {
      const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
      if (recent.length >= limit) {
        hits.set(key, recent);
        return false;
      }
      recent.push(now);
      hits.set(key, recent);
      if (hits.size > maxKeys) {
        for (const [k, v] of hits) if (v.every((t) => now - t >= windowMs)) hits.delete(k);
      }
      return true;
    },
  };
}
