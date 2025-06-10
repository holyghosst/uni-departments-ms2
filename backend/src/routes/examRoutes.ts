import { Router } from "express";
import { updateExamDate } from "../controllers/examController";


const router = Router();

router.put("/:id/date", updateExamDate);

export default router;