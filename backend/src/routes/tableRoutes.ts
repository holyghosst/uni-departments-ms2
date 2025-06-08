import { Router } from 'express';
import { fetchTable } from '../controllers/tableController';
import { importTables } from '../controllers/importController';

const router = Router();

router.get('/:tableName', fetchTable);
router.post('/', importTables);

export default router;
