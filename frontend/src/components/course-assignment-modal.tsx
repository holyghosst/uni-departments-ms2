import React, { useEffect, useState } from 'react';
import { Button, Modal, Box, Typography, Chip, TextField, Autocomplete, Stack, Tooltip } from '@mui/material';
import type { EmployeeOption } from '../types/types';

interface AssistantOption extends EmployeeOption {
    supervisorId: number;
}
interface Props {
    courseId: number;
    departmentId: number;
    assignedStaffMap: Record<number, EmployeeOption[]>;
}

const CourseAssignmentModal: React.FC<Props> = ({ courseId, departmentId, assignedStaffMap }) => {
    const [open, setOpen] = useState(false);
    const [selectedProfessor, setSelectedProfessor] = useState<EmployeeOption | null>(null);
    const [availableProfessors, setAvailableProfessors] = useState<EmployeeOption[]>([]);
    const [availableAssistants, setAvailableAssistants] = useState<AssistantOption[]>([]);
    const [selectedAssistants, setSelectedAssistants] = useState<AssistantOption[]>([]);
    const [assignedEmployees, setAssignedEmployees] = useState<EmployeeOption[]>([]);
    useEffect(() => {
        const assigned = assignedStaffMap[courseId] || [];
        setAssignedEmployees(assigned);
    }, [assignedStaffMap, courseId]);

    const handleOpen = () => {
        setOpen(true);
        fetchData();
    };
    const handleClose = () => {
        setOpen(false);
        setSelectedProfessor(null);
        setSelectedAssistants([]);
    };
    const fetchData = async () => {
        // TODO pi that fetches professors and assistants from the backend wth the departmentId
        const profs: EmployeeOption[] = [
            { id: 1, name: 'Prof. Alice', role: "Professor" },
            { id: 2, name: 'Prof. Bob', role: "Professor" },
        ];
        const assts: AssistantOption[] = [
            { id: 3, name: 'Assistant Eve', supervisorId: 1, role: "Assistant" },
            { id: 4, name: 'Assistant Dan', supervisorId: 2, role: "Assistant" },
        ];
        setAvailableProfessors(profs);
        setAvailableAssistants(assts);
    };

    const handleAssign = () => {
        if (selectedProfessor) setAssignedEmployees([selectedProfessor, ...selectedAssistants]);
        handleClose();
    };

    const handleDelete = (id: number) => {
        setAssignedEmployees(prev => prev.filter(emp => emp.id !== id));
    };
    const assignedNames = assignedEmployees.map(emp => emp.name).join(', ');
    const displayLabel = assignedNames.length > 30 ? assignedNames.slice(0, 30) + '...' : assignedNames || 'Assign Staff';

    return (
        <>
            <Tooltip title={assignedNames}>
                <Button variant="text" onClick={handleOpen}>{displayLabel}</Button>
            </Tooltip>
            <Modal open={open} onClose={handleClose}>
                <Box sx={{ p: 4, backgroundColor: 'white', maxWidth: 500, margin: 'auto', mt: '10%' }}>
                    <Typography variant="h6" gutterBottom>Assign Employees to Course</Typography>
                    <Autocomplete
                        disablePortal
                        options={availableProfessors}
                        getOptionLabel={(option) => option.name}
                        onChange={(_, value) => setSelectedProfessor(value)}
                        renderInput={(params) => <TextField {...params} label="Professor" variant="outlined" />}
                    />
                    <Autocomplete
                        disablePortal
                        multiple
                        disabled={!selectedProfessor}
                        options={availableAssistants.filter(a => a.supervisorId === selectedProfessor?.id)}
                        getOptionLabel={(option) => option.name}
                        onChange={(_, value) => setSelectedAssistants(value)}
                        renderInput={(params) => <TextField {...params} label="Assistants" variant="outlined" />}
                        sx={{ mt: 2 }}
                    />
                    <Stack direction="row" spacing={1} sx={{ mt: 2, flexWrap: 'wrap' }}>
                        {assignedEmployees.map(emp => (
                            <Chip
                                key={emp.id}
                                label={`${emp.name} (${emp.role})`}
                                variant="outlined"
                                onDelete={() => handleDelete(emp.id)}
                            />
                        ))}
                    </Stack>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 4 }}>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button variant="contained" onClick={handleAssign}>Save</Button>
                    </Box>
                </Box>
            </Modal>
        </>
    );
};

export default CourseAssignmentModal;
