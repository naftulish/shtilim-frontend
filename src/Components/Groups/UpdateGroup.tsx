

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
import GroupService from '../../Services/GroupService';
import IGroupModel from '../../Models/IGroupModel';
import useTitle from '../../hooks/useTitle';
import IUserModel from '../../Models/IUserModel';
import UserService from '../../Services/UserService';
import notification from '../../Services/Notification';

const UpdateGroup = () => {

  const { id } = useParams();
  const navigate = useNavigate();
  const [users, setUsers] = useState<IUserModel[]>([]);
  const [group, setGroup] = useState<IGroupModel>({_id: "", name: "", teacher: ""});
  useTitle("כיתות");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers = await UserService.getAllUsers();
        setUsers(fetchedUsers);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchGroup = async () => {
      try {
        if (id) {
          const fetchedGroup = await GroupService.getGroup(id);
          setGroup(fetchedGroup);
        }
      } catch (error) {
        console.log(error);
        alert('ארעה שגיאה לא ידועה');
      }
    };

    fetchGroup();
  }, []);

  const handleFormSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    try {
      await GroupService.updateGroup( group );
      notification.success('עדכון כיתה הושלם בהצלחה');
      navigate('/groups');
    } catch (error) {
      notification.error()
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
            עדכון כיתה
          </Typography>
          {group && (
            <form onSubmit={handleFormSubmit}>
              <TextField
                margin="normal"
                fullWidth
                id="name"
                label="שם כיתה"
                value={group.name}
                autoFocus
                onChange={e => setGroup( {...group, name: e.target.value })}
              />
              <FormControl margin="normal" required fullWidth>
                <InputLabel id="teacher-label">מורה</InputLabel>
                <Select
                  labelId="teacher-label"
                  id="teacher"
                  value={group.teacher}
                  onChange={e => setGroup( {...group, teacher: e.target.value })}
                  label="מורה / גננת"
                >
                  {users.map((user) => (
                    <MenuItem key={user._id} value={user._id}>
                      {`${user.firstName} ${user.lastName}`}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl className='flex space row gap-10' fullWidth sx={{ mt: 3, mb: 2 }}>
              <Button fullWidth variant="outlined" onClick={() => navigate('/groups')} dir="rtl">
                ביטול
              </Button>
              <Button fullWidth type="submit" variant="contained" dir="rtl">
                שמירה
              </Button>
            </FormControl>
            
            </form>
          )}
        </Box>
      </Container>
  );
};

export default UpdateGroup;

