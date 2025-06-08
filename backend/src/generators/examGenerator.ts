import { faker } from "@faker-js/faker";
import { Exam } from "../models/models";

export const generateExams = (count: number, courseIds: number[]): Exam[] => {
    return Array.from({ length: count }, (_, i) => ({
        id: i + 1,
        course_id: faker.helpers.arrayElement(courseIds),
        name: `${faker.word.adjective()} Exam`,
        date: faker.date.future(),
        ECTS: faker.number.int({ min: 1, max: 6 }),
    }));
};
