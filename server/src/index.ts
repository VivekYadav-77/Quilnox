import express, { Application } from 'express';
import cors from 'cors';
import type { CorsOptions } from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import connectDB from './config/db';
import { errorHandler } from './middleware/errorHandler';
import authRoutes from './routes/authRoutes';
import leadRoutes from './routes/leadRoutes';

dotenv.config({ path: path.resolve(process.cwd(), '../.env') });
dotenv.config({ path: path.resolve(process.cwd(), '.env'), override: true });

const app: Application = express();
const PORT = process.env.PORT || 5000;
const splitOrigins = (value: string | undefined): string[] => {
  return value
    ? value
        .split(',')
        .map((origin) => origin.trim().replace(/\/$/, ''))
        .filter(Boolean)
    : [];
};

const allowedOrigins = [
  ...splitOrigins(process.env.CLIENT_ORIGIN),
  ...splitOrigins(process.env.CLIENT_ORIGINS),
  'https://quilnox.vercel.app',
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:3000',
  'http://127.0.0.1:3000',
];

const corsOptions: CorsOptions = {
  origin(origin, callback) {
    const normalizedOrigin = origin?.replace(/\/$/, '');

    if (!normalizedOrigin || allowedOrigins.includes(normalizedOrigin)) {
      callback(null, true);
      return;
    }

    callback(new Error(`CORS blocked origin: ${origin}`));
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions));
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ success: true, message: 'Server is running' });
});

app.use('/api/auth', authRoutes);
app.use('/api/leads', leadRoutes);
app.use(errorHandler);

const startServer = async (): Promise<void> => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

void startServer();

export default app;
