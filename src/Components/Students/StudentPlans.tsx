import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PlanService from '../../Services/PlanService';
import StudentService from '../../Services/StudentService';
import IPlanModel from '../../Models/IPlanModel';
import IStudentModel from '../../Models/IStudentModel';
import { Grid, Paper, Typography } from '@mui/material';

const StudentPlans = () => {
    const { id } = useParams<{ id: string }>();
    const [student, setStudent] = useState<IStudentModel | null>(null);
    const [plans, setPlans] = useState<IPlanModel[]>([]);
  
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
          const fetchedPlans = [];
          for (const planId of student.plans) {
            const fetchedPlan = await PlanService.getPlan(planId);
            fetchedPlans.push(fetchedPlan);
          }
  
          setPlans(fetchedPlans);
        };
  
        fetchStudentPlans();
      }
    }, [student]);
  
    if (!student) {
      return <div>Loading...</div>;
    }
  
    return (
      <div>
        <Typography variant="h5">
          Student: {student.firstName} {student.lastName}
        </Typography>
        <Grid container spacing={2}>
          {plans.map((plan) => (
            <Grid item key={plan._id}>
              <Paper sx={{ padding: '10px', textAlign: 'center' }}>
                {/* Replace 'LogoComponent' with your own component that renders the plan's logo */}
                {/* <LogoComponent /> */}
                <Typography variant="body1">{plan.name}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </div>
    );
  };
  
  export default StudentPlans;
  
  