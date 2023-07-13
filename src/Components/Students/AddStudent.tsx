

// import React from 'react';
// import { useForm } from 'react-hook-form';
// import { TextField, Button, Box, Container, Typography, Avatar, CssBaseline } from '@mui/material';
// import { PersonAdd } from '@mui/icons-material';
// import IStudentModel from '../../Models/IStudentModel';
// import StudentService from '../../Services/StudentService';

// const AddStudent = () => {
//   const { register, handleSubmit } = useForm<IStudentModel>();

//   const save = async (student: IStudentModel) => {
//     try {
//       await StudentService.addStudent(student);
//       alert('Student saved successfully');
//     } catch (error: any) {
//       console.error(error);
//       alert('Error saving student: ' + error.message);
//     }
//   };

//   return (
//     <Container component="main" maxWidth="xs">
//       <CssBaseline />
//       <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//         <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
//           <PersonAdd />
//         </Avatar>
//         <Typography component="h1" variant="h5">
//           הוסף תלמיד
//         </Typography>
//         <Box component="form" onSubmit={handleSubmit(save)} sx={{ mt: 3 }}>
//           <TextField label="שם פרטי" required fullWidth {...register('firstName')} />
//           <TextField label="שם משפחה" margin="normal" required fullWidth {...register('lastName')} />
//           <TextField label="תאריך לידה" {...register('dateOfBirth')} margin="normal" required fullWidth />
//           <TextField label="מין" {...register('gender')} margin="normal" required fullWidth />
//           <TextField
//             label="תוכנית"
//             {...register('plans')}
//             margin="normal"
//             required
//             fullWidth
//             multiline
//             rows={4}
//           />
//           <TextField
//             label="כתובת"
//             {...register('address')}
//             margin="normal"
//             required
//             fullWidth
//             multiline
//             rows={4}
//           />
//           <TextField label="כיתה" {...register('group')} margin="normal" required fullWidth />
//           <Button variant="contained" type="submit" fullWidth sx={{ mt: 3, mb: 2 }}>
//             Save
//           </Button>
//         </Box>
//       </Box>
//     </Container>
//   );
// };

// export default AddStudent;

// import React from 'react';
// import { useForm } from 'react-hook-form';
// import {
//   TextField,
//   Button,
//   Box,
//   Container,
//   Typography,
//   Avatar,
//   CssBaseline,
//   FormControl,
//   FormControlLabel,
//   FormGroup,
//   Checkbox,
//   MenuItem,
//   Select,
//   InputLabel
// } from '@mui/material';
// import { PersonAdd } from '@mui/icons-material';
// import IStudentModel from '../../Models/IStudentModel';
// import StudentService from '../../Services/StudentService';

// const AddStudent = () => {
//   const { register, handleSubmit } = useForm<IStudentModel>();

//   const save = async (student: IStudentModel) => {
//     try {
//       await StudentService.addStudent(student);
//       alert('Student saved successfully');
//     } catch (error: any) {
//       console.error(error);
//       alert('Error saving student: ' + error.message);
//     }
//   };

//   return (
//     <Container component="main" maxWidth="xs">
//       <CssBaseline />
//       <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//         <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
//           <PersonAdd />
//         </Avatar>
//         <Typography component="h1" variant="h5">
//           הוסף תלמיד
//         </Typography>
//         <Box component="form" onSubmit={handleSubmit(save)} sx={{ mt: 3 }}>
//           <TextField label="שם פרטי" required fullWidth {...register('firstName')} />
//           <TextField label="שם משפחה" margin="normal" required fullWidth {...register('lastName')} />
//           {/* <TextField label="תאריך לידה" {...register('dateOfBirth')} margin="normal" required fullWidth /> */}
//           <TextField
//                 margin="normal"
//                 fullWidth
//                 id="dateOfBirth"
//                 label="Date of Birth"
//                 type="date"
//                 defaultValue=""
//                 {...register('dateOfBirth')}
//                 InputLabelProps={{
//                   shrink: true,
//                 }}
//           />

//           <FormControl margin="normal" required fullWidth>
//             <InputLabel id="gender-label">מין</InputLabel>
//             <Select
//               labelId="gender-label"
//               id="gender"
//               {...register('gender')}
//               defaultValue=""
//               label="מין"
//             >
//               <MenuItem value="זכר">זכר</MenuItem>
//               <MenuItem value="נקבה">נקבה</MenuItem>
//             </Select>
//           </FormControl>

//           <TextField
//             label="תוכנית"
//             {...register('plans')}
//             margin="normal"
//             required
//             fullWidth
//             multiline
//             rows={4}
//           />
//           <TextField
//             label="כתובת"
//             {...register('address')}
//             margin="normal"
//             required
//             fullWidth
//             multiline
//             rows={4}
//           />
//           <TextField label="כיתה" {...register('group')} margin="normal" required fullWidth />
//           <Button variant="contained" type="submit" fullWidth sx={{ mt: 3, mb: 2 }}>
//             Save
//           </Button>
//         </Box>
//       </Box>
//     </Container>
//   );
// };

// export default AddStudent;


import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  TextField,
  Button,
  Box,
  Container,
  Typography,
  Avatar,
  CssBaseline,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  ThemeProvider,
  createTheme
} from '@mui/material';
import { ArrowBack, PersonAddAlt } from '@mui/icons-material';
import IStudentModel from '../../Models/IStudentModel';
import StudentService from '../../Services/StudentService';
import PlanService from '../../Services/PlanService';
import GroupService from '../../Services/GroupService';

import IGroupModel from '../../Models/IGroupModel';


import { useNavigate } from 'react-router-dom';
import { IPlanModel } from '../../Models/IPlanModel';

const defaultTheme = createTheme();

const AddStudent = () => {
  const { register, handleSubmit } = useForm<IStudentModel>();
  const [plans, setPlans] = useState<IPlanModel[]>([]);
  const [groups, setGroups] = useState<IGroupModel[]>([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    fetchPlans();
    fetchGroups();
  }, []);

  const fetchPlans = async () => {
    try {
      const fetchedPlans = await PlanService.getAllPlans();
      setPlans(fetchedPlans);
    } catch (error:any) {
      console.error(error);
      alert('Error fetching plans: ' + error.message);
    }
  };

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

      // Format dateOfBirth value
      // const formattedDateOfBirth = student.dateOfBirth.toISOString().split('T')[0];
      // student.dateOfBirth = new Date(formattedDateOfBirth);

      await StudentService.addStudent(student);
      alert('Student saved successfully');
    } catch (error: any) {
      console.error(error);
      alert('Error saving student: ' + error.message);
    }
  };

  return (
    <>
      <CssBaseline />
      <div className="button">
        <Button
          variant="contained"
          onClick={() => navigate('/students')}
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
            whiteSpace: 'nowrap',
          }}
        >
          <ArrowBack />
          חזרה לרשימת תלמידים
        </Button>
      </div>

      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <PersonAddAlt />
            </Avatar>
            <Typography component="h1" variant="h5">
              הוסף תלמיד
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
                    // defaultValue=""
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

              <FormControl margin="normal" fullWidth>
                <InputLabel id="plans-label">תוכנית</InputLabel>
                <Select
                id="plans"
                labelId="plans-label"
                defaultValue={[]}
                {...register('plans')}
                multiple
                fullWidth
                >
                {plans.map((plan) => (
                  <MenuItem key={plan._id} value={plan._id}>
                    {plan.name}
                  </MenuItem>
                ))}
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
                rows={4}
              />

              <Button variant="contained" type="submit" fullWidth sx={{ mt: 3, mb: 2 }}>
                Save
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
};

export default AddStudent;


