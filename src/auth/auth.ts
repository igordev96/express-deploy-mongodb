import { User } from "@prisma/client";
import { Response, Request, NextFunction } from "express";
import { JwtPayload, sign, verify } from "jsonwebtoken";

export interface CustomRequest extends Request {
  token: string | JwtPayload;
}

export const createJwtToken = async (user: User) => {
  const token = await sign(
    {
      id: user.id,
      email: user.email,
    },
    process.env.JWT_SECRET!,
    {
      expiresIn: "2h",
    }
  );

  return token;
};

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header("Authorization")?.split(" ")[1];

    if (!token) {
      throw new Error("Invalid authorization");
    }

    const decoded = verify(token, process.env.JWT_SECRET!);

    (req as CustomRequest).token = decoded;

    next();
  } catch (e: any) {
    res.status(400).json({
      msg: e?.message,
    });
  }
};
