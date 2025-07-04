import { render, screen } from "@testing-library/react";
import SkeletonLoading from "..";
import "@testing-library/jest-dom";

describe("SkeletonLoading Component", () => {
  test("It should renders 10 skeleton book cards", () => {
    render(<SkeletonLoading />);

    const skeletonCards = screen.getAllByTestId("skeleton-book-card");
    expect(skeletonCards.length).toBe(10);
  });
});
