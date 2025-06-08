import { faker } from "@faker-js/faker";
import { Professor } from "../models/models";

export const generateProfessors = (employeeIds: number[]): Professor[] => {
    return employeeIds.map(id => ({
        employee_id: id,
        field_of_research: faker.lorem.words(),
        office_number: faker.location.buildingNumber(),
    }));
};