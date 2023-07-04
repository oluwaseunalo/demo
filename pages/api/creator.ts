import { prisma } from "@/config/db";
import { NextApiRequest, NextApiResponse } from "next";
import { hash } from "bcrypt";
import { JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken";

export default async function creatorHandler(
   req: NextApiRequest,
   res: NextApiResponse
) {
   switch (req.method) {
      case "POST":
         return await createUser(req, res);
      case "GET":
         return await getCreators(req, res);
   }
}

async function createUser(req: NextApiRequest, res: NextApiResponse) {
   try {
      const data = JSON.parse(req.body);
      const hashedPassword = await hash(data.password, 10);
      const userData = await prisma.eventCreator.create({
         data: {
            email: data.email,
            password: hashedPassword,
         },
      });

      res.status(201).json({ data: userData, message: "User Created" });
   } catch (error: any) {
      res.status(500).json({ error: error.message });
   }
}

async function getCreators(req: NextApiRequest, res: NextApiResponse) {
   const authHeader = req.headers.authorization;
   if (!authHeader) res.status(401).json({ message: "Missing access token" });

   if (authHeader) {
      try {
         const token = authHeader.split(" ")[1];
         const decodedToken = jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET!
         ) as JwtPayload;
         const userEmail = decodedToken.email;

         const user = await prisma.eventCreator.findUnique({
            where: {
               email: userEmail,
            },
         });
         if (!user)
            res.status(404).json({ message: "Creator could not be found" });

         res.status(200).json(user);
      } catch (error: any) {
         res.status(500).json({ message: error.message });
      }
   }
}
