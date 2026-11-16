import { afterEach, describe, expect, it } from "vitest";
import { chatProvider } from "./env";

const keys = ["CHAT_ENABLED", "CHAT_PROVIDER", "ANTHROPIC_API_KEY", "GEMINI_API_KEY", "GOOGLE_API_KEY", "GEMINI_MODEL"] as const;
const clear = () => keys.forEach((k) => delete process.env[k]);
afterEach(clear);

describe("chatProvider", () => {
  it("apagado sin claves", () => {
    clear();
    expect(chatProvider()).toBeNull();
  });
  it("Google necesita clave Y modelo", () => {
    clear();
    process.env.GEMINI_API_KEY = "k";
    expect(chatProvider()).toBeNull();
    process.env.GEMINI_MODEL = "m";
    expect(chatProvider()).toBe("gemini");
  });
  it("acepta GOOGLE_API_KEY como clave", () => {
    clear();
    process.env.GOOGLE_API_KEY = "k";
    process.env.GEMINI_MODEL = "m";
    expect(chatProvider()).toBe("gemini");
  });
  it("con ambas claves gana Claude, salvo que se fuerce Google", () => {
    clear();
    Object.assign(process.env, { GEMINI_API_KEY: "k", GEMINI_MODEL: "m", ANTHROPIC_API_KEY: "a" });
    expect(chatProvider()).toBe("anthropic");
    process.env.CHAT_PROVIDER = "gemini";
    expect(chatProvider()).toBe("gemini");
  });
  it("CHAT_ENABLED=false lo apaga", () => {
    clear();
    Object.assign(process.env, { GEMINI_API_KEY: "k", GEMINI_MODEL: "m", CHAT_ENABLED: "false" });
    expect(chatProvider()).toBeNull();
  });
});
