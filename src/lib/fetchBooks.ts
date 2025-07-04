import { Book } from "@/types/book";

export async function fetchBooks(keyword: string): Promise<Book[]> {
  try {
    const query = encodeURIComponent(keyword || "frontend");
    const apiUrl = `${process.env.NEXT_PUBLIC_BOOK_API}books/v1/volumes?q=${query}`;
    if (!apiUrl) throw new Error("API URL is not defined");

    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error("Failed to fetch books");

    const data = await response.json();
    return data.items || [];
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("An error occurred while retrieving data");
  }
}
