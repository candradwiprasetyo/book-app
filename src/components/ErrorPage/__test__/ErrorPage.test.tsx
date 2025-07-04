import { render, screen } from "@testing-library/react";
import ErrorPage from "@/components/ErrorPage";

describe("ErrorPage Component", () => {
  it("It should display the provided error message", () => {
    const errorMessage =
      "Our librarian is taking a short break. Refresh the page and lets find more books to explore";

    render(<ErrorPage message={errorMessage} />);
    const errorElement = screen.getByText(errorMessage);
    expect(errorElement).toBeInTheDocument();
  });

  it("It should apply the correct class name", () => {
    const errorMessage = "Failed to load data.";
    const { container } = render(<ErrorPage message={errorMessage} />);
    expect(container.firstChild).toHaveClass("errorPage");
  });
});
