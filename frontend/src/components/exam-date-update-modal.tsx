import { Tooltip, Button, Box, Modal, Typography} from "@mui/material";
import React, { useState } from "react"
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import dayjs, { Dayjs } from "dayjs";

interface Props {
    examId: number;
    currentDate: Date;
}

const formatDate = (date: Date): string => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
};

const ExamDateUpdateModal: React.FC<Props> = ({ examId, currentDate }) => {
    const [selectedDate, setSelectedDate] = useState<Dayjs | null>(() => dayjs(currentDate));

    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSave = async () => {
        if (!selectedDate) return;
        const formatted = selectedDate.format("YYYY-MM-DD");

        try {
            // update
            handleClose();
        } catch (err) {
            console.error("Failed to update exam date:", err);
        }
    };

    return (
        <>
            <Tooltip title="Edit exam date">
                <Button
                    variant="text"
                    onClick={handleOpen}
                    sx={{ width: "100%", textTransform: "none" }}>
                    <Box sx={{ width: "100%", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {formatDate(currentDate)}
                    </Box>
                </Button>
            </Tooltip>

            <Modal open={open} onClose={handleClose}>
                <Box
                    sx={{ p: 4, backgroundColor: "white", maxWidth: 500, margin: "auto", mt: "10%" }}>
                    <Typography variant="h6" gutterBottom>
                        Edit exam date
                    </Typography>

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateCalendar value={selectedDate} onChange={(newDate) => setSelectedDate(newDate)} />
                    </LocalizationProvider>

                    <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 4 }}>
                        <Button onClick={handleSave}>Close</Button>
                    </Box>
                </Box>
            </Modal>
        </>
    );
};


export default ExamDateUpdateModal;