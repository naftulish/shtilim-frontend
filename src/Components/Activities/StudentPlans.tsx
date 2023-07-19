

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx';

// @ts-ignore
import * as FileSaver from 'file-saver';

import PlanService from '../../Services/PlanService';
import StudentService from '../../Services/StudentService';

import IStudentModel from '../../Models/IStudentModel';
import IActivityModel from '../../Models/IActivityModel';
import {
  Grid,
  Paper,
  Typography,
  Box,
  Button,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  Select,
  InputLabel,
  MenuItem,
  SelectChangeEvent,
  ButtonGroup
} from '@mui/material';
import ActivityService from '../../Services/ActivityService';
import userService from '../../Services/UserService';
import { ArrowBack, Delete } from '@mui/icons-material';
import { IPlanModel } from '../../Models/IPlanModel';
import IUserModel from '../../Models/IUserModel';
import UserService from '../../Services/UserService';
import { log } from 'console';

// The interface represents an activity object


const StudentPlans = () => {
  // Get the 'id' parameter from the URL using 'useParams' hook
  const { id } = useParams<{ id: string }>();

  // The 'useNavigate' hook provides navigation capabilities
  const navigate = useNavigate();

  // State variables
  const [student, setStudent] = useState<IStudentModel | null>(null);
  const [plans, setPlans] = useState<IPlanModel[]>([]);
  const [allPlans, setAllPlans] = useState<IPlanModel[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<IPlanModel | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [isReportStarted, setIsReportStarted] = useState(false);
  const [isViewReportsStarted, setIsViewReportsStarted] = useState(false);
  const [activities, setActivities] = useState<IActivityModel[]>([]);
  const [newPlan, setNewPlan] = useState<string>(''); // New state variable to hold the selected plan
  const [users, setUsers] = useState<IUserModel[]>([]);

  useEffect(() => {
  const fetchUsers = async () => {
    try {
      const fetchedUsers = await UserService.getAllUsers();
      setUsers(fetchedUsers);
    } catch (error) {
      // Handle the error if fetching users fails
    }
  };

    fetchUsers();
  }, []);
  
  
  

  // console.log(selectedPlan);
  // console.log(activities);

  
  useEffect(() => {
    // Fetch student data when the 'id' parameter changes
    const fetchStudent = async () => {
      try {
        const fetchedStudent = await StudentService.getStudent(id ?? '');
        setStudent(fetchedStudent);
        setPlans([]);
      } catch (error) {
        console.error('Failed to fetch student:', error);
      }
    };

    fetchStudent();
  }, [id]);

  useEffect(() => {
    // Fetch all plans
    const fetchPlans = async () => {
      try {
        const fetchedPlans = await PlanService.getAllPlans();
        setAllPlans(fetchedPlans);
      } catch (error) {
        console.log(error);
        alert('Failed to fetch the plans!');
      }
    };

    fetchPlans();
  }, []);

  useEffect(() => {
    if (student) {
      // Fetch plans for the current student
      const fetchStudentPlans = async () => {
        const fetchedPlans: IPlanModel[] = [];
        for (const planId of student.plans) {
          try {
            const fetchedPlan = await PlanService.getPlan(planId);
            fetchedPlans.push(fetchedPlan);
          } catch (error) {
            console.error('Failed to fetch plan:', error);
          }
        }
        setPlans(fetchedPlans);
      };

      fetchStudentPlans();
    }
  }, [student]);

  // Handle click on a plan
  const handlePlanClick = (plan: IPlanModel) => {
    setSelectedPlan(plan);
    setSelectedAnswers([]);
    setIsReportStarted(true);
  };

  const handleAnswerChange = (index: number, answer: number) => {
    setSelectedAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[index] = answer;
      return updatedAnswers;
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsReportStarted(false);
  
    // Create the grade array
    const grade: number[] = selectedAnswers;
    

    const user = userService.getUserFromToken();
    console.log(user);
    
    
    // Create the activity object
    const activity: IActivityModel = {
      planId: selectedPlan?._id || '',
      studentId: student?._id || '',
      grade: grade,
      userId: user?._id || "", // Assuming the user object has a `userId` property
    };
  
    try {
      // Add the activity using the ActivityService
      const addedActivity = await ActivityService.addActivity(activity);
      console.log('Added activity:', addedActivity);
  
      // Reset the selected plan and answers
      setSelectedPlan(null);
      setSelectedAnswers([]);
    } catch (error) {
      console.error('Failed to add activity:', error);
    }
  };

  // Handle canceling the report
  const handleCancelReport = () => {
    setIsReportStarted(false);
  };

  // Handle view reports for a plan
  const handleViewReports = async (plan: IPlanModel) => {
    try {
      // Fetch activities for the selected plan and student
      const fetchedActivities: IActivityModel[] = await ActivityService.getActivitiesByPlanAndStudent(
        plan._id,
        student?._id ?? ''
      );
      console.log(fetchedActivities);
      
      setActivities(fetchedActivities);
      setSelectedPlan(plan);
      setIsViewReportsStarted(true);
    } catch (error) {
      console.error('Failed to fetch activities:', error);
    }
  };

  // Handle canceling view reports
  const handleCancelViewReport = () => {
    setSelectedPlan(null);
    setIsReportStarted(false);
    setIsViewReportsStarted(false);
  };

  // Update the type of the event parameter in the handleNewPlanChange event handler
  const handleNewPlanChange = (event: SelectChangeEvent<string>) => {
    setNewPlan(event.target.value);
  };

  // Handle adding the selected plan to the student's plans
  const handleAddPlan = async () => {
    try {
      if (newPlan) {
        // Add the selected plan to the student's plans in the backend
        await StudentService.addPlanToStudent(student?._id || '', newPlan);
        setStudent((prevStudent) => {
          if (prevStudent) {
            const updatedStudent = { ...prevStudent };
            updatedStudent.plans.push(newPlan);
            return updatedStudent;
          }
          return prevStudent;
        });
        setNewPlan(''); // Clear the selected plan
      }
    } catch (error) {
      console.error('Failed to add plan to student:', error);
    }
  };

  // Handle deleting a plan from the student's plans
  const handleDeletePlan = async (planId: string) => {
    try {
      // Delete the plan from the student's plans in the backend
      await StudentService.removePlanFromStudent(student?._id || '', planId);
      setStudent((prevStudent) => {
        if (prevStudent) {
          const updatedStudent = { ...prevStudent };
          const planIndex = updatedStudent.plans.indexOf(planId);
          if (planIndex !== -1) {
            updatedStudent.plans.splice(planIndex, 1);
          }
          return updatedStudent;
        }
        return prevStudent;
      });
    } catch (error) {
      console.error('Failed to remove plan from student:', error);
    }
  };

  // If student data is still loading, display a loading message
  if (!student) {
    return <div>Loading...</div>;
  }

  // If a report is started, display the report form
  if (isReportStarted) {
  return (
    <div>
      <Typography variant="h5" align="center">
        תלמיד: {student.firstName} {student.lastName}
      </Typography>
      <Box maxWidth="600px" mx="auto" mt={2} onSubmit={handleSubmit}>
        {/* <Paper component="form" onSubmit={handleSubmit}> */}
          <Typography variant="h6">תוכנית: {selectedPlan?.name}</Typography>
          <Box mt={2}>
            {selectedPlan?.quiz.map((question, index) => (
              <Box key={index} mb={2}>
                <Typography variant="body2">{question.title}</Typography>
                <div className='flex center'>
                  <RadioGroup
                    value={selectedAnswers[index] ?? ''}
                    onChange={(e) => handleAnswerChange(index, parseInt(e.target.value))}
                    row
                  >
                    {question.answer.map((option, optionIndex) => (
                      <FormControlLabel
                        key={optionIndex}
                        value={optionIndex.toString()}
                        control={<Radio />}
                        label={option}
                      />
                    ))}
                  </RadioGroup>
                </div>

              </Box>
            ))}
          </Box>
            <div className='flex center'>
              <Button variant="contained" onClick={handleSubmit}>
                דווח
              </Button>
              <Button variant="contained" onClick={handleCancelReport}>
                ביטול
              </Button>
            </div>
          
        {/* </Paper> */}
      </Box>
    </div>
  );
}


if (isViewReportsStarted) {

  const arr:number[] = [];

  activities.forEach(( activity, j ) => {
    activity.grade.forEach( ( answer:number, i:number ) => {
      const arrLength = selectedPlan?.quiz[i].answer.length;
      const mul = arrLength == 2 ? 100 : 25;
      const score = mul * answer;
      if( !arr[j] ) arr[j] = 0;
      arr[j]+= score;
    });
  });

 
  
  const average = arr.reduce((accumulator, currentValue) => accumulator + (currentValue / (selectedPlan?.quiz?.length || 1)), 0) / arr.length;

  
  // console.log(arr);
  
  
  return (
    <div>
      <Typography variant="h5" align="center">
        Student: {student.firstName} {student.lastName}
      </Typography>
      <Box maxWidth="600px" mx="auto" mt={2}>
        
          <Box p={2}>
          <Typography variant="h6">
            תוכנית: {selectedPlan?.name} | אחוזי הצלחה: {average.toFixed(2)}
          </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Activity ID</TableCell>
                  {selectedPlan?.quiz.map(q => <TableCell>{q.title}</TableCell>)}
                  <TableCell>Sum</TableCell>
                  <TableCell>תאריך</TableCell>
                  <TableCell>המדווח</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {activities.map((activity, j) => (
                  <TableRow key={activity._id}>
                    <TableCell>{activity._id}</TableCell>
                    {activity.grade.map(( answer:number, i:number) => {
                      const arrLength = selectedPlan?.quiz[i].answer.length;
                      const mul = arrLength == 2 ? 100 : 25;
                      const score = mul * answer;
                      return <TableCell>{selectedPlan?.quiz[i].answer[answer]} ({score})</TableCell>
                    })}
                    <TableCell>{arr[j] / ( selectedPlan?.quiz.length || 1 ) }</TableCell>
                    <TableCell>{activity.createdIn}</TableCell>
                    <TableCell key={activity._id}>
                      {
                        (() => {
                          const user = users.find((user) => user._id === activity.userId);
                          
                          
                          return user ? `${user.firstName} ${user.lastName}` : '';
                        })()
                      }
                    </TableCell>
                    

                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Box mt={2}>
              
                <Button variant="contained" onClick={handleCancelViewReport}>
                  Cancel
                </Button>
                {/* <Button variant="contained" onClick={handleExportToExcel}>
                  to Excel
                </Button> */}
                
              </Box>
          </Box>
        
      </Box>
    </div>
  );
}

 






  // Main student plans page
  return (
    <div>
      {/* Button to navigate back to the students list */}
      <Button variant="contained" onClick={() => navigate('/students')} className='btn-top-left'>
        <ArrowBack />
        חזרה לרשימת סטודנטים
      </Button>

      {/* Student name */}
      <Typography variant="h5" align="center">
        תלמיד: {student.firstName} {student.lastName}
      </Typography>

      {/* Add new plan */}
      <Box>
        <Typography>שיוך תוכנית חדשה</Typography>
        <FormControl margin="normal" fullWidth>
          <InputLabel id="group-label">תוכנית</InputLabel>
          <Select
            labelId="group-label"
            id="allPlan"
            defaultValue=""
            label="תוכנית"
            onChange={handleNewPlanChange}
            value={newPlan} // Bind the selected plan value to the state
          >
            {/* Filter out plans that are already in the student's plans */}
            {allPlans
              .filter((plan) => !student.plans.includes(plan?._id))
              .map((plan) => (
                <MenuItem key={plan?._id} value={plan?._id}>
                  {plan?.name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        <Button variant="outlined" onClick={handleAddPlan}>
          שמירה
        </Button>
      </Box>

      {/* Display existing plans */}
      <Grid container spacing={2}>
        {plans?.map((plan) => (
          <Grid item xs={12} sm={6} md={4} key={plan?._id}>
            <Paper>
              <Box p={2}>
                <Box display="flex" justifyContent="flex-end">
                  <Button
                    variant="outlined"
                    startIcon={<Delete />}
                    onClick={() => handleDeletePlan(plan?._id || '')}
                  >
                    מחיקה
                  </Button>
                </Box>
                <Typography variant="h6">{plan?.name}</Typography>
                <Typography variant="body1">{plan?.description}</Typography>
                <Box mt={2} display="flex" justifyContent="space-between">
                  <Button variant="outlined" onClick={() => handlePlanClick(plan)}>
                    דווח
                  </Button>
                  <Button variant="outlined" onClick={() => handleViewReports(plan)}>
                    הצגת דיווחים
                  </Button>
                </Box>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default StudentPlans;
