


import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef, GridCellParams } from '@mui/x-data-grid';
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


const Users = () => {

  const [users, setUsers] = useState<IUserModel[]>([]);
  const [selectedUser, setSelectedUser] = useState<IUserModel | null>(null);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try{
        const fetchedUsers = await UserService.getAllUsers();
        const usersWithIds = fetchedUsers.map((user, index) => ({ ...user, id: index + 1 }));
        setUsers(usersWithIds);
      } catch (error: any) {
        // Handle the error appropriately (e.g., show an error message)
        console.error('Failed to fetch users:', error);
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
        setSnackbarMessage('User deleted successfully.');
        setSnackbarOpen(true);
      } catch (error) {
        setSnackbarMessage('Failed to delete user.');
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
    valueGetter: (params: GridCellParams) => (params.row.role === Role.admin ? 'מנהל' : 'משתמש'),
    editable: false,
    },
    {
    field: 'active',
    headerName: 'סטטוס',
    width: 150,
    valueGetter: (params: GridCellParams) => (params.row.active ? 'פעיל' : 'לא פעיל'),
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
            <DeleteIcon style={{ color: 'red' }} />
          </IconButton>
        </div>
      ),
    },
  ];
  

  return (
    
    <div style={{ height: 400, width: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
          <h1 style={{ flex: 1 }}>רשימת משתמשים</h1>
          <Button
            type="submit"
            variant="contained"
            onClick={() => navigate('/adduser')}
            sx={{ mt: 3, mb: 2, flexShrink: 0, width: '11%' }}
          >
            הוספת משתמש &nbsp;<PersonAddIcon />
          </Button>
        </div>  
      <DataGrid rows={users} columns={columns} />
      <Snackbar open={snackbarOpen} message={snackbarMessage} onClose={handleSnackbarClose} />
      <Dialog open={deleteConfirmationOpen} onClose={handleCancelDelete}>
        <DialogTitle>Delete User</DialogTitle>
        <DialogContent>Are you sure you want to delete this user?</DialogContent>
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

export default Users;
