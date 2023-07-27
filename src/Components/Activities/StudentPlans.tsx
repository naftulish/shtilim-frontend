import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PlanService from '../../Services/PlanService';
import StudentService from '../../Services/StudentService';
import DeleteIcon from '@mui/icons-material/Delete';

import IStudentModel from '../../Models/IStudentModel';
import IActivityModel from '../../Models/IActivityModel';
import {
  Grid,
  Paper,
  Typography,
  Box,
  Button,
  RadioGroup,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';
import ActivityService from '../../Services/ActivityService';
import userService from '../../Services/UserService';
import { ArrowBack, Delete } from '@mui/icons-material';
import { IPlanModel } from '../../Models/IPlanModel';
import IUserModel from '../../Models/IUserModel';
import UserService from '../../Services/UserService';
import "./StudentPlans.css";
import { DataGrid, GridColDef, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import heILGrid from '../../Utils/HebrewIL';
import notification from '../../Services/Notification';


const StudentPlans = () => {
  // Get the 'id' parameter from the URL using 'useParams' hook
  const { id } = useParams<{ id: string }>();

  // The 'useNavigate' hook provides navigation capabilities
  const navigate = useNavigate();

  const isReporter = userService.isReporter();

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


  useEffect(() => {
    // Fetch student data when the 'id' parameter changes
    const fetchStudent = async () => {
      try {
        const fetchedStudent = await StudentService.getStudent(id ?? '');
        setStudent(fetchedStudent);
        setPlans([]);
      } catch (error) {
        notification.error();
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
        notification.error();
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
            notification.error();
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
    // Create the grade array
    const grade: number[] = selectedAnswers;
    const user = userService.getUserFromToken();

    // Create the activity object
    const activity: IActivityModel = {
      planId: selectedPlan?._id || '',
      studentId: student?._id || '',
      grade: grade,
      userId: user?._id || "", // Assuming the user object has a `userId` property
    };

    try {

      // Add the activity using the ActivityService
      await ActivityService.addActivity(activity);
      setSelectedAnswers([]);
      notification.success("הדווח נרשם בהצלחה");
      setTimeout(() => {
        setIsReportStarted(false);
      }, 500)
    } catch (error) {
      notification.error();
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
      setActivities(fetchedActivities);
      setSelectedPlan(plan);
      setIsViewReportsStarted(true);
    } catch (error) {
      notification.error();
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
      notification.error();
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
    return <div>טוען...</div>;
  }

  // If a report is started, display the report form
  if (isReportStarted) {
    return (
      <div>
        <Box mx="auto" mt={2} onSubmit={handleSubmit}>
          <Typography variant="h5">
            <strong>תלמיד:</strong> {student.firstName} {student.lastName}
          </Typography>
          <Typography variant="h5">
            <strong>תוכנית:</strong> {selectedPlan?.name}
          </Typography>
          
          <Box mt={5}>
            {selectedPlan?.quiz.map((question, index) => (
              <Box key={index} mb={3} >
                <Typography style={{ fontSize: '18px' }}>
                  שאלה: <strong> {question.title} </strong>
                </Typography>
                <div className='flex' style={{ padding: "20px 0" }}>
                  <RadioGroup
                    className='quisGroup'
                    value={selectedAnswers[index] ?? ''}
                    onChange={(e) => handleAnswerChange(index, parseInt(e.target.value))}
                    row
                  >
                    {question.answer.map((option, optionIndex) => (
                      <label className='quisLabel'>
                        <input className='quisText'
                          onChange={(e) => handleAnswerChange(index, optionIndex)}
                          type="radio" name={question.title}
                        />
                        <span className='quisItem'>{option}</span>
                      </label>


                    ))}
                  </RadioGroup>
                </div>
                <hr />
              </Box>
            ))}
          </Box>
            <FormControl className='flex row gap-10' sx={{ mt: 3, mb: 2, maxWidth: 200}}>
            <Button fullWidth variant="outlined" onClick={handleCancelReport} style={{ marginRight: '10px' }}>
              חזרה
            </Button>
            <Button fullWidth variant="contained" onClick={handleSubmit} style={{ background: 'transparent', border: '1px solid black' }}>
              דיווח
            </Button>
          </FormControl>
        </Box>
      </div>
    );
  }

  

  if (isViewReportsStarted) {

    const arr: number[] = [];

    activities.forEach((activity, j) => {
      activity.grade.forEach((answer: number, i: number) => {
        const arrLength = selectedPlan?.quiz[i].answer.length;
        const mul = arrLength === 2 ? 100 : 25;
        const score = mul * answer;
        if (!arr[j]) arr[j] = 0;
        arr[j] += score;
      });
    });

    const average =
      arr.reduce((accumulator, currentValue) => accumulator + currentValue / (selectedPlan?.quiz?.length || 1), 0) / arr.length;

    // Prepare the data for the DataGrid
    const report = activities.map((activity, j) => {
      const data: { [key: string]: any } = {
        id: activity._id,
        successPercentage: arr[j] / (selectedPlan?.quiz.length || 1),
        createdIn: activity.createdIn,
      };
      
      activity.grade.forEach((answer: number, i: number) => {
        const arrLength = selectedPlan?.quiz[i].answer.length;
        const mul = arrLength === 2 ? 100 : 25;
        const score = mul * answer;
        data[`answer_${i}`] = `${selectedPlan?.quiz[i].answer[answer]} (${score})`;
      });

      const user = users.find((user) => user._id === activity.userId);
      data.reporter = user ? `${user.firstName} ${user.lastName}` : '';

      return data;
    });

    
    

    const columns: GridColDef[] = [
      { field: 'createdIn', headerName: 'תאריך', width: 180,
      valueGetter: (params : any) => {               
        var now = new Date( params.value );
        return now.toLocaleString(); ;
      }
     },
      // Define other columns for the quiz answers dynamically based on selectedPlan
      ...(selectedPlan?.quiz.map((question, index) => ({
        field: `answer_${index}`,
        headerName: question.title,
        width: 200,
      })) ?? []), // Provide an empty array as a fallback when selectedPlan is undefined
      { field: 'successPercentage', headerName: 'אחוז הצלחה', width: 180 },
      { field: 'reporter', headerName: 'המדווח', width: 180 },
    ];

    console.log( report );
    console.log( columns );

    const CustomToolbar = () => (
      <GridToolbarContainer>
        <GridToolbarExport
          csvOptions={{
            utf8WithBom: true,
          }}
          printOptions={{ disableToolbarButton: true }}
        />
      </GridToolbarContainer>
    );

    return (
      <div>
        
        <Box mx="auto" mt={2}>
          <Box p={2}>
          <Typography variant="h5">
           <strong>תלמיד:</strong> {student?.firstName} {student?.lastName}
          </Typography>
            <Typography variant="h5">
              <strong>תוכנית:</strong> {selectedPlan?.name}
            </Typography>
            <Typography variant="h5">
              <strong>אחוזי הצלחה:</strong> { average ? average.toFixed(2) : "" }
            </Typography>
            <br />
            <Button sx={{mb:2}} variant="contained" onClick={handleCancelViewReport}>
                חזרה
            </Button>
            <DataGrid
              rows={report}
              columns={columns}
              autoHeight
              localeText={heILGrid}
              components={{
                Toolbar: CustomToolbar, // Use the custom toolbar component
              }}
            />
          </Box>
        </Box>
      </div>
    );
  };

  const userAddedPlans = allPlans.filter((plan) => !student.plans.includes(plan?._id))

  // Main student plans page
  return (
    <div>
      {/* Button to navigate back to the students list */}
      <Button variant="contained" onClick={() => navigate('/students')} className='btn-top-left'>
        <ArrowBack />
        חזרה לרשימת תלמידים
      </Button>

      {/* Add new plan */}
      {!isReporter && (
        <Box>
          <br />
          <Typography variant="h5">
           <strong>תלמיד:</strong> {student.firstName} {student.lastName}
          </Typography>
          <br />
          <br />
          {userAddedPlans.length ? <>
          <Typography>שיוך תוכנית חדשה</Typography>
          <FormControl className='flex space row gap-10' fullWidth sx={{ mt: 3, mb: 2, maxWidth: 200}}>
            <InputLabel id="group-label">תוכנית</InputLabel>
            <Select
              sx={{minWidth: 200}}
              labelId="group-label"
              id="allPlan"
              defaultValue=""
              label="תוכנית"
              onChange={handleNewPlanChange}
              value={newPlan} // Bind the selected plan value to the state
            >
              {/* Filter out plans that are already in the student's plans */}
              {userAddedPlans
                .map((plan) => (
                  <MenuItem key={plan?._id} value={plan?._id}>
                    {plan?.name}
                  </MenuItem>
                ))}
            </Select>
          <Button variant="outlined" onClick={handleAddPlan}>
            שמירה
          </Button>
        </FormControl>
        </>: <span>כל התוכניות הקיימות משוייכות לתלמיד</span>}
        </Box>
        
      )}

      {/* Display existing plans */}
      <Grid container spacing={2}>
        {plans?.map((plan) => (
          <Grid item xs={12} sm={6} md={4} key={plan?._id}>
            <Paper>
              <Box p={2}>
                {!isReporter && (
                  <Box display="flex" justifyContent="flex-end">
                    <DeleteIcon onClick={() => handleDeletePlan(plan?._id || '')} className="delete-button" />
                  </Box>)}
                <Typography variant="h6">{plan?.name}</Typography>
                <Typography variant="body1">{plan?.description}</Typography>
                <Box mt={2} display="flex" justifyContent="space-between">
                  <Button variant="contained" onClick={() => handlePlanClick(plan)}>
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
