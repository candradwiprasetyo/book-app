import { render, screen } from "@testing-library/react";
import Home from "../page";
import { useFetchData as mockUseFetchData } from "@/hooks/useFetchData";

jest.mock("@/hooks/useFetchData", () => ({
  useFetchData: jest.fn(),
}));

jest.mock("@/components/Search", () => {
  const MockSearch = () => <div data-testid="search">Search Component</div>;
  MockSearch.displayName = "MockSearch";
  return MockSearch;
});

jest.mock("@/components/Book", () => {
  const MockBook = () => <div data-testid="book-component">Book Component</div>;
  MockBook.displayName = "MockBook";
  return MockBook;
});

jest.mock("@/components/ErrorPage", () => {
  const MockErrorPage = ({ message }: { message: string }) => (
    <div data-testid="error-page">{message}</div>
  );
  MockErrorPage.displayName = "MockErrorPage";
  return MockErrorPage;
});

jest.mock("@/components/DataNotFound", () => {
  const MockNotFound = () => (
    <div data-testid="data-not-found">No books found</div>
  );
  MockNotFound.displayName = "MockNotFound";
  return MockNotFound;
});

describe("Homepage", () => {
  it("renders ErrorPage when there is an error", () => {
    (mockUseFetchData as jest.Mock).mockReturnValue({
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
    (mockUseFetchData as jest.Mock).mockReturnValue({
      books: [],
      loading: false,
      errorMessage: null,
    });

    render(<Home />);
    expect(screen.getByTestId("data-not-found")).toBeInTheDocument();
  });

  it("renders BookComponent when books are available", () => {
    (mockUseFetchData as jest.Mock).mockReturnValue({
      books: [
        {
          id: "1",
          volumeInfo: { title: "Book", authors: [], imageLinks: {} },
        },
      ],
      loading: false,
      errorMessage: null,
    });

    render(<Home />);
    expect(screen.getByTestId("book-component")).toBeInTheDocument();
  });

  it("always renders Search and title", () => {
    (mockUseFetchData as jest.Mock).mockReturnValue({
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
