import dotenv from 'dotenv';
dotenv.config();

export const PORT = parseInt(process.env.PORT || '8080', 10);
export const MONGO = {
  user: process.env.MONGO_USER || '',
  pass: process.env.MONGO_PASSWORD || '',
  host: process.env.MONGO_HOST || '',
  db: process.env.MONGO_DB || '',
};