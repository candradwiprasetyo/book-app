import styles from "@/styles/Book.module.css";
import { Book } from "@/types/book";
import StarRatings from "react-star-ratings";

type BookDetailProps = {
  book: Book;
};

export default function BookDetail({ book }: BookDetailProps) {
  const authors = book.volumeInfo.authors?.join(", ") || "";
  const averageRating = book.volumeInfo.averageRating ?? 0;

  return (
    <article>
      <h3 className={styles.bookCardDescriptionTitle}>
        {book.volumeInfo.title}
      </h3>
      <p className={styles.bookCardDescriptionAuthor}>{authors}</p>

      <div className={styles.bookCardDescriptionDetail}>
        <div
          className={styles.bookCardDescriptionRating}
          role="contentinfo"
          aria-label="Rating"
        >
          <StarRatings
            rating={averageRating}
            starRatedColor="#facc15"
            numberOfStars={5}
            name="rating"
            starDimension="12px"
            starSpacing="2px"
          />
        </div>
      </div>
    </article>
  );
}
