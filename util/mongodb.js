import mongoose from 'mongoose'

const MONGODB_URI = `mongodb://admin_2:Rv3QxOa0cBgBM4oY@cluster0-shard-00-00.2v79p.mongodb.net:27017,
cluster0-shard-00-01.2v79p.mongodb.net:27017,
cluster0-shard-00-02.2v79p.mongodb.net:27017/
bowen_cbt?ssl=true&replicaSet=atlas-okq0to-shard-0&authSource=admin&retryWrites=true&w=majority`;

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  )
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      bufferCommands: false,
      bufferMaxEntries: 0,
      useFindAndModify: false,
      useCreateIndex: true,
    }

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose
    })
  }
  cached.conn = await cached.promise
  return cached.conn
}

export default dbConnect