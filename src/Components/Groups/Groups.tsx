import React, { useState, useEffect } from 'react';
import { DataGrid, GridColDef, GridCellParams, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
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
import useTitle from '../../hooks/useTitle';
import IUserModel from '../../Models/IUserModel';
import UserService from '../../Services/UserService';
import heILGrid from '../../Utils/HebrewIL';
import notification from '../../Services/Notification';

const Groups = () => {
  const [groups, setGroups] = useState<IGroupModel[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<IGroupModel | null>(null);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const navigate = useNavigate();
  useTitle("כיתות");

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

  const [users, setUsers] = useState<IUserModel[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers = await UserService.getAllUsers();
        setUsers(fetchedUsers);
        const userMap: { [key: string]: string } = {};
        fetchedUsers.forEach((user) => {
          userMap[user._id] = `${user.firstName} ${user.lastName}`;
        });
      } catch (error) {
        notification.error();
      }
    };
  
    fetchUsers();
  }, []);
  

  const handleDeleteGroup = (group: IGroupModel) => {
    setSelectedGroup(group);
    setDeleteConfirmationOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedGroup) {
      try {
        await GroupService.deleteGroup(selectedGroup._id || "" );
        setDeleteConfirmationOpen(false);
        setSelectedGroup(null);
        setGroups(groups.filter((group) => group._id !== selectedGroup._id));
        notification.success("הכיתה נמחקה בהצלחה");
      } catch (error) {
        notification.error();
      }
    }
  };

  const handleCancelDelete = () => {
    setDeleteConfirmationOpen(false);
    setSelectedGroup(null);
  };

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'שם',
      width: 200,
    },
    {
      field: 'teacher',
      headerName: 'מורה',
      width: 200,
      valueGetter: (params: GridCellParams) => {
        const teacherId = params.row.teacher;
        const teacher = users.find((user) => user._id === teacherId);
        return teacher ? `${teacher.firstName} ${teacher.lastName}` : '';
      },
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
          <IconButton component={Link} to={`/update-group/${params.row._id}`}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => handleDeleteGroup(params.row as IGroupModel)}>
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
          utf8WithBom: true,
        }}
        printOptions={{ disableToolbarButton: true }}
      />
    </GridToolbarContainer>
  );

  return (
    <div style={{ height: 400, width: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
        <h1 style={{ flex: 1 }}>רשימת כיתות</h1>
        <Button
          type="submit"
          variant="contained"
          onClick={() => navigate('/add-group')}
          className='btn-top'
        >
          הוספת כיתה &nbsp;<GroupAdd />
        </Button>
      </div>

      <DataGrid
          rows={groups}
          columns={columns}
          autoHeight
          localeText={heILGrid}
          
          components={{
            Toolbar: CustomToolbar, // Use the custom toolbar component
          }}
        />

      <Dialog open={deleteConfirmationOpen} onClose={handleCancelDelete}>
        <DialogTitle>מחק כיתה</DialogTitle>
        <DialogContent>אתה בטוח שברצונך למחוק את הקבוצה הזו?</DialogContent>
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

export default Groups;
