import { render, screen } from "@testing-library/react";
import Home from "../page";

jest.mock("@/hooks/useFetchData", () => ({
  useFetchData: jest.fn(),
}));

jest.mock("@/components/Search", () => (props: any) => (
  <div data-testid="search">Search Component</div>
));
jest.mock("@/components/Book", () => (props: any) => (
  <div data-testid="book-component">Book Component</div>
));
jest.mock("@/components/ErrorPage", () => ({ message }: any) => (
  <div data-testid="error-page">{message}</div>
));
jest.mock("@/components/DataNotFound", () => () => (
  <div data-testid="data-not-found">No books found</div>
));

describe("Homepage", () => {
  const useFetchData = require("@/hooks/useFetchData").useFetchData;

  it("renders ErrorPage when there is an error", () => {
    useFetchData.mockReturnValue({
      books: [],
      loading: false,
      errorMessage: "Something went wrong",
    });

    render(<Home />);
    expect(screen.getByTestId("error-page")).toHaveTextContent(
      "Something went wrong"
    );
  });

  it("renders DataNotFound when books is empty and not loading", () => {
    useFetchData.mockReturnValue({
      books: [],
      loading: false,
      errorMessage: null,
    });

    render(<Home />);
    expect(screen.getByTestId("data-not-found")).toBeInTheDocument();
  });

  it("renders BookComponent when books are available", () => {
    useFetchData.mockReturnValue({
      books: [
        { id: "1", volumeInfo: { title: "Book", authors: [], imageLinks: {} } },
      ],
      loading: false,
      errorMessage: null,
    });

    render(<Home />);
    expect(screen.getByTestId("book-component")).toBeInTheDocument();
  });

  it("always renders Search and title", () => {
    useFetchData.mockReturnValue({
      books: [],
      loading: false,
      errorMessage: null,
    });

    render(<Home />);
    expect(screen.getByTestId("search")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Book List App" })
    ).toBeInTheDocument();
  });
});
