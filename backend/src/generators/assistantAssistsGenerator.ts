import { faker } from "@faker-js/faker";
import { Assistant_Assists_Course } from "../models/models";

export const generateAssistantAssists = (assistantIds: number[], courseIds: number[]): Assistant_Assists_Course[] => {
    return courseIds.map(course_id => ({
        course_id,
        assistant_id: faker.helpers.arrayElement(assistantIds),
    }));
};