import React from 'react';
import { Box } from '@mui/material';
import { DataGrid, type GridColDef, type GridRowsProp } from '@mui/x-data-grid';

interface TableDataGridProps {
  columns: GridColDef[];
  rows: GridRowsProp;
}

const TableDataGrid: React.FC<TableDataGridProps> = ({ columns, rows }) => {
  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSizeOptions={[5]}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 5 },
          },
        }}
        checkboxSelection
        disableRowSelectionOnClick
        getRowId={(row) =>
          row.id ??
          row.employee_id ??
          row.matriculation_number ??
          `${row.course_id}-${row.student_id}`
        }
      />
    </Box>
  );
};

export default TableDataGrid;
