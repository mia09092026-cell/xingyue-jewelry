import { describe, expect, it } from "vitest";
import { GET, POST } from "./route";

describe("contact health API", () => {
  it("returns a non-writing liveness response", async () => {
    const response = await GET(new Request("https://example.com/api/contact/health"));
    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({ status: "ok" });
  });

  it("does not allow health endpoint writes", async () => {
    const response = await POST(new Request("https://example.com/api/contact/health", { method: "POST" }));
    expect(response.status).toBe(405);
    expect(response.headers.get("allow")).toBe("GET");
  });
});
