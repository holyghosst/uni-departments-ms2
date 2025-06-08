import { faker } from "@faker-js/faker";
import { Student } from "../models/models";

export const generateStudents = (count: number): Student[] => {
    return Array.from({ length: count }, (_, i) => ({
        matriculation_number: i + 1,
        name: faker.person.fullName(),
        date_of_birth: faker.date.birthdate({ min: 1995, max: 2005, mode: 'year' }),
    }));
};