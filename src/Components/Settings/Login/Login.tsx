import React, { useState } from 'react';
import {  useNavigate } from 'react-router-dom';
import userServise from '../../../Services/UserService';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import logokivun from "../../../Assets/logo_kivun.png";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import logo from "../../../Assets/logo.png";
import notification from '../../../Services/Notification';


const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  


  const onLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      
      const token = await userServise.login(email, password);
      localStorage.setItem('token', token);
      notification.success("התחברתם בהצלחה");
      setTimeout( () => navigate('/') , 1000);
    } catch (error) {
      notification.error('אחד או יותר מהנתונים שגויים.');      
    }
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <img src={logo} style={{width:250}} />
          
          <Typography component="h1" variant="h5">
            התחברות למערכת
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="אימייל"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="סיסמא"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={onLogin}
              sx={{ mt: 3, mb: 2 }}
            >
              התחברות
            </Button>
            <Grid container>
            <div className="login credit">
          <div>
            <span>פותח בשיתוף</span>
            <img src={logokivun} alt=""  />
          </div>
            <span>Version 1.0.0</span>
          </div>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Login;
