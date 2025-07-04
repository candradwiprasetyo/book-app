import styles from "@/styles/DataNotFound.module.css";

export default function DataNotFound() {
  return (
    <div className={styles.dataNotFound}>
      <i className="fa-solid fa-books" role="presentation"></i>
      <p>Sorry, no book found, try a different keyword.</p>
    </div>
  );
}
