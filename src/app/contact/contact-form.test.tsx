import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import ContactPage from "./page";

describe("Contact inquiry page form", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  function fillRequiredInquiryFields() {
    fireEvent.change(screen.getByLabelText("Name"), {
      target: { value: "Avery Chen" },
    });
    fireEvent.change(screen.getByLabelText("Company"), {
      target: { value: "Luna Jewelry" },
    });
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "avery@example.com" },
    });
    fireEvent.change(screen.getByLabelText("WhatsApp / Phone"), {
      target: { value: "+1 555 0100" },
    });
    fireEvent.change(screen.getByLabelText("Country"), {
      target: { value: "United States" },
    });
    fireEvent.change(screen.getByLabelText("Product Interest"), {
      target: { value: "Lab-grown diamond tennis bracelets" },
    });
    fireEvent.change(screen.getByLabelText("Quantity"), {
      target: { value: "500 pieces" },
    });
    fireEvent.change(screen.getByLabelText("Custom Requirement"), {
      target: { value: "Private label packaging" },
    });
    fireEvent.change(screen.getByLabelText("Message"), {
      target: {
        value: "Looking for custom lab-grown diamond necklaces for a boutique launch.",
      },
    });
  }

  it("renders the requested wholesale inquiry fields", () => {
    render(<ContactPage />);

    for (const label of [
      "Name",
      "Company",
      "Email",
      "WhatsApp / Phone",
      "Country",
      "Product Interest",
      "Quantity",
      "Custom Requirement",
      "Message",
    ]) {
      expect(screen.getByLabelText(label)).toBeInTheDocument();
    }

    expect(screen.getByRole("button", { name: /Submit Inquiry/i })).toBeInTheDocument();
    expect(document.querySelector('input[name="website"]')).toHaveAttribute("tabindex", "-1");
  });

  it("submits the inquiry details with page metadata and shows the localized success message", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        ok: true,
        reference: "XY-20260628-AB12",
      }),
    });
    vi.stubGlobal("fetch", fetchMock);

    render(<ContactPage />);

    fireEvent.change(screen.getByLabelText("Name"), {
      target: { value: "Avery Chen" },
    });
    fireEvent.change(screen.getByLabelText("Company"), {
      target: { value: "Luna Jewelry" },
    });
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "avery@example.com" },
    });
    fireEvent.change(screen.getByLabelText("WhatsApp / Phone"), {
      target: { value: "+1 555 0100" },
    });
    fireEvent.change(screen.getByLabelText("Country"), {
      target: { value: "United States" },
    });
    fireEvent.change(screen.getByLabelText("Product Interest"), {
      target: { value: "Lab-grown diamond tennis bracelets" },
    });
    fireEvent.change(screen.getByLabelText("Quantity"), {
      target: { value: "500 pieces" },
    });
    fireEvent.change(screen.getByLabelText("Custom Requirement"), {
      target: { value: "Private label packaging" },
    });
    fireEvent.change(screen.getByLabelText("Message"), {
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
          body: expect.stringContaining("\"name\":\"Avery Chen\""),
        }),
      );
      expect(fetchMock.mock.calls[0][1].body).toEqual(expect.stringContaining("\"locale\":\"en\""));
      expect(fetchMock.mock.calls[0][1].body).toEqual(expect.stringContaining("\"sourcePage\":\"/contact\""));
      expect(fetchMock.mock.calls[0][1].body).toEqual(expect.stringContaining("\"browserInfo\":"));
    });

    expect(
      await screen.findByText("Thank you. We have received your inquiry and will contact you within 24 hours."),
    ).toBeInTheDocument();
    expect(screen.getByText(/XY-20260628-AB12/i)).toBeInTheDocument();
  });

  it("keeps entered values when submission fails", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: false,
      json: async () => ({
        ok: false,
        message: "Submission failed.",
      }),
    });
    vi.stubGlobal("fetch", fetchMock);

    render(<ContactPage />);
    fillRequiredInquiryFields();

    fireEvent.click(screen.getByRole("button", { name: /Submit Inquiry/i }));

    expect(
      await screen.findByText("Submission failed. Please contact us by WhatsApp or email."),
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Name")).toHaveValue("Avery Chen");
    expect(screen.getByLabelText("Email")).toHaveValue("avery@example.com");
  });

  it("shows a loading state while the inquiry is submitting", async () => {
    let resolveFetch: (value: unknown) => void = () => {};
    const pendingFetch = new Promise((resolve) => {
      resolveFetch = resolve;
    });
    vi.stubGlobal("fetch", vi.fn(() => pendingFetch));

    render(<ContactPage />);
    fillRequiredInquiryFields();
    fireEvent.click(screen.getByRole("button", { name: /Submit Inquiry/i }));

    expect(screen.getByRole("button", { name: /Submitting/i })).toBeDisabled();

    resolveFetch({
      ok: false,
      json: async () => ({ ok: false }),
    });
  });
});
