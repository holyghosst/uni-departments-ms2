import { Request, Response } from 'express';
import { getTableData } from '../services/tableService';

export const fetchTable = async (req: Request, res: Response) => {
  const { tableName } = req.params;

  try {
    const rows = await getTableData(tableName);
    res.json(rows);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};
