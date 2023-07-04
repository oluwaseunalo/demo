import React from "react";
import Button from "../atoms/button";
import styles from "./form.module.css";
import Link from "next/link";

type FormType = {
   handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
   email: string;
   password: string;
   title: string;
   login?: string;
   heading?: string;
};

const Form: React.FC<FormType> = ({
   handleSubmit,
   email,
   password,
   title,
   login,
   heading,
}) => {
   const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
      handleSubmit(event);
   };

   return (
      <div className={styles.wrapper}>
         {heading && <div>{heading}</div>}
         <form role="form" onSubmit={submitHandler}>
            <label htmlFor="form-email">{email}</label>
            <input type="email" name="userEmail" id="form-email" required />
            <label htmlFor="form-password">{password}</label>
            <input
               type="password"
               name="userPassword"
               id="form-password"
               required
            />
            <Button title={title} />
         </form>
         {login && <Link href={"/creators/login"}>{login}</Link>}
      </div>
   );
};

export default Form;
