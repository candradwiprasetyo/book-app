"use client";

import { useEffect, useState } from "react";
import styles from "@/styles/Book.module.css";
import SkeletonLoading from "../SkeletonLoading";
import { Book } from "@/types/book";
import Image from "next/image";
import BookDetail from "./BookDetail";
import BookLabel from "./BookLabel";
import BookFavorite from "./BookFavorite";
import { addFavorite, removeFavorite, getFavorites } from "@/lib/favoriteBook";

type BookProps = {
  loading: boolean;
  books: Book[];
};

export default function BookComponent({ loading, books }: BookProps) {
  const [favoriteBookIds, setFavoriteBookIds] = useState<Set<string>>(
    new Set()
  );

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const favorites = await getFavorites();
        const ids = new Set<string>(
          (favorites || []).map((fav: { book_id: string }) => fav.book_id)
        );
        setFavoriteBookIds(ids);
      } catch (err) {
        console.error("Failed to load favorites", err);
      }
    };

    fetchFavorites();
  }, []);

  const isFavorite = (bookId: string) => favoriteBookIds.has(bookId);

  const toggleFavorite = async (book: Book) => {
    const bookId = book.id;

    try {
      if (isFavorite(bookId)) {
        await removeFavorite(bookId);
        setFavoriteBookIds((prev) => {
          const newSet = new Set(prev);
          newSet.delete(bookId);
          return newSet;
        });
      } else {
        await addFavorite(book);
        setFavoriteBookIds((prev) => new Set(prev).add(bookId));
      }
    } catch (err) {
      console.error("Failed to load favorites", err);
    }
  };

  return (
    <div className={styles.bookList} role="list">
      {loading ? (
        <SkeletonLoading />
      ) : (
        books.map((book) => (
          <div key={book.id} className={styles.bookCard} role="listitembook">
            <BookFavorite
              book={book}
              isFavorite={isFavorite(book.id)}
              onToggle={toggleFavorite}
            />
            <BookLabel publishedDate={book.volumeInfo.publishedDate} />
            <Image
              src={book.volumeInfo.imageLinks?.thumbnail || "/book.png"}
              alt={book.volumeInfo.title}
              className={styles.bookImage}
              width={300}
              height={300}
            />
            <div className={styles.bookCardDescription}>
              <BookDetail book={book} />
            </div>
          </div>
        ))
      )}
    </div>
  );
}
