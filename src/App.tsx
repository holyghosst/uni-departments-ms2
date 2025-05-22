import React, { useState } from 'react';
import SearchAppBar from './components/navbar';
import TableDataGrid from './components/datagrid';
import { mockTables } from './data/datastore';
import { type GridColDef } from '@mui/x-data-grid';

type RowData = {
  [key: string]: any;
}

export default function App() {
  const [selectedTable, setSelectedTable] = useState<string>('students');

  const handleTableChange = (tableName: string) => {
    setSelectedTable(tableName);
  };

  const { columns, rows }: { columns: GridColDef[]; rows: RowData[] } = mockTables[selectedTable];

  return (
    <>
      <SearchAppBar
        tableNames={Object.keys(mockTables) as string[]}
        onTableSelect={handleTableChange}
        currentTitle={selectedTable.toUpperCase()}
      />
      <TableDataGrid columns={columns} rows={rows} />
    </>
  );
}
