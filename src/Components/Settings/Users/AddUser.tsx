
import React from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Box, Container, Typography, Avatar, CssBaseline, InputLabel, Select, FormControl, MenuItem } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import IUserModel, { Role } from '../../../Models/IUserModel';
import userServise from '../../../Services/UserService';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { ArrowBack } from '@mui/icons-material';
import { green } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';

const defaultTheme = createTheme();

const AddUser = () => {
  const { register, handleSubmit } = useForm<IUserModel>();
  const navigate = useNavigate();

  const save = async (user: IUserModel) => {
    // console.log(user);
    // return;
    try {
      await userServise.addUser(user);
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
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <PersonAddIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Add User
            </Typography>
            <Box component="form" onSubmit={handleSubmit(save)} noValidate sx={{ mt: 1 }}>
              <TextField margin="normal" required fullWidth id="firstName" label="First name" {...register('firstName')} />
              <TextField margin="normal" required fullWidth id="lastName" label="Last name" {...register('lastName')} />
              <TextField margin="normal" required fullWidth id="email" label="Email" {...register('email')} />
              <TextField margin="normal" required fullWidth id="password" label="Password" {...register('password')} />
              <FormControl fullWidth margin="normal">
                <InputLabel id="active-label">סטטוס</InputLabel>
                <Select
                  id="active"
                  labelId="active-label"
                  defaultValue=""
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
                  defaultValue=""
                  {...register('role')}
                >
                  <MenuItem value={Role.admin}>מנהל</MenuItem>
                  <MenuItem value={Role.user}>משתמש</MenuItem>
                </Select>
              </FormControl>
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
