import { faker } from "@faker-js/faker";
import { Employee } from "../models/models";

export const generateEmployees = (count: number, departmentIds: number[]): Employee[] => {
    return Array.from({ length: count }, (_, i) => ({
        id: i + 1,
        name: faker.person.fullName(),
        hire_date: faker.date.past(),
        department_id: faker.helpers.arrayElement(departmentIds),
    }));
};
