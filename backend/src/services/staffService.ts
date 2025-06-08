import { pool } from '../db';
import { MinimalEployeeData } from '../models/models';

export const getAssignedStaffByCourses = async (courseIds: number[]) => {
    if (courseIds.length === 0) return {};
    const placeholders = courseIds.map(() => '?').join(', ');
    const query = `
    SELECT 
        c.course_id,
        e.id,
        e.name,
        c.role
    FROM (
        SELECT professor_id AS employee_id, course_id, 'Professor' AS role FROM Professor_Teaches_Course
        UNION
        SELECT assistant_id AS employee_id, course_id, 'Assistant' AS role FROM Assistant_Assists_Course
    ) AS c
    JOIN Employee e ON c.employee_id = e.id
    WHERE c.course_id IN (${placeholders})
    `;
    const conn = await pool.getConnection();
    try {
        const rows = await conn.query(query, courseIds);
        const result: Record<number, MinimalEployeeData[]> = {};
        for (const { course_id, id, name, role } of rows) {
            if (!result[course_id]) result[course_id] = [];
            result[course_id].push({ id, name, role });
        }
        return result;
    } finally {
        conn.release();
    }
};
