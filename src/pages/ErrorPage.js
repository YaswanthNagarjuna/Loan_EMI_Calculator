import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      textAlign="center"
    >
      <Typography variant="h4" gutterBottom>
        Something went wrong With Application.
      </Typography>
      <Button variant="outlined"
            onClick={handleGoHome}
            sx={{
              borderColor: 'light blue',
              color: 'light blue',
              '&:hover': {
                borderColor: 'blue',
              },
            }}>
        Go Home
      </Button>
    </Box>
  );
};

export default ErrorPage;