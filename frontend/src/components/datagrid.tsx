import React from 'react';
import { Box } from '@mui/material';
import { DataGrid, type GridColDef, type GridRowsProp } from '@mui/x-data-grid';

interface TableDataGridProps {
  columns: GridColDef[];
  rows: GridRowsProp;
  loading?: boolean;
}

const TableDataGrid: React.FC<TableDataGridProps> = ({ columns, rows, loading}) => {
  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        loading={loading}
        pageSizeOptions={[5]}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 5 },
          },
        }}
        disableRowSelectionOnClick
        getRowId={(row) =>
          row.id ??
          row.employee_id ??
          row.matriculation_number ??
          `${row.course_id}-${row.student_id}`
        }
        slotProps={{
          loadingOverlay: {
            variant: 'circular-progress',
            noRowsVariant: 'circular-progress',
          },
        }}
      />

    </Box>
  );
};

export default TableDataGrid;
