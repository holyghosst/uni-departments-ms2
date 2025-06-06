import express from 'express';
import cors from 'cors';
import tableRoutes from './routes/tableRoutes';
import dotenv from 'dotenv';
import { importTables } from './controllers/importController';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', tableRoutes);
app.post('/api/importTables', importTables);

const HOST = process.env.HOST || 'localhost';
const PORT = Number(process.env.PORT) || 5000;

app.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}`);
});