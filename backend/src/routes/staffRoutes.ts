import { Router } from 'express';
import { fetchAssignedStaff, fetchDepartmentStaff, putStaffAssignment } from '../controllers/staffController';

const router = Router();

router.get('/assigned', fetchAssignedStaff);
router.get('/department/:departmentId', fetchDepartmentStaff);
router.post('/assign/:courseId', putStaffAssignment);

export default router;
