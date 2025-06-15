import React, { useEffect, useState } from "react";
import { Dialog, DialogTitle, DialogContent, Select, MenuItem, Table, TableHead, TableRow, TableCell, TableBody, Box, Button, Typography, } from "@mui/material";
import { fetchExamAnalytics } from "../api";
import dayjs from "dayjs";

interface Props {
    open: boolean;
    onClose: () => void;
}

interface ExamAnalyticsRow {
    department_id: number;
    department_name: string;
    course_id: number;
    course_name: string;
    total_exams: number;
    earliest_exam_date: string;
    latest_exam_date: string;
}



const ExamAnalyticsModal: React.FC<Props> = ({ open, onClose }) => {
    const [month, setMonth] = useState<number>(new Date().getMonth() + 1);
    const [data, setData] = useState<ExamAnalyticsRow[]>([]);

    const formatDate = (date: string) => dayjs(date).format("DD/MM/YYYY");

    useEffect(() => {
        if (open) {
            fetchExamAnalytics(month)
                .then(setData)
                .catch((err) => {
                    console.error("Failed to fetch exam analytics", err);
                    setData([]);
                });
        }
    }, [open, month]);


    return (
        <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
            <DialogTitle>Exam Analytics</DialogTitle>
            <DialogContent>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                    <Typography variant="subtitle1">Select Month:</Typography>
                    <Select value={month} onChange={(e) => setMonth(Number(e.target.value))}>
                        {[...Array(12)].map((_, i) => (
                            <MenuItem key={i + 1} value={i + 1}>
                                {new Date(0, i).toLocaleString("default", { month: "long" })}
                            </MenuItem>
                        ))}
                    </Select>
                    <Button variant="outlined" onClick={onClose}>
                        Close
                    </Button>
                </Box>

                {data.length > 0 ? (
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>Department ID</TableCell>
                                <TableCell>Department Name</TableCell>
                                <TableCell>Course ID</TableCell>
                                <TableCell>Course Name</TableCell>
                                <TableCell>Total Exams</TableCell>
                                <TableCell>Earliest Exam</TableCell>
                                <TableCell>Latest Exam</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((row, idx) => (
                                <TableRow key={idx}>
                                    <TableCell>{row.department_id}</TableCell>
                                    <TableCell>{row.department_name}</TableCell>
                                    <TableCell>{row.course_id}</TableCell>
                                    <TableCell>{row.course_name}</TableCell>
                                    <TableCell>{row.total_exams}</TableCell>
                                    <TableCell>{formatDate(row.earliest_exam_date)}</TableCell>
                                    <TableCell>{formatDate(row.latest_exam_date)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                ) : (
                    <Typography variant="body2" sx={{ mt: 2 }}>
                        No analytics data available for this month.
                    </Typography>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default ExamAnalyticsModal;
