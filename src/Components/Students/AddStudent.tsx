// import React from 'react';
// import { useForm } from 'react-hook-form';
// import { TextField, Button, Box, Container, Typography, Avatar, CssBaseline } from '@mui/material';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import { PersonAdd } from '@mui/icons-material';
// import IStudentModel from '../../Models/IStudentModel';
// import StudentService from '../../Services/StudentService';


// const defaultTheme = createTheme();

// const NewStudent = () => {
//   const { register, handleSubmit } = useForm<IStudentModel>();

//   const save = async (student: IStudentModel) => {
//     try {
//       await StudentService.addStudent(student);
//       alert('Student saved successfully');
//     } catch (error: any) { // Update the error type
//       console.error(error);
//       alert('Error saving student: ' + error.message);
//     }
//   };

//   return (
//     <>
//       <CssBaseline />
//       <Box
//         sx={{
//           marginTop: 8,
//           display: 'flex',
//           flexDirection: 'column',
//           alignItems: 'center',
//         }}
//       >
//         <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
//           <PersonAdd />
//         </Avatar>
//         <Typography component="h1" variant="h5">
//           הוסף תלמיד
//         </Typography>
//         <Box component="form" onSubmit={handleSubmit(save)} sx={{ mt: 1 }}>
//           <TextField label="שם פרטי" required fullWidth {...register('firstName')} />
//           <TextField label="שם משפחה" margin="normal" required fullWidth {...register('lastName')} />
//           <TextField label="תאריך לידה" {...register('dateOfBirth')} margin="normal" required fullWidth />
//           <TextField label="מין" {...register('gender')} margin="normal" required fullWidth />
//           <TextField label="תוכנית" {...register('plans')} margin="normal" required fullWidth />
//           <TextField label="כתובת" {...register('address')} margin="normal" required fullWidth />
//           <TextField label="כיתה" {...register('group')} margin="normal" required fullWidth />
//           <Button variant="contained" type="submit" fullWidth sx={{ mt: 3, mb: 2 }}>
//             Save
//           </Button>
//         </Box>
//       </Box>
//     </>
//   );
// };

// export default NewStudent;

import React from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Box, Container, Typography, Avatar, CssBaseline } from '@mui/material';
import { PersonAdd } from '@mui/icons-material';
import IStudentModel from '../../Models/IStudentModel';
import StudentService from '../../Services/StudentService';

const AddStudent = () => {
  const { register, handleSubmit } = useForm<IStudentModel>();

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
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <PersonAdd />
        </Avatar>
        <Typography component="h1" variant="h5">
          הוסף תלמיד
        </Typography>
        <Box component="form" onSubmit={handleSubmit(save)} sx={{ mt: 3 }}>
          <TextField label="שם פרטי" required fullWidth {...register('firstName')} />
          <TextField label="שם משפחה" margin="normal" required fullWidth {...register('lastName')} />
          <TextField label="תאריך לידה" {...register('dateOfBirth')} margin="normal" required fullWidth />
          <TextField label="מין" {...register('gender')} margin="normal" required fullWidth />
          <TextField
            label="תוכנית"
            {...register('plans')}
            margin="normal"
            required
            fullWidth
            multiline
            rows={4}
          />
          <TextField
            label="כתובת"
            {...register('address')}
            margin="normal"
            required
            fullWidth
            multiline
            rows={4}
          />
          <TextField label="כיתה" {...register('group')} margin="normal" required fullWidth />
          <Button variant="contained" type="submit" fullWidth sx={{ mt: 3, mb: 2 }}>
            Save
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default AddStudent;
