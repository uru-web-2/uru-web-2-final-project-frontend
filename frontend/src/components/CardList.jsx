import React, { useState } from 'react';
import { Box, Pagination, Stack, Button} from '@mui/material';
import Search from './Search';
import CardComponent from './Card'; 
import PageSizeSelector from './PageSizeSelector';


const CardList = ({ data , showHeader = true, itemsPage = 5}) => {

    const [page, setPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(itemsPage);
    
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

        <Box sx={{ display: 'grid', justifyItems: 'center'}}>

        {showHeader && (<Box sx={{ bgcolor:'#A6B7C5', width:'100%', height:'80px', display:'flex', placeItems:'center', justifyContent:'space-between', padding:2}}>

                
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <PageSizeSelector numberItems={[5,10,15,20]} onChange={handlePageChange} value={itemsPerPage}/>
                <Search/>
            </Box>
                <Button variant="contained" color="primary">
                + Add
                </Button>    
            </Box> 
            )}

            
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