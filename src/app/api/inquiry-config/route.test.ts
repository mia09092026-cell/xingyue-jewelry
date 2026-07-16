import { describe, expect, it } from "vitest";
import { GET } from "./route";

describe("inquiry config API", () => {
  it("does not expose configuration status or environment metadata", async () => {
    const response = await GET();
    expect(response.status).toBe(404);
    await expect(response.json()).resolves.toEqual({ ok: false, message: "Not found." });
  });
});
