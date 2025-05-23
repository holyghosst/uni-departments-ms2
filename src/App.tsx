import React, { useState } from 'react';
import SearchAppBar from './components/navbar';
import TableDataGrid from './components/datagrid';
import { tableColumns } from './data/columns';
import { tableRows } from './data/rows';

export default function App() {
  const [selectedTable, setSelectedTable] = useState<string>('Student');

  const handleTableChange = (tableName: string) => {
    setSelectedTable(tableName);
  };

  const columns = tableColumns[selectedTable];
  const rows = tableRows[selectedTable];

  return (
    <>
      <SearchAppBar
        tableNames={Object.keys(tableColumns) as string[]}
        onTableSelect={handleTableChange}
        currentTitle={selectedTable.toUpperCase()}
      />
      <TableDataGrid columns={columns} rows={rows} />
    </>
  );
}
