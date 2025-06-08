import { NUMBER_OF_DEPARTMENTS, NUMBER_OF_EMPLOYEES, NUMBER_OF_COURSES, NUMBER_OF_EXAMS, NUMBER_OF_STUDENTS } from "../constants/constants";
import { generateAssistantAssists } from "./assistantAssistsGenerator";
import { generateAssistants } from "./assistantGenerator";
import { generateCourses } from "./courseGenerator";
import { generateDepartments } from "./departmentGenerator";
import { generateEmployees } from "./employeeGenerator";
import { generateEnrollments } from "./enrollmentGenerator";
import { generateExams } from "./examGenerator";
import { generateCoursePrerequisites } from "./prerequisiteGenerator";
import { generateProfessors } from "./professorGenerator";
import { generateProfessorTeaches } from "./professorTeachesGenerator";
import { generateStudents } from "./studentGenerator";

export function generateAll(): Record<string, any[]> {
    const departments = generateDepartments(NUMBER_OF_DEPARTMENTS);
    const departmentIds = departments.map(d => d.id);
    const employees = generateEmployees(NUMBER_OF_EMPLOYEES, departmentIds);
    const employeeIds = employees.map(e => e.id);
    const professorEmployees = employeeIds.slice(0, Math.floor(NUMBER_OF_EMPLOYEES / 2));
    const professors = generateProfessors(professorEmployees);
    const professorIds = professors.map(p => p.employee_id);
    const assistantEmployees = employeeIds.slice(Math.floor(NUMBER_OF_EMPLOYEES / 2));
    const assistants = generateAssistants(assistantEmployees, professorIds);
    const assistantIds = assistants.map(a => a.employee_id);
    const courses = generateCourses(NUMBER_OF_COURSES, departmentIds);
    const courseIds = courses.map(c => c.id);
    const coursePrereqs = generateCoursePrerequisites(courses);
    const professorTeaches = generateProfessorTeaches(professorIds, courseIds);
    const assistantAssists = generateAssistantAssists(assistantIds, courseIds);
    const exams = generateExams(NUMBER_OF_EXAMS, courseIds);
    const students = generateStudents(NUMBER_OF_STUDENTS);
    const studentIds = students.map(s => s.matriculation_number);
    const enrollments = generateEnrollments(studentIds, courseIds);

    return {
        Department: departments,
        Employee: employees,
        Professor: professors,
        Assistant: assistants,
        Course: courses,
        Course_Prerequisite: coursePrereqs,
        Professor_Teaches_Course: professorTeaches,
        Assistant_Assists_Course: assistantAssists,
        Exam: exams,
        Student: students,
        Enrollment: enrollments,
    };
}

