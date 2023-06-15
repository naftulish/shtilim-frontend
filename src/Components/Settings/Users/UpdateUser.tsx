// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { useForm } from 'react-hook-form';
// import { TextField, Button, Box, Container, Typography, Avatar, CssBaseline } from '@mui/material';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import { Edit as EditIcon } from '@mui/icons-material';
// import { green } from '@mui/material/colors';
// import IUserModel from '../../../Models/IUserModel';
// import UserService from '../../../Services/UserService';


// const defaultTheme = createTheme();

// const UpdateUser = () => {
//   const { id } = useParams<{ id: string | undefined }>();
//   const { register, handleSubmit } = useForm<IUserModel>();
//   const [user, setUser] = useState<IUserModel | null>(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         if (id) {
//           const fetchedUser = await UserService.getUser(id);
//           setUser(fetchedUser);
//         }
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     fetchUser();
//   }, [id]);

//   const handleFormSubmit = async (data: IUserModel) => {
//     try {
//       await UserService.updateUser(data);
//       alert('You have successfully updated the user!');
//       navigate('/users');
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleGoBack = () => {
//     navigate('/users');
//   };

//   return (
//     <ThemeProvider theme={defaultTheme}>
      
//       <Container maxWidth="xs">
//         <Box
//           sx={{
//             marginTop: 8,
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'center',
//           }}
//         >
//           <Avatar sx={{ m: 1, bgcolor: green[500] }}>
//             <EditIcon />
//           </Avatar>
//           <Typography component="h1" variant="h5">
//             Update User
//           </Typography>
//           {user && (
//             <form onSubmit={handleSubmit(handleFormSubmit)}>
//               <TextField
//                 margin="normal"
//                 fullWidth
//                 id="firstName"
//                 label="First Name"
//                 defaultValue={user.firstName}
//                 autoFocus
//                 {...register('firstName')}
//               />
//               <TextField
//                 margin="normal"
//                 fullWidth
//                 id="lastName"
//                 label="Last Name"
//                 defaultValue={user.lastName}
//                 {...register('lastName')}
//               />
//               <TextField
//                 margin="normal"
//                 fullWidth
//                 id="email"
//                 label="Email Address"
//                 defaultValue={user.email}
//                 {...register('email')}
//               />
//               <TextField
//                 margin="normal"
//                 fullWidth
//                 id="role"
//                 label="Role"
//                 defaultValue={user.role}
//                 disabled
//                 {...register('role')}
//               />
            //   <TextField
            //     margin="normal"
            //     fullWidth
            //     id="active"
            //     label="Status"
            //     defaultValue={user.active}
            //     disabled
            //     {...register('active')}
            //   />
//               <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
//                 <Button type="submit" variant="contained" color="primary">
//                   Update
//                 </Button>
//                 <Button variant="contained" onClick={handleGoBack}>
//                   Cancel
//                 </Button>
//               </Box>
//             </form>
//           )}
//         </Box>
//       </Container>
//     </ThemeProvider>
//   );
// };

// export default UpdateUser;


// 

// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { TextField, Button, Box, Container, Typography, Avatar, CssBaseline } from '@mui/material';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import { Edit as EditIcon } from '@mui/icons-material';
// import { green } from '@mui/material/colors';
// import { useForm } from 'react-hook-form';
// import IUserModel from '../../../Models/IUserModel';
// import { Role } from '../../../Models/IUserModel';
// import UserService from '../../../Services/UserService';

// const defaultTheme = createTheme();

// const UpdateUser = () => {
//   const { id } = useParams<{ id: string | undefined }>();
//   const [user, setUser] = useState<IUserModel>({
//     _id: '',
//     firstName: '',
//     lastName: '',
//     email: '',
//     active: false,
//     role: Role.user,
//   });

//   const navigate = useNavigate();
//   const { register, handleSubmit } = useForm<IUserModel>({});

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         console.log(id);
//         if (id) {
//           const fetchedUser = await UserService.getUser(id);
//           setUser(fetchedUser);
//         }
//       } catch (error) {
//         console.log(error);
//         alert('You have lose the user!');
//       }
//     };

//     fetchUser();
//   }, [id]);

//   const handleFormSubmit = async (data: IUserModel) => {
//     console.log({ ...user, ...data });
//     //     return
//     try {
        
//     //   await UserService.updateUser({ ...user, ...data });
//     //   alert('You have successfully updated the user!');
//     //   navigate('/users');
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleGoBack = () => {
//     navigate('/users');
//   };

//   return (
//     <ThemeProvider theme={defaultTheme}>
//       <CssBaseline />
//       <Container maxWidth="xs">
//         <Box
//           sx={{
//             marginTop: 8,
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'center',
//           }}
//         >
//           <Avatar sx={{ m: 1, bgcolor: green[500] }}>
//             <EditIcon />
//           </Avatar>
//           <Typography component="h1" variant="h5">
//             Update User
//           </Typography>
//           {user && (
//       <form onSubmit={handleSubmit(handleFormSubmit)}>
//         <TextField
//           margin="normal"
//           fullWidth
//           id="firstName"
//           label="First Name"
//           value={user.firstName}
//           autoFocus
//           {...register('firstName')}
//         />
//         <TextField
//           margin="normal"
//           fullWidth
//           id="lastName"
//           label="Last Name"
//           value={user.lastName}
//           {...register('lastName')}
//         />
//         <TextField
//           margin="normal"
//           fullWidth
//           id="email"
//           label="Email Address"
//           value={user.email}
//           {...register('email')}
//         />
//         <TextField
//           margin="normal"
//           fullWidth
//           id="role"
//           label="Role"
//           value={user.role}
//           disabled
//           {...register('role')}
//         />
//         <TextField
//           margin="normal"
//           fullWidth
//           id="active"
//           label="Status"
//           value={user.active ? 'Active' : 'Inactive'}
//           disabled
//           {...register('active')}
//         />
//               <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
//                 <Button type="submit" variant="contained" color="primary">
//                   Update
//                 </Button>
//                 <Button variant="contained" onClick={handleGoBack}>
//                   Cancel
//                 </Button>
//               </Box>
//             </form>
//           )}
//         </Box>
//       </Container>
//     </ThemeProvider>
//   );
// };

// export default UpdateUser;


// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { TextField, Button, Box, Container, Typography, Avatar, CssBaseline } from '@mui/material';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import { Edit as EditIcon } from '@mui/icons-material';
// import { green } from '@mui/material/colors';
// import { useForm } from 'react-hook-form';
// import IUserModel from '../../../Models/IUserModel';
// import { Role } from '../../../Models/IUserModel';
// import UserService from '../../../Services/UserService';

// const defaultTheme = createTheme();

// const UpdateUser = () => {
//   const { id } = useParams<{ id: string | undefined }>();
//   const [user, setUser] = useState<IUserModel>({
//     _id: '',
//     firstName: '',
//     lastName: '',
//     email: '',
//     active: false,
//     role: Role.user,
//   });

//   const navigate = useNavigate();
//   const { register, handleSubmit } = useForm<IUserModel>({});

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         console.log(id);
//         if (id) {
//           const fetchedUser = await UserService.getUser(id);
//           setUser(fetchedUser);
//         }
//       } catch (error) {
//         console.log(error);
//         alert('Failed to fetch the user!');
//       }
//     };

//     fetchUser();
//   }, [id]);

//   const handleFormSubmit = async (data: IUserModel) => {
    
//     try {
//       const updatedUser = {
//         ...user,
//         ...data,
//         active: data.active !== undefined ? data.active : user.active,
//         role: data.role !== undefined ? data.role : user.role,
//       };
  
//       await UserService.updateUser(updatedUser);
//       alert('You have successfully updated the user!');
//       navigate('/users');
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleGoBack = () => {
//     navigate('/users');
//   };

//   return (
//     <ThemeProvider theme={defaultTheme}>
//       <CssBaseline />
//       <Container maxWidth="xs">
//         <Box
//           sx={{
//             marginTop: 8,
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'center',
//           }}
//         >
//           <Avatar sx={{ m: 1, bgcolor: green[500] }}>
//             <EditIcon />
//           </Avatar>
//           <Typography component="h1" variant="h5">
//             Update User
//           </Typography>
//           {user && (
//             <form onSubmit={handleSubmit(handleFormSubmit)}>
//               <TextField
//                 margin="normal"
//                 fullWidth
//                 id="firstName"
//                 label="First Name"
//                 value={user.firstName}
//                 autoFocus
//                 {...register('firstName')}
//               />
//               <TextField
//                 margin="normal"
//                 fullWidth
//                 id="lastName"
//                 label="Last Name"
//                 value={user.lastName}
//                 {...register('lastName')}
//               />
//               <TextField
//                 margin="normal"
//                 fullWidth
//                 id="email"
//                 label="Email Address"
//                 value={user.email}
//                 {...register('email')}
//               />
//               <TextField
//                 margin="normal"
//                 fullWidth
//                 id="role"
//                 label="Role"
//                 value={user.role}
                
//                 {...register('role')}
//               />
//               <TextField
//                 margin="normal"
//                 fullWidth
//                 id="active"
//                 label="Status"
//                 value={user.active ? 'Active' : 'Inactive'}
                
//                 {...register('active')}
//               />
//               <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
//                 <Button type="submit" variant="contained" color="primary">
//                   Update
//                 </Button>
//                 <Button variant="contained" onClick={handleGoBack}>
//                   Cancel
//                 </Button>
//               </Box>
//             </form>
//           )}
//         </Box>
//       </Container>
//     </ThemeProvider>
//   );
// };

// export default UpdateUser;


import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  TextField,
  Button,
  Box,
  Container,
  Typography,
  Avatar,
  CssBaseline,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Edit as EditIcon } from '@mui/icons-material';
import { green } from '@mui/material/colors';
import { useForm } from 'react-hook-form';
import IUserModel, { Role } from '../../../Models/IUserModel';
import UserService from '../../../Services/UserService';

const defaultTheme = createTheme();

const UpdateUser = () => {
  const { id } = useParams<{ id: string | undefined }>();
  const [user, setUser] = useState<IUserModel | null>(null);

  const navigate = useNavigate();
  const { register, handleSubmit, setValue } = useForm<IUserModel>({});

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (id) {
          const fetchedUser = await UserService.getUser(id);
          setUser(fetchedUser);
        }
      } catch (error) {
        console.log(error);
        alert('Failed to fetch the user!');
      }
    };

    fetchUser();
  }, [id]);

  if (user) {
    setValue('firstName', user.firstName);
    setValue('lastName', user.lastName);
    setValue('email', user.email);
    setValue('active', user.active);
    setValue('role', user.role);
  }

  const handleFormSubmit = async (data: IUserModel) => {
    try {
      const updatedUser = {
        _id: user!._id,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        active: data.active,
        role: data.role,
      };

      await UserService.updateUser(updatedUser);
      alert('You have successfully updated the user!');
      navigate('/users');
    } catch (error) {
      console.log(error);
    }
  };

  const handleGoBack = () => {
    navigate('/users');
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Container maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: green[500] }}>
            <EditIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Update User
          </Typography>
          {user && (
            <form onSubmit={handleSubmit(handleFormSubmit)}>
              <TextField
                margin="normal"
                fullWidth
                id="firstName"
                label="First Name"
                defaultValue={user.firstName}
                autoFocus
                {...register('firstName')}
              />
              <TextField
                margin="normal"
                fullWidth
                id="lastName"
                label="Last Name"
                defaultValue={user.lastName}
                {...register('lastName')}
              />
              <TextField
                margin="normal"
                fullWidth
                id="email"
                label="Email Address"
                defaultValue={user.email}
                {...register('email')}
              />
              <FormControl fullWidth margin="normal">
                <InputLabel id="active-label">Status</InputLabel>
                <Select
                  id="active"
                  labelId="active-label"
                  defaultValue={user.active ? 'Active' : 'Inactive'}
                  {...register('active')}
                >
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="Inactive">Inactive</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth margin="normal">
                <InputLabel id="role-label">Role</InputLabel>
                <Select
                  id="role"
                  labelId="role-label"
                  defaultValue={user.role}
                  {...register('role')}
                >
                  <MenuItem value={Role.admin}>ADMIN</MenuItem>
                  <MenuItem value={Role.user}>USER</MenuItem>
                </Select>
              </FormControl>
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Update
              </Button>
              <Button fullWidth variant="contained" onClick={handleGoBack}>
                Cancel
              </Button>
            </form>
          )}
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default UpdateUser;


