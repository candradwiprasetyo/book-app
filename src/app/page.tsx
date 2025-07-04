"use client";

import { useState } from "react";
import { useFetchData } from "@/hooks/useFetchData";
import styles from "@/styles/Home.module.css";
import Search from "@/components/Search";
import BookComponent from "@/components/Book";
import DataNotFound from "@/components/DataNotFound";
import ErrorPage from "@/components/ErrorPage";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState<string>("frontend");
  const { books, loading, errorMessage } = useFetchData(searchTerm);

  if (errorMessage) {
    return <ErrorPage message={errorMessage} />;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.containerTitle}>Book List App</h1>
      <div className={styles.featureContainer}>
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>

      {books.length === 0 && !loading ? (
        <DataNotFound />
      ) : (
        <BookComponent loading={loading} books={books} />
      )}
    </div>
  );
}
