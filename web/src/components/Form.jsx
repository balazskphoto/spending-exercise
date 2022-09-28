import React, { useState } from "react";

import { InputStyles } from "../styles/InputStyles";
import { SelectStyles } from "../styles/SelectStyles";
import { FormStyles } from "../styles/ComponentStyles";
import SpendingsAPI from "../apis/SpendingsAPI";

export default function Form() {
  const [state, setState] = useState({
    description: "",
    amount: 0,
    currency: "USD",
  });

  function handleChange(e) {
    const { name, value } = e.target;

    setState({
      ...state,
      [name]: value,
    });
  }

  function handleSubmit(e) {
    SpendingsAPI.create(state);
  }

  return (
    <FormStyles>
      <InputStyles
        type="text"
        placeholder="description"
        name="description"
        value={state.description}
        onChange={handleChange}
      />
      <InputStyles type="number" placeholder="amount" name="amount" value={state.amount} onChange={handleChange} />
      <SelectStyles name="currency" value={state.currency} onChange={handleChange}>
        <option value="HUF">HUF</option>
        <option value="USD">USD</option>
      </SelectStyles>
      <InputStyles type="button" value="Save" onClick={handleSubmit} />
    </FormStyles>
  );
}
