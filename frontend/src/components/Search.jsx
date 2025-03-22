import {React, useState} from "react";
import { Box, TextField, InputAdornment, IconButton } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

function Search({click}) {
      // Estado para manejar el valor del TextField
        const [searchValue, setSearchValue] = useState('');

        // Manejar cambios en el TextField
        const handleChange = (e) => {
            setSearchValue(e.target.value);
        };

        // Manejar clic en el botón de búsqueda
        const handleSearchClick = () => {
            console.log(click);
            click(searchValue);
        };
    return (
        <Box sx={{ width: 'fit-content', height: 'min-height', bgcolor: 'white', borderRadius: '20px', borderColor:'black'}}>
            <TextField
            onChange={handleChange}
            variant="outlined"
            placeholder='Search'
            sx={{width: 400 , height:'min-height',borderRadius: '20px',
                '& .MuiOutlinedInput-root': {
                    borderRadius: '20px',
                '& .MuiInputBase-input': {
                    padding: 1.5, pl: 3
                }}
            }}
            slotProps={{
                input: {
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton onClick={handleSearchClick} disableFocusRipple style={{ outline: 'none' }}>
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