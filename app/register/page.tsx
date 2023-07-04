import { useEffect } from "react";
import EventRegister from "./event-register/eventRegister";
import styles from "./page.module.css";
export type EventType = {
   id: number;
   event_creator_id: number;
   name: string;
   description: string;
   location: string;
   start_time: string;
   end_time: string;
   event_date: string;
};

async function getAllEvents(): Promise<EventType[]> {
   const response = await fetch("http://localhost:3000/api/events", {
      cache: "no-store",
   });
   return response.json();
}

const RegisterPage = async () => {
   const eventData = await getAllEvents();

   return (
      <div className={styles.wrapper}>
         <div>Click on the events to register</div>
         {eventData.map((event, index) => (
            <div key={index}>
               {" "}
               <EventRegister eventName={event.name} eventId={event.id} />
            </div>
         ))}
      </div>
   );
};

export default RegisterPage;
