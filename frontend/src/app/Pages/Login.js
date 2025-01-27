// src/components/Login.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography, Alert } from '@mui/material';
import { setAccessToken, setRefreshToken, setUser } from '../../api/tokenService'; // Adjust the import path accordingly

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // 1. Helper function to retrieve the CSRF token and set the csrftoken cookie
  const getCsrfToken = async () => {
    const response = await fetch('http://127.0.0.1:8000/api/v1/user/get-csrf-token/', {
      method: 'GET',
      credentials: 'include', // IMPORTANT: allows setting the cookie
    });
    const data = await response.json();
    return data.csrfToken;
  };

  
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      
      const csrfToken = await getCsrfToken();

      
      const response = await fetch('http://127.0.0.1:8000/api/v1/user/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken,
        },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Login failed');
      }

      const data = await response.json();
      const { tokens, user } = data; // Adjusted destructuring
      const { access, refresh } = tokens; // Extract tokens

      // Store tokens and user info
      setAccessToken(access);
      setRefreshToken(refresh);
      setUser(user); // Implement setUser in tokenService.js

      // Redirect to /home on success
      navigate('/home');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      sx={{ height: '100vh', bgcolor: '#f4f4f4', px: 2 }}
    >
      <Box
        component="form"
        onSubmit={handleLogin}
        sx={{
          p: 4,
          borderRadius: 2,
          boxShadow: 3,
          bgcolor: 'white',
          width: '100%',
          maxWidth: 400,
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Login
        </Typography>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        <TextField
          label="Email"
          type="email"
          fullWidth
          required
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          required
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ mt: 2, py: 1.5, bgcolor: 'primary.main' }}
        >
          Login
        </Button>
      </Box>
    </Box>
  );
};

export default Login;