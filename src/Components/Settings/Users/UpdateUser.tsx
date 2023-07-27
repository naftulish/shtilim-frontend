

import React, { useState, useEffect, SyntheticEvent } from 'react';
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

import IUserModel, { Role } from '../../../Models/IUserModel';
import UserService from '../../../Services/UserService';
import useTitle from '../../../hooks/useTitle';
import notification from '../../../Services/Notification';


const UpdateUser = () => {
  const { id } = useParams();
  const [user, setUser] = useState<IUserModel>({
    _id: "",
    firstName: "",
    lastName: "",
    email: "",
    active: true,
    role: Role.reporter,
    password: "",
  });

  const navigate = useNavigate();
  useTitle("משתמשים");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (id) {
          const fetchedUser = await UserService.getUserById(id);
          fetchedUser.password = "";
          setUser(fetchedUser);
        }
      } catch (error) {
        console.log(error);
        notification.error('שדיאה בפרטי המשתמש');
      }
    };

    fetchUser();
  }, []);

  const save = async (event: SyntheticEvent ) => {
    event.preventDefault();
    try {
      // Check if the password field is not empty and not undefined
      if (user.password && user.password.trim()) {
        const updatedUser = {
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          active: user.active,
          role: user.role,
          password: user.password, // Add the password field back if it's not empty
        };
  
        await UserService.updateOneUser(user?._id || '', updatedUser);
        notification.success('המשתמש עודכן בהצלחה!');
        setTimeout(() => navigate("/users"), 500 );
      } else {
        // If the password field is empty or undefined, remove it from the data object
        delete user.password;
  
        const updatedUser = {
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          active: user.active,
          role: user.role,
        };
  
        await UserService.updateOneUser(user?._id || '', updatedUser);
        notification.success('המשתמש עודכן בהצלחה!');
        setTimeout(() => navigate("/users"), 500 );
      }
    } catch (error: any) {
      notification.error();
    }
  };


  const getVal = ( str:string ):Role => {
    switch (str) {
      case "ADMIN":
        return Role.admin;
      case "PManager":
        return Role.programManager;
      case "Reporter":
        return Role.reporter;
    }
    return Role.admin;
  }
  

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
            <form onSubmit={save}>
              <TextField
                margin="normal"
                fullWidth
                id="firstName"
                label="שם פרטי"
                autoFocus
                value={user.firstName}
                onChange={e => setUser( {...user, firstName: e.target.value })}
              />
              <TextField
                margin="normal"
                fullWidth
                id="lastName"
                label="שם משפחה"
                value={user.lastName}
                onChange={e => setUser( {...user, lastName: e.target.value })}
              />
              <TextField
                margin="normal"
                fullWidth
                id="email"
                label="כתובת דואר אלקטרוני"
                value={user.email}
                onChange={e => setUser( {...user, email: e.target.value })}
              />

              <TextField 
              margin="normal" 
              fullWidth 
              id="password" 
              label="סיסמה" 
              value={user.password}
              onChange={e => setUser( {...user, password: e.target.value })}
               />

              <FormControl fullWidth margin="normal">
                <InputLabel id="active-label">סטטוס</InputLabel>
                <Select
                  id="active"
                  labelId="active-label"
                  value={user.active ? 'true' : 'false'}
                  onChange={e => setUser( {...user, active: e.target.value === "true" ? true : false  })}
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
                  value={user.role}
                  onChange={e => setUser( {...user, role: getVal(e.target.value) })}
                >
                  <MenuItem value={Role.admin}>מנהל</MenuItem>
                  <MenuItem value={Role.programManager}>מנהל תוכניות</MenuItem>
                  <MenuItem value={Role.reporter}>מדווח</MenuItem>
    
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
