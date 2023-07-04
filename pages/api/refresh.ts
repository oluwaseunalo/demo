import jwt, { JwtPayload } from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

export default async function refreshTokenHandler(
   req: NextApiRequest,
   res: NextApiResponse
) {
   if (req.method !== "POST") {
      res.status(405).json({ message: "Method Not Allowed" });
      return;
   }

   const { refreshToken } = JSON.parse(req.body);

   try {
      const decoded = jwt.verify(
         refreshToken,
         process.env.REFRESH_TOKEN_SECRET!
      ) as JwtPayload;

      if (decoded) {
         const accessToken = jwt.sign(
            { email: decoded.email },
            process.env.ACCESS_TOKEN_SECRET!,
            { expiresIn: "2m" }
         );

         res.status(200).json({ accessToken });
      }
   } catch (error) {
      res.status(401).json({ message: "Invalid refresh token" });
   }
}
