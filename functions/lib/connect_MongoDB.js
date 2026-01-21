import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const DB = process.env.DB;

if (!uri) throw new Error("Missing DB env var");

const client = new MongoClient(uri, {
  serverApi: { version: ServerApiVersion.v1, strict: true, deprecationErrors: true },
});

let db;
async function getDB() {
  if (!db) {
    await client.connect();
    db = client.db(DB);
  }
  return db;
}




//  ---TypeScript---

// import { Db, MongoClient } from "mongodb";

// const uri = process.env.MONGODB_URI;
// const DB = process.env.DB;

// if (!uri) throw new Error("Please define the MONGODB_URI environment variable");

// declare global {
//   // Allow global variable in dev to prevent multiple connections
//   // eslint-disable-next-line no-var
//   var _mongoClientPromise: Promise<MongoClient> | undefined;
// }

// let client: MongoClient;
// let clientPromise: Promise<MongoClient>;

// if (process.env.NODE_ENV === "development") {
//   if (!global._mongoClientPromise) {
//     client = new MongoClient(uri);
//     global._mongoClientPromise = client.connect();
//   }
//   clientPromise = global._mongoClientPromise;
// } else {
//   client = new MongoClient(uri);
//   clientPromise = client.connect();
// }

// clientPromise.then(() => console.log("✅ MongoDB connected successfully"));


// export async function mongoConnect(): Promise<{
//   client: MongoClient;
//   db: Db;
// }> {
//   const client = await clientPromise;
//   const db = client.db(DB);
//   return { client, db };
// }