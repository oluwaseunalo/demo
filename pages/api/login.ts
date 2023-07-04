import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/config/db";
import { compare } from "bcrypt";
import { HttpException } from "@/components/utils/httpException";

export default async function creatorLoginHandler(
   req: NextApiRequest,
   res: NextApiResponse
) {
   try {
      if (req.method === "POST") {
         const { email, password } = JSON.parse(req.body);
         const existingUser = await prisma.eventCreator.findUnique({
            where: {
               email,
            },
         });
         if (!existingUser)
            throw new HttpException(
               409,
               "Email does not exist, please create an account"
            );
         if (existingUser) {
            const isValidPassword = await compare(
               password,
               existingUser.password
            );
            if (!isValidPassword)
               throw new HttpException(409, "Password is invalid");
            if (isValidPassword) {
               const secretToken = process.env.ACCESS_TOKEN_SECRET!;
               const secretRefreshToken = process.env.REFRESH_TOKEN_SECRET!;

               const token = jwt.sign({ email }, secretToken, {
                  expiresIn: "2m",
               });
               const refreshToken = jwt.sign({ email }, secretRefreshToken, {
                  expiresIn: "7d",
               });
               res.status(200).json({ token, refreshToken });
            }
         }
      }
   } catch (error: any) {
      res.status(500).json(error.message);
   }
}
