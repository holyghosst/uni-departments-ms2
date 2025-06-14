import React from 'react';
import { Box } from '@mui/material';
import { DataGrid, type GridColDef, type GridRowsProp } from '@mui/x-data-grid';
import { NoRowsOverlay } from './no-rows';

interface TableDataGridProps {
  columns: GridColDef[];
  rows: GridRowsProp;
  loading?: boolean;
  onImportClick?: () => void;
}

const TableDataGrid: React.FC<TableDataGridProps> = ({ columns, rows, loading, onImportClick }) => {
  return (
    <Box sx={{ height: "100%", width: '100%' }}>
      <DataGrid
        rows={rows}
        showToolbar
        columns={columns}
        loading={loading}
        disableRowSelectionOnClick
        pageSizeOptions={[5, 10, 20]}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 5 },
          },
          columns: {
            columnVisibilityModel: columns.reduce((acc, col) => {
              acc[col.field] = true;
              return acc;
            }, {} as Record<string, boolean>),
          },
        }}
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
        slots={{
          noRowsOverlay: () => <NoRowsOverlay onImportClick={onImportClick} />,
        }}
      />
    </Box>
  );
};

export default TableDataGrid;
