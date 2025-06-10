import { pool } from "../db"

export const updateExamDateInDatabase = async (examId: number, date: string) => {
    const query = "UPDATE Exam SET date = ? WHERE id = ?";

    const conn = await pool.getConnection();
    try {
        const result = await conn.query(query, [date, examId]);
        // console.log(result);
    } catch (error) {
        console.error("Error updating exam date: ", error);
        return -1;
    } finally {
        conn.release();
    }
};