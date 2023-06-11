import "./NewStudent.css";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import authService from '../../../Services/AuthService';
// import { auth } from '../firebase';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Copyright } from '@mui/icons-material';
import { useForm } from "react-hook-form";
import IStudentModel from "../../../Models/IStudentModel";
import studentServise from "../../../Services/StudentService";


const defaultTheme = createTheme();



const NewStudent = () => {
    const { register, handleSubmit } = useForm<IStudentModel>();
    const navigate = useNavigate();
    const onButton = (e: React.FormEvent) => {
        navigate('/Students/StudentsList');
    };
    const save = (student: IStudentModel) => {
        studentServise.addStudent(student).then(d => console.log(d))
    }

    return (

        <form onSubmit={handleSubmit(save)}>
            <ThemeProvider theme={defaultTheme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />

                    {/* <div className="button" >
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            onClick={onButton}
                            sx={{ mt: 3, mb: 2 }}
                        >  חזרה לרשימת התלמידים </Button>
                    </div> */}

                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}


                    >
                        <Avatar
                            sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <PersonAddIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5" >
                            הוסף תלמיד
                        </Typography>
                        <Box component="form"
                            // onSubmit={handleSubmit} 
                            noValidate sx={{ mt: 1 }}>

                            <TextField
                                label="שם פרטי"
                                // margin="normal"
                                required
                                fullWidth
                                margin-right="100px"


                                {...register("firstName")}
                            />
                            <TextField


                                label="שם משפחה"
                                margin="normal"
                                required
                                fullWidth
                                {...register("lastName")}
                            // name="password"
                            // label="שם משפחה"
                            // type="password"
                            // id="password"
                            // autoComplete="current-password"
                            // value={password}
                            // onChange={(e) => setPassword(e.target.value)}

                            />
                            <TextField
                                label="כתובת"
                                {...register("address")}
                                margin="normal"
                                required
                                fullWidth
                            // id="email"
                            // label="כתובת"
                            // name="email"
                            // autoComplete="email"
                            // autoFocus
                            // value={email}
                            //   onChange={(e) => setEmail(e.target.value)}
                            />
                            <TextField
                                label="כיתה"
                                {...register("group")}
                                margin="normal"
                                required
                                fullWidth
                            // id="email"
                            // label="כיתה"
                            // name="email"
                            // autoComplete="email"
                            // autoFocus
                            // value={email}
                            // onChange={(e) => setEmail(e.target.value)}
                            />

                            {/* {<Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                onClick={onLogin}
                                sx={{ mt: 3, mb: 2 }}
                            >
                                
                            </Button>} */}
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


                    {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
                </Container>

            </ThemeProvider>
        </form >
    );
};

export default NewStudent;
