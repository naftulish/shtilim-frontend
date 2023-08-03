


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
import IStudentModel from '../../Models/IStudentModel';
import StudentService from '../../Services/StudentService';
import IGroupModel from '../../Models/IGroupModel';
import GroupService from '../../Services/GroupService';
import useTitle from '../../hooks/useTitle';
import notification from '../../Services/Notification';


const UpdateStudent = () => {
  const { id } = useParams();
  const [student, setStudent] = useState<IStudentModel>({
    _id: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    address: '',
    plans: [],
    group: '',
  });
  const navigate = useNavigate();
  const [groups, setGroups] = useState<IGroupModel[]>([]);
  
  useTitle("תלמידים");

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        if (id) {
          const fetchedStudent = await StudentService.getStudent(id);
          setStudent(fetchedStudent);
        }
      } catch (error) {
        alert('Failed to fetch the student!');
      }
    };
  
    fetchStudent();
  }, []);


  const getDate = ( str:string ) => {
    var now = new Date(str);

    var day = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);
    
    return now.getFullYear()+"-"+(month)+"-"+(day) ;
  }
  

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const fetchedGroups = await GroupService.getAllGroups();
        setGroups(fetchedGroups);
      } catch (error) {
        notification.error();
      }
    };

    fetchGroups();
  }, []);

  const save = async (event: SyntheticEvent ) => {
    event.preventDefault();
    try {
      await StudentService.updateOneStudent(student._id, student);
      notification.success("העדכון בוצע בהצלחה");
      navigate('/students');
    } catch (error: any) {
      notification.error();
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
            עדכון תלמיד
          </Typography>
          {student && (
            <form onSubmit={save}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="firstName"
                label="שם פרטי"
                autoFocus
                value={student.firstName}
                onChange={e => setStudent( {...student, firstName: e.target.value })}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                id="lastName"
                label="שם משפחה"
                value={student.lastName}
                onChange={e => setStudent( {...student, lastName : e.target.value })}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                id="dateOfBirth"
                label="תאריך לידה"
                type="date"
                value={getDate(student.dateOfBirth)}
                onChange={e => setStudent( {...student, dateOfBirth: e.target.value })}

              />

              <FormControl margin="normal" required fullWidth>
                <InputLabel id="gender-label">מין</InputLabel>
                <Select
                  labelId="gender-label"
                  id="gender"
                  value={student.gender}
                onChange={e => setStudent( {...student, gender: e.target.value })}
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
                  value={student.group}
                  onChange={e => setStudent( {...student, group: e.target.value })}
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
                value={student.address}
                onChange={e => setStudent( {...student, address: e.target.value })}
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
