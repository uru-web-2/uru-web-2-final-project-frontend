import React, { useState } from 'react';
import { Box, Pagination, Stack, TextField, FormControl, Select, InputLabel, MenuItem,Button } from '@mui/material';
import CardComponent from './Card'; 


const CardList = ({ data }) => {

    const [page, setPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = data.slice(startIndex, endIndex);

    const handlePageChange = (event, value) => {

        if(event.target.value){
            
            setItemsPerPage(event.target.value);
            setPage(1);
            return;
        }
        setPage(value);
    };

    return (

        <Box sx={{ display: 'grid', justifyItems: 'center', bgColor:'black'}}>

            <Box sx={{ bgcolor:'whitesmoke', width:'100%', height:'80px', display:'flex', placeItems:'center', justifyContent:'space-between', padding:2}}>

                <Box >
                    <FormControl variant="outlined" size="small" sx={{ minWidth: 120, marginRight: 2 }}>
                        <InputLabel>Items per page</InputLabel>
                            <Select
                                value={itemsPerPage}
                                onChange={handlePageChange}
                                label="Items per page"
                                >
                                <MenuItem value={5}>5</MenuItem>
                                <MenuItem value={7}>7</MenuItem>
                                <MenuItem value={10}>10</MenuItem>
                                <MenuItem value={15}>15</MenuItem>
                            </Select>
                    </FormControl>
                
                    <TextField
                    label="Search"
                    variant="outlined"
                    size="small"
                    sx={{ 
                        width: '300px',  
                        borderRadius: '20px',
                        '& .MuiOutlinedInput-root': {
                        borderRadius: '20px',
                        },
                    }}/>
                </Box>
                
                    <Button variant="contained" color="primary">
                    + Add
                    </Button>
                
                
            </Box> 

            
            <Stack spacing={0.2} sx={{ width: '100%' }}>
                {currentItems.map((item) => (
                    <CardComponent
                    image={item.image}
                    title={item.title}
                    text1={item.text1}
                    text2={item.text2}
                    text3={item.text3}
                    categories={item.categories}
                    id={item.id}
                    key={item.id}
                    type='physical'
                    />
                ))}
            </Stack>

            <Pagination
                count={Math.ceil(data.length / itemsPerPage)} 
                page={page}
                onChange={handlePageChange}
                color="primary"
                sx={{marginTop: 2}}
            />
        </Box>
    );
};

export default CardList;