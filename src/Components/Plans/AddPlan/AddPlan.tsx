import PersonAddIcon from '@mui/icons-material/PersonAdd';
import React, { ChangeEvent, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useForm } from "react-hook-form";
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { FormControlLabel, Grid, Radio, RadioGroup, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { title } from 'process';

import planServise from '../../../Services/PlanService';
import {
  IPlanModel,
  QuizModel,
  Type,
  ReportingType,
  ReportingTime,
  defaultReportingTime,
} from '../../../Models/IPlanModel';



const defaultTheme = createTheme();

interface IPlanModelExtended extends IPlanModel {
  maxReportingTime: {
    [key in ReportingType]: number;
  };
}

const AddPlan = () => {
  // const { register, handleSubmit, setValue } = useForm<IPlanModel>();
  const { register, handleSubmit, setValue, watch } = useForm<IPlanModel>();
  const [selectedOption, setSelectedOption] = useState('');
  const selectedReportingType = watch('reportingType');
  const planModel = watch();

  const [questionDescription, setQuestionDescription] = useState("");

  // const [answersDescription, setanswersDescription] = useState("");

  useEffect(() => {
    setQuestionDescription('');
  }, []);

  useEffect(() => {
    setSelectedOption('option1');
  }, []);
 
  
  const [quizes, setQuizes] = useState<QuizModel[]>([]);

  const addQuiz = () => {
    const newQuiz = new QuizModel();
    newQuiz.answer = ["נכשל", "הצליח"];

    const updatedQuizes = [...quizes, newQuiz];
    setQuizes(updatedQuizes);
    setValue('quiz', updatedQuizes);
  };

  const updateQuiz = (index: number, field: string, value: string) => {
    const updatedQuizes = [...quizes];

    if (field === 'title')
      updatedQuizes[index].title = value;

    if (field === 'type') {
      updatedQuizes[index].type = value as Type;
      if (value === Type.booleany)
        updatedQuizes[index].answer = ["נכשל", "הצליח"];
      else if (value === Type.scalar)
        updatedQuizes[index].answer = ["טעון שיפור", "מספיק", "טוב", "טוב מאוד", "מצוין"];
    }

    if (field === 'answer1')
      updatedQuizes[index].answer[0] = value;

    if (field === 'answer2')
      updatedQuizes[index].answer[1] = value;

    if (field === 'answer3')
      updatedQuizes[index].answer[2] = value;

    if (field === 'answer4')
      updatedQuizes[index].answer[3] = value;

    if (field === 'answer5')
      updatedQuizes[index].answer[3] = value;

    setQuizes(updatedQuizes);
    setValue('quiz', updatedQuizes);

  };
  const save = (plan: IPlanModel) => {
    planServise.addPlan(plan)
      .then(() => {
        alert('תוכנית נשמרה בהצלחה');
      })
      .catch((error: { message: string; }) => {
        alert('שגיאה בשמירת התוכנית: ' + error.message);
      });
  
    console.log(plan);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit(save)}>
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            git <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <AssignmentIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              הוסף תוכנית
            </Typography>
            <Box component="div" sx={{ mt: 1 }}>
              <TextField
                label="שם תוכנית"
                required
                fullWidth
                {...register("name")}
              />
              <TextField
                label="תיאור"
                margin="normal"
                required
                fullWidth
                {...register("description")}
              />

              {/* <FormControl required fullWidth margin="normal">
                <InputLabel id="reporting-type-label">זמן דיווח</InputLabel>
                <Select
                  
                  labelId="reporting-type-label"
                  defaultValue=""
                  {...register('reportingType')}
                >
                  <MenuItem value={ReportingType.days}>יומי</MenuItem>
                  <MenuItem value={ReportingType.hours}>שעתי</MenuItem>
                  <MenuItem value={ReportingType.minutes}>דקתי</MenuItem>
                  
                </Select>
              </FormControl>

              <TextField
                label="זמן דיווח"
                {...register("reportingTime")}
                margin="normal"
                required
                fullWidth
              />
              
              */}

              <FormControl required fullWidth margin="normal">
              <InputLabel id="reporting-type-label">זמן דיווח</InputLabel>
              <Select
                labelId="reporting-type-label"
                defaultValue=""
                {...register('reportingType', { required: true })}
              >
                <MenuItem value={ReportingType.days}>יומי</MenuItem>
                <MenuItem value={ReportingType.hours}>שעתי</MenuItem>
                <MenuItem value={ReportingType.minutes}>דקתי</MenuItem>
                {/* {Object.values(ReportingType).map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))} */}
              </Select>
              </FormControl>
              <TextField
                label="זמן דיווח"
                {...register('reportingTime')}
                margin="normal"
                required
                fullWidth
              />
              
              
              {/* <TextField
                label="מהי הצלחה"
                {...register("WhatIsSuccess")}
                margin="normal"
                required
                fullWidth
              /> */}

              {quizes.map((quiz, index) => (
                <Box key={index} sx={{ border: '1px solid #ddd', borderRadius: '4px', padding: '16px', marginTop: '16px' }}>
                  <TextField
                    label="תיאור השאלה"
                    margin="normal"
                    required
                    fullWidth
                    value={quiz.title}
                    onChange={(e) => updateQuiz(index, "title", e.target.value)}
                  />
                  <RadioGroup value={quiz.type}
                    onChange={(e) => updateQuiz(index, "type", e.target.value as Type)}
                  >
                    <FormControlLabel value={Type.booleany} control={<Radio />} label="תוכנית לפי הצלחה" />
                    <FormControlLabel value={Type.scalar} control={<Radio />} label="תוכנית לפי דירוג הצלחה" />
                  </RadioGroup>

                  {quiz.type === Type.booleany && (
                    <Box sx={{ marginTop: '16px' }}>
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <TextField
                            label="הצלחה"
                            fullWidth
                            defaultValue={"הצליח"}

                            onChange={(e) => updateQuiz(index, "answer1", e.target.value)}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <TextField
                            label="כישלון"
                            fullWidth
                            defaultValue={"נכשל"}
                            onChange={(e) => updateQuiz(index, "answer2", e.target.value)}
                          />
                        </Grid>
                      </Grid>
                    </Box>
                  )}

                  {quiz.type === Type.scalar && (
                    <Grid container spacing={2} sx={{ marginTop: '16px' }}>
                      <Grid item xs={6}>
                        <TextField
                          label="*"
                          fullWidth
                          defaultValue={"טעון שיפור"}
                          onChange={(e) => updateQuiz(index, "answer1", e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          label="**"
                          fullWidth
                          defaultValue={"מספיק"}

                          onChange={(e) => updateQuiz(index, "answer2", e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <TextField
                          label="***"
                          fullWidth
                          defaultValue={"טוב"}
                          onChange={(e) => updateQuiz(index, "answer3", e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <TextField
                          label="****"
                          fullWidth
                          defaultValue={"טוב מאוד"}
                          onChange={(e) => updateQuiz(index, "answer4", e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <TextField
                          label="*****"
                          fullWidth
                          defaultValue={"מצוין"}
                          onChange={(e) => updateQuiz(index, "answer5", e.target.value)}
                        />
                      </Grid>
                    </Grid>
                  )}

                </Box>
              ))}

              <Button
                variant="contained"
                onClick={addQuiz}
                fullWidth
                sx={{ mt: 3, mb: 2 }}
              >
                הוסף
              </Button>

              <Button
                variant="contained"
                type="submit"
                fullWidth
                sx={{ mt: 3, mb: 2 }}
              >
                שמור
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </form>
  );
};

export default AddPlan;


// import React, { ChangeEvent, useEffect, useState } from 'react';
// import Button from '@mui/material/Button';
// import Avatar from '@mui/material/Avatar';
// import CssBaseline from '@mui/material/CssBaseline';
// import TextField from '@mui/material/TextField';
// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
// import Container from '@mui/material/Container';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import { useForm } from 'react-hook-form';
// import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
// import AssignmentIcon from '@mui/icons-material/Assignment';
// import { FormControlLabel, Grid, Radio, RadioGroup } from '@mui/material';

// import planServise from '../../../Services/PlanService';
// import {
//   IPlanModel,
//   QuizModel,
//   Type,
//   ReportingType,
//   ReportingTime,
//   defaultReportingTime,
// } from '../../../Models/IPlanModel';

// const defaultTheme = createTheme();

// const AddPlan = () => {
//   const { register, handleSubmit, setValue, watch } = useForm<IPlanModel>();
//   const [selectedOption, setSelectedOption] = useState('');
//   const selectedReportingType = watch('reportingType');
//   const planModel = watch() || {};

//   const [questionDescription, setQuestionDescription] = useState('');

//   useEffect(() => {
//     setQuestionDescription('');
//   }, []);

//   useEffect(() => {
//     setSelectedOption('option1');
//   }, []);

//   const [quizes, setQuizes] = useState<QuizModel[]>([]);

//   const addQuiz = () => {
//     const newQuiz = new QuizModel();
//     const updatedQuizes = [...quizes, newQuiz];
//     setQuizes(updatedQuizes);
//     setValue('quiz', updatedQuizes);
//   };

//   const updateQuiz = (index: number, field: string, value: string) => {
//     const updatedQuizes = [...quizes];

//     if (field === 'title') updatedQuizes[index].title = value;

//     if (field === 'type') {
//       updatedQuizes[index].type = value as Type;
//       if (value === Type.booleany)
//         updatedQuizes[index].answer = ['נכשל', 'הצליח'];
//       else if (value === Type.scalar)
//         updatedQuizes[index].answer = [
//           'טעון שיפור',
//           'מספיק',
//           'טוב',
//           'טוב מאוד',
//           'מצוין',
//         ];
//     }

//     if (field === 'answer1') updatedQuizes[index].answer[0] = value;

//     if (field === 'answer2') updatedQuizes[index].answer[1] = value;

//     if (field === 'answer3') updatedQuizes[index].answer[2] = value;

//     if (field === 'answer4') updatedQuizes[index].answer[3] = value;

//     if (field === 'answer5') updatedQuizes[index].answer[3] = value;

//     setQuizes(updatedQuizes);
//     setValue('quiz', updatedQuizes);
//   };

//   const save = (plan: IPlanModel) => {
//     planServise
//       .addPlan(plan)
//       .then(() => {
//         alert('תוכנית נשמרה בהצלחה');
//       })
//       .catch((error: { message: string }) => {
//         alert('שגיאה בשמירת התוכנית: ' + error.message);
//       });

//     console.log(plan);
//   };

//   const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
//     setSelectedOption(event.target.value);
//   };

//   return (
//     <form onSubmit={handleSubmit(save)}>
//       <ThemeProvider theme={defaultTheme}>
//         <Container component="main" maxWidth="xs">
//           <CssBaseline />
//           <Box
//             sx={{
//               marginTop: 8,
//               display: 'flex',
//               flexDirection: 'column',
//               alignItems: 'center',
//             }}
//           >
//             <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
//               <AssignmentIcon />
//             </Avatar>
//             <Typography component="h1" variant="h5">
//               הוסף תוכנית
//             </Typography>
//             <Box component="div" sx={{ mt: 1 }}>
//               <TextField
//                 label="שם תוכנית"
//                 required
//                 fullWidth
//                 {...register('name')}
//               />
//               <TextField
//                 label="תיאור"
//                 margin="normal"
//                 required
//                 fullWidth
//                 {...register('description')}
//               />

//               <FormControl required fullWidth margin="normal">
//                 <InputLabel id="reporting-type-label">זמן דיווח</InputLabel>
//                 <Select
//                   labelId="reporting-type-label"
//                   defaultValue=""
//                   {...register('reportingType', { required: true })}
//                 >
//                   <MenuItem value={ReportingType.days}>יומי</MenuItem>
//                   <MenuItem value={ReportingType.hours}>שעתי</MenuItem>
//                   <MenuItem value={ReportingType.minutes}>דקתי</MenuItem>
//                 </Select>
//               </FormControl>
//               <TextField
//                 label="זמן דיווח"
//                 {...register('reportingTime', {
//                   required: true,
//                   pattern: /^[0-9]*$/,
//                   max: planModel?.reportingTime?.maxReportingTime[selectedReportingType!],
//                 })}
//                 margin="normal"
//                 required
//                 fullWidth
//               />

//               {quizes.map((quiz, index) => (
//                 <Box
//                   key={index}
//                   sx={{ border: '1px solid #ddd', borderRadius: '4px', padding: '16px', marginTop: '16px' }}
//                 >
//                   <TextField
//                     label="תיאור השאלה"
//                     margin="normal"
//                     required
//                     fullWidth
//                     value={quiz.title}
//                     onChange={(e) => updateQuiz(index, 'title', e.target.value)}
//                   />
//                   <RadioGroup
//                     value={quiz.type}
//                     onChange={(e) => updateQuiz(index, 'type', e.target.value as Type)}
//                   >
//                     <FormControlLabel
//                       value={Type.booleany}
//                       control={<Radio />}
//                       label="תוכנית לפי הצלחה"
//                     />
//                     <FormControlLabel
//                       value={Type.scalar}
//                       control={<Radio />}
//                       label="תוכנית לפי דירוג הצלחה"
//                     />
//                   </RadioGroup>

//                   {quiz.type === Type.booleany && (
//                     <Box sx={{ marginTop: '16px' }}>
//                       <Grid container spacing={2}>
//                         <Grid item xs={6}>
//                           <TextField
//                             label="הצלחה"
//                             fullWidth
//                             defaultValue="הצליח"
//                             onChange={(e) => updateQuiz(index, 'answer1', e.target.value)}
//                           />
//                         </Grid>
//                         <Grid item xs={6}>
// <TextField
//                             label="כישלון"
//                             fullWidth
//                             defaultValue="נכשל"
//                             onChange={(e) => updateQuiz(index, 'answer2', e.target.value)}
//                           />
//                         </Grid>
//                       </Grid>
//                     </Box>
//                   )}

//                   {quiz.type === Type.scalar && (
//                     <Grid container spacing={2} sx={{ marginTop: '16px' }}>
//                       <Grid item xs={6}>
//                         <TextField
//                           label="*"
//                           fullWidth
//                           defaultValue="טעון שיפור"
//                           onChange={(e) => updateQuiz(index, 'answer1', e.target.value)}
//                         />
//                       </Grid>
//                       <Grid item xs={6}>
//                         <TextField
//                           label="**"
//                           fullWidth
//                           defaultValue="מספיק"
//                           onChange={(e) => updateQuiz(index, 'answer2', e.target.value)}
//                         />
//                       </Grid>
//                       <Grid item xs={4}>
//                         <TextField
//                           label="***"
//                           fullWidth
//                           defaultValue="טוב"
//                           onChange={(e) => updateQuiz(index, 'answer3', e.target.value)}
//                         />
//                       </Grid>
//                       <Grid item xs={4}>
//                         <TextField
//                           label="****"
//                           fullWidth
//                           defaultValue="טוב מאוד"
//                           onChange={(e) => updateQuiz(index, 'answer4', e.target.value)}
//                         />
//                       </Grid>
//                       <Grid item xs={4}>
//                         <TextField
//                           label="*****"
//                           fullWidth
//                           defaultValue="מצוין"
//                           onChange={(e) => updateQuiz(index, 'answer5', e.target.value)}
//                         />
//                       </Grid>
//                     </Grid>
//                   )}
//                 </Box>
//               ))}

//               <Button variant="contained" color="primary" onClick={addQuiz}>
//                 הוסף שאלה
//               </Button>
//             </Box>
//             <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 3, mb: 2 }}>
//               שמירה
//             </Button>
//           </Box>
//         </Container>
//       </ThemeProvider>
//     </form>
//   );
// };

// export default AddPlan;
