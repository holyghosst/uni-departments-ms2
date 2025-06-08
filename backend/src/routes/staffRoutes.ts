import { Router } from 'express';
import { fetchAssignedStaff } from '../controllers/staffController';

const router = Router();

router.get('/assigned', fetchAssignedStaff);

export default router;
