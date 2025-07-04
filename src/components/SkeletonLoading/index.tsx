import styles from "@/styles/Skeleton.module.css";

export default function SkeletonLoading() {
  return Array.from({ length: 10 }).map((_, index) => (
    <div
      className={styles.skeletonBookCard}
      key={index}
      data-testid="skeleton-book-card"
    >
      <div className={`${styles.skeleton} ${styles.skeletonImage}`} />
      <div className={`${styles.skeleton} ${styles.skeletonText}`} />
      <div
        className={`${styles.skeleton} ${styles.skeletonText} ${styles.short}`}
      />
    </div>
  ));
}
