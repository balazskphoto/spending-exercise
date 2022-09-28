import { render, screen, fireEvent } from "@testing-library/react";
import { ToastContainer } from "react-toastify";
import "@testing-library/jest-dom";

import SpendingForm from "../../src/components/SpendingForm";

describe("SpendingForm", () => {
  describe("validation", () => {
    [
      {
        name: "checks if description is populated",
        descriptionToSet: "",
        amountToSet: 1,
        validationMessage: "Description is required",
      },
      {
        name: "checks if amount is positive",
        descriptionToSet: "Something",
        amountToSet: -1,
        validationMessage: "Amount must be a positive number",
      },
    ].forEach(({ name, descriptionToSet, amountToSet, validationMessage }) => {
      test(name, async () => {
        const { getByTestId } = render(
          <>
            <SpendingForm />
            <ToastContainer />
          </>
        );

        fireEvent.change(getByTestId("spending-form-description-input"), {
          target: { value: descriptionToSet, name: "description" },
        });
        fireEvent.change(getByTestId("spending-form-amount-input"), { target: { value: amountToSet, name: "amount" } });
        fireEvent.click(getByTestId("spending-form-save"));

        expect(await screen.findByText(validationMessage)).toBeInTheDocument();
      });
    });
  });
});
