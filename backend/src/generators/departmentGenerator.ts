import { faker } from "@faker-js/faker";
import { Department } from "../models/models";

export const generateDepartments = (count: number): Department[] => {
    const departments: Department[] = [];
    for (let i = 0; i < count; i++) {
        departments.push({
            id: i + 1,
            name: faker.company.name(),
            address: faker.location.streetAddress(),
            phone: faker.phone.number(),
            email: faker.internet.email(),
        });
    }
    return departments;
};