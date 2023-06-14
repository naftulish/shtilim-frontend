import "./NewStudent.css";
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
import IStudentModel from "../../../Models/IStudentModel";
import studentService from "../../../Services/StudentService";

const defaultTheme = createTheme();

const NewStudent = () => {
    const { register, handleSubmit } = useForm<IStudentModel>();

    const save = (student: IStudentModel) => {
        studentService.addStudent(student)
            .then(() => {
                alert('Student saved successfully');
            })
            .catch((error) => {
                console.log(student)
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
                            <PersonAddIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            הוסף תלמיד
                        </Typography>
                        <Box component="div" sx={{ mt: 1 }}>
                            <TextField
                                label="שם פרטי"
                                required
                                fullWidth
                                {...register("firstName")}
                            />
                            <TextField
                                label="שם משפחה"
                                margin="normal"
                                required
                                fullWidth
                                {...register("lastName")}
                            />
                            <TextField
                                label="תאריך לידה"
                                {...register("dateOfBirth")}
                                margin="normal"
                                required
                                fullWidth
                            />
                            <TextField
                                label="מין"
                                {...register("gander")}
                                margin="normal"
                                required
                                fullWidth
                            />

                            <TextField
                                label="תוכנית"
                                {...register("plans")}
                                margin="normal"
                                required
                                fullWidth
                            />
                            <TextField
                                label="כתובת"
                                {...register("address")}
                                margin="normal"
                                required
                                fullWidth
                            />
                            <TextField
                                label="כיתה"
                                {...register("group")}
                                margin="normal"
                                required
                                fullWidth
                            />
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

export default NewStudent;
