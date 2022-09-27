import React from "react";
import { setCurrencyCode } from "../store/currencyFilter";
import { setSortBy } from "../store/sortBy";

import { FiltersWrapper, Orderings, CurrencyFilters, CurrencyButton } from "../styles/ComponentStyles";

export default function CurrencyFilter() {
  return (
    <FiltersWrapper>
      <Orderings>
        <select onChange={(e) => setSortBy(e.target.value)}>
          <option value="-createdAt">Sort by Date descending (default)</option>
          <option value="createdAt">Sort by Date ascending</option>
          <option value="-amount">Sort by Amount descending</option>
          <option value="amount">Sort by Amount ascending</option>
        </select>
      </Orderings>
      <CurrencyFilters>
        <li onClick={() => setCurrencyCode("all")}>
          <CurrencyButton name="">ALL</CurrencyButton>
        </li>
        <li onClick={() => setCurrencyCode("HUF")}>
          <CurrencyButton name="HUF">HUF</CurrencyButton>
        </li>
        <li onClick={() => setCurrencyCode("USD")}>
          <CurrencyButton name="USD">USD</CurrencyButton>
        </li>
      </CurrencyFilters>
    </FiltersWrapper>
  );
}
