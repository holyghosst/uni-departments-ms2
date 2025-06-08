import { useEffect, useState } from 'react';
import TableDataGrid from './components/datagrid';
import { tableColumns } from './data/columns';
import Navbar from './components/navbar';
import { Box } from '@mui/material';
import { fetchTableData, importTables } from './api';

export default function App() {
  const [selectedTable, setSelectedTable] = useState<string>('Department');
  const [loading, setLoading] = useState<boolean>(false);
  const [rows, setRows] = useState<any[]>([]);
  const columns = tableColumns[selectedTable];

  const loadTable = async (tableName: string) => {
    setLoading(true);
    try {
      const data = await fetchTableData(tableName);
      setRows(data);
    } catch (err) {
      console.error(`Failed to fetch data for ${tableName}`, err);
      setRows([]);
    } finally {
      setLoading(false);
    }
  };
  const handleImport = async () => {
    try {
      console.log('Importing tables...');
      const res = await importTables();
      console.log(res.data);
      if (res.status === 200) {
        await loadTable(selectedTable);
      }
    } catch (err) {
      console.error('Failed to import data', err);
    }
  };

  useEffect(() => {
    loadTable(selectedTable);
  }, [selectedTable]);

  const handleTableChange = (tableName: string) => {
    setSelectedTable(tableName);
  };

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar
        tableNames={Object.keys(tableColumns)}
        onTableSelect={handleTableChange}
        onImportClick={handleImport}
        currentTitle={selectedTable.toUpperCase()}
      />
      <Box sx={{ flexGrow: 1 }}>
        <TableDataGrid columns={columns} rows={rows} loading={loading} onImportClick={handleImport} />
      </Box>
    </Box>
  );
}
