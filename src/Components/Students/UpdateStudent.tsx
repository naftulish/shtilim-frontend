


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
import IStudentModel from '../../Models/IStudentModel';
import StudentService from '../../Services/StudentService';
import IGroupModel from '../../Models/IGroupModel';
import GroupService from '../../Services/GroupService';
import useTitle from '../../hooks/useTitle';


const UpdateStudent = () => {
  const { id } = useParams();
  const [student, setStudent] = useState<IStudentModel>({
    _id: '',
    firstName: '',
    lastName: '',
    dateOfBirth: new Date(),
    gender: '',
    address: '',
    plans: [],
    group: '',
  });

  useTitle("תלמידים");

  const navigate = useNavigate();
  const { register, handleSubmit, setValue } = useForm<IStudentModel>();
  const [groups, setGroups] = useState<IGroupModel[]>([]);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        if (id) {
          const fetchedStudent = await StudentService.getStudent(id);
          setStudent(fetchedStudent);
          setValue('firstName', fetchedStudent.firstName);
          setValue('lastName', fetchedStudent.lastName);
          setValue('dateOfBirth', fetchedStudent.dateOfBirth);
          setValue('gender', fetchedStudent.gender);
          setValue('plans', fetchedStudent.plans);
          setValue('group', fetchedStudent.group);
          setValue('address', fetchedStudent.address);
          
        }
      } catch (error) {
        alert('Failed to fetch the student!');
      }
    };
  
    fetchStudent();
  }, [id, setValue]);

  

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const fetchedGroups = await GroupService.getAllGroups();
        setGroups(fetchedGroups);
      } catch (error) {
        console.log(error);
        alert('Failed to fetch the groups!');
      }
    };

    fetchGroups();
  }, []);

  const handleFormSubmit = async (data: IStudentModel) => {
    try {
      const updatedStudent = {
        _id: student._id,
        firstName: data.firstName,
        lastName: data.lastName,
        dateOfBirth: data.dateOfBirth,
        gender: data.gender,
        address: data.address,
        plans: data.plans,
        group: data.group,
      };

      await StudentService.updateOneStudent(student._id, updatedStudent);
      alert('You have successfully updated the student!');
      navigate('/students');
    } catch (error: any) {
      if (error.response) {
        console.log('Error response:', error.response.data);
        console.log('Error status code:', error.response.status);
      } else {
        console.log('Error:', error.message);
      }
    }
  };

  const handleGoBack = () => {
    navigate('/students');
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
            עדכון תלמיד
          </Typography>
          {student && (
            <form onSubmit={handleSubmit(handleFormSubmit)}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="firstName"
                label="שם פרטי"
                defaultValue={student.firstName}
                autoFocus
                {...register('firstName')}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                id="lastName"
                label="שם משפחה"
                defaultValue={student.lastName}
                {...register('lastName')}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                id="dateOfBirth"
                label="תאריך לידה"
                type="date"
                defaultValue={student.dateOfBirth}
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
                  defaultValue={student.gender}
                  label="מין"
                >
                  <MenuItem value="זכר">זכר</MenuItem>
                  <MenuItem value="נקבה">נקבה</MenuItem>
                </Select>
              </FormControl>

              <FormControl margin="normal" fullWidth>
                <InputLabel id="group-label">כיתה</InputLabel>
                <Select
                  labelId="group-label"
                  id="group"
                  {...register('group')}
                  defaultValue={student.group}
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
                margin="normal"
                required
                fullWidth
                id="address"
                label="כתובת"
                defaultValue={student.address}
                {...register('address')}
              />
              <FormControl className='flex space row gap-10' fullWidth sx={{ mt: 3, mb: 2 }}>
                <Button fullWidth variant="outlined" onClick={ () => navigate('/students')}>
                  ביטול
                </Button>
                <Button fullWidth type="submit" variant="contained" >
                    שמירה 
                </Button>
              </FormControl>
            </form>
          )}
        </Box>
      </Container>
  );
};

export default UpdateStudent;
