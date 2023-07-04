import React from "react";
import styles from "./registeredEvents.module.css";

const RegisteredEvents = ({
   name,
   tel,
   event,
}: {
   name: string;
   tel: string;
   event: string;
}) => {
   return (
      <div className={styles.wrapper}>
         <div>{event}</div>
         <div>{name}</div>
         <div>{tel}</div>
      </div>
   );
};

export default RegisteredEvents;
