export interface Department {
    id: number;
    name: string;
    address: string;
    phone: string;
    email: string;
}
export interface Employee {
    id: number;
    name: string;
    hire_date: Date;
    department_id: number;
}
export interface Professor {
    employee_id: number;
    field_of_research: string;
    office_number: string;
}
export interface Assistant {
    employee_id: number;
    role: string;
    can_grade: boolean;
    supervisor_id: number;
}
export interface Course {
    id: number;
    name: string;
    ECTS: number;
    department_id: number;
}
export interface Course_Prerequisite {
    course_id: number;
    prerequisite_id: number;
}
export interface Professor_Teaches_Course {
    professor_id: number;
    course_id: number;
}
export interface Assistant_Assists_Course {
    assistant_id: number;
    course_id: number;
}
export interface Exam {
    id: number;
    course_id: number;
    name: string;
    date: Date;
    ECTS: number;
}
export interface Student {
    matriculation_number: number;
    name: string;
    date_of_birth: Date;
}
export interface Enrollment {
    student_id: number;
    course_id: number;
}
export interface MinimalEployeeData {
    id: number;
    name: string;
    role: 'Professor' | 'Assistant';
}