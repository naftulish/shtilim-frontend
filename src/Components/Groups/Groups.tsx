import React, { useState, useEffect } from 'react';
import { DataGrid, GridColDef, GridCellParams } from '@mui/x-data-grid';
import { Button, IconButton, Snackbar } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import GroupService from '../../Services/GroupService';
import IGroupModel from '../../Models/IGroupModel';
import { GroupAdd } from '@mui/icons-material';

const Groups = () => {
  const [groups, setGroups] = useState<IGroupModel[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<IGroupModel | null>(null);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const fetchedGroups = await GroupService.getAllGroups();
        const groupsWithIds = fetchedGroups.map((group, index) => ({
          ...group,
          id: group._id,
        }));
        setGroups(groupsWithIds);
      } catch (error: any) {
        console.error('Failed to fetch groups:', error);
      }
    };

    fetchGroups();
  }, []);

  const handleDeleteGroup = (group: IGroupModel) => {
    setSelectedGroup(group);
    setDeleteConfirmationOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedGroup) {
      try {
        await GroupService.deleteGroup(selectedGroup._id);
        setDeleteConfirmationOpen(false);
        setSelectedGroup(null);
        setGroups(groups.filter((group) => group._id !== selectedGroup._id));
        setSnackbarMessage('Group deleted successfully.');
        setSnackbarOpen(true);
      } catch (error) {
        setSnackbarMessage('Failed to delete group.');
        setSnackbarOpen(true);
      }
    }
  };

  const handleCancelDelete = () => {
    setDeleteConfirmationOpen(false);
    setSelectedGroup(null);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Name',
      width: 200,
    },
    {
      field: 'teacher',
      headerName: 'Teacher',
      width: 200,
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
          <IconButton component={Link} to={`/update-group/${params.row._id}`}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => handleDeleteGroup(params.row as IGroupModel)}>
            <DeleteIcon style={{ color: 'red' }} />
          </IconButton>
        </div>
      ),
    },
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
        <h1 style={{ flex: 1 }}>רשימת קבוצות</h1>
        <Button
          type="submit"
          variant="contained"
          onClick={() => navigate('/addgroup')}
          sx={{ mt: 3, mb: 2, flexShrink: 0, width: '11%' }}
        >
          הוספת קבוצה &nbsp;<GroupAdd />
        </Button>
      </div>
      <DataGrid rows={groups} columns={columns} />
      <Snackbar open={snackbarOpen} message={snackbarMessage} onClose={handleSnackbarClose} />
      <Dialog open={deleteConfirmationOpen} onClose={handleCancelDelete}>
        <DialogTitle>Delete Group</DialogTitle>
        <DialogContent>Are you sure you want to delete this group?</DialogContent>
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

export default Groups;
