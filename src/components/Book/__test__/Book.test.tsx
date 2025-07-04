import { render, screen, waitFor } from "@testing-library/react";
import BookComponent from "../index";
import { mockBook } from "@/__mocks__/bookMock";
import { act } from "react";

// ✅ Jest mocks tanpa pakai variable reference
jest.mock("../BookDetail", () => ({
  __esModule: true,
  default: () => {
    const Component = () => <div data-testid="book-detail" />;
    Component.displayName = "MockBookDetail";
    return <Component />;
  },
}));

jest.mock("../BookLabel", () => ({
  __esModule: true,
  default: ({ publishedDate }: { publishedDate?: string }) => {
    const Component = () => <div data-testid="book-label">{publishedDate}</div>;
    Component.displayName = "MockBookLabel";
    return <Component />;
  },
}));

jest.mock("../../SkeletonLoading", () => ({
  __esModule: true,
  default: () => {
    const Component = () => <div data-testid="skeleton" />;
    Component.displayName = "MockSkeleton";
    return <Component />;
  },
}));

jest.mock("@/lib/favoriteBook", () => ({
  getFavorites: jest.fn().mockResolvedValue([{ book_id: "1" }]),
  addFavorite: jest.fn(),
  removeFavorite: jest.fn(),
}));

// ✅ Unit tests
describe("BookComponent", () => {
  it("should render book when loading is false", async () => {
    await act(async () => {
      render(<BookComponent loading={false} books={[mockBook]} />);
    });

    await waitFor(() => {
      expect(screen.getByTestId("book-label")).toHaveTextContent("2025-01-13");
      expect(screen.getByTestId("book-detail")).toBeInTheDocument();
    });
  });

  it("should not render any book when array is empty", async () => {
    await act(async () => {
      render(<BookComponent loading={false} books={[]} />);
    });

    expect(screen.queryByTestId("book-label")).not.toBeInTheDocument();
  });
});
