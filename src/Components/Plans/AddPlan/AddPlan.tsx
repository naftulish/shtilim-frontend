import React, { ChangeEvent, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CancelIcon from '@mui/icons-material/Cancel';
import { useForm } from "react-hook-form";
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { FormControlLabel, Grid, Radio, RadioGroup} from '@mui/material';

import planServise from '../../../Services/PlanService';
import {
  IPlanModel,
  QuizModel,
  Type,
  ReportingType,
} from '../../../Models/IPlanModel';
import { useNavigate } from 'react-router-dom';
import useTitle from '../../../hooks/useTitle';



const AddPlan = () => {
  
  const { register, handleSubmit, setValue, watch } = useForm<IPlanModel>();
  const [selectedOption, setSelectedOption] = useState('');
  const selectedReportingType = watch('reportingType');

  useTitle("תוכניות");

  const navigate = useNavigate();
  const [questionDescription, setQuestionDescription] = useState("");

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

  const deleteQuiz = (index: number) => {
    const updatedQuizes = [...quizes];
    updatedQuizes.splice(index, 1);
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
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };

  return (

    <Container component="main" maxWidth="xs">

    <div style={{ margin: "auto", marginTop: "50px" }}>
      <form onSubmit={handleSubmit(save)}>
        
        <Typography component="h1" variant="h5" align="center">
          הוספת תוכנית
        </Typography>
        <Box component="div" sx={{ mt: 1 }}>
          <TextField
            label="שם תוכנית"
            required
            fullWidth
            {...register("name")}
            dir="rtl"
          />
          <TextField
            label="תיאור"
            margin="normal"
            required
            fullWidth
            {...register("description")}
            dir="rtl"
          />

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <FormControl required margin="normal" sx={{ flex: 0.5 }}>
              <InputLabel id="reporting-type-label">זמן דיווח</InputLabel>
              <Select
                labelId="reporting-type-label"
                defaultValue=""
                {...register('reportingType', { required: true })}
                dir="rtl"
              >
                <MenuItem value={ReportingType.days}>יומי</MenuItem>
                <MenuItem value={ReportingType.hours}>שעתי</MenuItem>
                <MenuItem value={ReportingType.minutes}>דקתי</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="תדירות"
              {...register('reportingTime')}
              margin="normal"
              required
              fullWidth
              sx={{ flex: 0.5 }}
              dir="rtl"
            />
          </Box>


          {quizes.map((quiz, index) => (
            <Box key={index} sx={{ border: '1px solid #ddd', borderRadius: '4px', padding: '16px', marginTop: '16px', position: 'relative' }}>
                <CancelIcon
                  className='CancelIcon'
                  onClick={() => deleteQuiz(index)}
                  style={{
                  position: 'absolute',
                  top: '-10px',
                  left: '-10px',
                  minWidth: 0,
                  fontSize: '28px'
                }} 
              />
              <TextField
                label="תיאור השאלה"
                margin="normal"
                required
                fullWidth
                value={quiz.title}
                onChange={(e) => updateQuiz(index, "title", e.target.value)}
                dir="rtl"
              />

              <Box sx={{ display: 'flex', alignItems: 'normal' }}>
                <Typography variant="subtitle1" sx={{ marginTop: '8px' }} dir="rtl">
                  סוג תוכנית
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', alignItems: "flex-start" }}>
                <RadioGroup value={quiz.type} onChange={(e) => updateQuiz(index, "type", e.target.value as Type)} 
                  sx={{ display: 'flex', flexDirection: "row" }}>
                  <FormControlLabel value={Type.booleany} control={<Radio />} label="כן/לא" dir="rtl" />
                  <FormControlLabel value={Type.scalar} control={<Radio />} label="מדורג" dir="rtl" />
                </RadioGroup>

                {quiz.type === Type.booleany && (
                  <Box>
                    <Grid container spacing={2} >
                      <Grid item>
                        <TextField
                          label="הצלחה"
                          fullWidth
                          defaultValue={"הצליח"}
                          onChange={(e) => updateQuiz(index, "answer1", e.target.value)}
                          dir="rtl"
                        />
                      </Grid>
                      <Grid item>
                        <TextField
                          label="כישלון"
                          fullWidth
                          defaultValue={"נכשל"}
                          onChange={(e) => updateQuiz(index, "answer2", e.target.value)}
                          dir="rtl"
                        />
                      </Grid>
                    </Grid>
                  </Box>
                )}

                {quiz.type === Type.scalar && (
                  <Grid container spacing={2}>
                    <Grid item>
                      <TextField
                        label="*"
                        defaultValue={"טעון שיפור"}
                        onChange={(e) => updateQuiz(index, "answer1", e.target.value)}
                        dir="rtl"
                      />
                    </Grid>
                    <Grid item>
                      <TextField
                        label="**"
                        defaultValue={"מספיק"}
                        onChange={(e) => updateQuiz(index, "answer2", e.target.value)}
                        dir="rtl"
                      />
                    </Grid>
                    <Grid item>
                      <TextField
                        label="***"
                        defaultValue={"טוב"}
                        onChange={(e) => updateQuiz(index, "answer3", e.target.value)}
                        dir="rtl"
                      />
                    </Grid>
                    <Grid item >
                      <TextField
                        label="****"
                        defaultValue={"טוב מאוד"}
                        onChange={(e) => updateQuiz(index, "answer4", e.target.value)}
                        dir="rtl"
                      />
                    </Grid>
                    <Grid item>
                      <TextField
                        label="*****"
                        defaultValue={"מצוין"}
                        onChange={(e) => updateQuiz(index, "answer5", e.target.value)}
                        dir="rtl"
                      />
                    </Grid>
                  </Grid>
                )}
              </Box>
            </Box>
          ))}

          <Box sx={{ mt: 1, display: 'flex', justifyContent: 'start' }}>
            <Button variant="contained" onClick={addQuiz} dir="rtl">
              הוספת שאלה
            </Button>
          </Box>


          <FormControl className='flex space row gap-10' fullWidth sx={{ mt: 3, mb: 2, maxWidth: 200}}>
            <Button fullWidth variant="outlined" onClick={() => navigate('/plans')} dir="rtl">
              ביטול
            </Button>
            <Button fullWidth type="submit" variant="contained" dir="rtl">
              שמירה
            </Button>
          </FormControl>
        </Box>
      </form>
    </div>
    </Container>
  );
};

export default AddPlan;

