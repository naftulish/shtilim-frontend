// import React, { useState } from 'react';
// import { TextField, Button } from '@mui/material';
// import GroupService from '../../Services/GroupService';

// interface UpdateGroupProps {
//   groupId: string;
//   onUpdate: () => void;
// }

// const UpdateGroup: React.FC<UpdateGroupProps> = ({ groupId, onUpdate }) => {
//   const [teacher, setTeacher] = useState('');
//   const [name, setName] = useState('');

//   const handleUpdate = async () => {
//     try {
//       const updatedGroup = {
//         _id: groupId,
//         teacher,
//         name,
//       };

//       await GroupService.updateGroup(groupId, updatedGroup);
//       onUpdate(); // Call the parent component's update function
//     } catch (error) {
//       console.error('Error updating group:', error);
//     }
//   };

//   return (
//     <div>
//       <TextField
//         label="Teacher"
//         value={teacher}
//         onChange={(e) => setTeacher(e.target.value)}
//       />
//       <TextField
//         label="Name"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//       />
//       <Button variant="contained" onClick={handleUpdate}>
//         Update Group
//       </Button>
//     </div>
//   );
// };

// export default UpdateGroup;

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  TextField,
  Button,
  Box,
  Container,
  Typography,
  Avatar,
  CssBaseline,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Edit as EditIcon } from '@mui/icons-material';
import { green } from '@mui/material/colors';
import { useForm } from 'react-hook-form';
import GroupService from '../../Services/GroupService';
import Group from '../../Models/IGroupModel';

const defaultTheme = createTheme();

const UpdateGroup = () => {
  const { id } = useParams();
  const [group, setGroup] = useState<Group>({
    _id: '',
    name: '',
    teacher: '',
  });

  const navigate = useNavigate();
  const { register, handleSubmit, setValue } = useForm<Group>();

  useEffect(() => {
    const fetchGroup = async () => {
      try {
        if (id) {
          const fetchedGroup = await GroupService.getGroup(id);
          setGroup(fetchedGroup);
          setValue('name', fetchedGroup.name);
          setValue('teacher', fetchedGroup.teacher);
        }
      } catch (error) {
        console.log(error);
        alert('Failed to fetch the group!');
      }
    };

    fetchGroup();
  }, []);

  const handleFormSubmit = async (data: Group) => {
    try {
      const updatedGroup = {
        _id: group._id,
        name: data.name,
        teacher: data.teacher,
      };

      await GroupService.updateGroup(group._id, updatedGroup);
      alert('You have successfully updated the group!');
      navigate('/groups');
    } catch (error) {
      if ((error as any).response) {
        console.log('Error response:', (error as any).response.data);
        console.log('Error status code:', (error as any).response.status);
      } else {
        console.log('Error:', (error as any).message);
      }
    }
  };

  const handleGoBack = () => {
    navigate('/groups');
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Container maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: green[500] }}>
            <EditIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Update Group
          </Typography>
          {group && (
            <form onSubmit={handleSubmit(handleFormSubmit)}>
              <TextField
                margin="normal"
                fullWidth
                id="name"
                label="Group Name"
                defaultValue={group.name}
                autoFocus
                {...register('name')}
              />
              <TextField
                margin="normal"
                fullWidth
                id="teacher"
                label="Teacher"
                defaultValue={group.teacher}
                {...register('teacher')}
              />
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Update
              </Button>
              <Button fullWidth variant="contained" onClick={handleGoBack}>
                Cancel
              </Button>
            </form>
          )}
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default UpdateGroup;

