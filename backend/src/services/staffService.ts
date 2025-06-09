import { pool } from '../db';
import { MinimalEmployeeData, MinimalSupervisingEmployeeData } from '../models/models';
import { transformToSupervisingStructure } from './utils/dataTransform';

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
        const result: Record<number, MinimalEmployeeData[]> = {};
        for (const { course_id, id, name, role } of rows) {
            if (!result[course_id]) result[course_id] = [];
            result[course_id].push({ id, name, role });
        }
        return result;
    } finally {
        conn.release();
    }
};

export const getStaffByDepartment = async (
    departmentId: number | undefined
): Promise<MinimalSupervisingEmployeeData[]> => {
    if (!departmentId) return [];

    const query = `
    SELECT 
      p.id AS professor_id,
      p.name AS professor_name,
      a.id AS assistant_id,
      a.name AS assistant_name
    FROM Professor prof
    JOIN Employee p ON prof.employee_id = p.id
    LEFT JOIN Assistant a_rel ON a_rel.supervisor_id = prof.employee_id
    LEFT JOIN Employee a ON a_rel.employee_id = a.id
    WHERE p.department_id = ?
  `;

    const conn = await pool.getConnection();
    try {
        const rows = await conn.query(query, [departmentId]);
        return transformToSupervisingStructure(rows);
    } finally {
        conn.release();
    }
};


export const assignStaffToCourse = async (courseId: number, professorIds: number[], assistantIds: number[]) => {
    if (!courseId) return;
    const deleteQueries = ['DELETE FROM Professor_Teaches_Course WHERE course_id = ?',
        'DELETE FROM Assistant_Assists_Course WHERE course_id = ?'];
    const conn = await pool.getConnection();
    try {
        await conn.beginTransaction();
        deleteQueries.forEach(async (query) => {
            await conn.query(query, [courseId]);
        }
        );
        if (professorIds && professorIds.length > 0) {
            const data = professorIds.map(id => [id, courseId]);
            await conn.batch(
                'INSERT INTO Professor_Teaches_Course (professor_id, course_id) VALUES (?, ?)',
                data
            );
        }
        if (assistantIds && assistantIds.length > 0) {
            const data = assistantIds.map(id => [id, courseId]);
            await conn.batch(
                'INSERT INTO Assistant_Assists_Course (assistant_id, course_id) VALUES (?, ?)',
                data
            );
        }
        await conn.commit();
    } catch (err) {
        await conn.rollback();
        throw err;
    } finally {
        conn.release();
    }
};
