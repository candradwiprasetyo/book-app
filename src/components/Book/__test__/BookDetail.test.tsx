import { render, screen } from "@testing-library/react";
import BookDetail from "../BookDetail";
import { mockBook } from "@/__mocks__/bookMock";

jest.mock("react-star-ratings", () => {
  return function MockStarRatings({ rating }: { rating: number }) {
    return <div data-testid="star-rating">Rating: {rating}</div>;
  };
});

describe("BookDetail", () => {
  it("should render book title", () => {
    render(<BookDetail book={mockBook} />);
    expect(screen.getByText("Candra books")).toBeInTheDocument();
  });

  it("should render authors joined by comma", () => {
    render(<BookDetail book={mockBook} />);
    expect(screen.getByText("author 1, author 2")).toBeInTheDocument();
  });

  it("should render star rating component with correct rating", () => {
    render(<BookDetail book={mockBook} />);
    expect(screen.getByTestId("star-rating")).toHaveTextContent("Rating: 4.5");
  });
});
