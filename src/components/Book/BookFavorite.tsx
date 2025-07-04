"use client";

import styles from "@/styles/Book.module.css";
import { Book } from "@/types/book";

type BookFavoriteProps = {
  book: Book;
  isFavorite: boolean;
  onToggle: (book: Book) => void;
};

export default function BookFavorite({
  book,
  isFavorite,
  onToggle,
}: BookFavoriteProps) {
  return (
    <span
      onClick={() => onToggle(book)}
      aria-label="Toggle Wishlist"
      className={styles.favoriteIcon}
    >
      <i
        className={`fa-solid fa-heart ${
          isFavorite ? styles.favoriteIconActive : styles.favoriteIconInactive
        }`}
      />
    </span>
  );
}
