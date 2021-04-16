// import { MongoClient } from 'mongodb'

// const { MONGODB_URI, MONGODB_DB } = process.env
// console.log(MONGODB_DB, MONGODB_URI);
// if (!MONGODB_URI) {
//   throw new Error(
//     'Please define the MONGODB_URI environment variable inside .env.local'
//   )
// }

// if (!MONGODB_DB) {
//   throw new Error(
//     'Please define the MONGODB_DB environment variable inside .env.local'
//   )
// }

// let cached = global.mongo

// if (!cached) {
//   cached = global.mongo = { conn: null, promise: null }
// }

// export async function connectToDatabase() {
//   if (cached.conn) {
//     return cached.conn
//   }

//   if (!cached.promise) {
//     const opts = {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     }

//     cached.promise = MongoClient.connect(MONGODB_URI, opts).then((client) => {
//       return {
//         client,
//         db: client.db(MONGODB_DB),
//       }
//     })
//   }
//   cached.conn = await cached.promise
//   return cached.conn
// }

import mongoose from 'mongoose'

export default async function dbConnection(){
    if (mongoose.connections[0].readyState) return;
    await mongoose.connect(process.env.mongodbUrl, {
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
        useNewUrlParser: true
    });
};