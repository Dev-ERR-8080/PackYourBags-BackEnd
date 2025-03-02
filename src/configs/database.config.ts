import { connect } from "mongoose";

export const dbconncet = async () => {
  try {
    const uri = process.env.MONGO_URI;
    if (!uri) {
      throw new Error("MongoDB URI is missing in environment variables.");
    }

    await connect(uri); // No need for extra options in Mongoose 6+
    
    console.log("✅ Connected to MongoDB successfully!");
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error);
    process.exit(1);
  }
};
