
// import React, { useEffect, useState } from 'react';
// import { DataGrid, GridColDef, GridCellParams } from '@mui/x-data-grid';
// import Button from '@mui/material/Button';
// import Dialog from '@mui/material/Dialog';
// import DialogTitle from '@mui/material/DialogTitle';
// import DialogContent from '@mui/material/DialogContent';
// import DialogActions from '@mui/material/DialogActions';
// import { IconButton } from '@mui/material';
// import PersonAddIcon from '@mui/icons-material/PersonAdd';
// import EditIcon from '@mui/icons-material/Edit';
// import SaveIcon from '@mui/icons-material/Save';
// import CancelIcon from '@mui/icons-material/Cancel';
// import DeleteIcon from '@mui/icons-material/Delete';
// import IUserModel, { Role } from '../../../Models/IUserModel';
// import UserService from '../../../Services/UserService';
// import { useNavigate } from 'react-router-dom';

// const Users = () => {
//   const [users, setUsers] = useState<IUserModel[]>([]);
//   const [selectedUser, setSelectedUser] = useState<IUserModel | null>(null);
//   const [editMode, setEditMode] = useState(false);
//   const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
//   const navigate = useNavigate();

//   // Fetch users from the backend
//   useEffect(() => {
//     const fetchUsers = async () => {
//       const fetchedUsers = await UserService.getAllUsers();
//       const usersWithIds = fetchedUsers.map((user, index) => ({ ...user, id: index + 1 }));
//       setUsers(usersWithIds);
//     };
    
//     fetchUsers();
//   }, []);

//   const handleEditUser = (user: IUserModel) => {
//     setSelectedUser(user);
//     setEditMode(true);
//   };

//   const handleSaveUser = async () => {
//     if (selectedUser) {
//       await UserService.updateUser(selectedUser._id, selectedUser);
//       setEditMode(false);
//       setSelectedUser(null);
//     }
//   };

//   const handleCancelEdit = () => {
//     setEditMode(false);
//     setSelectedUser(null);
//   };

//   const handleDeleteUser = (user: IUserModel) => {
//     setSelectedUser(user);
//     setDeleteConfirmationOpen(true);
//   };

//   const handleConfirmDelete = async () => {
//     if (selectedUser) {
//       await UserService.deleteUser(selectedUser._id);
//       setDeleteConfirmationOpen(false);
//       setSelectedUser(null);
//       setUsers(users.filter((user) => user._id !== selectedUser._id));
//     }
//   };

//   const handleCancelDelete = () => {
//     setDeleteConfirmationOpen(false);
//     setSelectedUser(null);
//   };

//   const columns: GridColDef[] = [
//     { field: 'firstName', headerName: 'First Name', width: 150, editable: editMode },
//     { field: 'lastName', headerName: 'Last Name', width: 150, editable: editMode },
//     { field: 'email', headerName: 'Email', width: 250, editable: editMode },
//     {
//       field: 'role',
//       headerName: 'Role',
//       width: 120,
//       valueGetter: (params: GridCellParams) => (params.row.role === Role.admin ? 'ADMIN' : 'USER'),
//       editable: false
//     },
//     {
//       field: 'active',
//       headerName: 'Status',
//       width: 150,
//       valueGetter: (params: GridCellParams) => (params.row.active ? 'ACTIVE' : 'INACTIVE'),
//       editable: editMode,
//     },
//     {
//       field: 'actions',
//       headerName: 'Actions',
//       width: 120,
//       sortable: false,
//       filterable: false,
//       disableColumnMenu: true,
//       renderCell: (params: GridCellParams) => (
//         <div>
//           {!editMode && (
//             <IconButton onClick={() => handleEditUser(params.row as IUserModel)}>
//               <EditIcon />
//             </IconButton>
//           )}
//           {editMode && (
//             <>
//               <IconButton onClick={handleSaveUser}>
//                 <SaveIcon />
//               </IconButton>
//               <IconButton onClick={handleCancelEdit}>
//                 <CancelIcon />
//               </IconButton>
//             </>
//           )}
//           {!editMode && (
//             <IconButton onClick={() => handleDeleteUser(params.row as IUserModel)}>
//               <DeleteIcon style={{color: "red"}}/>
//             </IconButton>
//           )}
//         </div>
//       )
//     }
//   ];

