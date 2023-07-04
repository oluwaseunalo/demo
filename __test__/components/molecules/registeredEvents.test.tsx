import React from "react";
import { render, screen } from "@testing-library/react";
import RegisteredEvents from "@/components/molecules/registeredEvents";

describe("RegisteredEvents", () => {
   it("renders the registered event details correctly", () => {
      const eventName = "All Day Show";
      const name = "Desmond Helliot";
      const tel = "+4921567896781";

      render(<RegisteredEvents event={eventName} name={name} tel={tel} />);

      const eventElement = screen.getByText(eventName);
      const nameElement = screen.getByText(name);
      const telElement = screen.getByText(tel);

      expect(eventElement).toBeInTheDocument();
      expect(nameElement).toBeInTheDocument();
      expect(telElement).toBeInTheDocument();
   });
});
