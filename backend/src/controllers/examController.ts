import { Request, Response } from 'express';
import { updateExamDateInDatabase } from '../services/examService';
import { getExamAnalytics } from '../services/examAnalyticsService';


export const updateExamDate = async (req: Request, res: Response) => {
    try {
        const examId = Number(req.params.id);
        const { date } = req.body;

        if (!examId || !date) res.status(400).json({ error: "Missing data" });

        await updateExamDateInDatabase(examId, date);
        res.status(200).json({ message: "Exam date updated successfully" });
    } catch (error) {
        res.status(400).json({ error: "Failed to update exam date" });
    }
};

export const fetchExamAnalytics = async (req: Request, res: Response) => {
    try {
        const month = Number(req.query.month);
        if (!month || month < 1 || month > 12) {
            res.status(400).json({ error: "Invalid or missing month" });
        }

        const stats = await getExamAnalytics(month);
        res.status(200).json(stats);
    } catch (err) {
        console.error("Error fetching exam stats:", err);
        res.status(400).json({ error: "Server error" });
    }
};