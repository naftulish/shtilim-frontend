



// import React from 'react';
// import { useForm } from 'react-hook-form';
// import { TextField, Button, Box, Container, Typography, Avatar} from '@mui/material';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import IUserModel, { Role } from '../../../Models/IUserModel';
// import userServise from '../../../Services/UserService';
// import { PersonAddAlt } from '@mui/icons-material';
// import { green } from '@mui/material/colors';



// const defaultTheme = createTheme();

// // const AddUser = () => {
// //   const { register, handleSubmit } = useForm<IUserModel>();

// //   const save = (p: IUserModel) => {
// //     userServise.addUser(p).then((d) => console.log(d));

// //     alert("You have successfully added the new user!");

// //   };

// const AddUser = () => {
//   const { register, handleSubmit } = useForm<IUserModel>();

//   const save = async (p: IUserModel) => {
//     p.role = Role.user ; p.active = true
//     try {
//       await userServise.addUser(p);
//       alert("You have successfully added the new user!");
//     } catch (e) {
//       console.error(e);
//     }
//   };
  

//   return (
//     <ThemeProvider theme={defaultTheme}>
//       <Container component="main" maxWidth="xs">
//         <Box
//           sx={{
//             marginTop: 8,
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'center',
//           }}
//         >
//           <Avatar sx={{ m: 3, bgcolor: green[500], width: 88, height: 88 }}>
//           <PersonAddAlt color="action" fontSize={'large'} />
//           </Avatar>
//           <Typography component="h1" variant="h5">
//             Add User
//           </Typography>
//           <Box component="form" onSubmit={handleSubmit(save)} noValidate sx={{ mt: 1 }}>
//             <TextField
//               margin="normal"
//               required
//               fullWidth
//               id="firstName"
//               label="First name"
//               {...register('firstName')}
//             />
//             <TextField
//               margin="normal"
//               required
//               fullWidth
//               id="lastName"
//               label="Last name"
//               {...register('lastName')}
//             />
//             <TextField
//               margin="normal"
//               required
//               fullWidth
//               id="email"
//               label="Email"
//               {...register('email')}
//             />
//             <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
//               Save
//             </Button>
//           </Box>
//         </Box>
//       </Container>
//     </ThemeProvider>
//   );
// };

// export default AddUser;





import React from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Box, Container, Typography, Avatar, CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import IUserModel, { Role } from '../../../Models/IUserModel';
import userServise from '../../../Services/UserService';
import { ArrowBack, PersonAddAlt } from '@mui/icons-material';
import { green } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';

const defaultTheme = createTheme();

const AddUser = () => {
  const { register, handleSubmit } = useForm<IUserModel>();
  const navigate = useNavigate();

  const save = async (p: IUserModel) => {
    p.role = Role.user;
    p.active = true;
    try {
      await userServise.addUser(p);
      alert('You have successfully added the new user!');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <CssBaseline />
      <div className="button">
        <Button
          variant="contained"
          onClick={() => navigate('/users')}
          sx={{
            mt: 3,
            mb: 2,
            flexShrink: 0,
            textAlign: 'left',
            overflow: 'hidden',
            position: 'absolute',
            top: 0,
            left: 0,
            marginTop: '100px',
            marginLeft: '100px',
            whiteSpace: 'nowrap', // Add this line
          }}
        >
          <ArrowBack />
          חזרה לרשימת משתמשים
        </Button>
      </div>

      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Avatar sx={{ m: 3, bgcolor: green[500], width: 88, height: 88 }}>
              <PersonAddAlt color="action" fontSize="large" />
            </Avatar>
            <Typography component="h1" variant="h5">
              Add User
            </Typography>
            <Box component="form" onSubmit={handleSubmit(save)} noValidate sx={{ mt: 1 }}>
              <TextField margin="normal" required fullWidth id="firstName" label="First name" {...register('firstName')} />
              <TextField margin="normal" required fullWidth id="lastName" label="Last name" {...register('lastName')} />
              <TextField margin="normal" required fullWidth id="email" label="Email" {...register('email')} />
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Save
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
};

export default AddUser;
