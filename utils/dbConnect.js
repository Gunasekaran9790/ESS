import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("⚠️ Please define MONGODB_URI in your .env.local file");
}

// Global cache to reuse connection
let cached = global.mongoose || { conn: null, promise: null };

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  /*if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    });
  }*/

    if (!cached.promise) {
        try {
          cached.promise = mongoose.connect(MONGODB_URI, {
            bufferCommands: false,
          });
        } catch (err) {
          console.error('Mongoose connection error:', err);
          throw err;
        }
      }

      try {
        cached.conn = await cached.promise;
        global.mongoose = cached;
        return cached.conn;
      } catch (err) {
        console.error('Error awaiting mongoose connection promise:', err);
        throw err;
      }

  /*cached.conn = await cached.promise;
  global.mongoose = cached;
  return cached.conn;*/
}

export default dbConnect;