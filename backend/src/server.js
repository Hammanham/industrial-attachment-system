import mongoose from "mongoose";

const {
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_HOST,
  MONGO_DB,
} = process.env;

if (!MONGO_USER || !MONGO_PASSWORD || !MONGO_HOST || !MONGO_DB) {
  console.error("❌ Missing MongoDB environment variables");
  process.exit(1);
}

const password = encodeURIComponent(MONGO_PASSWORD);

const MONGO_URI = `mongodb+srv://${MONGO_USER}:${password}@${MONGO_HOST}/${MONGO_DB}?retryWrites=true&w=majority`;

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });
