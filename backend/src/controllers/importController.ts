import { Request, Response } from 'express';
import { importAllTables } from '../services/importService';

export const importTables = async (req: Request, res: Response) => {
  try {
    const rows = await importAllTables();
    res.status(200).json({ message: `Tables imported successfully, rows inserted: ${rows}` });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};
