import { render, screen } from "@testing-library/react";
import BookComponent from "../index";
import { mockBook } from "@/__mocks__/bookMock";

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

describe("BookComponent", () => {
  it("should render skeletonLoading when loading is true", () => {
    render(<BookComponent loading={true} books={[]} />);
    expect(screen.getByTestId("skeleton")).toBeInTheDocument();
  });

  it("should render book when loading is false", () => {
    render(<BookComponent loading={false} books={[mockBook]} />);

    expect(screen.getByTestId("book-label")).toHaveTextContent("2025-01-13");

    const image = screen.getByRole("img");
    expect(image).toHaveAttribute("alt", "Candra books");

    expect(screen.getByTestId("book-detail")).toBeInTheDocument();
  });

  it("should not render any book  when array is empty", () => {
    render(<BookComponent loading={false} books={[]} />);
    expect(screen.queryByTestId("book-label")).not.toBeInTheDocument();
  });
});
