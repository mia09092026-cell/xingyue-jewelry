import { render, screen } from "@testing-library/react";
import Home from "./page";

describe("XINGYUE homepage", () => {
  it("renders the required bilingual jewelry homepage sections", () => {
    render(<Home />);

    expect(screen.getAllByText(/XINGYUE/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/星悦/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Moissanite/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Lab-grown Diamond/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/S925 Silver/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/K Gold Custom/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Certificates/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/IGI/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/xingyuejewelry.com/i).length).toBeGreaterThan(0);
  });
});
