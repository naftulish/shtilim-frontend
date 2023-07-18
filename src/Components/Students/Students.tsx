import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef, GridCellParams } from '@mui/x-data-grid';
import { Button, IconButton, Snackbar } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import StudentService from '../../Services/StudentService';
import IStudentModel from '../../Models/IStudentModel';
import GroupService from '../../Services/GroupService';
import './Students.css'; 
import useTitle from '../../hooks/useTitle';


const Students = () => {
  const [students, setStudents] = useState<IStudentModel[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<IStudentModel | null>(null);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [groups, setGroups] = useState<{ [key: string]: string }>({});
  const navigate = useNavigate();

  useTitle("תלמידים")


  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const fetchedStudents = await StudentService.getAllStudents();
        const studentsWithIds = fetchedStudents.map((student) => ({
          ...student,
          id: student._id,
        }));
        setStudents(studentsWithIds);
      } catch (error: any) {
        console.error('נכשל לקבל את רשימת התלמידים:', error);
      }
    };

    const fetchGroups = async () => {
      try {
        const fetchedGroups = await GroupService.getAllGroups();
        const groupMap: { [key: string]: string } = {};
        fetchedGroups.forEach((group) => {
          groupMap[group._id] = group.name;
        });
        setGroups(groupMap);
      } catch (error: any) {
        console.error('נכשל לקבל את רשימת ה:', error);
      }
    };

    fetchStudents();
    fetchGroups();
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
        setSnackbarMessage('התלמיד נמחק בהצלחה.');
        setSnackbarOpen(true);
      } catch (error) {
        setSnackbarMessage('נכשל למחוק את התלמיד.');
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
      headerName: 'שם פרטי',
      width: 150,
    },
    {
      field: 'lastName',
      headerName: 'שם משפחה',
      width: 150,
    },
    {
      field: 'dateOfBirth',
      headerName: 'תאריך לידה',
      width: 150,
      valueGetter: (params: GridCellParams) => new Date(params.value as Date).toLocaleDateString(),
    },
    {
      field: 'gender',
      headerName: 'מין',
      width: 120,
    },
    {
      field: 'address',
      headerName: 'כתובת',
      width: 250,
    },
    {
      field: 'group',
      headerName: 'קבוצה',
      width: 120,
      valueGetter: (params: GridCellParams) => groups[params.row.group] || '',
    },
    {
      field: 'plans',
      headerName: 'תוכניות',
      width: 120,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params: GridCellParams) => (
        params.row.plans[0] !== '' && (
          <IconButton component={Link} to={`/student-plans/${params.row._id}`}>
            <PlaylistAddCheckIcon />
          </IconButton>
        )
      ),
    },
    {
      field: 'actions',
      headerName: 'פעולות',
      width: 120,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params: GridCellParams) => {
          return (
            <div>
              <IconButton component={Link} to={`/update-student/${params.row._id}`}>
                <EditIcon />
              </IconButton>
              <IconButton onClick={() => handleDeleteStudent(params.row as IStudentModel)}>
              <DeleteIcon className="delete-button"/>
              </IconButton>
            </div>
          );
        }
    },
  ];

  return (
    <div style={{ width: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
        <h1 style={{ flex: 1 }}>רשימת תלמידים</h1>
        <Button
          type="submit"
          variant="contained"
          onClick={() => navigate('/add-student')}
          className='btn-top'        >
          הוספת תלמיד &nbsp;<PersonAddAltIcon />
        </Button>
      </div>

      <DataGrid rows={students} columns={columns} />
      <Snackbar open={snackbarOpen} message={snackbarMessage} onClose={handleSnackbarClose} />

      <Dialog open={deleteConfirmationOpen} onClose={handleCancelDelete}>
        <DialogTitle>מחיקת תלמיד</DialogTitle>
        <DialogContent>האם אתה בטוח שברצונך למחוק תלמיד זה?</DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete}>ביטול</Button>
          <Button onClick={handleConfirmDelete} color="error" autoFocus>
            מחיקה
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Students;
