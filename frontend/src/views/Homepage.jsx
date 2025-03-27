import React, {useState} from "react";
import NavbarHomepage from "../components/NavbarV2";
import { Container, Grid2, TextField, Button, Card, CardMedia, CardContent, Typography, InputAdornment } from "@mui/material";
import "../components/CSS/Homepagebg.css";
import Search from "../components/Search";

const HomePage = () => {
  const cardsData = [
    { image: "libros.png", title: "Libros", description: "Consulta nuestro catálogo de libros físicos y digitales. Encuentra tu próxima lectura en nuestra colección." },
    { image: "revistas.jpg", title: "Revistas", description: "Consulta nuestro catálogo de revistas digitales y físicas. Encuentra la publicación perfecta para ti hoy mismo." },
    { image: "tesis.JPG", title: "Tesis", description: "Explora nuestra colección de tesis digitales. Encuentra investigaciones relevantes para tus estudios y proyectos." },
    { image: "articles.jpg", title: "Artículos", description: "Accede a nuestro catálogo de artículos digitales. Encuentra información actualizada y relevante en diversas áreas de estudio." },
  ];

  return (
    <div className="background-container">
      <div className="background-overlay"></div> 
      
      <div className="content-wrapper">
        <NavbarHomepage />
        <div style={{ marginTop: "80px" }}></div>

        {/*Componente search (usandolo)*/}
        <Container sx={{ 
        display: "flex", 
        justifyContent: "center",
        }}>    
       <Search />
       </Container>


        {/* Sección de tarjetas */}
        <Container sx={{ marginTop: 5 }}>
          <Grid2 container spacing={3} justifyContent="center" alignItems={"stretch"}>
            {cardsData.map((card, index) => (
              <Grid2 key={index} xs={12} sm={6} md={3} sx={{ display: "flex"}}>
                <Card sx={{ 
                  flexDirection: "column",
                  justifyContent: "space-between",
                  height: "100%",
                  maxWidth: "270px",
                  display: "flex",
                  }}>

                  <CardMedia 
                    component="img" 
                    image={card.image} 
                    alt={card.title}
                    sx={{ 
                      display: "block",
                      margin: "20px auto",
                      width: "90%",  
                      height: "140px", 
                      borderRadius: "2px",
                 }}
                  />

                    <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <Typography variant="h6">{card.title}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {card.description}
                    </Typography>


                    <Button variant="contained" sx={{ 
                      minWidth: "150px",
                      padding: "8px 10px",
                      marginTop: 5, 
                      backgroundColor: "#003366" }} >
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

export default HomePage;

