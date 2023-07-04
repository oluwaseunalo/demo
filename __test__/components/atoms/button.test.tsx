import React from "react";
import { render, screen } from "@testing-library/react";
import Button from "@/components/atoms/button";

describe("Button", () => {
   it("renders the button with the correct title", () => {
      const title = "Submit";
      render(<Button title={title} />);
      const buttonElement = screen.getByText(title);
      expect(buttonElement).toBeInTheDocument();
   });
});
