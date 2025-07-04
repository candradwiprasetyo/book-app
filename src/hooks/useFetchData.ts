import { useEffect, useState } from "react";
import { fetchBooks } from "@/lib/fetchBooks";
import { Book } from "@/types/book";

export const useFetchData = (searchTerm: string) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [categoryLoading, setCategoryLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setErrorMessage(null);
      try {
        const booksData = await fetchBooks(searchTerm);
        setBooks(booksData);
      } catch {
        setErrorMessage(
          "Our librarian is taking a short break. Refresh the page and lets find more books to explore"
        );
      } finally {
        setCategoryLoading(false);
        setLoading(false);
      }
    };

    if (searchTerm.trim() !== "") {
      loadData();
    }
  }, [searchTerm]);

  return { books, loading, categoryLoading, errorMessage };
};
