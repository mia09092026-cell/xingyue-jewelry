import { describe, expect, it } from "vitest";
import { GET } from "@/app/llms.txt/route";

describe("GET /llms.txt", () => {
  it("returns a stable plain-text response with the published Resources routes", async () => {
    const response = await GET();
    const text = await response.text();

    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toBe(
      "text/plain; charset=utf-8",
    );
    expect(text).toContain("https://xingyuejewelry.com/resources");
    expect(text).toContain(
      "https://xingyuejewelry.com/resources/moissanite-vs-cubic-zirconia",
    );
    expect(text).toContain(
      "https://xingyuejewelry.com/resources/choose-925-sterling-silver-jewelry-manufacturer",
    );
    expect(text).not.toContain("/es/resources");
    expect(text).not.toContain("/ar/resources");
  });
});
