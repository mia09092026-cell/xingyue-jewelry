import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import ContactPage from "./page";

describe("Contact inquiry page form", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("renders the requested wholesale inquiry fields", () => {
    render(<ContactPage />);

    for (const label of [
      "Contact Person",
      "Phone / WhatsApp",
      "Company / Brand",
      "Project Type",
      "Estimated Quantity",
      "Delivery City",
      "Budget Range",
      "Requirements",
    ]) {
      expect(screen.getByLabelText(label)).toBeInTheDocument();
    }

    expect(screen.getByRole("button", { name: /Submit Inquiry/i })).toBeInTheDocument();
  });

  it("submits the inquiry details and shows the returned reference", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        ok: true,
        message: "Inquiry submitted.",
        reference: "XY-20260628-AB12",
      }),
    });
    vi.stubGlobal("fetch", fetchMock);

    render(<ContactPage />);

    fireEvent.change(screen.getByLabelText("Contact Person"), {
      target: { value: "Avery Chen" },
    });
    fireEvent.change(screen.getByLabelText("Phone / WhatsApp"), {
      target: { value: "+1 555 0100" },
    });
    fireEvent.change(screen.getByLabelText("Company / Brand"), {
      target: { value: "Luna Jewelry" },
    });
    fireEvent.change(screen.getByLabelText("Project Type"), {
      target: { value: "custom-manufacturing" },
    });
    fireEvent.change(screen.getByLabelText("Estimated Quantity"), {
      target: { value: "500 pieces" },
    });
    fireEvent.change(screen.getByLabelText("Delivery City"), {
      target: { value: "New York" },
    });
    fireEvent.change(screen.getByLabelText("Budget Range"), {
      target: { value: "usd-10000-30000" },
    });
    fireEvent.change(screen.getByLabelText("Requirements"), {
      target: {
        value: "Looking for custom lab-grown diamond necklaces for a boutique launch.",
      },
    });

    fireEvent.click(screen.getByRole("button", { name: /Submit Inquiry/i }));

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledWith(
        "/api/contact",
        expect.objectContaining({
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: expect.stringContaining("\"contactName\":\"Avery Chen\""),
        }),
      );
    });

    expect(await screen.findByText(/Inquiry submitted/i)).toBeInTheDocument();
    expect(screen.getByText(/XY-20260628-AB12/i)).toBeInTheDocument();
  });
});
