import React from "react";
import { Box, TextField, InputAdornment, IconButton } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

function Search() {
    return (
        <Box sx={{ width: 'fit-content', height: 45, bgcolor: 'white', borderRadius: '20px', borderColor:'black'}}>
            <TextField
            variant="outlined"
            placeholder='Search'
            sx={{width: 400 , height:50,borderRadius: '20px',
                '& .MuiOutlinedInput-root': {
                    borderRadius: '20px',
                '& .MuiInputBase-input': {
                    padding: 1.5, pl: 3
                }}
            }}
            backgroundColor='white'
            slotProps={{
                input: {
                endAdornment: (
                    <InputAdornment position="end">
                    <IconButton disableFocusRipple style={{ outline: 'none' }}>
                        <SearchIcon />
                    </IconButton>
                    </InputAdornment>
                ),
                },
            }}
            />
        </Box>
    )
}

export default Search;