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
// import { useForm } from 'react-hook-form';
// import IUserModel, { Role } from '../../Models/IUserModel';
// import UserService from '../../Services/UserService';
// import userServise from '../../Services/UserService';

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

//   console.log(user);
  

//   const navigate = useNavigate();
//   const { register, handleSubmit, setValue } = useForm<IUserModel>();

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         if (id) {
//           const fetchedUser = await UserService.getUser(id);
//           setUser( fetchedUser );
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
//   }, []);

  

//   const handleFormSubmit = async (data: IUserModel) => {
//     try {
//       const updatedUser = {
//         _id: user!._id,
//         firstName: data.firstName,
//         lastName: data.lastName,
//         email: data.email,
//         active: data.active,
//         role: data.role,
//       };

//       await userServise.updateUser(user._id, updatedUser);
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
import userServise from '../../../Services/UserService';


const defaultTheme = createTheme();

const UpdateUser = () => {
  const { id } = useParams();
  const [user, setUser] = useState<IUserModel>({
    _id: '',
    firstName: '',
    lastName: '',
    email: '',
    active: false,
    role: Role.user,
  });

  const navigate = useNavigate();
  const { register, handleSubmit, setValue } = useForm<IUserModel>();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (id) {
          const fetchedUser = await UserService.getUser(id);
          setUser(fetchedUser);
          setValue('firstName', fetchedUser.firstName);
          setValue('lastName', fetchedUser.lastName);
          setValue('email', fetchedUser.email);
          setValue('active', fetchedUser.active);
          setValue('role', fetchedUser.role);
        }
      } catch (error) {
        console.log(error);
        alert('Failed to fetch the user!');
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

      await userServise.updateUser(user._id, updatedUser);
    alert('You have successfully updated the user!');
    navigate('/users');
  } catch (error) {
    if ((error as any).response) {
      console.log('Error response:', (error as any).response.data);
      console.log('Error status code:', (error as any).response.status);
    } else {
      console.log('Error:', (error as any).message);
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



