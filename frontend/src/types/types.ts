export interface EmployeeOption {
    id: number;
    name: string;
    role: 'Professor' | 'Assistant';
}
export interface AssistantOption extends EmployeeOption {
    supervisorId: number;
}