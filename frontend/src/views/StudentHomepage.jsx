import React from "react";
import NavbarHomepage from "../components/NavbarHomepage";
import { Container, Grid2, TextField, Button, Card, CardMedia, CardContent, Typography, InputAdornment } from "@mui/material";
import "../components/CSS/StudentHomepageBg.css";
import SearchIcon from "@mui/icons-material/Search";

const StudentHomePage = () => {
  const cardsData = [
    { image: "Book1.png", title: "Libros", description: "Consulta nuestro catálogo de libros físicos y digitales. Encuentra tu próxima lectura en nuestra colección." },
    { image: "Book2.png", title: "Revistas", description: "Consulta nuestro catálogo de revistas digitales y físicas. Encuentra la publicación perfecta para ti hoy mismo." },
    { image: "Book3.png", title: "Tesis", description: "Explora nuestra colección de tesis digitales. Encuentra investigaciones relevantes para tus estudios y proyectos." },
    { image: "Book4.png", title: "Artículos", description: "Accede a nuestro catálogo de artículos digitales. Encuentra información actualizada y relevante en diversas áreas de estudio." },
  ];

  return (
    <div className="background-container">
      <div className="background-overlay"></div> 
      
      <div className="content-wrapper">
        <NavbarHomepage />
        <div style={{ marginTop: "80px" }}></div>

        {/* Barra de búsqueda */}
        <Container sx={{ textAlign: "center", marginTop: 4 }}>
          <TextField
            label="Buscar..."
            variant="outlined"
            fullWidth
            sx={{
              maxWidth: 600,
              borderRadius: "25px",
              backgroundColor: "white",
              "& .MuiOutlinedInput-root": {
                borderRadius: "50px",
                backgroundColor: "white",
                "& fieldset": { border: "none" }, 
              },
              "& .MuiInputBase-input": {
                borderRadius: "50px", 
                padding: "10px 20px", 
              },
            }}
            slotProps={{
              input:{
                endAdornment: (
                  <InputAdornment position="end">
                  <SearchIcon sx={{ color: "gray" }} />
                </InputAdornment>
                )
              }
            }}  
          />
          
        </Container>
        
        {/* Sección de tarjetas */}
        <Container sx={{ marginTop: 5 }}>
          <Grid2 container spacing={3} justifyContent="center">
            {cardsData.map((card, index) => (
              <Grid2 item key={index} xs={12} sm={6} md={3}>
                <Card sx={{ maxWidth: "270px" }}>
                  <CardMedia 
                    component="img" 
                    image={card.image} 
                    alt={card.title}
                    sx={{ 
                      objectFit: "cover",
                      height: 180,
                      borderTopLeftRadius: "10px",
                      borderTopRightRadius: "10px",
                 }}
                  />
                  <CardContent>
                    <Typography variant="h6">{card.title}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {card.description}
                    </Typography>
                    <Button variant="contained" sx={{ marginTop: 4, backgroundColor: "#003366" }} >
                      Ver {card.title.toLowerCase()}
                    </Button>
                  </CardContent>
                </Card>
              </Grid2>
            ))}
          </Grid2>
        </Container>
      </div> 
    </div>
  );
};

export default StudentHomePage;

