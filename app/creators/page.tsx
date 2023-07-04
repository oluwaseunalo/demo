"use client";

import React, { useState } from "react";
import styles from "./page.module.css";
import Form from "@/components/molecules/form";
import Link from "next/link";
import { ErrorLogger } from "@/components/utils/logger";

const SignUp = () => {
   const [isSignedUp, setIsSignedUp] = useState(false);
   const [isLoading, setIsLoading] = useState(false);
   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      setIsLoading(true);
      event.preventDefault();
      const data = {
         email: event.currentTarget.userEmail.value,
         password: event.currentTarget.userPassword.value,
      };

      try {
         const response = await fetch("/api/creator", {
            method: "POST",
            headers: {
               ContentType: "application/json",
            },
            body: JSON.stringify(data),
         });

         if (!response.ok) {
            throw new Error("Could not authenticate user");
         }

         const responseData = await response.json();
         if (responseData) {
            console.log(responseData);
            setIsSignedUp(true);
         }
      } catch (error: any) {
         ErrorLogger.logger(error.message);
      } finally {
         setIsLoading(false);
      }
   };

   return (
      <>
         {isSignedUp ? (
            <div className={styles.container}>
               <div>Account Created</div>
               <Link href={"/creators/login"}>Login</Link>
            </div>
         ) : (
            <div className={styles.wrapper}>
               <Form
                  handleSubmit={handleSubmit}
                  email={"Email"}
                  password={"Password"}
                  title={"Submit"}
                  login={"Login"}
                  heading={"Create Account"}
               />
               {isLoading && <div>...Loading</div>}
            </div>
         )}
      </>
   );
};

export default SignUp;
