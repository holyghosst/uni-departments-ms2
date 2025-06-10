import { Request, Response } from 'express';
import { updateExamDateInDatabase } from '../services/examService';


export const updateExamDate = async (req: Request, res: Response) => {
    try {
        const examId = Number(req.params.id);
        const { date } = req.body;

        if (!examId || !date) res.status(400).json({ error: "Missing data" });

        await updateExamDateInDatabase(examId, date);
        res.status(200).json({ message: "Exam date updated successfully" });
    } catch (error) {
        res.status(400).json({ error: "Failed to update exam date"});
    }
};