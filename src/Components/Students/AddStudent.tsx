import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  TextField,
  Button,
  Box,
  Container,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import IStudentModel from '../../Models/IStudentModel';
import StudentService from '../../Services/StudentService';
import GroupService from '../../Services/GroupService';

import IGroupModel from '../../Models/IGroupModel';


import { useNavigate } from 'react-router-dom';

const AddStudent = () => {
  const { register, handleSubmit } = useForm<IStudentModel>();
  const [groups, setGroups] = useState<IGroupModel[]>([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    try {
      const fetchedGroups = await GroupService.getAllGroups();
      setGroups(fetchedGroups);
    } catch (error:any) {
      console.error(error);
      alert('Error fetching groups: ' + error.message);
    }
  };

  const save = async (student: IStudentModel) => {
    try {
      await StudentService.addStudent(student);
      alert('Student saved successfully');
    } catch (error: any) {
      console.error(error);
      alert('Error saving student: ' + error.message);
    }
  };

  return (
    <>
      <div className="button">
        <Button className='btn-top-left' variant="contained" onClick={() => navigate('/students')}>
          <ArrowBack />
          חזרה לרשימת תלמידים
        </Button>
      </div>

        <Container component="main" maxWidth="xs">

          <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography component="h1" variant="h5">
              הוספת תלמיד חדש
            </Typography>
            <Box component="form" onSubmit={handleSubmit(save)} sx={{ mt: 3 }}>
              <TextField label="שם פרטי" required fullWidth {...register('firstName')} />
              <TextField label="שם משפחה" margin="normal" required fullWidth {...register('lastName')} />

              <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="dateOfBirth"
                    label="תאריך לידה"
                    type="date"
                    defaultValue={undefined}
                    {...register('dateOfBirth')}
                    InputLabelProps={{
                      shrink: true,
                    }}
              />

              <FormControl margin="normal" required fullWidth>
                <InputLabel id="gender-label">מין</InputLabel>
                <Select
                  labelId="gender-label"
                  id="gender"
                  {...register('gender')}
                  defaultValue=""
                  label="מין"
                >
                  <MenuItem value="זכר">זכר</MenuItem>
                  <MenuItem value="נקבה">נקבה</MenuItem>
                </Select>
              </FormControl>

              <FormControl margin="normal" required fullWidth>
                <InputLabel id="group-label">כיתה</InputLabel>
                <Select
                  labelId="group-label"
                  id="group"
                  {...register('group')}
                  defaultValue=""
                  label="כיתה"
                >
                  {groups.map((group) => (
                    <MenuItem key={group._id} value={group._id}>
                      {group.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                label="כתובת"
                {...register('address')}
                margin="normal"
                required
                fullWidth
                multiline
              />

              <FormControl className='flex space row gap-10' fullWidth sx={{ mt: 3, mb: 2 }}>
                <Button fullWidth variant="outlined" onClick={ () => navigate('/students')}>
                  ביטול
                </Button>
                <Button fullWidth type="submit" variant="contained" >
                    שמירה 
                </Button>
              </FormControl>
            </Box>
          </Box>
        </Container>
    </>
  );
};

export default AddStudent;


