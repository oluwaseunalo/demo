import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Form from "@/components/molecules/form";

describe("Form", () => {
   it("renders the form with correct inputs and button", () => {
      const handleSubmit = jest.fn();
      render(
         <Form
            handleSubmit={handleSubmit}
            email={"Email"}
            password={"Password"}
            title={"Submit"}
            login={"Login"}
            heading={"Create Account"}
         />
      );

      const emailInput = screen.getByLabelText("Email");
      const passwordInput = screen.getByLabelText("Password");
      const submitButton = screen.getByText("Submit");
      expect(emailInput).toBeInTheDocument();
      expect(passwordInput).toBeInTheDocument();
      expect(submitButton).toBeInTheDocument();

      fireEvent.submit(screen.getByRole("form"));
      expect(handleSubmit).toHaveBeenCalledTimes(1);
   });
});
