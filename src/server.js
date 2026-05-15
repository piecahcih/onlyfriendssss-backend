import 'dotenv/config'
import server from './app.js'
import { PrismaClient } from "./generated/prisma/client.js";

const prisma = new PrismaClient();
const port = process.env.PORT || 3000

server.listen(port, () => console.log(`Server is running on port: ${port}`))

async function testConnection() {
  try {
    await prisma.$connect();
    console.log("✅ DATABASE CONNECTED SUCCESSFULLY");
    const userCount = await prisma.user.count();
    console.log(`📊 Current User Count: ${userCount}`);
  } catch (error) {
    console.error("❌ DATABASE CONNECTION FAILED:", error.message);
  }
}

testConnection();
