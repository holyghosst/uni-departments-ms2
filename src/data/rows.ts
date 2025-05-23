export const tableRows: Record<string, any[]> = {
  Department: [
    { id: 1, name: 'Mathematics', address: 'Building A', phone: '123-456-7890', email: 'math@uni.edu' },
    { id: 2, name: 'Physics', address: 'Building B', phone: '987-654-3210', email: 'physics@uni.edu' },
  ],

  Employee: [
    { id: 1, name: 'Alice Smith', hire_date: '2015-09-01', department_id: 1 },
    { id: 2, name: 'Bob Johnson', hire_date: '2018-01-15', department_id: 2 },
  ],

  Professor: [
    { employee_id: 1, field_of_research: 'Algebra', office_number: 'A123' },
    { employee_id: 2, field_of_research: 'Quantum Physics', office_number: 'B456' },
  ],

  Assistant: [
    { employee_id: 3, role: 'Lab Assistant', can_grade: true, supervisor_id: 1 },
    { employee_id: 4, role: 'Teaching Assistant', can_grade: false, supervisor_id: 2 },
  ],

  Course: [
    { id: 101, name: 'Linear Algebra', ECTS: 6, department_id: 1 },
    { id: 202, name: 'Quantum Mechanics', ECTS: 5, department_id: 2 },
  ]
}