import React from "react";
import NavbarHomepage from "../components/NavbarHomepage";
import { Container, Grid2, TextField, Button, Card, CardMedia, CardContent, Typography } from "@mui/material";
import "../components/CSS/StudentHomepageBg.css"


const StudentHomePage = () => {
  const cardsData = [
    { image: "Book1.png", title: "Libros", description: "Consulta nuestro catálogo de libros físicos y digitales." },
    { image: "Book2.png", title: "Revistas", description: "Consulta nuestro catálogo de revistas digitales y físicas." },
    { image: "Book3.png", title: "Tesis", description: "Explora nuestra colección de tesis digitales." },
    { image: "Book4.png", title: "Artículos", description: "Accede a nuestro catálogo de artículos digitales." },
  ];

  return (
    <div className="background-container">
      <NavbarHomepage />
      <div style={{marginTop: "80px" }}></div>

      {/* Barra de búsqueda */}
      <Container sx={{ textAlign: "center", marginTop: 4 }}>
        <TextField
          label="Buscar..."
          variant="outlined"
          fullWidth
          sx={{ maxWidth: 600, borderRadius: "25px", backgroundColor: "white" }}
        />
        <Button variant="contained" sx={{ marginTop: 2, backgroundColor: "#003366" }}>
          Buscar 
        </Button>
      </Container>

      {/* Sección de tarjetas */}
      <Container sx={{ marginTop: 5}}>
        <Grid2 container spacing={3} justifyContent="center">
          {cardsData.map((card, index) => (
            <Grid2 item key={index} xs={12} sm={6} md={3}>
              <Card sx={{ maxWidth: 270 }}>
                <CardMedia 
                component="img" 
                height="140" 
                image={card.image} 
                alt={card.title}
                sx={{objectFit: "cover"}}


                 />
                <CardContent>
                  <Typography variant="h6">{card.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {card.description}
                  </Typography>
                  <Button variant="contained" sx={{ marginTop: 1, backgroundColor: "#003366" }}>
                    Ver {card.title.toLowerCase()}
                  </Button>
                </CardContent>
              </Card>
            </Grid2>
          ))}
        </Grid2>
      </Container>
    </div>
  );
};

export default StudentHomePage;
