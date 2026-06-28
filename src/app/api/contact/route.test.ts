import { describe, expect, it } from "vitest";
import { POST } from "./route";

describe("contact inquiry API route", () => {
  it("accepts a valid contact inquiry submission", async () => {
    const response = await POST(
      new Request("http://localhost:3000/api/contact", {
        method: "POST",
        body: JSON.stringify({
          contactName: "Avery Chen",
          phone: "+1 555 0100",
          companyBrand: "Luna Jewelry",
          projectType: "custom-manufacturing",
          estimatedQuantity: "500 pieces",
          deliveryCity: "New York",
          budgetRange: "usd-10000-30000",
          requirements: "Looking for custom lab-grown diamond necklaces for a boutique launch.",
        }),
      }),
    );

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toMatchObject({
      ok: true,
      message: "Inquiry submitted.",
      reference: expect.stringMatching(/^XY-/),
    });
  });

  it("rejects an incomplete inquiry submission with validation details", async () => {
    const response = await POST(
      new Request("http://localhost:3000/api/contact", {
        method: "POST",
        body: JSON.stringify({ contactName: "Avery Chen" }),
      }),
    );

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toMatchObject({
      ok: false,
      fieldErrors: {
        phone: "Phone / WhatsApp",
        companyBrand: "Company / Brand",
        projectType: "Project Type",
        estimatedQuantity: "Estimated Quantity",
        deliveryCity: "Delivery City",
        budgetRange: "Budget Range",
        requirements: "Requirements",
      },
    });
  });
});
