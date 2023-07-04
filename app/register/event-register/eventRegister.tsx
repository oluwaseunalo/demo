"use client";
import React, { useState } from "react";
import styles from "./eventRegister.module.css";

type EventRegisterType = {
   eventName: string;
   eventId: number;
};

const EventRegister: React.FC<EventRegisterType> = ({ eventName, eventId }) => {
   const [isLoading, setIsLoading] = useState(false);
   const [isOpen, setIsOpen] = useState(false);
   const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      try {
         if (eventId) {
            const data = {
               name: event.currentTarget.registerName.value,
               phone_number: event.currentTarget.registerNumber.value,
               email: event.currentTarget.registerEmail.value,
               event_id: eventId,
            };
            setIsLoading(true);
            const response = await fetch("/api/register", {
               method: "POST",
               headers: {
                  ContentType: "application/json",
               },
               body: JSON.stringify(data),
            });
            if (!response.ok) throw new Error();
         }
      } catch (error: any) {
      } finally {
         setIsLoading(false);
      }
   };

   const registerHandler = () => {
      setIsOpen(!isOpen);
   };
   return (
      <div className={styles.wrapper}>
         <button onClick={registerHandler}>{eventName}</button>
         {isOpen && (
            <form onSubmit={handleRegister}>
               <label htmlFor="form-name">Name</label>
               <input type="text" name="registerName" id="form-name" />
               <label htmlFor="form-number">Phone Number</label>
               <input type="tel" name="registerNumber" id="form-number" />
               <label htmlFor="form-email">Email</label>
               <input type="email" name="registerEmail" id="form-email" />

               <button type="submit">Register</button>
               {isLoading && <div>...Loading</div>}
            </form>
         )}
      </div>
   );
};

export default EventRegister;
