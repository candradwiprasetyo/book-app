import { Book } from "@/types/book";

export async function addFavorite(book: Book) {
  await fetch("/api/favorites", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      book_id: book.id,
      title: book.volumeInfo.title,
      authors: book.volumeInfo.authors?.join(", "),
      image_url: book.volumeInfo.imageLinks?.thumbnail || "",
    }),
  });
}

export async function removeFavorite(bookId: string) {
  await fetch("/api/favorites", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ book_id: bookId }),
  });
}

export async function getFavorites() {
  const res = await fetch("/api/favorites");
  return await res.json();
}
