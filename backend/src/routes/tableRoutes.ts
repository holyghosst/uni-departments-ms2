import { Router } from 'express';
import { fetchTable } from '../controllers/tableController';

const router = Router();

router.get('/:tableName', fetchTable);

export default router;
