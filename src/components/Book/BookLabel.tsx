import styles from "@/styles/Book.module.css";
import { formatPublishedDate } from "@/utils/formatDate";

type BookLabelProps = {
  publishedDate?: string;
};

export default function BookLabel({ publishedDate }: BookLabelProps) {
  const formattedDate = formatPublishedDate(publishedDate);

  return (
    <div className={styles.bookCardNewBadge} aria-label="New" role="status">
      {formattedDate}
    </div>
  );
}
