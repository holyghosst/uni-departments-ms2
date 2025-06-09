import { pool } from '../db';
import { MinimalEmployeeData, MinimalSupervisingEmployeeData } from '../models/models';

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
        // Matbe change to dictioanry in the future for faster lookups
        // but for now, this is fine since the number of professors and assistants is usually small
        const supervisors: MinimalSupervisingEmployeeData[] = [];
        for (const row of rows) {
            const { professor_id, professor_name, assistant_id, assistant_name } = row;
            let supervisor = supervisors.find(p => p.id === professor_id);
            if (!supervisor && professor_id && professor_name) {
                supervisor = {
                    id: professor_id,
                    name: professor_name,
                    role: 'Professor',
                    subordinates: [],
                };
                supervisors.push(supervisor);
            }
            if (assistant_id && assistant_name && supervisor) {
                supervisor.subordinates.push({
                    id: assistant_id,
                    name: assistant_name,
                    role: 'Assistant',
                });
            }
        }
        return supervisors;
    } finally {
        conn.release();
    }
};