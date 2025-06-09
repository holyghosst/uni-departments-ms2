import { Request, Response } from 'express';
import { assignStaffToCourse, getAssignedStaffByCourses, getStaffByDepartment } from '../services/staffService';

export const fetchAssignedStaff = async (req: Request, res: Response) => {
    try {
        const courseIds = req.query.courseIds?.toString().split(',').map(Number) || [];
        const data = await getAssignedStaffByCourses(courseIds);
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch assigned staff' });
    }
};

export const fetchDepartmentStaff = async (req: Request, res: Response) => {
    try {
        const departmentId = req.params.departmentId ? Number(req.params.departmentId) : undefined;
        const data = await getStaffByDepartment(departmentId);
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch assigned staff' });
    }
};

export const putStaffAssignment = async (req: Request, res: Response) => {
    const courseId = Number(req.params.courseId);
    const { professorIds, assistantIds } = req.body;
    try {
        await assignStaffToCourse(courseId, professorIds, assistantIds);
        res.status(200).json({ message: 'Staff assigned successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to assign staff' });
    }
};
