import { faker } from "@faker-js/faker";
import { Course } from "../models/models";

export const generateCourses = (count: number, departmentIds: number[]): Course[] => {
    return Array.from({ length: count }, (_, i) => ({
        id: i + 1,
        name: faker.word.words({ count: { min: 1, max: 3 } }),
        ECTS: faker.number.int({ min: 3, max: 10 }),
        department_id: faker.helpers.arrayElement(departmentIds),
    }));
};