import { faker } from "@faker-js/faker";
import { Professor_Teaches_Course } from "../models/models";

export const generateProfessorTeaches = (professorIds: number[], courseIds: number[]): Professor_Teaches_Course[] => {
    return courseIds.map(course_id => ({
        course_id,
        professor_id: faker.helpers.arrayElement(professorIds),
    }));
};