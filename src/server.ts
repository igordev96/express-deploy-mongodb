import express from "express";
import router from "./routes";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import helmet from "helmet";
// @ts-ignore
import xssClean from "xss-clean";
// @ts-ignore
import hpp from "hpp";
import mongoSanitize from "express-mongo-sanitize";
import rateLimit from "express-rate-limit";

const prisma = new PrismaClient();

const limiter = rateLimit({
  windowMs: 10 * 60 * 100,
  max: 100,
});

const app = express();
dotenv.config();

app.use(express.json());
app.use(helmet());
app.use(xssClean());
app.use(hpp());
app.use(mongoSanitize());
app.use(limiter);

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
