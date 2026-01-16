import dotenv from "dotenv";
dotenv.config({ path: ".env" });

import { dbConnect } from "./db/index.js";
let kafkaProducer = null;
if (process.env.NODE_ENV !== "production") {
  const mod = await import("./kafka/producer.js");
  kafkaProducer = mod.kafkaProducer;
}


const PORT = process.env.PORT;

const startServer = async () => {
  const { default: app } = await import("./app.js");

  try {
    await dbConnect();
    console.log("📦 MongoDB connected");
    if (process.env.NODE_ENV !== "production") {
      await kafkaProducer.connect();
      console.log("📨 Kafka Producer connected");
    }

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error("🔴 Startup failed:", error);
  }
};

startServer();
