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
        const month = Number(req.params.month);
        const departmentId = Number(req.params.departmentId);

        if (!month || !departmentId) {
            res.status(400).json({ error: "Invalid or missing parameters" });
        }
        const stats = await getExamAnalytics(month, departmentId);
        res.status(200).json(
            stats.map((row: { total_exams: any; }) => ({
                ...row,
                total_exams: Number(row.total_exams),
            }))
        );
    } catch (error) {
        console.error("Error fetching exam stats:", error);
        res.status(500).json({ error: "Server error" });
    }
};

