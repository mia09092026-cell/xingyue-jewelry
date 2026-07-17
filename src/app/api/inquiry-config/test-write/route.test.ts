import { describe, expect, it } from "vitest";
import { POST } from "./route";

describe("inquiry config test-write API", () => {
  it("is disabled so tests cannot write production Sheets rows", async () => {
    const response = await POST(new Request("https://example.com/api/inquiry-config/test-write", { method: "POST" }));
    expect(response.status).toBe(404);
    await expect(response.json()).resolves.toEqual({ ok: false, success: false, message: "Not found." });
  });
});
