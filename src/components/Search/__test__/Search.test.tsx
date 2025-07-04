import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Search from "../index";

jest.useFakeTimers();

describe("Search component", () => {
  it("should render input with default value", () => {
    render(<Search searchTerm="test" setSearchTerm={jest.fn()} />);
    const input = screen.getByTestId("input-search-book") as HTMLInputElement;
    expect(input.value).toBe("test");
  });

  it("should call setSearchTerm with debounced input", async () => {
    const mockSetSearchTerm = jest.fn();
    render(<Search searchTerm="" setSearchTerm={mockSetSearchTerm} />);

    const input = screen.getByTestId("input-search-book") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "frontend" } });

    jest.advanceTimersByTime(500);

    await waitFor(() => {
      expect(mockSetSearchTerm).toHaveBeenCalledWith("frontend");
    });
  });

  it("should show clear button when there is input", () => {
    render(<Search searchTerm="nextjs" setSearchTerm={jest.fn()} />);
    expect(screen.getByTestId("clear-search")).toBeInTheDocument();
  });

  it("should clear input and call setSearchTerm with empty string", () => {
    const mockSetSearchTerm = jest.fn();
    render(<Search searchTerm="react" setSearchTerm={mockSetSearchTerm} />);

    const clearBtn = screen.getByTestId("clear-search");
    fireEvent.click(clearBtn);

    jest.advanceTimersByTime(500);

    expect(mockSetSearchTerm).toHaveBeenCalledWith("");
  });
});
