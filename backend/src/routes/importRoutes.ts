import { Router } from 'express';
import { importTables } from '../controllers/importController';

const router = Router();

router.post('/importTables', importTables);

export default router;