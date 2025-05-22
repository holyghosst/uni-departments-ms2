import { type GridColDef } from '@mui/x-data-grid';

interface TableData<T> {
  columns: GridColDef[];
  rows: T[];
}

export const mockTables: Record<string, TableData<any>> = {
  students: {
    columns: [
      { field: 'id', headerName: 'ID', width: 90 },
      { field: 'firstName', headerName: 'First name', width: 150 },
      { field: 'lastName', headerName: 'Last name', width: 150 },
      { field: 'age', headerName: 'Age', type: 'number', width: 110 },
    ],
    rows: [
      { id: 1, firstName: 'Jon', lastName: 'Snow', age: 14 },
      { id: 2, firstName: 'Cersei', lastName: 'Lannister', age: 31 },
    ],
  },
  courses: {
    columns: [
      { field: 'id', headerName: 'Course ID', width: 110 },
      { field: 'title', headerName: 'Title', width: 200 },
      { field: 'credits', headerName: 'Credits', type: 'number', width: 100 },
    ],
    rows: [
      { id: 1, title: 'Math 101', credits: 3 },
      { id: 2, title: 'History 201', credits: 4 },
    ],
  },
};
