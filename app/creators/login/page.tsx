"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Form from "@/components/molecules/form";
import { ErrorLogger } from "@/components/utils/logger";
import styles from "./page.module.css";

const Login = () => {
   const [isLoading, setIsLoading] = useState(false);
   const router = useRouter();
   const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      try {
         const data = {
            email: event.currentTarget.userEmail.value,
            password: event.currentTarget.userPassword.value,
         };
         setIsLoading(true);

         const response = await fetch("/api/login", {
            method: "POST",
            headers: {
               ContentType: "application/json",
            },
            body: JSON.stringify(data),
         });

         if (response.ok) {
            const { token, refreshToken } = await response.json();
            localStorage.setItem("token", token);
            localStorage.setItem("refreshToken", refreshToken);
            router.push("/events");
         }
      } catch (error: any) {
         ErrorLogger.logger(error.message);
      } finally {
         setIsLoading(false);
      }
   };

   return (
      <div className={styles.wrapper}>
         <Form
            handleSubmit={handleLogin}
            email={"Email"}
            password={"Password"}
            title={"Login"}
         />
         {isLoading && <div>...Loading</div>}
      </div>
   );
};

export default Login;
