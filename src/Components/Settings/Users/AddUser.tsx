// import React, { useState, useEffect } from "react";
// import { useForm } from "react-hook-form";
// import { TextField, Button, Grid, Box } from "@mui/material";
// import userServise from "../../../Services/UserService";
// import IUserModel from "../../../Models/IUserModel";



// const AddUser = () => {
  
//   const { register, handleSubmit } = useForm<IUserModel>();

//   const save = (p:IUserModel) => {
//     userServise.addUser( p ).then( d => console.log( d ) )
// }

//   return (
//     <div>
//       <h1>Add User</h1>
//       <form onSubmit={handleSubmit(save)}>
//         <Grid container spacing={2}>
//           <Grid item xs={12}>
//             <TextField
//               label="First name"
//               {...register("firstName")}
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <TextField
//               label="Last name"
//               {...register("lastName")}
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <TextField
//               label="Email"
//               {...register("email")}
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <Button variant="contained" type="submit">
//               Save
//             </Button>
//           </Grid>
//         </Grid>
//       </form>
//     </div>
//   );
// };

// export default AddUser;





// //   async function isUserInDatabase(email: string): Promise<boolean> {
// //     // TODO return back after DB will work
// //     // const user = await userServise.getUserByEmail(email);
// //     // TODO change to "return user";
// //     return false;
//   };
  
// //   //TODO alert after sucsefull adding
// //   const onSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault();
  
// //     const isUserInDatabase2 = await isUserInDatabase(email);
  
    
// //         alert("You have successfully added the new user!");
// //       return;
// //     }

//     // try {
//     //   const userCredential = await createUserWithEmailAndPassword(authService.auth, email, password);
//     //   const user = userCredential.user;
//     //   console.log(user);
//     //   navigate('/home');
//     // } catch (error:any) {
//     //   const errorCode = error.code;
//     //   const errorMessage = error.message;
//     //   console.log(errorCode, errorMessage);
//     // }
//   };





import React from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Box, Container, Typography, Avatar} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import IUserModel, { Role } from '../../../Models/IUserModel';
import userServise from '../../../Services/UserService';
import { PersonAddAlt } from '@mui/icons-material';
import { green } from '@mui/material/colors';



const defaultTheme = createTheme();

// const AddUser = () => {
//   const { register, handleSubmit } = useForm<IUserModel>();

//   const save = (p: IUserModel) => {
//     userServise.addUser(p).then((d) => console.log(d));

//     alert("You have successfully added the new user!");

//   };

const AddUser = () => {
  const { register, handleSubmit } = useForm<IUserModel>();

  const save = async (p: IUserModel) => {
    p.role = Role.user ; p.active = true
    try {
      await userServise.addUser(p);
      alert("You have successfully added the new user!");
    } catch (e) {
      console.error(e);
    }
  };
  

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 3, bgcolor: green[500], width: 88, height: 88 }}>
          <PersonAddAlt color="action" fontSize={'large'} />
          </Avatar>
          <Typography component="h1" variant="h5">
            Add User
          </Typography>
          <Box component="form" onSubmit={handleSubmit(save)} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="firstName"
              label="First name"
              {...register('firstName')}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="lastName"
              label="Last name"
              {...register('lastName')}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              {...register('email')}
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Save
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default AddUser;
