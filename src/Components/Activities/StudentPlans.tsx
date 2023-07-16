// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import PlanService from '../../Services/PlanService';
// import StudentService from '../../Services/StudentService';

// import IStudentModel from '../../Models/IStudentModel';
// import IActivityModel from '../../Models/IActivityModel';
// import {
//   Grid,
//   Paper,
//   Typography,
//   Box,
//   Button,
//   Table,
//   TableHead,
//   TableBody,
//   TableRow,
//   TableCell,
//   MenuItem,
//   Select,
//   FormControl,
// } from '@mui/material';
// import ActivityService from '../../Services/ActivityService';
// import ReportsPage from './ReportsPage';
// import { ArrowBack } from '@mui/icons-material';
// import { IPlanModel } from '../../Models/IPlanModel';

// interface Activity {
//   _id?: string;
//   grade: number[];
// }

// const StudentPlans = () => {
//   const { id } = useParams<{ id: string }>();
//   const navigate = useNavigate();
//   const [student, setStudent] = useState<IStudentModel | null>(null);
//   const [plans, setPlans] = useState<IPlanModel[]>([]);
//   const [selectedPlan, setSelectedPlan] = useState<IPlanModel | null>(null);
//   const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
//   const [isReportStarted, setIsReportStarted] = useState(false);
//   const [isViewReportsStarted, setIsViewReportsStarted] = useState(false);
//   const [activities, setActivities] = useState<Activity[]>([]);

//   useEffect(() => {
//     const fetchStudent = async () => {
//       try {
//         const fetchedStudent = await StudentService.getStudent(id ?? '');
//         setStudent(fetchedStudent);
//         setPlans([]); // Clear the previous plans
//       } catch (error) {
//         console.error('Failed to fetch student:', error);
//       }
//     };

//     fetchStudent();
//   }, [id]);

//   useEffect(() => {
//     if (student) {
//       const fetchStudentPlans = async () => {
//         const fetchedPlans: IPlanModel[] = [];
//         for (const planId of student.plans) {
//           try {
//             const fetchedPlan = await PlanService.getPlan(planId);
//             fetchedPlans.push(fetchedPlan);
//           } catch (error) {
//             console.error('Failed to fetch plan:', error);
//           }
//         }

//         setPlans(fetchedPlans);
//       };

//       fetchStudentPlans();
//     }
//   }, [student]);

//   const handlePlanClick = (plan: IPlanModel) => {
//     setSelectedPlan(plan);
//     setSelectedAnswers([]);
//     setIsReportStarted(true);
//   };

//   const handleAnswerChange = (index: number, answer: number) => {
//     setSelectedAnswers((prevAnswers) => {
//       const updatedAnswers = [...prevAnswers];
//       updatedAnswers[index] = answer;
//       return updatedAnswers;
//     });
//   };

//   const handleSubmit = async (event: React.FormEvent) => {
//     event.preventDefault();

//     // Create the grade array
//     const grade: number[] = selectedAnswers;

//     // Create the activity object
//     const activity: IActivityModel = {
//       planId: selectedPlan?._id || '',
//       studentId: student?._id || '',
//       grade: grade,
//     };

//     try {
//       // Save the activity
//       const savedActivity = await ActivityService.addActivity(activity);
//       console.log('Activity saved:', savedActivity);

//       // Reset the selected plan and answers
//       setSelectedPlan(null);
//       setSelectedAnswers([]);
//       setIsReportStarted(false);
//     } catch (error) {
//      console.error('Failed to save activity:', error);
//     }
//   };

//   const handleCancelReport = () => {
//     setIsReportStarted(false);
//   };

//   const handleViewReports = async (plan: IPlanModel) => {
//     try {
//       const fetchedActivities: Activity[] = await ActivityService.getActivitiesByPlanAndStudent(
//         plan._id,
//         student?._id ?? ''
//       );
//       setActivities(fetchedActivities);
//       setIsViewReportsStarted(true);
//     } catch (error) {
//       console.error('Failed to fetch activities:', error);
//     }
//   };

//   const handleCancelViewReport = () => {
//     setSelectedPlan(null);
//     setIsReportStarted(false);
//     setIsViewReportsStarted(false);
//   };

//   if (!student) {
//     return <div>Loading...</div>;
//   }

