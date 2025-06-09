import React, { useEffect, useState } from 'react';
import { Button, Modal, Box, Typography, Chip, TextField, Autocomplete, Tooltip } from '@mui/material';
import { fetchDepartmentStaff } from '../api';
import type { AssistantOption, EmployeeOption } from '../types/types';
interface Props {
    courseId: number;
    departmentId: number;
    assignedStaffMap: Record<number, EmployeeOption[]>;
}

const CourseAssignmentModal: React.FC<Props> = ({ courseId, departmentId, assignedStaffMap }) => {
    const [open, setOpen] = useState(false);
    const [selectedProfessors, setSelectedProfessors] = useState<EmployeeOption[]>([]);
    const [selectedAssistants, setSelectedAssistants] = useState<AssistantOption[]>([]);
    const [availableProfessors, setAvailableProfessors] = useState<EmployeeOption[]>([]);
    const [availableAssistants, setAvailableAssistants] = useState<AssistantOption[]>([]);
    const [assignedEmployees, setAssignedEmployees] = useState<EmployeeOption[]>([]);
    useEffect(() => {
        const assigned = assignedStaffMap[courseId] || [];
        setAssignedEmployees(assigned);
    }, [assignedStaffMap, courseId]);

    const handleOpen = () => {
        setOpen(true);
        const assigned = assignedStaffMap[courseId] || [];
        setSelectedProfessors(assigned.filter(e => e.role === 'Professor'));
        setSelectedAssistants(assigned.filter(a => a.role === 'Assistant') as AssistantOption[]);
        fetchData();
    };
    const handleClose = () => {
        setOpen(false);
        setSelectedProfessors([]);
        setSelectedAssistants([]);
    };
    const fetchData = async () => {
        const departmentStaff = await fetchDepartmentStaff(departmentId);
        const professors = departmentStaff.map((prof: any) => ({
            id: prof.id,
            name: prof.name,
            role: 'Professor' as const,
        }));

        const assistants = departmentStaff.flatMap((prof: any) =>
            (prof.subordinates || []).map((asst: any) => ({
                id: asst.id,
                name: asst.name,
                role: 'Assistant' as const,
                supervisorId: prof.id,
            }))
        );
        setAvailableProfessors(professors);
        setAvailableAssistants(assistants);
    };

    const handleAssign = () => {
        if (selectedProfessors.length > 0) {
            setAssignedEmployees([...selectedProfessors, ...selectedAssistants]);
        }
        handleClose();
    };

    const handleDelete = (id: number) => {
        const isProf = selectedProfessors.some(p => p.id === id);
        if (isProf) {
            const updatedProfessors = selectedProfessors.filter(p => p.id !== id);
            setSelectedProfessors(updatedProfessors);
            //console.log('updatedProfessors professor:', updatedProfessors);
            const updatedAssistants = selectedAssistants.filter(a => a.supervisorId !== id);
            //console.log('updatedAssistants:', updatedAssistants);
            setSelectedAssistants(updatedAssistants);
        } else {
            const updatedAssistants = selectedAssistants.filter(a => a.id !== id);
            setSelectedAssistants(updatedAssistants);
        }
    };

    const assignedNames = assignedEmployees.map(emp => emp.name).join(', ');
    const displayLabel = assignedNames ?? 'ASSIGN STAFF';

    return (
        <>
            <Tooltip title={assignedNames ? 'Edit Assigned Staff' : 'Assign Staff'}>
                <Button variant="text" onClick={handleOpen} sx={{ width: '100%', textAlign: 'left', textTransform: 'none' }}>
                    <Box
                        sx={{
                            width: '100%',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                        }}
                    >
                        {displayLabel}
                    </Box>
                </Button>
            </Tooltip>
            <Modal open={open} onClose={handleClose}>
                <Box sx={{ p: 4, backgroundColor: 'white', maxWidth: 500, margin: 'auto', mt: '10%' }}>
                    <Typography variant="h6" gutterBottom>Assign Employees to Course</Typography>
                    <Autocomplete
                        multiple
                        disablePortal
                        options={availableProfessors}
                        getOptionLabel={(option) => option.name}
                        onChange={(_, value) => setSelectedProfessors(value)}
                        value={selectedProfessors}
                        renderTags={(value, getTagProps) =>
                            value.map((option, index) => {
                                const { key, ...tagProps } = getTagProps({ index });
                                return (
                                    <Chip
                                        key={option.id}
                                        label={`${option.name}`}
                                        {...tagProps}
                                        onDelete={() => handleDelete(option.id)}
                                    />
                                );
                            })
                        }
                        renderInput={(params) => <TextField {...params} label="Professors" variant="outlined" />}
                    />

                    <Autocomplete
                        multiple
                        disablePortal
                        disabled={selectedProfessors.length === 0}
                        options={availableAssistants.filter(a =>
                            selectedProfessors.some(p => p.id === a.supervisorId)
                        )}
                        getOptionLabel={(option) => option.name}
                        onChange={(_, value) => setSelectedAssistants(value)}
                        value={selectedAssistants}
                        renderTags={(value, getTagProps) =>
                            value.map((option, index) => {
                                const { key, ...tagProps } = getTagProps({ index });
                                const supervisor = selectedProfessors.find(p => p.id === option.supervisorId);
                                return (
                                    <Chip
                                        key={option.id}
                                        label={`${option.name} ${supervisor ? '(' + supervisor.name + ')' : ''}`}
                                        {...tagProps}
                                        onDelete={() => handleDelete(option.id)}
                                    />
                                );
                            })
                        }
                        renderInput={(params) => <TextField {...params} label="Assistants" variant="outlined" />}
                        sx={{ mt: 2 }}
                    />
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
