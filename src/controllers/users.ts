import { PrismaClient } from "@prisma/client";
import argon2 from "argon2";
import { Request, Response } from "express";
import { createJwtToken } from "../auth/auth";

const prisma = new PrismaClient();

class UsersController {
  async createUser(req: Request, res: Response) {
    try {
      if (!req.body.email || !req.body.password) {
        throw new Error("Please enter your email or password");
      } else {
        const userDb = await prisma.user.findFirst({
          where: {
            email: req.body.email,
          },
        });
        if (userDb) {
          throw new Error("This email is already used by another user");
        }
        const hash = await argon2.hash(req.body.password);
        const newUser = await prisma.user.create({
          data: {
            email: req.body.email,
            hash: hash,
          },
        });
        const token = await createJwtToken(newUser);
        res.status(200).json({ access_token: token });
      }
    } catch (e: any) {
      res.status(400).json({
        msg: e?.message,
      });
    }
  }

  async loginUser(req: Request, res: Response) {
    try {
      const userDb = await prisma.user.findFirst({
        where: {
          email: req.body.email,
        },
      });
      if (!userDb) {
        throw new Error(`User ${req.body.email} not found`);
      }
      if (await argon2.verify(userDb.hash, req.body.password)) {
        const token = await createJwtToken(userDb);
        res.status(200).json({ access_token: token });
      } else {
        throw new Error("Invalid password");
      }
    } catch (e: any) {
      res.status(400).json({
        msg: e?.message,
      });
    }
  }
}

export default UsersController;
