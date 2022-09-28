import React, { useState } from "react";
import { toast } from "react-toastify";

import { InputStyles } from "../styles/InputStyles";
import { SelectStyles } from "../styles/SelectStyles";
import { FormStyles } from "../styles/ComponentStyles";
import SpendingsAPI from "../apis/spendingsAPI";

const initialState = {
  description: "",
  amount: 0,
  currency: "USD",
};

export default function SpendingForm({ onSpendingCreated }) {
  const [state, setState] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setState({
      ...state,
      [name]: value,
    });
  };

  const validateForm = () => {
    let isValid = true;
    let validationMessage;

    if (!state.description || state.description === "") {
      isValid = false;
      validationMessage = "Description is required";
    }

    if (state.amount <= 0) {
      isValid = false;
      validationMessage = "Amount must be a positive number";
    }

    if (!isValid) {
      toast.error(validationMessage, {
        position: "top-right",
        hideProgressBar: true,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
      });
    }

    return isValid;
  };

  const handleSubmit = (e) => {
    if (validateForm()) {
      SpendingsAPI.create(state).then(() => {
        setState(initialState);
        onSpendingCreated();
      });
    }
  };

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
