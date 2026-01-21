import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;
const DB = process.env.DB;

let cached = global.mongoose || { conn: null, promise: null };

async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      dbName: DB,
    });
  }

  cached.conn = await cached.promise;
  global.mongoose = cached;
  return cached.conn;
}

export { connectDB };





//  ---TypeScript---

// "use server"
// import mongoose from "mongoose";

// interface Connection {
//   isConnected?: number;
// }

// const connection: Connection = {};

// export default async function connectDB(): Promise<void> {
//   if (connection.isConnected) {
//     return console.log("Already connected to the database");
//   }

//   if (!process.env.DB_URL) {
//     throw new Error("DB Url not found");
//   }

//   try {
//     const db = await mongoose.connect(process.env.DB_URL, {
//       dbName: "Linkers",
//     });

//     connection.isConnected = db.connections[0].readyState;

//     console.log("Database connected successfully");
//   } catch (error) {
//     console.error("Database connection failed:", error);
//     throw new Error("Failed to connect to the database");
//   }
// }