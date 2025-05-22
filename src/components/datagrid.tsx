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
      />
    </Box>
  );
};

export default TableDataGrid;
