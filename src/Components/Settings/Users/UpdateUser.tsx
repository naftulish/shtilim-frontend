

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  TextField,
  Button,
  Box,
  Container,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import IUserModel, { Role } from '../../../Models/IUserModel';
import UserService from '../../../Services/UserService';
import useTitle from '../../../hooks/useTitle';


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
  useTitle("משתמשים");

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

  return (
      <Container maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            עריכת משתמש
          </Typography>
          {user && (
            <form onSubmit={handleSubmit(handleFormSubmit)}>
              <TextField
                margin="normal"
                fullWidth
                id="firstName"
                label="שם פרטי"
                autoFocus
                {...register('firstName')}
              />
              <TextField
                margin="normal"
                fullWidth
                id="lastName"
                label="שם משפחה"
                {...register('lastName')}
              />
              <TextField
                margin="normal"
                fullWidth
                id="email"
                label="כתובת דואר אלקטרוני"
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
                  {...register('role')}
                >
                  <MenuItem value={Role.admin}>מנהל</MenuItem>
                  <MenuItem value={Role.user}>משתמש</MenuItem>
                </Select>
              </FormControl>

              <FormControl className='flex space row gap-10' fullWidth sx={{ mt: 3, mb: 2 }}>
                <Button fullWidth variant="outlined" onClick={() => navigate('/users')}>
                  ביטול
                </Button>
                <Button fullWidth type="submit" variant="contained" >
                  עדכון
                </Button>
              </FormControl>
            </form>
          )}
        </Box>
      </Container>
  );
};

export default UpdateUser;
