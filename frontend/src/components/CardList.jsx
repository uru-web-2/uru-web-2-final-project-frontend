import React, { useState } from 'react';
import { Box, Pagination, Stack } from '@mui/material';
import CardComponent from './Card'; 


const CardList = ({ data, itemsPerPage }) => {

    const [page, setPage] = useState(1);

    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = data.slice(startIndex, endIndex);

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    return (

        <Box sx={{ display: 'grid', justifyItems: 'center', gap: 3, bgColor:'black'}}>

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
            />
        </Box>
    );
};

export default CardList;