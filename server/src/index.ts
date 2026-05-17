import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import connectDB from './config/db';
import { errorHandler } from './middleware/errorHandler';
import authRoutes from './routes/authRoutes';
import leadRoutes from './routes/leadRoutes';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const app: Application = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
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
