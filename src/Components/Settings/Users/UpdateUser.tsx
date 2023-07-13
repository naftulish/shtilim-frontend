
// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import {
//   TextField,
//   Button,
//   Box,
//   Container,
//   Typography,
//   Avatar,
//   CssBaseline,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
// } from '@mui/material';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import { Edit as EditIcon } from '@mui/icons-material';
// import { green } from '@mui/material/colors';
// import { Controller, useForm } from 'react-hook-form';
// import IUserModel, { Role } from '../../../Models/IUserModel';
// import UserService from '../../../Services/UserService';
// import userServise from '../../../Services/UserService';

// const defaultTheme = createTheme();

// const UpdateUser = () => {
//   const { id } = useParams();
//   const [user, setUser] = useState<IUserModel>({
//     _id: '',
//     firstName: '',
//     lastName: '',
//     email: '',
//     active: false,
//     role: Role.user,
//   });

//   const navigate = useNavigate();
//   const { register, handleSubmit, setValue } = useForm<IUserModel>();

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         if (id) {
//           const fetchedUser = await UserService.getUserById(id);
//           setUser(fetchedUser);
//           setValue('firstName', fetchedUser.firstName);
//           setValue('lastName', fetchedUser.lastName);
//           setValue('email', fetchedUser.email);
//           setValue('active', fetchedUser.active);
//           setValue('role', fetchedUser.role);
//         }
//       } catch (error) {
//         console.log(error);
//         alert('Failed to fetch the user!');
//       }
//     };

//     fetchUser();
//   }, [id, setValue]);

//   const handleFormSubmit = async (data: IUserModel) => {
//     try {
//       const updatedUser = {
//         _id: user._id,
//         firstName: data.firstName,
//         lastName: data.lastName,
//         email: data.email,
//         active: data.active,
//         role: data.role,
//       };

//       await userServise.updateOneUser(user._id, updatedUser);
//     alert('You have successfully updated the user!');
//     navigate('/users');
//   } catch (error: any) {
//     if (error.response) {
//       console.log('Error response:', error.response.data);
//       console.log('Error status code:', error.response.status);
//     } else {
//       console.log('Error:', error.message);
//     }
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
//               <FormControl fullWidth margin="normal">
//                 <InputLabel id="active-label">Status</InputLabel>
//                 <Select
//                   id="active"
//                   labelId="active-label"
//                   defaultValue={user.active ? 'Active' : 'Inactive'}
//                   {...register('active')}
//                 >
//                   <MenuItem value="Active">Active</MenuItem>
//                   <MenuItem value="Inactive">Inactive</MenuItem>
//                 </Select>
//               </FormControl>
//               {/* <Controller
//                 name="active"
//                 control={control}
//                 defaultValue={user.active ? 'Active' : 'Inactive'}
//                 render={({ field }) => (
//                   <FormControl fullWidth margin="normal">
//                     <InputLabel id="active-label">Status</InputLabel>
//                     <Select
//                       id="active"
//                       labelId="active-label"
//                       {...field}
//                     >
//                       <MenuItem value="Active">Active</MenuItem>
//                       <MenuItem value="Inactive">Inactive</MenuItem>
//                     </Select>
//                   </FormControl>
//                 )}
//               /> */}
//               <FormControl fullWidth margin="normal">
//                 <InputLabel id="role-label">Role</InputLabel>
//                 <Select
//                   id="role"
//                   labelId="role-label"
//                   defaultValue={user.role}
//                   {...register('role')}
//                 >
//                   <MenuItem value={Role.admin}>ADMIN</MenuItem>
//                   <MenuItem value={Role.user}>USER</MenuItem>
//                 </Select>
//               </FormControl>
//               <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
//                 Update
//               </Button>
//               <Button fullWidth variant="contained" onClick={handleGoBack}>
//                 Cancel
//               </Button>
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
  const { id } = useParams();
  const [user, setUser] = useState<IUserModel>(
    {
      _id: '',
      firstName: '',
      lastName: '',
      email: "",
      active: false,
      role: Role.user,
    });
  const navigate = useNavigate();
  const { register, handleSubmit, setValue } = useForm<IUserModel>();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (id) {
          const fetchedUser = await UserService.getUserById(id);
          setUser(fetchedUser);
          setValue('firstName', fetchedUser.firstName);
          setValue('lastName', fetchedUser.lastName);
          setValue('email', fetchedUser.email);
          setValue('active', fetchedUser.active);
          setValue('role', fetchedUser.role);
        }
      } catch (error) {
        console.log(error);
        alert('נכשל לקבל את המשתמש!');
      }
    };

    fetchUser();
  }, []);

  const handleFormSubmit = async (data: IUserModel) => {
    try {
      const updatedUser = {
        _id: user._id,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        active: data.active,
        role: data.role,
      };

      await UserService.updateOneUser(user?._id || '', updatedUser);
      alert('המשתמש עודכן בהצלחה!');
      navigate('/users');
    } catch (error: any) {
      if (error.response) {
        console.log('תגובת שגיאה:', error.response.data);
        console.log('קוד סטטוס שגיאה:', error.response.status);
      } else {
        console.log('שגיאה:', error.message);
      }
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
            עדכון משתמש
          </Typography>
          {user && (
            <form onSubmit={handleSubmit(handleFormSubmit)}>
              <TextField
                margin="normal"
                fullWidth
                id="firstName"
                label="שם פרטי"
                defaultValue={user.firstName}
                autoFocus
                {...register('firstName')}
              />
              <TextField
                margin="normal"
                fullWidth
                id="lastName"
                label="שם משפחה"
                defaultValue={user.lastName}
                {...register('lastName')}
              />
              <TextField
                margin="normal"
                fullWidth
                id="email"
                label="כתובת דואר אלקטרוני"
                defaultValue={user.email}
                {...register('email')}
              />
              <FormControl fullWidth margin="normal">
                <InputLabel id="active-label">סטטוס</InputLabel>
                <Select
                  id="active"
                  labelId="active-label"
                  defaultValue={user.active ? 'true' : 'false'}
                  {...register('active')}
                >
                  <MenuItem value="true">פעיל</MenuItem>
                  <MenuItem value="false">לא פעיל</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth margin="normal">
                <InputLabel id="role-label">תפקיד</InputLabel>
                <Select
                  id="role"
                  labelId="role-label"
                  defaultValue={user.role}
                  {...register('role')}
                >
                  <MenuItem value={Role.admin}>מנהל</MenuItem>
                  <MenuItem value={Role.user}>משתמש</MenuItem>
                </Select>
              </FormControl>
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                עדכון
              </Button>
              <Button fullWidth variant="contained" onClick={handleGoBack}>
                ביטול
              </Button>
            </form>
          )}
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default UpdateUser;
