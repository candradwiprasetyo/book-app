import styles from "@/styles/Book.module.css";
import SkeletonLoading from "../SkeletonLoading";
import { Book } from "@/types/book";
import Image from "next/image";
import BookDetail from "./BookDetail";
import BookLabel from "./BookLabel";

type BookProps = {
  loading: boolean;
  books: Book[];
};

export default function BookComponent({ loading, books }: BookProps) {
  return (
    <div className={styles.bookList} role="list">
      {loading ? (
        <SkeletonLoading />
      ) : (
        books.map((book) => (
          <div key={book.id} className={styles.bookCard} role="listitembook">
            <BookLabel publishedDate={book.volumeInfo.publishedDate} />
            <Image
              src={book.volumeInfo.imageLinks?.thumbnail || "Book"}
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
