import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef, GridCellParams, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import { Box, Button, IconButton } from '@mui/material';
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
import userService from '../../Services/UserService';
import IStudentModel, { IList } from '../../Models/IStudentModel';
import GroupService from '../../Services/GroupService';
import useTitle from '../../hooks/useTitle';
import heILGrid from '../../Utils/HebrewIL';
import notification from '../../Services/Notification';
import { useForm } from 'react-hook-form';
import studentService from '../../Services/StudentService';



const Students = () => {
  const [students, setStudents] = useState<IStudentModel[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<IStudentModel | null>(null);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [groups, setGroups] = useState<{ [key: string]: string }>({});
  const { register, handleSubmit } = useForm<IList>();

  const navigate = useNavigate();
  useTitle("תלמידים")

  const isAdmin = userService.isAdmin();
  const isReporter = userService.isReporter();
  const actionsColumn = isAdmin
  ? {
      field: 'actions',
      headerName: 'פעולות',
      width: 120,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params: GridCellParams) => (
        <div>
          <IconButton component={Link} to={`/update-student/${params.row._id}`}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => handleDeleteStudent(params.row as IStudentModel)}>
            <DeleteIcon className="delete-button" />
          </IconButton>
        </div>
      ),
    }
  : null;

  
  
  const send = async ( data:IList ) => {
      const formData = new FormData();
      formData.append("list", data.list[0] );
      if( data.test ){
        formData.append("test", '1' );
      }
      try {
        await studentService.importStudents( formData );
        notification.success("היבוא הצליח, יש לרענן את העמוד")
      } catch (error) {
        notification.error("ארעה שגיאה, היבוא לא הצליח")
      }
  }

  useEffect(() => {

    const fetchData = async () => {
      try {
        const fetchedGroups = await GroupService.getAllGroups();
        const groupMap: { [key: string]: string } = {};
        fetchedGroups.forEach((group) => {
          groupMap[group._id] = group.name;
        });
        setGroups(groupMap);
  
        const fetchedStudents = await StudentService.getAllStudents();
        let studentsWithIds = fetchedStudents.map((student) => ({
          ...student,
          id: student._id,
        }));
  
        if (isReporter) {
          const reporterId = userService.getUserFromToken()?._id;
          if (reporterId) {
            const reporterGroup = fetchedGroups.find((group) => group.teacher === reporterId);
            if (reporterGroup) {
              const reporterGroupStudents = studentsWithIds.filter((student) => student.group === reporterGroup._id);
              setStudents(reporterGroupStudents);
            }
          }
        } else {
          // Users other than "Reporter" will see all students
          setStudents(studentsWithIds);
        }
      } catch (error: any) {
        console.error('Failed to fetch data:', error);
      }
    };
  
    fetchData();
  }, [isReporter]);
  


  const handleDeleteStudent = (student: IStudentModel) => {
    if (!isAdmin) return; // Only allow deletion for admin users
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
        notification.success("תלמיד נמחק בהצלחה");
      } catch ( error ) {
        notification.error("ארעה שגיאה");
      }
    }
  };

  const handleCancelDelete = () => {
    setDeleteConfirmationOpen(false);
    setSelectedStudent(null);
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
      sortable: true,
      filterable: false,
      disableColumnMenu: false,
      renderCell: (params: GridCellParams) => (
        params.row.plans[0] !== '' && (
          <IconButton component={Link} to={`/student-plans/${params.row._id}`}>
            <PlaylistAddCheckIcon />
          </IconButton>
        )
      ),
    },
     
  // Conditionally add the 'actions' column for admin users
  // Spread the 'actions' column into the columns array conditionally
  ...(actionsColumn ? [actionsColumn] : []),
  ];

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
    <div style={{ width: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
        <h1 style={{ flex: 1 }}>רשימת תלמידים</h1>
        {isAdmin && ( // Only render the 'Add Student' button for admin users
          <Button
            type="submit"
            variant="contained"
            onClick={() => navigate('/add-student')}
            className="btn-top"
          >
            הוספת תלמיד &nbsp;<PersonAddAltIcon />
          </Button>
        )}
      </div>

      <DataGrid
          rows={students}
          columns={columns}
          autoHeight
          localeText={heILGrid}
          
          components={{
            Toolbar: CustomToolbar, // Use the custom toolbar component
          }}
        />


      { isAdmin && 
      <Box mt={5}>
            <form onSubmit={handleSubmit(send)}>
                <input accept='.xlsx' type="file" {...register("list")}/>
                <br />
                <label>
                  <input type="checkbox" {...register("test")} />
                  <span>טסט</span>
                </label>
                <br />
                <Button type='submit' variant="outlined">ייבוא</Button>
            </form>
      </Box> }

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