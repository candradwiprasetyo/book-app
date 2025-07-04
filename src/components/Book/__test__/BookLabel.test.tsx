import { render, screen } from "@testing-library/react";
import BookLabel from "../BookLabel";

describe("BookLabel", () => {
  it("should render the formatted date correctly", () => {
    render(<BookLabel publishedDate="2025-01-13" />);
    const badge = screen.getByRole("status", { name: /new/i });
    expect(badge).toHaveTextContent("13 Jan 2025");
  });

  it("should render nothing when no date is provided", () => {
    render(<BookLabel />);
    const badge = screen.getByRole("status", { name: /new/i });
    expect(badge).toHaveTextContent("");
  });

  it("should render nothing when invalid date is provided", () => {
    render(<BookLabel publishedDate="invalid-date" />);
    const badge = screen.getByRole("status", { name: /new/i });
    expect(badge).toHaveTextContent("");
  });
});
