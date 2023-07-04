import React from "react";

const Button = ({ title }: { title: string }) => {
   return (
      <div>
         <button type="submit">{title}</button>
      </div>
   );
};

export default Button;
