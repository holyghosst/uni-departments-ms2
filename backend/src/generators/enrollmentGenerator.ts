import { faker } from "@faker-js/faker";
import { Enrollment } from "../models/models";

export const generateEnrollments = (studentIds: number[], courseIds: number[]): Enrollment[] => {
    const enrollments: Enrollment[] = [];
    for (const student_id of studentIds) {
        const courses = faker.helpers.arrayElements(courseIds, faker.number.int({ min: 1, max: 3 }));
        courses.forEach(course_id => enrollments.push({ student_id, course_id }));
    }
    return enrollments;
};