//   if (isReportStarted) {
//     return (
//       <div>
//         <Typography variant="h5" align="center">
//           Student: {student.firstName} {student.lastName}
//         </Typography>
//         <Box maxWidth="600px" mx="auto" mt={2}>
//           <Paper component="form" onSubmit={handleSubmit}>
//             <Typography variant="h6">Plan: {selectedPlan?.name}</Typography>
//             <Box mt={2}>
//               {selectedPlan?.quiz.map((question, index) => (
//                 <Box key={index} mb={2}>
//                   <Typography variant="body2">{question.title}</Typography>
//                   <FormControl fullWidth>
//                     <Select
//                       value={selectedAnswers[index] ?? ''}
//                       onChange={(e) =>
//                         handleAnswerChange(
//                           index,
//                           parseInt(e.target.value as string)
//                         )
//                       }
//                       displayEmpty
//                     >
//                       {/* <MenuItem value="" disabled>
//                         Select an answer
//                       </MenuItem>
//                       {question.answer.map((option, optionIndex) => (
//                         <MenuItem key={optionIndex} value={optionIndex}>
//                           {option}
//                         </MenuItem> */}
//                         <RadioGroup value={selectedValue} onChange={handleChange}>
//                           <FormControlLabel value="" disabled control={<Radio />} label="Select an answer" />
//                           {question.answer.map((option, optionIndex) => (
//                             <FormControlLabel key={optionIndex} value={optionIndex.toString()} control={<Radio />} label={option} />
//                           ))}
//                       </RadioGroup>

//                       ))}
//                     </Select>
//                   </FormControl>
//                   {selectedAnswers[index] !== undefined && (
//                     <Typography variant="body2" color="text.secondary" mt={1}>
//                       Selected Answer Index: {selectedAnswers[index]}
//                     </Typography>
//                   )}
//                 </Box>
//               ))}
//             </Box>
//             <Button variant="contained" type="submit">
//               דווח
//             </Button>
//             <Button variant="contained" onClick={handleCancelViewReport}>
//               ביטול
//             </Button>
//           </Paper>
//         </Box>
//       </div>
//     );
//   }

//   if (isViewReportsStarted) {
//     return (
//       <div>
//         <Typography variant="h5" align="center">
//           תלמיד: {student.firstName} {student.lastName}
//         </Typography>
//         <Box maxWidth="600px" mx="auto" mt={2}>
//           <Paper>
//             <Box p={2}>
//               <Typography variant="h6">Reports for {selectedPlan?.name}</Typography>
//               <Table>
//                 <TableHead>
//                   <TableRow>
//                     <TableCell>Activity ID</TableCell>
//                     <TableCell>Grade</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {activities.map((activity) => (
//                     <TableRow key={activity._id}>
//                       <TableCell>{activity._id}</TableCell>
//                       <TableCell>{activity.grade}</TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//               <Box mt={2}>
//                 <Button variant="contained" onClick={handleCancelViewReport}>
//                   Cancel
//                 </Button>
//               </Box>
//             </Box>
//           </Paper>
//         </Box>
//       </div>
//     );
//   }

//   return (
//     <div>

      
      
//         <Button
//           variant="contained"
//           onClick={() => navigate('/students')}
//           sx={{
//             mt: 3,
//             mb: 2,
//             flexShrink: 0,
//             textAlign: 'left',
//             overflow: 'hidden',
//             position: 'absolute',
//             top: 0,
//             left: 30,
//             // marginTop: '100px',
//             // marginLeft: '100px',
//             whiteSpace: 'nowrap',
//             direction: 'rtl'
//           }}
//         >
//           <ArrowBack />
//           חזרה לרשימת תלמידים
//         </Button>
      
//         <Typography variant="h5" align="center">
//           Student: {student.firstName} {student.lastName}
//         </Typography>
        

//         <Grid container spacing={2}>
//           {plans?.map((plan) => (
//             <Grid item xs={12} sm={6} md={4} key={plan?._id}>
//               <Paper>
//                 <Box p={2}>
//                   <Typography variant="h6">{plan?.name}</Typography>
//                   <Typography variant="body1">{plan?.description}</Typography>
//                   <Box mt={2} display="flex" justifyContent="space-between">
//                     <Button variant="outlined" onClick={() => handlePlanClick(plan)}>
//                       Create Report
//                     </Button>
//                     <Button variant="outlined" onClick={() => handleViewReports(plan)}>
//                       View Reports
//                     </Button>
//                   </Box>
//                 </Box>
//               </Paper>
//             </Grid>
//           ))}
//         </Grid>

        
//       </div>
//     );
  
// };

// export default StudentPlans;


