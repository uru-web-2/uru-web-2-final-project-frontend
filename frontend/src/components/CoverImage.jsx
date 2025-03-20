import { Box, Button, CardMedia, Typography } from "@mui/material";
import AttachFileIcon from '@mui/icons-material/AttachFile';
import DeleteIcon from '@mui/icons-material/Delete';
import React from "react";


function CoverImage({image}) {
  return (
    <Box sx={{display:'grid', justifyContent: 'center', alignItems: 'center', gap: 1}}>
        <Box sx={{width: 255, height:251 , display: 'flex', justifyContent: 'center', alignItems: 'center', bgcolor:'whitesmoke', border:1}}>
            <CardMedia
                sx={{ width: 189, height: 248}}
                component="img"
                image={image}
                alt="random"
            />
        </Box>
        <Typography variant="body1">CoverImage.jpg</Typography>
        <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
            <Button sx={{width: '120px',fontSize:14, textTransform:'none', bgcolor:'#1A4568'}} variant="contained" startIcon={<DeleteIcon/>}>Delete</Button>
            <Button sx={{width: '130px', fontSize:14, textTransform:'none', bgcolor:'#1A4568'}} variant="contained" startIcon={<AttachFileIcon/>}>Browse</Button>
        </Box>
    </Box>
  );
}
export default CoverImage;