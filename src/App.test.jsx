import { describe, it, expect } from "vitest";

import React from "react";
import { render } from "@testing-library/react";
import App from "./App";
import { MemoryRouter } from "react-router";

it("renders without crashing", function() {
  render(<MemoryRouter><App /></MemoryRouter>);
});