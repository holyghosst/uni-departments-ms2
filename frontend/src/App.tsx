import { useEffect, useState } from 'react';
import axios from 'axios';
import SearchAppBar from './components/navbar';
import TableDataGrid from './components/datagrid';
import { tableColumns } from './data/columns';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function App() {
  const [selectedTable, setSelectedTable] = useState<string>('Department');
  const [rows, setRows] = useState<any[]>([]);
  const columns = tableColumns[selectedTable];

  const fetchTableData = async (tableName: string) => {
    try {
      const res = await axios.get(`${API_URL}/api/${tableName}`);
      setRows(res.data);
    } catch (err) {
      console.error(`Failed to fetch data for ${tableName}`, err);
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
    <>
      <SearchAppBar
        tableNames={Object.keys(tableColumns)}
        onTableSelect={handleTableChange}
        currentTitle={selectedTable.toUpperCase()}
      />
      <TableDataGrid columns={columns} rows={rows} />
    </>
  );
}
