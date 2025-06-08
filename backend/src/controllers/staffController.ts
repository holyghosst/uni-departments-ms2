import { Request, Response } from 'express';
import { getAssignedStaffByCourses } from '../services/staffService';

export const fetchAssignedStaff = async (req: Request, res: Response) => {
    try {
        const courseIds = req.query.courseIds?.toString().split(',').map(Number) || [];
        const data = await getAssignedStaffByCourses(courseIds);
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch assigned staff' });
    }
};
