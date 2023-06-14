//import "./NewStudent.css";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import React from 'react';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useForm } from "react-hook-form";
import IPlanModel from "../../Models/IPlanModel";
import planServise from "../../Services/PlanService";
import MenuItem from '@mui/material/MenuItem';
import { ReportingType } from "../../Models/IPlanModel";
import { Type } from "../../Models/IPlanModel";

import SettingsIcon from '@mui/icons-material/Settings';


import AssignmentIcon from '@mui/icons-material/Assignment';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';

const defaultTheme = createTheme();



const AddPlan = () => {
    const { register, handleSubmit } = useForm<IPlanModel>();

    const save = (plan: IPlanModel) => {
        planServise.addPlan(plan)
            .then(() => {
                alert('planServise saved successfully');
            })
            .catch((error) => {
                console.log(plan)
                alert('Error saving student: ' + error.message);

            });
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
                            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
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
                                <TextField
                                    label="זמן דיווח"
                                    {...register("reportingTime")}
                                    margin="normal"
                                    required
                                    fullWidth
                                />
                                <TextField
                                    label="מהי הצלחה"
                                    {...register("WhatIsSuccess")}
                                    margin="normal"
                                    required
                                    fullWidth
                                />

                                <TextField
                                    label="תיאור ציונים"
                                    {...register("gradeDescription")}
                                    margin="normal"
                                    required
                                    fullWidth
                                />


                                <TextField
                                    label="סוג זמן דיווח"
                                    select
                                    fullWidth
                                    margin="normal"
                                    {...register("reportingType")}
                                >
                                    {Object.values(ReportingType).map((value) => (
                                        <MenuItem key={value} value={value}>
                                            {value}
                                        </MenuItem>
                                    ))}
                                </TextField>

                                <TextField
                                    label="סוג תוכנית"
                                    select
                                    fullWidth
                                    margin="normal"
                                    {...register("type")}
                                >
                                    {Object.values(Type).map((value) => (
                                        <MenuItem key={value} value={value}>
                                            {value}
                                        </MenuItem>
                                    ))}
                                </TextField>


                                <Button
                                    variant="contained"
                                    type="submit"
                                    fullWidth
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Save
                                </Button>
                            </Box>
                        </Box>
                    </Container>
                </ThemeProvider>
            </form>
        );
    };

    export default AddPlan;