import { pool } from "../db";

export const getExamAnalytics = async (month: number | undefined, departmentId: number) => {
    if (!month) return [];
    const query = `
        SELECT
        d.id AS department_id,
        d.name AS department_name,
        c.id AS course_id,
        c.name AS course_name,
        COUNT(e.id) AS total_exams,
        MIN(e.date) AS earliest_exam_date,
        MAX(e.date) AS latest_exam_date
        FROM Exam e
        JOIN Course c ON e.course_id = c.id
        JOIN Department d ON c.department_id = d.id
        WHERE MONTH(e.date) = ? AND d.id = ?
        GROUP BY d.id, d.name, c.id, c.name
        ORDER BY total_exams DESC

    `;
    const conn = await pool.getConnection();
    try {
        const rows = await conn.query(query, [month, departmentId]);
        return rows;
    } catch (error) {
        console.error("Error while getting Exam statistics: ", error);
    } finally {
        conn.release();
    }
};
