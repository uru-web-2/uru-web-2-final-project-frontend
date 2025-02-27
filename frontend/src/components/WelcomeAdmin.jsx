import React from 'react';
import { Box, Typography, Button, Paper, Stack, useTheme } from '@mui/material';
import { EmojiEvents, People, Logout, Assignment } from '@mui/icons-material';

const WelcomeAdmin = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '80vh',
        p: 3,
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          p: 4,
          borderRadius: 4,
          backgroundColor: theme.palette.background.paper,
          textAlign: 'center',
          maxWidth: '600px',
          width: '100%',
        }}
      >
        {/* Título y mensaje de bienvenida */}
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: theme.palette.primary.main, mb: 2 }}>
          ¡Bienvenido, Administrador!
        </Typography>
        <Typography variant="body1" sx={{ color: theme.palette.text.secondary, mb: 4 }}>
          Estamos encantados de tenerte aquí. Gestiona tu sistema de manera eficiente y rápida.
        </Typography>

        {/* Icono decorativo */}
        <Box sx={{ mb: 4 }}>
          <EmojiEvents sx={{ fontSize: 80, color: theme.palette.primary.main }} />
        </Box>

        {/* Accesos rápidos */}
        <Stack direction="row" spacing={2} justifyContent="center">
          <Button
            variant="outlined"
            startIcon={<People />}
            sx={{
              borderRadius: '20px',
              textTransform: 'none',
              px: 4,
              py: 1.5,
            }}
          >
            Usuarios
          </Button>
          <Button
            variant="outlined"
            startIcon={<Assignment />}
            sx={{
              borderRadius: '20px',
              textTransform: 'none',
              px: 4,
              py: 1.5,
            }}
          >
            Perfiles
          </Button>
          <Button
            variant="outlined"
            startIcon={<Logout />}
            sx={{
              borderRadius: '20px',
              textTransform: 'none',
              px: 4,
              py: 1.5,
              ":hover": {
                backgroundColor: theme.palette.error.light,
              }
            }}
          >
            Logout
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
};

export default WelcomeAdmin;