import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  TextField,
  Button,
  Box,
  Container,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import IGroupModel from '../../Models/IGroupModel';
import GroupService from '../../Services/GroupService';
import { useNavigate } from 'react-router-dom';
import useTitle from '../../hooks/useTitle';
import IUserModel from '../../Models/IUserModel';
import UserService from '../../Services/UserService';


const AddGroup = () => {
  const { register, handleSubmit } = useForm<IGroupModel>();
  const [users, setUsers] = useState<IUserModel[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers = await UserService.getAllUsers();
        setUsers(fetchedUsers);
      } catch (error) {
        console.error('Failed to fetch users:', error);
        // You can add additional error handling here if needed
      }
    };
  
    fetchUsers();
  }, []);
  

  const navigate = useNavigate();
  useTitle("כיתות");

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
      <Button
      variant="contained"
      onClick={() => navigate('/groups')}
      className='btn-top-left'
      >
      <ArrowBack />
        חזרה לכיתות
      </Button>
      <Container component="main" maxWidth="xs">
        <Container component="main" maxWidth="xs">
            <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Typography component="h1" variant="h5">
                הוספת כיתה
              </Typography>
              
              <Box component="form" onSubmit={handleSubmit(save)} sx={{ mt: 3 }}>
              
                <FormControl margin="normal" required fullWidth>
                  <TextField label="שם כיתה" required fullWidth {...register('name')} />
                </FormControl>                
                
                
                <FormControl margin="normal" required fullWidth>
                <InputLabel id="group-label">מורה</InputLabel>
                  <Select
                    labelId="group-label"
                    id="group"
                    {...register('teacher')}
                    defaultValue=""
                    label="כיתה"
                  >
                    {users.map((user) => (
                      <MenuItem key={user._id} value={user._id}>
                        {`${user.firstName} ${user.lastName}`}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                              
                  

                <FormControl className='flex space row gap-10' fullWidth sx={{ mt: 3, mb: 2 }}>
                  <Button fullWidth variant="outlined" onClick={ () => navigate('/groups')}>
                    ביטול
                  </Button>
                  <Button fullWidth type="submit" variant="contained" >
                      שמירה 
                  </Button>
                </FormControl>

              </Box>
            </Box>
          </Container>
      </Container>
    </>
  );
};

export default AddGroup;
