import { describe, it, expect } from "vitest";

import React from "react";
import { render } from "@testing-library/react";
import JobCardList from "./JobCardList";
import { UserProvider } from "../testUtils";


it("matches snapshot", function () {
  const jobs = [
    {
    id: 1,
    title: "job-title",
    salary: 100000,
    equity: 10,
    companyName: "job-companyName"
    },
  ]

  const { asFragment } = render(
      <UserProvider>
        <JobCardList jobs={jobs} />
      </UserProvider>,
  );
  expect(asFragment()).toMatchSnapshot();
});