import { render, screen, fireEvent } from "@testing-library/react";
import BookFavorite from "@/components/Book/BookFavorite";
import { mockBook } from "@/__mocks__/bookMock";

describe("BookFavorite Component", () => {
  it("should render heart icon with inactive style when not favorite", () => {
    render(
      <BookFavorite book={mockBook} isFavorite={false} onToggle={jest.fn()} />
    );

    const icon = screen.getByLabelText("Toggle Wishlist").firstChild;
    expect(icon).toHaveClass("fa-heart");
    expect(icon).toHaveClass("fa-solid");
    expect(icon).toHaveClass("favoriteIconInactive");
  });

  it("should render heart icon with active style when favorite", () => {
    render(
      <BookFavorite book={mockBook} isFavorite={true} onToggle={jest.fn()} />
    );

    const icon = screen.getByLabelText("Toggle Wishlist").firstChild;
    expect(icon).toHaveClass("favoriteIconActive");
  });

  it("should call onToggle function when clicked", () => {
    const mockToggle = jest.fn();
    render(
      <BookFavorite book={mockBook} isFavorite={false} onToggle={mockToggle} />
    );

    const button = screen.getByLabelText("Toggle Wishlist");
    fireEvent.click(button);

    expect(mockToggle).toHaveBeenCalledTimes(1);
    expect(mockToggle).toHaveBeenCalledWith(mockBook);
  });
});
