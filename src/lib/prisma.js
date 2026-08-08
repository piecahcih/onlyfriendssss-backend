import "dotenv/config";
// import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "../generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";
import fs from "fs";
import path from "path";

// const adapter = new PrismaMariaDb({
//   host: process.env.DATABASE_HOST,
//   user: process.env.DATABASE_USER,
//   password: process.env.DATABASE_PASSWORD,
//   database: process.env.DATABASE_NAME,
//   connectionLimit: 5,
// });

// const databaseUrl = new URL(process.env.DATABASE_URL);
// const adapter = new PrismaMariaDb({
//     host: databaseUrl.hostname,
//     port: parseInt(databaseUrl.port) || 3306,
//     user: decodeURIComponent(databaseUrl.username),
//     password: decodeURIComponent(databaseUrl.password),
//     database: databaseUrl.pathname.slice(1),
//     connectionLimit: 5
// })

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  max: 10,
  // ssl: { rejectUnauthorized: false }
  ssl: {
    rejectUnauthorized: true,
    ca: fs.readFileSync(path.join(import.meta.dirname, "certs/prod-ca-2021.crt")).toString(),
  }
});
const adapter = new PrismaPg(pool);


const prisma = new PrismaClient({ adapter });

export { prisma };
