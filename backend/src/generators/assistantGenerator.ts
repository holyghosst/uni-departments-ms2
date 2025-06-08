import { faker } from "@faker-js/faker";
import { Assistant } from "../models/models";

export const generateAssistants = (employeeIds: number[], professorIds: number[]): Assistant[] => {
    return employeeIds.map(id => ({
        employee_id: id,
        role: faker.person.jobTitle(),
        can_grade: faker.datatype.boolean(),
        supervisor_id: faker.helpers.arrayElement(professorIds),
    }));
};