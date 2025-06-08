import { pool } from '../db';
import { generateAll } from '../generators/universityGenerator';
import { createInsertStatement } from './insert/insertStatementCreator';

export const importAllTables = async (): Promise<number> => {
    let conn;
    try {
        conn = await pool.getConnection();

        // Delete all rows from all tables
        await conn.query('SET FOREIGN_KEY_CHECKS = 0');
        await conn.query('DELETE FROM Enrollment');
        await conn.query('DELETE FROM Exam');
        await conn.query('DELETE FROM Assistant_Assists_Course');
        await conn.query('DELETE FROM Professor_Teaches_Course');
        await conn.query('DELETE FROM Course_Prerequisite');
        await conn.query('DELETE FROM Course');
        await conn.query('DELETE FROM Assistant');
        await conn.query('DELETE FROM Professor');
        await conn.query('DELETE FROM Student');
        await conn.query('DELETE FROM Employee');
        await conn.query('DELETE FROM Department');
        await conn.query('SET FOREIGN_KEY_CHECKS = 1');

        // Generate and insert data
        const data = generateAll()
        const insertStatements = Object.entries(data).map(([tableName, rows]) =>
            createInsertStatement(tableName, rows)
        );
        var totalRows = 0;
        for (const { query, values } of insertStatements) {
            await conn.query(query, values);
            totalRows += values.length;
        }
        console.log('Departments imported successfully');
        return totalRows;
    } catch (error) {
        console.error('Failed to import data:', error);
        return 0;
    } finally {
        if (conn) conn.release();
    }
};
