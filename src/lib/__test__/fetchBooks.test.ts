import { fetchBooks } from "../fetchBooks";
import { mockBook } from "@/__mocks__/bookMock";

describe("fetchBooks", () => {
  const mockBooks = mockBook;
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should return books when api responds successfully", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ items: mockBooks }),
    });

    const books = await fetchBooks("mock");
    expect(books).toEqual(mockBooks);
    expect(global.fetch).toHaveBeenCalled();
  });

  it("should return empty array when items is undefined", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({}),
    });

    const books = await fetchBooks("mock");
    expect(books).toEqual([]);
  });

  it("should throw error when response is not ok", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: async () => ({}),
    });

    await expect(fetchBooks("mock")).rejects.toThrow("Failed to fetch books");
  });

  it("should throw error when fetch fails", async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(
      new Error("Network error")
    );

    await expect(fetchBooks("mock")).rejects.toThrow("Network error");
  });
});
