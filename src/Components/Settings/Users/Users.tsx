


import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef, GridCellParams, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import { Button, IconButton, Snackbar } from '@mui/material';
import { Link } from 'react-router-dom';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IUserModel, { Role } from '../../../Models/IUserModel';
import UserService from '../../../Services/UserService';
import { useNavigate } from 'react-router-dom';
import useTitle from '../../../hooks/useTitle';
import heILGrid from '../../../Utils/HebrewIL';


const Users = () => {

  const [users, setUsers] = useState<IUserModel[]>([]);
  const [selectedUser, setSelectedUser] = useState<IUserModel | null>(null);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const navigate = useNavigate();
  useTitle("משתמשים");

  useEffect(() => {
    const fetchUsers = async () => {
      try{
        const fetchedUsers = await UserService.getAllUsers();
        const usersWithIds = fetchedUsers.map((user, index) => ({ ...user, id: index + 1 }));
        setUsers(usersWithIds);
      } catch (error: any) {
        setSnackbarMessage('שגיאה בנתוני משתמש');
        setSnackbarOpen(true);
      }
    };

    fetchUsers();
  }, []);


  const handleDeleteUser = (user: IUserModel) => {
    setSelectedUser(user);
    setDeleteConfirmationOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedUser) {
      try {
        await UserService.deleteUser(selectedUser._id);
        setDeleteConfirmationOpen(false);
        setSelectedUser(null);
        setUsers(users.filter((user) => user._id !== selectedUser._id));
        setSnackbarMessage('המשתמש נמחק בהצלחה');
        setSnackbarOpen(true);
      } catch (error) {
        setSnackbarMessage('ארעה שגיאה במחיקת המשתמש');
        setSnackbarOpen(true);
      }
    }
  };

  const handleCancelDelete = () => {
    setDeleteConfirmationOpen(false);
    setSelectedUser(null);
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
      field: 'email',
      headerName: 'אימייל',
      width: 250,
    },
    {
      field: 'role',
      headerName: 'תפקיד',
      width: 120,
      valueGetter: (params: GridCellParams) => {
        switch (params.row.role) {
          case Role.admin:
            return 'ADMIN';
          case Role.programManager:
            return 'PManager';
          case Role.reporter:
            return 'Reporter';
          
        }
      },
      editable: false,
    },
    {
      field: 'active',
      headerName: 'סטטוס',
      width: 150,
      valueGetter: (params: GridCellParams) => (params.row.active ? 'Active' : 'Inactive'),
    },
    {
      field: 'actions',
      headerName: 'פעולות',
      width: 120,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params: GridCellParams) => (
        <div>
          <IconButton component={Link} to={`/update-user/${params.row._id}`}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => handleDeleteUser(params.row as IUserModel)}>
            <DeleteIcon className="delete-button" />
          </IconButton>
        </div>
      ),
    },
  ];

  const CustomToolbar = () => (
    <GridToolbarContainer>
      <GridToolbarExport
        csvOptions={{

          delimiter: ';',
          utf8WithBom: true,
        }}
        printOptions={{ disableToolbarButton: true }}
      />
    </GridToolbarContainer>
  );
  

  return (
    
    <div style={{ height: 400, width: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
          <h1 style={{ flex: 1 }}>רשימת משתמשים</h1>
          <Button
            type="submit"
            variant="contained"
            onClick={() => navigate('/add-user')}
            className='btn-top'          >
            הוספת משתמש &nbsp;<PersonAddIcon />
          </Button>
        </div>  
        <DataGrid
          rows={users}
          columns={columns}
          autoHeight
          localeText={heILGrid}
          
          components={{
            Toolbar: CustomToolbar, // Use the custom toolbar component
          }}
        />


      <Snackbar open={snackbarOpen} message={snackbarMessage} onClose={handleSnackbarClose} />
      <Dialog open={deleteConfirmationOpen} onClose={handleCancelDelete}>
        <DialogTitle>מחיקת משתמש</DialogTitle>
        <DialogContent>האם למחוק את המשתמש?</DialogContent>
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

export default Users;
