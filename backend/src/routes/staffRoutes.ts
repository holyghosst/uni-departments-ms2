import { Router } from 'express';
import { fetchAssignedStaff, fetchDepartmentStaff } from '../controllers/staffController';

const router = Router();

router.get('/assigned', fetchAssignedStaff);
router.get('/department/:departmentId', fetchDepartmentStaff);

export default router;
