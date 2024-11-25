import mongoose, { Mongoose } from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

console.log(MONGODB_URI, "URI");
if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

// Define a type for the cached mongoose connection
interface CachedMongoose {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

// Use globalThis instead of NodeJS namespace to augment the global object
let cached = globalThis.mongoose as CachedMongoose | undefined;

if (!cached) {
  cached = globalThis.mongoose = { conn: null, promise: null };
}

// Function to connect to the MongoDB database
async function dbConnect(): Promise<Mongoose> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }
  cached.conn = await cached.promise;

  if (cached.conn) {
    console.log("connected to DB");
  } else {
    console.log("didn't connect");
  }

  return cached.conn;
}

export default dbConnect;
export const dynamic = "force-dynamic";
