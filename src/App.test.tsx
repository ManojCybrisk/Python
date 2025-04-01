import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";  // Import vitest's test and expect functions
import App from "./App";

test("renders the app", () => {
  render(<App />);
  expect(screen.getByText(/vite react typescript/i)).toBeInTheDocument();
});
