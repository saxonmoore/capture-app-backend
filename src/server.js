import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { app } from './app.js';

dotenv.config();

const PORT = parseInt(process.env.PORT || '8080', 10);

const user = encodeURIComponent(process.env.MONGO_USER || '');
const pass = encodeURIComponent(process.env.MONGO_PASSWORD || '');
const host = process.env.MONGO_HOST;
const db = process.env.MONGO_DB;
const mongoURI = `mongodb+srv://${user}:${pass}@${host}/${db}?retryWrites=true&w=majority`;

async function start() {
  try {
    await mongoose.connect(mongoURI, { dbName: db });
    console.log(`Connected to MongoDB: ${db}`);

    const server = app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });

    const shutdown = async () => {
      console.log('Shutting down...');
      await mongoose.disconnect();
      server.close(() => process.exit(0));
    };
    process.on('SIGINT', shutdown);
    process.on('SIGTERM', shutdown);

  } catch (err) {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1);
  }
}

start();