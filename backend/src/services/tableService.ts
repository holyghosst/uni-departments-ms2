import { pool } from '../db';
import { allowedTables } from '../allowedTables';

export const getTableData = async (tableName: string) => {
  if (!allowedTables.includes(tableName)) {
    throw new Error('Invalid table name');
  }

  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query(`SELECT * FROM ${tableName}`);
    return rows;
  } finally {
    if (conn) conn.release();
  }
};
