import { useEffect, useState } from 'react';
import axios from 'axios';
import TableDataGrid from './components/datagrid';
import { tableColumns } from './data/columns';
import Navbar from './components/navbar';
import { Box } from '@mui/material';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function App() {
  const [selectedTable, setSelectedTable] = useState<string>('Department');
  const [loading, setLoading] = useState<boolean>(false);
  const [rows, setRows] = useState<any[]>([]);
  const columns = tableColumns[selectedTable];

  const fetchTableData = async (tableName: string) => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/api/${tableName}`);
      setRows(res.data);
    } catch (err) {
      console.error(`Failed to fetch data for ${tableName}`, err);
      setRows([]);
    } finally {
      setLoading(false);
    }
  };
  const importTables = async () => {
    try {
      console.log('Importing tables...');
      const res = await axios.post(`${API_URL}/api/importTables`);
      console.log(res.data);
      if (res.status === 200) {
        await fetchTableData(selectedTable);
      }
    } catch (err) {
      console.error(`Failed to import data`, err);
      setRows([]);
    }
  };

  useEffect(() => {
    fetchTableData(selectedTable);
  }, [selectedTable]);

  const handleTableChange = (tableName: string) => {
    setSelectedTable(tableName);
  };

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar
        tableNames={Object.keys(tableColumns)}
        onTableSelect={handleTableChange}
        onImportClick={importTables}
        currentTitle={selectedTable.toUpperCase()}
      />
      <Box sx={{ flexGrow: 1 }}>
        <TableDataGrid columns={columns} rows={rows} loading={loading} onImportClick={importTables} />
      </Box>
    </Box>
  );
}
