import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  TextField,
  Button,
  Box,
  Container,
  Typography,
  Avatar,
  CssBaseline,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Edit as EditIcon } from '@mui/icons-material';
import { green } from '@mui/material/colors';
import { useForm } from 'react-hook-form';
import IStudentModel from '../../Models/IStudentModel';
import StudentService from '../../Services/StudentService';

const defaultTheme = createTheme();

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

  const navigate = useNavigate();
  const { register, handleSubmit, setValue } = useForm<IStudentModel>();

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        if (id) {
          const fetchedStudent = await StudentService.getStudent(id);
          setStudent(fetchedStudent);
          setValue('firstName', fetchedStudent.firstName);
          setValue('lastName', fetchedStudent.lastName);
          setValue('dateOfBirth', fetchedStudent.dateOfBirth); // Updated line
          setValue('gender', fetchedStudent.gender);
          setValue('address', fetchedStudent.address);
          setValue('group', fetchedStudent.group);
        }
      } catch (error) {
        console.log(error);
        alert('Failed to fetch the student!');
      }
    };
  
    fetchStudent();
  }, []);
  

  const handleFormSubmit = async (data: IStudentModel) => {
    try {
      const updatedStudent = {
        _id: student._id,
        firstName: data.firstName,
        lastName: data.lastName,
        dateOfBirth: new Date(data.dateOfBirth),
        gender: data.gender,
        address: data.address,
        plans: student.plans,
        group: data.group,
      };

      await StudentService.updateStudent(student._id, updatedStudent);
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
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Container maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: green[500] }}>
            <EditIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Update Student
          </Typography>
          {student && (
            <form onSubmit={handleSubmit(handleFormSubmit)}>
              <TextField
                margin="normal"
                fullWidth
                id="firstName"
                label="First Name"
                defaultValue={student.firstName}
                autoFocus
                {...register('firstName')}
              />
              <TextField
                margin="normal"
                fullWidth
                id="lastName"
                label="Last Name"
                defaultValue={student.lastName}
                {...register('lastName')}
              />
              <TextField
                margin="normal"
                fullWidth
                id="dateOfBirth"
                label="Date of Birth"
                type="date"
                defaultValue={student.dateOfBirth.toISOString().split('T')[0]}
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

              {/* <TextField
                margin="normal"
                fullWidth
                id="gender"
                label="Gender"
                defaultValue={student.gender}
                {...register('gender')}
              /> */}
              
              <TextField
                margin="normal"
                fullWidth
                id="address"
                label="Address"
                defaultValue={student.address}
                {...register('address')}
              />
              <TextField
                margin="normal"
                fullWidth
                id="group"
                label="Group"
                defaultValue={student.group}
                {...register('group')}
              />
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Update
              </Button>
              <Button fullWidth variant="contained" onClick={handleGoBack}>
                Cancel
              </Button>
            </form>
          )}
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default UpdateStudent;

// import React, { useState } from 'react';
// import IStudentModel from '../../Models/IStudentModel';


// const UpdateStudent = () => {
//   const [student, setStudent] = useState<IStudentModel>({
//     _id: '',
//     firstName: '',
//     lastName: '',
//     dateOfBirth: new Date(),
//     gender: '',
//     address: '',
//     plans: [],
//     group: '',
//   });

//   const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = event.target;
//     setStudent((prevStudent) => ({
//       ...prevStudent,
//       [name]: name === 'dateOfBirth' ? new Date(value) : value,
//     }));
//   };

//   const handleSubmit = (event: React.FormEvent) => {
//     event.preventDefault();
//     // Perform the update logic here
//     console.log(student);
//   };

//   return (
//     <div>
//       <h2>Update Student</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>First Name:</label>
//           <input
//             type="text"
//             name="firstName"
//             value={student.firstName}
//             onChange={handleInputChange}
//           />
//         </div>
//         <div>
//           <label>Last Name:</label>
//           <input
//             type="text"
//             name="lastName"
//             value={student.lastName}
//             onChange={handleInputChange}
//           />
//         </div>
//         <div>
//           <label>Date of Birth:</label>
//           <input
//             type="date"
//             name="dateOfBirth"
//             value={student.dateOfBirth.toISOString().substring(0, 10)}
//             onChange={handleInputChange}
//           />
//         </div>
//         <div>
//           <label>Gender:</label>
//           <input
//             type="text"
//             name="gender"
//             value={student.gender}
//             onChange={handleInputChange}
//           />
//         </div>
//         <div>
//           <label>Address:</label>
//           <input
//             type="text"
//             name="address"
//             value={student.address}
//             onChange={handleInputChange}
//           />
//         </div>
//         <div>
//           <label>Group:</label>
//           <input
//             type="text"
//             name="group"
//             value={student.group}
//             onChange={handleInputChange}
//           />
//         </div>
//         <button type="submit">Update</button>
//       </form>
//     </div>
//   );
// };

// export default UpdateStudent;
