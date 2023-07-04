import { prisma } from "@/config/db";
import { NextApiRequest, NextApiResponse } from "next";
import type { EventType } from "@/app/register/page";

export default async function eventsHandler(
   req: NextApiRequest,
   res: NextApiResponse
) {
   switch (req.method) {
      case "POST":
         return await createEvents(req, res);
      case "GET": {
         return await getAllevents(req, res);
      }
   }
}

async function createEvents(req: NextApiRequest, res: NextApiResponse) {
   try {
      const {
         name,
         description,
         location,
         start_time,
         end_time,
         event_date,
         event_creator_id,
      } = JSON.parse(req.body);

      const eventData = await prisma.event.create({
         data: {
            event_creator_id,
            name,
            description,
            location,
            start_time,
            end_time,
            event_date,
         },
         include: {
            event_creator: true,
         },
      });
      res.status(201).json({ data: eventData, message: "Event Created" });
   } catch (error: any) {
      res.status(500).json({ error: error.message });
   }
}

async function getAllevents(req: NextApiRequest, res: NextApiResponse) {
   try {
      const eventData: EventType[] = await prisma.event.findMany();
      if (!eventData)
         res.status(404).json({ message: "Event data could not be found" });

      res.status(200).json(eventData);
   } catch (error: any) {
      res.status(500).json({ error: error.message });
   }
}
