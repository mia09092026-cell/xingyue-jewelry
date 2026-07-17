import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import ContactPage from "./page";

function fillRequiredInquiryFields() {
  fireEvent.change(screen.getByLabelText("Name"), { target: { value: "Avery Chen" } });
  fireEvent.change(screen.getByLabelText("Company"), { target: { value: "Luna Jewelry" } });
  fireEvent.change(screen.getByLabelText("Email"), { target: { value: "avery@example.com" } });
  fireEvent.change(screen.getByLabelText("WhatsApp / Phone"), { target: { value: "+1 555 0100" } });
  fireEvent.change(screen.getByLabelText("Business Type"), { target: { value: "Boutique store" } });
  fireEvent.change(screen.getByLabelText("Product Interest"), { target: { value: "Tennis jewelry" } });
  fireEvent.change(screen.getByLabelText("Target Quantity or Range"), { target: { value: "Project estimate" } });
  fireEvent.change(screen.getByLabelText("Country"), { target: { value: "United States" } });
  fireEvent.change(screen.getByLabelText("Reference Image / Design"), { target: { value: "https://example.com/reference" } });
  fireEvent.change(screen.getByLabelText("Message"), { target: { value: "Looking for a project discussion." } });
  fireEvent.click(screen.getByRole("checkbox", { name: /agree that Xingyue/i }));
}

describe("Contact inquiry page form", () => {
  beforeEach(() => vi.restoreAllMocks());

  it("renders the approved inquiry fields and consent control", () => {
    render(<ContactPage />);
    for (const label of ["Name", "Company", "Email", "WhatsApp / Phone", "Business Type", "Product Interest", "Target Quantity or Range", "Country", "Reference Image / Design", "Message"]) {
      expect(screen.getByLabelText(label)).toBeInTheDocument();
    }
    expect(screen.getByRole("checkbox", { name: /agree that Xingyue/i })).not.toBeChecked();
    expect(screen.getByRole("button", { name: /Submit Inquiry/i })).toBeInTheDocument();
    expect(document.querySelector('input[name="website"]')).toHaveAttribute("tabindex", "-1");
  });

  it("submits explicit payload fields and shows a success response", async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ ok: true, reference: "XY-20260628-AB12" }) });
    vi.stubGlobal("fetch", fetchMock);
    render(<ContactPage />);
    fillRequiredInquiryFields();
    fireEvent.click(screen.getByRole("button", { name: /Submit Inquiry/i }));
    await waitFor(() => expect(fetchMock).toHaveBeenCalled());
    const body = JSON.parse(fetchMock.mock.calls[0][1].body as string);
    expect(body).toMatchObject({ name: "Avery Chen", email: "avery@example.com", businessType: "Boutique store", consent: true, honeypot: "" });
    expect(body).not.toHaveProperty("browserInfo");
    expect(await screen.findByText("Your inquiry has been received. We'll review the project details and respond as soon as possible.")).toBeInTheDocument();
    expect(screen.getByText(/XY-20260628-AB12/i)).toBeInTheDocument();
  });

  it("keeps entered values and exposes server field errors", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false, json: async () => ({ ok: false, code: "VALIDATION_ERROR", fieldErrors: { email: "invalid_email" } }) }));
    render(<ContactPage />);
    fillRequiredInquiryFields();
    fireEvent.click(screen.getByRole("button", { name: /Submit Inquiry/i }));
    expect(await screen.findByText("Please enter a valid email address.")).toBeInTheDocument();
    expect(screen.getByLabelText("Name")).toHaveValue("Avery Chen");
    expect(screen.getByLabelText("Email")).toHaveAttribute("aria-invalid", "true");
  });
});
