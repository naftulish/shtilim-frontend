import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef, GridCellParams } from '@mui/x-data-grid';
import { Button, IconButton, Snackbar } from '@mui/material';
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import StudentService from '../../Services/StudentService';
import IStudentModel from '../../Models/IStudentModel';



const Students = () => {
  const [students, setStudents] = useState<IStudentModel[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<IStudentModel | null>(null);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    const fetchStudents = async () => {
        try {
          const fetchedStudents = await StudentService.getAllStudents();
          const studentsWithIds = fetchedStudents.map((student, index) => ({
            ...student,
            id: index + 1,
          }));
          setStudents(studentsWithIds);
        } catch (error: any) {
          // Handle the error appropriately (e.g., show an error message)
          console.error('Failed to fetch students:', error);
        }
      };
      

    fetchStudents();
  }, []);

  const handleDeleteStudent = (student: IStudentModel) => {
    setSelectedStudent(student);
    setDeleteConfirmationOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedStudent) {
      try {
        await StudentService.deleteStudent(selectedStudent._id);
        setDeleteConfirmationOpen(false);
        setSelectedStudent(null);
        setStudents(students.filter((student) => student._id !== selectedStudent._id));
        setSnackbarMessage('Student deleted successfully.');
        setSnackbarOpen(true);
      } catch (error) {
        setSnackbarMessage('Failed to delete student.');
        setSnackbarOpen(true);
      }
    }
  };

  const handleCancelDelete = () => {
    setDeleteConfirmationOpen(false);
    setSelectedStudent(null);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const columns: GridColDef[] = [
    {
      field: 'firstName',
      headerName: 'First Name',
      width: 150,
    },
    {
      field: 'lastName',
      headerName: 'Last Name',
      width: 150,
    },
    {
      field: 'dateOfBirth',
      headerName: 'Date of Birth',
      width: 150,
      valueGetter: (params: GridCellParams) => new Date(params.value as Date).toLocaleDateString(),
    },
    {
      field: 'gender',
      headerName: 'Gender',
      width: 120,
    },
    {
      field: 'address',
      headerName: 'Address',
      width: 250,
    },
    {
      field: 'group',
      headerName: 'Group',
      width: 120,
    },
    // {
    //     field: 'plans',
    //     headerName: 'Plans',
    //     width: 200, // Adjust the width as needed
    //     valueGetter: (params: GridCellParams) => {
    //       const plans = params.value as string[];
    //       return plans.join(', ');
    //     },
    // },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params: GridCellParams) => (
        <div>
            <IconButton component={Link} to={`/student-plans/${params.row._id}`}>
                <PlaylistAddCheckIcon />
            </IconButton>
          <IconButton component={Link} to={`/update-student/${params.row._id}`}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => handleDeleteStudent(params.row as IStudentModel)}>
            <DeleteIcon style={{ color: 'red' }} />
          </IconButton>
        </div>
      ),
    },
  ];

  return (
    <div>
      <DataGrid rows={students} columns={columns} />
      <Snackbar open={snackbarOpen} message={snackbarMessage} onClose={handleSnackbarClose} />
      <Dialog open={deleteConfirmationOpen} onClose={handleCancelDelete}>
        <DialogTitle>Delete Student</DialogTitle>
        <DialogContent>Are you sure you want to delete this student?</DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete}>Cancel</Button>
          <Button onClick={handleConfirmDelete} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Students;
