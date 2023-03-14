import express from "express";
import router from "./routes";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const app = express();
dotenv.config();

app.use(express.json());

app.use("/api", router);

const port = process.env.PORT || 3030;

const boostrap = async () => {
  await prisma.$connect();
  app.listen(port, () => console.log(`Listening on ${port}`));
};

boostrap()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
