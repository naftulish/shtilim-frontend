// import React, { useState } from 'react';
// import { signInWithEmailAndPassword } from 'firebase/auth';
// import { Form, NavLink, useNavigate } from 'react-router-dom';
// import { TextField, FormControl, InputLabel } from "@mui/material";
// import Button from '@mui/material/Button';
// import { Link } from "react-router-dom"
// import authService from '../../../Services/AuthService';

// const Login = () => {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const onLogin = (e: React.FormEvent) => {
//     e.preventDefault();
//     signInWithEmailAndPassword(authService.auth, email, password)
//       .then((userCredential) => {
//         // Signed in
//         const user = userCredential.user;
//         // navigate('/home');
//         console.log(user);
//       })
//       .catch((error) => {
//         const errorCode = error.code;
//         const errorMessage = error.message;
//         console.log(errorCode, errorMessage);
//       });
//   };

  // return (
  //   <>
  //     <main>
  //       <section>
  //         <div>
  //           <p>FocusApp</p>

  //           <form>
  //             <div>
  //               <label htmlFor="email-address">Email address</label>
  //               <input
  //                 id="email-address"
  //                 name="email"
  //                 type="email"
  //                 required
  //                 placeholder="Email address"
  //                 onChange={(e) => setEmail(e.target.value)}
  //               />
  //             </div>

  //             <div>
  //               <label htmlFor="password">Password</label>
  //               <input
  //                 id="password"
  //                 name="password"
  //                 type="password"
  //                 required
  //                 placeholder="Password"
  //                 onChange={(e) => setPassword(e.target.value)}
  //               />
  //             </div>

  //             <div>
  //               <button onClick={onLogin}>Login</button>
  //             </div>
  //           </form>

  //           <p className="text-sm text-white text-center">
  //             No account yet?{' '}
  //             <NavLink to="/signup">
  //               Sign up
  //             </NavLink>
  //           </p>
  //         </div>
  //       </section>
  //     </main>
  //   </>
  // );

// export default Login;

import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import authService from '../../../../Services/AuthService';
// import { auth } from '../firebase';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Copyright } from '@mui/icons-material';

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onLogin = (e: React.FormEvent) => {
    e.preventDefault();
    signInWithEmailAndPassword(authService.auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        navigate('/home');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
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
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box component="form" 
          // onSubmit={handleSubmit} 
          noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
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
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={onLogin}
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <NavLink to="/signup">
                  {"Don't have an account? Sign Up"}
                </NavLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
      </Container>
    </ThemeProvider>
  );
  //   <main>
  //     <section>
  //       <div>
  //         <h1>FocusApp</h1>
  //         <Form onSubmit={onLogin}>
  //           <FormControl>
  //             <InputLabel htmlFor="email-address">Email address</InputLabel>
  //             <TextField
  //               id="email-address"
  //               value={email}
  //               onChange={(e) => setEmail(e.target.value)}
  //               required
  //               placeholder="Email address"
  //             />
  //           </FormControl>

  //           <FormControl>
  //             <InputLabel htmlFor="password">Password</InputLabel>
  //             <TextField
  //               id="password"
  //               value={password}
  //               onChange={(e) => setPassword(e.target.value)}
  //               required
  //               placeholder="Password"
  //             />
  //           </FormControl>

  //           <Button type="submit">
  //             Sign in
  //           </Button>
  //         </Form>

  //         <p>
  //           Don't have an account?{' '}
  //           <NavLink to="/signup">
  //             Sign up
  //           </NavLink>
  //         </p>
  //       </div>
  //     </section>
  //   </main>
  // );
};

export default Login;

