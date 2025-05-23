import { type GridColDef } from '@mui/x-data-grid';

export const tableColumns: Record<string, GridColDef[]> = {
  Department: [
    { field: 'id', headerName: 'ID', type: 'number', flex: 1 },
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'address', headerName: 'Address', flex: 1 },
    { field: 'phone', headerName: 'Phone', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1 },
  ],

  Employee: [
    { field: 'id', headerName: 'ID', type: 'number', flex: 1 },
    { field: 'name', headerName: 'Name', flex: 1 },
    {
      field: 'hire_date',
      headerName: 'Hire Date',
      type: 'date',
      valueGetter: (value) => new Date(value)
      , flex: 1
    },
    { field: 'department_id', headerName: 'Department ID', type: 'number', flex: 1 },
  ],

  Professor: [
    { field: 'employee_id', headerName: 'Employee ID', type: 'number', flex: 1 },
    { field: 'field_of_research', headerName: 'Field of Research', flex: 1 },
    { field: 'office_number', headerName: 'Office Number', flex: 1 },
  ],

  Assistant: [
    { field: 'employee_id', headerName: 'Employee ID', type: 'number', flex: 1 },
    { field: 'role', headerName: 'Role', flex: 1 },
    { field: 'can_grade', headerName: 'Can Grade', type: 'boolean', flex: 1 },
    { field: 'supervisor_id', headerName: 'Supervisor ID', type: 'number', flex: 1 },
  ],

  Course: [
    { field: 'id', headerName: 'ID', type: 'number', flex: 1 },
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'ECTS', headerName: 'ECTS', type: 'number', flex: 1 },
    { field: 'department_id', headerName: 'Department ID', type: 'number', flex: 1 },
  ],

  Course_Prerequisite: [
    { field: 'course_id', headerName: 'Course ID', type: 'number', flex: 1 },
    { field: 'prerequisite_id', headerName: 'Prerequisite ID', type: 'number', flex: 1 },
  ],

  Professor_Teaches_Course: [
    { field: 'professor_id', headerName: 'Professor ID', type: 'number', flex: 1 },
    { field: 'course_id', headerName: 'Course ID', type: 'number', flex: 1 },
  ],

  Assistant_Assists_Course: [
    { field: 'assistant_id', headerName: 'Assistant ID', type: 'number', flex: 1 },
    { field: 'course_id', headerName: 'Course ID', type: 'number', flex: 1 },
  ],

  Exam: [
    { field: 'id', headerName: 'ID', type: 'number', flex: 1 },
    { field: 'course_id', headerName: 'Course ID', type: 'number', flex: 1 },
    { field: 'name', headerName: 'Name', flex: 1 },
    {
      field: 'date',
      headerName: 'Date',
      type: 'date',
      valueGetter: (value) => new Date(value)
      , flex: 1
    },
    { field: 'ECTS', headerName: 'ECTS', type: 'number', flex: 1 },
  ],

  Student: [
    { field: 'matriculation_number', headerName: 'Matriculation Number', type: 'number', flex: 1 },
    { field: 'name', headerName: 'Name', flex: 1 },
    {
      field: 'date_of_birth',
      headerName: 'Date of Birth',
      type: 'date',
      valueGetter: (value) => new Date(value)
      , flex: 1
    },
  ],

  Enrollment: [
    { field: 'student_id', headerName: 'Student ID', type: 'number', flex: 1 },
    { field: 'course_id', headerName: 'Course ID', type: 'number', flex: 1 },
  ],
};
