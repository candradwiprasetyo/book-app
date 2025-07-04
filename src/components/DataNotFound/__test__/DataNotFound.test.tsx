import { render, screen } from "@testing-library/react";
import DataNotFound from "..";

describe("DataNotFound Component", () => {
  test("It should renders correct message", () => {
    render(<DataNotFound />);

    expect(
      screen.getByText("Sorry, no book found, try a different keyword.")
    ).toBeInTheDocument();
  });
});