//   return (
//     <>
//       <div style={{ height: 400, width: '100%' }}>
//         <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
//           <h1 style={{ flex: 1 }}>רשימת משתמשים</h1>
//           <Button
//             type="submit"
//             variant="contained"
//             onClick={() => navigate('/adduser')}
//             sx={{ mt: 3, mb: 2, flexShrink: 0, width: '11%' }}
//           >
//             הוספת משתמש &nbsp;<PersonAddIcon />
//           </Button>
//         </div>
//         <DataGrid
//           rows={users}
//           columns={columns}
//           autoHeight
//           disableRowSelectionOnClick
//           disableColumnMenu
//           getRowId={(row) => row.id}
//         />

//         <Dialog open={deleteConfirmationOpen} onClose={handleCancelDelete}>
//           <DialogTitle>Confirm Delete</DialogTitle>
//           <DialogContent>
//             Are you sure you want to delete this user?
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={handleConfirmDelete}>Yes</Button>
//             <Button onClick={handleCancelDelete}>Cancel</Button>
//           </DialogActions>
//         </Dialog>
        
//       </div>
//     </>
//   );
// };

// export default Users;

// import React, { useEffect, useState } from 'react';
// import { DataGrid, GridColDef, GridCellParams } from '@mui/x-data-grid';
// import Button from '@mui/material/Button';
// import Dialog from '@mui/material/Dialog';
// import DialogTitle from '@mui/material/DialogTitle';
// import DialogContent from '@mui/material/DialogContent';
// import DialogActions from '@mui/material/DialogActions';
// import { IconButton, Snackbar } from '@mui/material';
// import PersonAddIcon from '@mui/icons-material/PersonAdd';
// import EditIcon from '@mui/icons-material/Edit';
// import SaveIcon from '@mui/icons-material/Save';
// import CancelIcon from '@mui/icons-material/Cancel';
// import DeleteIcon from '@mui/icons-material/Delete';
// import IUserModel, { Role } from '../../../Models/IUserModel';
// import UserService from '../../../Services/UserService';
// import { useNavigate } from 'react-router-dom';

// const Users = () => {
//   const [users, setUsers] = useState<IUserModel[]>([]);
//   const [selectedUser, setSelectedUser] = useState<IUserModel | null>(null);
//   const [editMode, setEditMode] = useState(false);
//   const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState('');
//   const navigate = useNavigate();

//   // Fetch users from the backend
//   useEffect(() => {
//     const fetchUsers = async () => {
//       const fetchedUsers = await UserService.getAllUsers();
//       const usersWithIds = fetchedUsers.map((user, index) => ({ ...user, id: index + 1 }));
//       setUsers(usersWithIds);
//     };

//     fetchUsers();
//   }, []);

//   const handleEditUser = (user: IUserModel) => {
//     setSelectedUser(user);
//     setEditMode(true);
//   };

//   const handleSaveUser = async () => {
//     if (selectedUser) {
//       try {
//         const updatedUser = await UserService.updateUser(selectedUser);
//         setEditMode(false);
//         setSelectedUser(null);
//         setSnackbarMessage('User edited successfully.');
//         setSnackbarOpen(true);
//       } catch (error) {
//         setSnackbarMessage('Failed to update user.');
//         setSnackbarOpen(true);
//       }
//     }
//   };

//   // const handleSaveUser = async () => {
//   //   if (selectedUser) {
//   //     try {
//   //       const updatedUser = await UserService.updateUser(selectedUser._id, selectedUser);
//   //       setEditMode(false);
//   //       setSelectedUser(null);
//   //       setSnackbarMessage('User edited successfully.');
//   //       setSnackbarOpen(true);
//   //     } catch (error) {
//   //       setSnackbarMessage('Failed to update user.');
//   //       setSnackbarOpen(true);
//   //     }
//   //   }
//   // };

//   const handleCancelEdit = () => {
//     setEditMode(false);
//     setSelectedUser(null);
//   };

//   const handleDeleteUser = (user: IUserModel) => {
//     setSelectedUser(user);
//     setDeleteConfirmationOpen(true);
//   };

//   const handleConfirmDelete = async () => {
//     if (selectedUser) {
//       try {
//         await UserService.deleteUser(selectedUser._id);
//         setDeleteConfirmationOpen(false);
//         setSelectedUser(null);
//         setUsers(users.filter((user) => user._id !== selectedUser._id));
//         setSnackbarMessage('User deleted successfully.');
//         setSnackbarOpen(true);
//       } catch (error) {
//         setSnackbarMessage('Failed to delete user.');
//         setSnackbarOpen(true);
//       }
//     }
//   };

//   const handleCancelDelete = () => {
//     setDeleteConfirmationOpen(false);
//     setSelectedUser(null);
//   };

