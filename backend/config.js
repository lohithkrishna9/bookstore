// config.js
import dotenv from 'dotenv';
dotenv.config();

console.log('▶️ MONGO_DB_URL =', process.env.MONGO_DB_URL);

export const PORT      = process.env.PORT || 3000;
export const mongoDBURL = process.env.MONGO_DB_URL;
