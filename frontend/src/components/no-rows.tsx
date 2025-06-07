import { Box, Button, Typography } from "@mui/material";

export const NoRowsOverlay: React.FC<{ onImportClick?: () => void }> = ({ onImportClick }) => (
  <Box
    sx={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',  
    }}
  >
    <Typography variant="body1" sx={{ mb: 1 }}>
      No rows to display.
    </Typography>
    {onImportClick && (
      <Button variant="text" onClick={onImportClick}>
        Import Tables
      </Button>
    )}
  </Box>

);