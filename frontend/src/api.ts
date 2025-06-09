import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
export const fetchTableData = async (tableName: string): Promise<any[]> => {
    const res = await axios.get(`${API_URL}/api/tables/${tableName}`);
    return res.data;
};
export const importTables = async (): Promise<any> => {
    const res = await axios.post(`${API_URL}/api/tables`);
    return res;
};
export const fetchAssignedStaff = async (courseIds: number[]) => {
    try {
        const res = await axios.get(`${API_URL}/api/staff/assigned`, {
            params: {
                courseIds: courseIds.join(','),
            },
        });
        return res.data;
    } catch (err) {
        console.error('Failed to fetch assigned staff', err);
        return {};
    }
};
