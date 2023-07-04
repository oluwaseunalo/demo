"use client";

import React, { useEffect } from "react";

type ErrorType = {
   error: Error;
   reset: () => void;
};

const Error: React.FC<ErrorType> = ({ error, reset }) => {
   return (
      <div>
         <h3>{error.message || "an error occured"}</h3>
         <p>
            {" "}
            Something went wrong! Please try refreshing the page or contact
            support if the problem persists.
         </p>
      </div>
   );
};

export default Error;
