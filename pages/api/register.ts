import { prisma } from "@/config/db";
import { NextApiRequest, NextApiResponse } from "next";
import type { EventType } from "@/app/register/page";

export default async function registerEventsHandler(
   req: NextApiRequest,
   res: NextApiResponse
) {
   switch (req.method) {
      case "POST":
         return await registerEvent(req, res);
      case "GET": {
         return await getAllRegisteredEvents(req, res);
      }
   }
}

async function registerEvent(req: NextApiRequest, res: NextApiResponse) {
   try {
      const { name, phone_number, email, event_id } = JSON.parse(req.body);

      const registerData = await prisma.registration.create({
         data: {
            name,
            phone_number,
            email,
            event_id,
         },

         include: {
            event: true,
         },
      });

      res.status(201).json(registerData);
   } catch (error: any) {
      res.status(500).json({ error: error.message });
   }
}

async function getAllRegisteredEvents(
   req: NextApiRequest,
   res: NextApiResponse
) {
   try {
      const data = await prisma.registration.findMany({
         include: {
            event: true,
         },
      });
      if (!data) res.status(404).json({ message: "No data in the record" });
      res.status(200).json(data);
   } catch (error: any) {
      res.status(500).json({ error: error.message });
   }
}