import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
} from '@mui/material';
import ActivityService from '../../Services/ActivityService';
import ReportsPage from './ReportsPage';
import { ArrowBack } from '@mui/icons-material';
import { IPlanModel } from '../../Models/IPlanModel';

interface Activity {
  _id?: string;
  grade: number[];
}

const StudentPlans = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [student, setStudent] = useState<IStudentModel | null>(null);
  const [plans, setPlans] = useState<IPlanModel[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<IPlanModel | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [isReportStarted, setIsReportStarted] = useState(false);
  const [isViewReportsStarted, setIsViewReportsStarted] = useState(false);
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const fetchedStudent = await StudentService.getStudent(id ?? '');
        setStudent(fetchedStudent);
        setPlans([]); // Clear the previous plans
      } catch (error) {
        console.error('Failed to fetch student:', error);
      }
    };

    fetchStudent();
  }, [id]);

  useEffect(() => {
    if (student) {
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

    // Create the activity object
    const activity: IActivityModel = {
      planId: selectedPlan?._id || '',
      studentId: student?._id || '',
      grade: grade,
      
    };

    try {
      // Save the activity
      const savedActivity = await ActivityService.addActivity(activity);
      console.log('Activity saved:', savedActivity);

      // Reset the selected plan and answers
      setSelectedPlan(null);
      setSelectedAnswers([]);
      setIsReportStarted(false);
    } catch (error) {
      console.error('Failed to save activity:', error);
    }
  };

  const handleCancelReport = () => {
    setIsReportStarted(false);
  };

  const handleViewReports = async (plan: IPlanModel) => {
    try {
      const fetchedActivities: Activity[] = await ActivityService.getActivitiesByPlanAndStudent(
        plan._id,
        student?._id ?? ''
      );
      setActivities(fetchedActivities);
      setIsViewReportsStarted(true);
    } catch (error) {
      console.error('Failed to fetch activities:', error);
    }
  };

  const handleCancelViewReport = () => {
    setSelectedPlan(null);
    setIsReportStarted(false);
    setIsViewReportsStarted(false);
  };

  if (!student) {
    return <div>Loading...</div>;
  }

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
                  {/* <FormControl fullWidth>
                    <RadioGroup value={selectedAnswers[index] ?? ''} onChange={(e) => handleAnswerChange(index, parseInt(e.target.value))}>
                      
                      {question.answer.map((option, optionIndex) => (
                        <FormControlLabel key={optionIndex} value={optionIndex.toString()} control={<Radio />} label={option} />
                      ))}
                    </RadioGroup>
                  </FormControl> */}
                  {/* {selectedAnswers[index] !== undefined && (
                    <Typography variant="body2" color="text.secondary" mt={1}>
                      Selected Answer Index: {selectedAnswers[index]}
                    </Typography>
                  )} */}
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
              <Button variant="contained" type="submit">
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
    return (
      <div>
        <Typography variant="h5" align="center">
          Student: {student.firstName} {student.lastName}
        </Typography>
        <Box maxWidth="600px" mx="auto" mt={2}>
          <Paper>
            <Box p={2}>
              <Typography variant="h6">Reports for {selectedPlan?.name}</Typography>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Activity ID</TableCell>
                    <TableCell>Grade</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {activities.map((activity) => (
                    <TableRow key={activity._id}>
                      <TableCell>{activity._id}</TableCell>
                      <TableCell>{activity.grade}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Box mt={2}>
                <Button variant="contained" onClick={handleCancelViewReport}>
                  Cancel
                </Button>
              </Box>
            </Box>
          </Paper>
        </Box>
      </div>
    );
  }

  return (
    <div>
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
          left: 30,
          whiteSpace: 'nowrap',
          direction: 'rtl',
        }}
      >
        <ArrowBack />
        Back to Student List
      </Button>
      <Typography variant="h5" align="center">
        Student: {student.firstName} {student.lastName}
      </Typography>
      <Grid container spacing={2}>
        {plans?.map((plan) => (
          <Grid item xs={12} sm={6} md={4} key={plan?._id}>
            <Paper>
              <Box p={2}>
                <Typography variant="h6">{plan?.name}</Typography>
                <Typography variant="body1">{plan?.description}</Typography>
                <Box mt={2} display="flex" justifyContent="space-between">
                  <Button variant="outlined" onClick={() => handlePlanClick(plan)}>
                    Create Report
                  </Button>
                  <Button variant="outlined" onClick={() => handleViewReports(plan)}>
                    View Reports
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
