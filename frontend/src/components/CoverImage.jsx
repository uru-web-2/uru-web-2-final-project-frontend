import React, { useState } from 'react';
import Box from '@mui/material/Box';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import AttachFileIcon from '@mui/icons-material/AttachFile';

function CoverImage({imageFile}) {
  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState('CoverImage.jpg');

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {

      imageFile(file);

      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result);
        setFileName(file.name);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDelete = () => {
    setImage(null);
    imageFile(null);
    setFileName('CoverImage.jpg');
  };

  return (
    <Box sx={{display:'grid', justifyContent: 'center', alignItems: 'center', gap: 1}}>
      <Box sx={{width: 255, height:251 , display: 'flex', justifyContent: 'center', alignItems: 'center', bgcolor:'whitesmoke', border:1}}>
        {image ? (
          <CardMedia
            sx={{ width: 189, height: 248}}
            component="img"
            image={image}
            alt="Preview"
          />
        ) : (
          <Typography variant="body2">No image selected</Typography>
        )}
      </Box>
      <Typography variant="body1" width={255}>{fileName}</Typography>
      <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
        <Button 
          sx={{width: '120px',fontSize:14, textTransform:'none', bgcolor:'#1A4568'}} 
          variant="contained" 
          startIcon={<DeleteIcon/>}
          onClick={handleDelete}
        >
          Delete
        </Button>
        <Button 
          component="label"
          sx={{width: '130px', fontSize:14, textTransform:'none', bgcolor:'#1A4568'}} 
          variant="contained" 
          startIcon={<AttachFileIcon/>}
        >
          Browse
          <input 
            type="file" 
            hidden 
            accept="image/*"
            onChange={handleImageUpload}
          />
        </Button>
      </Box>
    </Box>
  );
}

export default CoverImage;