import { render, screen, waitFor } from "@testing-library/react";
import BookComponent from "../index";
import { mockBook } from "@/__mocks__/bookMock";
import { act } from "react";

jest.mock("../BookDetail", () => () => <div data-testid="book-detail" />);
jest.mock(
  "../BookLabel",
  () =>
    ({ publishedDate }: { publishedDate?: string }) =>
      <div data-testid="book-label">{publishedDate}</div>
);
jest.mock("next/image", () => (props: any) => {
  return <img {...props} />;
});
jest.mock("../../SkeletonLoading", () => () => <div data-testid="skeleton" />);
jest.mock("@/lib/favoriteBook", () => ({
  getFavorites: jest.fn().mockResolvedValue([{ book_id: "1" }]),
  addFavorite: jest.fn(),
  removeFavorite: jest.fn(),
}));

describe("BookComponent", () => {
  it("should render book when loading is false", async () => {
    await act(async () => {
      render(<BookComponent loading={false} books={[mockBook]} />);
    });

    await waitFor(() => {
      expect(screen.getByTestId("book-label")).toHaveTextContent("2025-01-13");
      expect(screen.getByTestId("book-detail")).toBeInTheDocument();
      expect(screen.getByRole("img")).toHaveAttribute("alt", "Candra books");
    });
  });

  it("should not render any book when array is empty", async () => {
    await act(async () => {
      render(<BookComponent loading={false} books={[]} />);
    });
    expect(screen.queryByTestId("book-label")).not.toBeInTheDocument();
  });
});
