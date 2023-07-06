// import React, { useEffect, useState } from 'react';
// import { Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
// import ActivityService from '../../Services/ActivityService';

// interface ReportsPageProps {
//   studentId: string;
//   planId?: string;
// }

// interface Activity {
//   _id?: string;
//   grade: number[];
// }

// const ReportsPage: React.FC<ReportsPageProps> = ({ studentId, planId }) => {
//   const [activities, setActivities] = useState<Activity[]>([]);


//   useEffect(() => {
//     const fetchActivities = async () => {
//       try {
//         if (planId && studentId) {
//           const fetchedActivities: Activity[] = await ActivityService.getActivitiesByPlanAndStudent(
//             planId,
//             studentId
//           );
//           setActivities(fetchedActivities);
//         }
//       } catch (error) {
//         console.error('Failed to fetch activities:', error);
//       }
//     };
  
//     fetchActivities();
//   }, [planId, studentId]);
  

//   return (
//     <div>
//       <Table>
//         <TableHead>
//           <TableRow>
//             <TableCell>Activity ID</TableCell>
//             <TableCell>Grade</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {activities.map((activity) => (
//             <TableRow key={activity._id}>
//               <TableCell>{activity._id}</TableCell>
//               <TableCell>{activity.grade}</TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </div>
//   );
// };

// export default ReportsPage;

import React, { useEffect, useState } from 'react';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from '@mui/material';
import ActivityService from '../../Services/ActivityService';

interface ReportsPageProps {
  studentId: string;
  planId?: string;
  onCancel: () => void;
}

interface Activity {
  _id?: string;
  grade: number[];
}

const ReportsPage: React.FC<ReportsPageProps> = ({
  studentId,
  planId,
  onCancel,
}) => {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        if (planId && studentId) {
          const fetchedActivities: Activity[] =
            await ActivityService.getActivitiesByPlanAndStudent(
              planId,
              studentId
            );
          setActivities(fetchedActivities);
        }
      } catch (error) {
        console.error('Failed to fetch activities:', error);
      }
    };

    fetchActivities();
  }, [planId, studentId]);

  const handleCancel = () => {
    onCancel();
  };

  return (
    <div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Activity ID</TableCell>
            <TableCell>Grade</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {activities.map((activity) => (
            <TableRow key={activity._id}>
              <TableCell>{activity._id}</TableCell>
              <TableCell>{activity.grade}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button variant="contained" onClick={handleCancel}>
        Cancel
      </Button>
    </div>
  );
};

export default ReportsPage;
