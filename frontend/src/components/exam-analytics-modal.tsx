import React, { useEffect, useState } from "react";
import { Dialog, DialogTitle, DialogContent, Select, MenuItem, Table, TableHead, TableRow, TableCell, TableBody, Box, Button } from "@mui/material";
import { fetchExamAnalytics, fetchTableData } from "../api";
import dayjs from "dayjs";

interface Props {
    open: boolean;
    onClose: () => void;
}

interface Department {
    id: number;
    name: string;
}

const ExamAnalyticsModal: React.FC<Props> = ({ open, onClose }) => {
    const [month, setMonth] = useState(new Date().getMonth() + 1);
    const [departmentId, setDepartmentId] = useState<number | null>(null);
    const [departments, setDepartments] = useState<Department[]>([]);
    const [data, setData] = useState<any[]>([]);

    const formatDate = (date: string) => dayjs(date).format("DD/MM/YYYY");

    useEffect(() => {
        if (open) {
            fetchTableData("Department").then(setDepartments);
        }
    }, [open]);

    useEffect(() => {
        if (open && departmentId) {
            fetchExamAnalytics(month, departmentId).then(setData);
        }
    }, [month, departmentId, open]);

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>Exam Analytics</DialogTitle>
            <DialogContent>
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2, gap: 2 }}>
                    <Select
                        value={month}
                        onChange={(e) => setMonth(Number(e.target.value))}
                        displayEmpty
                        fullWidth>
                        {[...Array(12)].map((_, i) => (
                            <MenuItem key={i + 1} value={i + 1}>
                                {new Date(0, i).toLocaleString("default", { month: "long" })}
                            </MenuItem>
                        ))}
                    </Select>

                    <Select
                        value={departmentId ?? ""}
                        onChange={(e) => setDepartmentId(Number(e.target.value))}
                        displayEmpty
                        fullWidth>
                        <MenuItem value="" disabled>Select Department</MenuItem>
                        {departments.map((dept) => (
                            <MenuItem key={dept.id} value={dept.id}>{`${dept.id}. ${dept.name}`}</MenuItem>
                        ))}
                    </Select>

                    <Button variant="outlined" onClick={onClose}>Close</Button>
                </Box>

                <Table>
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
            </DialogContent>
        </Dialog>
    );
};

export default ExamAnalyticsModal;
