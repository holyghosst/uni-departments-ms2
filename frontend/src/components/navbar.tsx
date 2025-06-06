import React, { useRef, useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  Menu,
  MenuItem,
} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import UploadFileIcon from '@mui/icons-material/UploadFile';

interface SearchAppBarProps {
  tableNames: string[];
  onTableSelect: (name: string) => void;
  currentTitle: string;
}

const SearchAppBar: React.FC<SearchAppBarProps> = ({
  tableNames,
  onTableSelect,
  currentTitle,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (name?: string) => {
    setAnchorEl(null);
    if (name) {
      onTableSelect(name);
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ mr: 2, textTransform: 'uppercase' }}>
            University DB
          </Typography>
          <Button
            ref={buttonRef}
            variant="text"
            color="inherit"
            onClick={handleClick}
            endIcon={<ArrowDropDownIcon />}
            sx={{
              textTransform: 'uppercase',
              color: 'white',
              borderRadius: 1,
              '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' },
              minWidth: 180,
            }}
          >
            {currentTitle}
          </Button>
          <Box sx={{ flexGrow: 1 }} />
          <Button
            variant="outlined"
            color="inherit"
            startIcon={<UploadFileIcon />}
            sx={{ color: 'white', borderColor: 'white' }}
          >
            Import
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={() => handleClose()}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
            PaperProps={{
              sx: {
                width: buttonRef.current?.offsetWidth || 180,
              },
            }}
          >
            {tableNames.map((name) => (
              <MenuItem
                key={name}
                onClick={() => handleClose(name)}
                sx={{ textTransform: 'uppercase' }}
              >
                {name}
              </MenuItem>
            ))}
          </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default SearchAppBar;
