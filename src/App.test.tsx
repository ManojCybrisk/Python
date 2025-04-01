import '@testing-library/jest-dom';  // Import this to use toBeInTheDocument matcher
import React from 'react';
import { render, screen } from "@testing-library/react";
import { test, expect } from "vitest";  // Import vitest's test and expect functions
import App from "./App";

test("renders the app", () => {
  render(<App />);
  expect(screen.getByText("Memory Game")).toBeInTheDocument();  // Check for the title text
});
