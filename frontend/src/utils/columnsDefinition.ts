import type { GridColDef } from '@mui/x-data-grid';
import CourseAssignmentModal from '../components/course-assignment-modal';
import ExamDateUpdateModal from '../components/exam-date-update-modal';
import React from 'react';
import { tableColumns } from '../data/columns';

export function getEnhancedColumns(
    selectedTable: string,
    assignedStaffMap: Record<number, { id: number; name: string; role: "Professor" | "Assistant" }[]>
): GridColDef[] {
    const columns = tableColumns[selectedTable] || [];
    if (selectedTable === 'Course') {
        return [
            ...columns,
            {
                field: 'assign',
                headerName: 'Assigned Staff',
                flex: 1,
                sortable: false,
                filterable: false,
                renderCell: (params) =>
                    React.createElement(CourseAssignmentModal, {
                        courseId: params.row.id,
                        departmentId: params.row.department_id,
                        assignedStaffMap: assignedStaffMap,
                    }),
            },
        ];
    }

    if (selectedTable === "Exam") {
        return columns.map((col) =>
            col.field === "date"
                ? {
                    ...col,
                    renderCell: (params) => {
                        return React.createElement(ExamDateUpdateModal, {
                            examId: params.row.id,
                            currentDate: params.value, 
                        });
                    },
                }
                : col
        );
    }


    return columns;
}