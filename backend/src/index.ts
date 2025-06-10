import express from 'express';
import cors from 'cors';
import tableRoutes from './routes/tableRoutes';
import dotenv from 'dotenv';
import staffRoutes from './routes/staffRoutes';
import examRoutes from './routes/examRoutes';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());  

app.use('/api/tables', tableRoutes);
app.use('/api/staff', staffRoutes);
app.use("/api/exams", examRoutes);

const HOST = process.env.HOST || 'localhost';
const PORT = Number(process.env.PORT) || 5000;

app.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}`);
});