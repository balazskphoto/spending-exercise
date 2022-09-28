import React, { useState, useEffect } from "react";
import { FiDollarSign } from "react-icons/fi";
import { DateTime } from "luxon";
import omitBy from "lodash/omitBy";
import Loader from "./Loader";
import { currencyCode } from "../store/currencyFilter";
import { sortBy } from "../store/sortBy";
import SpendingsAPI from "../apis/SpendingsAPI";
import { ErrorMessage, Spending, IconWrapper, TextWrapper, Amount, AmountWrapper } from "../styles/ComponentStyles";

export default function SpendingList({ spendings, setSpendings, reload }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const currencyCodeState = currencyCode.use();
  const sortByState = sortBy.use();

  useEffect(() => {
    setLoading(true);

    let ascending = true;
    let orderBy = sortByState;

    if (sortByState.startsWith("-")) {
      ascending = false;
      orderBy = sortByState.slice(1);
    }

    const currency = currencyCodeState === "all" ? undefined : currencyCodeState;

    const params = { orderBy, ascending, currency };

    SpendingsAPI.get({
      ...omitBy(params, (value) => !value),
    })
      .then((response) => {
        setSpendings(response);
      })
      .catch((_err) => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [currencyCodeState, sortByState, reload]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      {error && <ErrorMessage>The server is probably down. Please try again later.</ErrorMessage>}
      {!spendings.length && !error && (
        <h1 style={{ textAlign: "center", marginTop: "4rem" }}>
          Yay!{" "}
          <span role="img" aria-label="jsx-a11y/accessible-emoji">
            🎉
          </span>{" "}
          No spendings!
        </h1>
      )}
      {spendings.length > 0 &&
        spendings.map((spending) => (
          <Spending key={spending.id}>
            <IconWrapper>
              <FiDollarSign color="var(--color-blue)" />
            </IconWrapper>
            <TextWrapper>
              <h3>{spending.description}</h3>
              <p>{DateTime.fromISO(spending.spent_at).toFormat("t - MMMM dd, yyyy")}</p>
            </TextWrapper>
            <AmountWrapper>
              <Amount currency={spending.currency}>{spending.amount.toFixed(2)}</Amount>
            </AmountWrapper>
          </Spending>
        ))}
    </>
  );
}
