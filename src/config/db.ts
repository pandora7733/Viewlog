// local 백그라운드 서버 구동 (mongodb-macos-aarch64-8.0.11)
/**
 * 시작: ./bin/mongod --dbpath ./data --fork --logpath ./log/mongod.log
 * 종료: ./bin/mongo 이후 use admin 하고 db.shutdownServer()
 */
import mongoose from 'mongoose';
import asyncHandler from 'express-async-handler';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = asyncHandler(async () => {
    const connect = await mongoose.connect(process.env.CONNECT_MONGO_DB as string);
    console.log(`DB Connected: ${connect.connection.host}`);
});

module.exports = connectDB;