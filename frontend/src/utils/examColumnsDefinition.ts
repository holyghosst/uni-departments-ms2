import type { GridColDef } from '@mui/x-data-grid';
import ExamDateUpdateModal from '../components/exam-date-update-modal';
import React from 'react';
import { tableColumns } from '../data/columns';


export function getExamColumns(selectedTable: string, onUpdated?: () => void): GridColDef[] {
    const columns = tableColumns[selectedTable] || [];
    if (selectedTable === "Exam") {
        return columns.map((col) =>
            col.field === "date"
                ? {
                    ...col,
                    renderCell: (params) => {
                        const rowDate = params.row.date;
                        if (!rowDate) return null; // first load with NaNs
                        return React.createElement(ExamDateUpdateModal, {
                            examId: params.row.id,
                            currentDate: params.value,
                            onUpdated,
                        });
                    },
                }
                : col
        );
    }
    return columns;
}