import { Router } from "express";
import { fetchExamAnalytics, updateExamDate } from "../controllers/examController";


const router = Router();

router.put("/:id/date", updateExamDate);
router.get("/stats", fetchExamAnalytics);

export default router;