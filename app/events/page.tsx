"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ErrorLogger } from "@/components/utils/logger";
import decodeToken from "@/components/utils/decodeToken";
import styles from "./page.module.css";
import RegisteredEvents from "@/components/molecules/registeredEvents";

type DataType = {
   id: number;
};

const EventPage = () => {
   const [creatorId, setCreatorId] = useState<DataType | null>();
   const [creatorEmail, setCreatorEmail] = useState(null);
   const [isLoading, setIsLoading] = useState(false);
   const [isEventCreated, setIsEventCreated] = useState(false);
   const [getRegister, setGetRegister] = useState<any[]>([]);
   const [accessToken, setAccessToken] = useState(
      () => localStorage.getItem("token") || null
   );
   const [refreshToken] = useState(
      () => localStorage.getItem("refreshToken") || null
   );
   const router = useRouter();

   useEffect(() => {
      const getCreatorData = () => {
         if (!accessToken || !refreshToken) {
            router.push("/creators/login");
            return;
         }
         if (accessToken) {
            setCreatorEmail(decodeToken(accessToken).email);
            fetch("/api/creator", {
               headers: {
                  Authorization: `Bearer ${accessToken}`,
               },
            })
               .then((response) => {
                  if (response.ok) {
                     return response.json();
                  } else {
                     throw new Error("Failed to fetch user data");
                  }
               })
               .then(({ id }) => {
                  setCreatorId(id);
               })
               .catch((error: any) => {
                  console.error(error.message);
                  ErrorLogger.logger(error.message);
               });
         }
      };
      getCreatorData();

      const updateToken = async () => {
         try {
            const response = await fetch("/api/refresh", {
               method: "POST",
               headers: { ContentType: "application/json" },
               body: JSON.stringify({ refreshToken }),
            });
            if (response.ok) {
               const { accessToken: newAccessToken } = await response.json();
               localStorage.setItem("accessToken", newAccessToken);
               setAccessToken(newAccessToken);
            }
         } catch (error: any) {
            console.error(error.message);
            ErrorLogger.logger(error.message);
            router.push("/creators/login");
         }
      };

      setInterval(() => {
         if (accessToken) {
            updateToken();
         }
      }, 120000);
   }, [router, accessToken, refreshToken]);

   useEffect(() => {
      const getAllRegister = async () => {
         try {
            const response = await fetch("/api/register");
            if (!response.ok) {
               throw new Error();
            }
            const data = await response.json();
            setGetRegister(data);
         } catch (error: any) {
            console.log(error.message);
         }
      };
      getAllRegister();
   }, []);

   const handleLogout = () => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      router.push("/creators");
   };

   const handleEventCreation = async (
      event: React.FormEvent<HTMLFormElement>
   ) => {
      event.preventDefault();

      try {
         if (creatorId) {
            const data = {
               name: event.currentTarget.eventName.value,
               description: event.currentTarget.eventDesc.value,
               location: event.currentTarget.eventLocation.value,
               event_date: event.currentTarget.eventDate.value,
               start_time: event.currentTarget.eventStartTime.value,
               end_time: event.currentTarget.eventEndTime.value,
               event_creator_id: creatorId,
            };

            setIsLoading(true);
            const response = await fetch("/api/events", {
               method: "POST",
               headers: {
                  ContentType: "application/json",
               },
               body: JSON.stringify(data),
            });

            if (!response.ok) throw new Error("");
            const responseData = await response.json();
            if (responseData) {
               setIsEventCreated(true);
            }
         }
      } catch (error) {
      } finally {
         setIsLoading(false);
         setIsEventCreated(false);
      }
   };
   return (
      <div className={styles.wrapper}>
         <nav>
            <div>Welcome {creatorEmail}</div>
            <button onClick={handleLogout}>Log Out</button>
         </nav>

         <div>Create Event</div>

         <form onSubmit={handleEventCreation}>
            <label htmlFor="form-name">Name</label>
            <input type="text" name="eventName" id="form-name" />
            <label htmlFor="form-description">Description</label>
            <input type="text" name="eventDesc" id="form-description" />
            <label htmlFor="form-location">Location</label>
            <input type="text" name="eventLocation" id="form-location" />
            <label htmlFor="form-date">Date</label>
            <input type="date" name="eventDate" id="form-date" />
            <label htmlFor="form-start">Start time</label>
            <input type="time" name="eventStartTime" id="form-start" />
            <label htmlFor="form-end">End time</label>
            <input type="time" name="eventEndTime" id="form-end" />
            <button type="submit">Submit</button>
         </form>
         {isLoading && <div>...Loading</div>}
         {isEventCreated && <div>Event Created</div>}

         <div>Registered Events</div>

         {getRegister &&
            getRegister.map((data, index) => (
               <div key={index}>
                  <RegisteredEvents
                     event={data.event.name}
                     name={data.name}
                     tel={data.phone_number}
                  />
               </div>
            ))}
      </div>
   );
};

export default EventPage;
