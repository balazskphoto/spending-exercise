import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import FiltersAndOrderings from "../../src/components/FiltersAndOrderings";
import { sortBy } from "../../src/store/sortBy";
import { currencyCode } from "../../src/store/currencyFilter";

describe("FiltersAndOrderings", () => {
  beforeEach(() => {
    sortBy.init();
    currencyCode.init();
  });

  describe("sorting", () => {
    [
      {
        name: "sorts by date descending",
        targetValue: "-createdAt",
        expectedText: "Sort by Date descending (default)",
      },
      {
        name: "sorts by date ascending",
        targetValue: "createdAt",
        expectedText: "Sort by Date ascending",
      },
      {
        name: "sorts by amount descending",
        targetValue: "-amount",
        expectedText: "Sort by Amount descending",
      },
      {
        name: "sorts by amount ascending",
        targetValue: "amount",
        expectedText: "Sort by Amount ascending",
      },
    ].forEach(({ name, targetValue, expectedText }) => {
      test(name, async () => {
        const { getByTestId } = render(<FiltersAndOrderings />);

        fireEvent.change(getByTestId("sort-by-select"), { target: { value: targetValue } });

        expect(screen.getByTestId("sort-by-select")).toHaveTextContent(expectedText);
        expect(sortBy.get()).toBe(targetValue);
      });
    });
  });

  describe("filtering", () => {
    [
      {
        name: "filters for all currencies",
        filterText: "ALL",
        expectedCurrency: "all",
      },
      {
        name: "filters for HUF currency",
        filterText: "HUF",
        expectedCurrency: "HUF",
      },
      {
        name: "filters for USD currency",
        filterText: "USD",
        expectedCurrency: "USD",
      },
    ].forEach(({ name, filterText, expectedCurrency }) => {
      test(name, async () => {
        render(<FiltersAndOrderings />);

        fireEvent.click(screen.getByText(filterText));

        expect(currencyCode.get()).toBe(expectedCurrency);
      });
    });
  });
});
