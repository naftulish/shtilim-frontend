import React from 'react';
import { useForm } from 'react-hook-form';
import {
  TextField,
  Button,
  Box,
  Container,
  Typography,
  Avatar,
  CssBaseline,
  createTheme,
  ThemeProvider,
} from '@mui/material';
import { ArrowBack, GroupAdd } from '@mui/icons-material';
import IGroupModel from '../../Models/IGroupModel';
import GroupService from '../../Services/GroupService';
import { useNavigate } from 'react-router-dom';

const defaultTheme = createTheme();

const AddGroup = () => {
  const { register, handleSubmit } = useForm<IGroupModel>();
  const navigate = useNavigate();

  const save = async (group: IGroupModel) => {
    try {
      await GroupService.addGroup(group);
      alert('Group saved successfully');
    } catch (error: any) {
      console.error(error);
      alert('Error saving group: ' + error.message);
    }
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className="button">
          <Button
            variant="contained"
            onClick={() => navigate('/groups')}
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
            חזרה לרשימת קבוצות
          </Button>
        </div>

        <ThemeProvider theme={defaultTheme}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <GroupAdd />
              </Avatar>
              <Typography component="h1" variant="h5">
                הוסף קבוצה
              </Typography>
              <Box component="form" onSubmit={handleSubmit(save)} sx={{ mt: 3 }}>
                <TextField label="שם קבוצה" required fullWidth {...register('name')} />
                <TextField label="מורה" required fullWidth {...register('teacher')} />
                <Button variant="contained" type="submit" fullWidth sx={{ mt: 3, mb: 2 }}>
                  שמור
                </Button>
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
      </Container>
    </>
  );
};

export default AddGroup;