//   const handleSnackbarClose = () => {
//     setSnackbarOpen(false);
//   };

//   const columns: GridColDef[] = [
//     { field: 'firstName', headerName: 'First Name', width: 150, editable: editMode },
//     { field: 'lastName', headerName: 'Last Name', width: 150, editable: editMode },
//     { field: 'email', headerName: 'Email', width: 250, editable: editMode },
//     {
//       field: 'role',
//       headerName: 'Role',
//       width: 120,
//       valueGetter: (params: GridCellParams) => (params.row.role === Role.admin ? 'ADMIN' : 'USER'),
//       editable: false
//     },
//     {
//       field: 'active',
//       headerName: 'Status',
//       width: 150,
//       valueGetter: (params: GridCellParams) => (params.row.active ? 'ACTIVE' : 'INACTIVE'),
//       editable: editMode,
//     },
//     {
//       field: 'actions',
//       headerName: 'Actions',
//       width: 120,
//       sortable: false,
//       filterable: false,
//       disableColumnMenu: true,
//       renderCell: (params: GridCellParams) => (
//         <div>
//           {!editMode && (
//             <IconButton onClick={() => handleEditUser(params.row as IUserModel)}>
//               <EditIcon />
//             </IconButton>
//           )}
//           {editMode && (
//             <>
//               <IconButton onClick={handleSaveUser}>
//                 <SaveIcon />
//               </IconButton>
//               <IconButton onClick={handleCancelEdit}>
//                 <CancelIcon />
//               </IconButton>
//             </>
//           )}
//           {!editMode && (
//             <IconButton onClick={() => handleDeleteUser(params.row as IUserModel)}>
//               <DeleteIcon style={{ color: 'red' }} />
//             </IconButton>
//           )}
//         </div>
//       )
//     }
//   ];

//   return (
//     <>
//       <div style={{ height: 400, width: '100%' }}>
//         <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
//           <h1 style={{ flex: 1 }}>רשימת משתמשים</h1>
//           <Button
//             type="submit"
//             variant="contained"
//             onClick={() => navigate('/adduser')}
//             sx={{ mt: 3, mb: 2, flexShrink: 0, width: '11%' }}
//           >
//             הוספת משתמש &nbsp;<PersonAddIcon />
//           </Button>
//         </div>
//         <DataGrid
//           rows={users}
//           columns={columns}
//           autoHeight
//           disableRowSelectionOnClick
//           disableColumnMenu
//           getRowId={(row) => row.id}
//         />

//         <Dialog open={deleteConfirmationOpen} onClose={handleCancelDelete}>
//           <DialogTitle>Confirm Delete</DialogTitle>
//           <DialogContent>
//             Are you sure you want to delete this user?
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={handleConfirmDelete}>Yes</Button>
//             <Button onClick={handleCancelDelete}>Cancel</Button>
//           </DialogActions>
//         </Dialog>

//         <Snackbar
//           open={snackbarOpen}
//           autoHideDuration={3000}
//           onClose={handleSnackbarClose}
//           message={snackbarMessage}
//         />
//       </div>
//     </>
//   );
// };

// export default Users;


import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef, GridCellParams, GridRowParams } from '@mui/x-data-grid';
import { Button, IconButton, Snackbar } from '@mui/material';
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IUserModel, { Role } from '../../../Models/IUserModel';
import UserService from '../../../Services/UserService';

const Users = () => {
  const [users, setUsers] = useState<IUserModel[]>([]);
  const [selectedUser, setSelectedUser] = useState<IUserModel | null>(null);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      const fetchedUsers = await UserService.getAllUsers();
      const usersWithIds = fetchedUsers.map((user, index) => ({ ...user, id: index + 1 }));
      setUsers(usersWithIds);
    };

    fetchUsers();
  }, []);

  const handleEditUser = (user: IUserModel) => {
    setSelectedUser(user);
  };

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
      headerName: 'First Name',
      width: 150,
    },
    {
      field: 'lastName',
      headerName: 'Last Name',
      width: 150,
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 250,
    },
    {
      field: 'role',
      headerName: 'Role',
      width: 120,
      valueGetter: (params: GridCellParams) => (params.row.role === Role.admin ? 'ADMIN' : 'USER'),
      editable: false,
    },
    {
      field: 'active',
      headerName: 'Status',
      width: 150,
      valueGetter: (params: GridCellParams) => (params.row.active ? 'ACTIVE' : 'INACTIVE'),
    },
    {
      field: 'actions',
      headerName: 'Actions',
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
    <div>
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
