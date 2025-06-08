import { faker } from "@faker-js/faker";
import { Course, Course_Prerequisite } from "../models/models";

export const generateCoursePrerequisites = (courses: Course[]): Course_Prerequisite[] => {
    const prerequisites: Course_Prerequisite[] = [];
    for (const course of courses) {
        const other = courses.filter(c => c.id !== course.id);
        const prereq = faker.helpers.maybe(() => faker.helpers.arrayElement(other));
        if (prereq) {
            prerequisites.push({
                course_id: course.id,
                prerequisite_id: prereq.id,
            });
        }
    }
    return prerequisites;
};