import { Kafka, Partitioners } from "kafkajs";

let kafkaProducer = null;

// Disable Kafka in Production
if (process.env.NODE_ENV !== "production") {
  const kafka = new Kafka({
    clientId: "campusone",
  brokers: ["localhost:9092"],
    createPartitioner: Partitioners.LegacyPartitioner,
  });

  kafkaProducer = kafka.producer();

  try {
    await kafkaProducer.connect();
    console.log("📨 Kafka Producer connected (dev)");
  } catch (err) {
    console.warn("⚠️ Kafka connection failed (dev)", err);
  }
} else {
  console.log("🚫 Kafka disabled in production");
}

export { kafkaProducer };
