
import React, {useState} from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Box, Container, Typography, InputLabel, Select, FormControl, MenuItem, Snackbar } from '@mui/material';
import IUserModel, { Role } from '../../../Models/IUserModel';
import userServise from '../../../Services/UserService';
import { ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';


const AddUser = () => {
  const { register, handleSubmit } = useForm<IUserModel>();
  const navigate = useNavigate();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const save = async (user: IUserModel) => {
    try {
      await userServise.addUser(user);
      setSnackbarMessage('המשתמש נשמר בהצלחה');
      setSnackbarOpen(true);
      setTimeout(() => {
        navigate("/users")
      }, 1500 );
    } catch (error) {
      setSnackbarMessage('ארעה שגיאה בשמירת המשתמש');
      setSnackbarOpen(true);
    }
  };

  return (
    <>
      <div className="button">
        <Button
          variant="contained"
          className='btn-top-left'
          onClick={() => navigate('/users')}>
          <ArrowBack />
          חזרה לרשימת משתמשים
        </Button>
      </div>

        <Container component="main" maxWidth="xs">
          <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography component="h1" variant="h5">
              הוספת משתמש חדש
            </Typography>
            <Box component="form" onSubmit={handleSubmit(save)} noValidate sx={{ mt: 1 }}>
              <TextField margin="normal" required fullWidth id="firstName" label="שם פרטי" {...register('firstName')} />
              <TextField margin="normal" required fullWidth id="lastName" label="שם משפחה" {...register('lastName')} />
              <TextField margin="normal" required fullWidth id="email" label="אימייל" {...register('email')} />
              <TextField margin="normal" required fullWidth id="password" label="סיסמה" {...register('password')} />
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

              <FormControl className='flex space row gap-10' fullWidth sx={{ mt: 3, mb: 2 }}>
                <Button fullWidth variant="outlined" onClick={ () => navigate('/users')}>
                  ביטול
                </Button>
                <Button fullWidth type="submit" variant="contained" >
                    שמירה 
                </Button>
              </FormControl>

            </Box>
          </Box>
        </Container>
        <Snackbar open={snackbarOpen} message={snackbarMessage} />

    </>
  );
};

export default AddUser;
