

// import React, { useEffect, useState } from 'react';
// import {
//   Table,
//   TableHead,
//   TableBody,
//   TableRow,
//   TableCell,
//   Button,
// } from '@mui/material';
// import ActivityService from '../../Services/ActivityService';

// interface ReportsPageProps {
//   studentId: string;
//   planId?: string;
//   onCancel: () => void;
// }

// interface Activity {
//   _id?: string;
//   grade: number[];
// }

// const ReportsPage: React.FC<ReportsPageProps> = ({
//   studentId,
//   planId,
//   onCancel,
// }) => {
//   const [activities, setActivities] = useState<Activity[]>([]);

//   useEffect(() => {
//     const fetchActivities = async () => {
//       try {
//         if (planId && studentId) {
//           const fetchedActivities: Activity[] =
//             await ActivityService.getActivitiesByPlanAndStudent(
//               planId,
//               studentId
//             );
//           setActivities(fetchedActivities);
//         }
//       } catch (error) {
//         console.error('Failed to fetch activities:', error);
//       }
//     };

//     fetchActivities();
//   }, [planId, studentId]);

//   const handleCancel = () => {
//     onCancel();
//   };

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
//       <Button variant="contained" onClick={handleCancel}>
//         Cancel
//       </Button>
//     </div>
//   );
// };

// export default ReportsPage;



// import React, { useEffect, useState } from 'react';
// import {
//   Table,
//   TableHead,
//   TableBody,
//   TableRow,
//   TableCell,
//   Button,
// } from '@mui/material';
// import ActivityService from '../../Services/ActivityService';
// import { IPlanModel, QuizModel, ReportingType } from '../../Models/IPlanModel';
// import IActivityModel from '../../Models/IActivityModel';

// interface ReportsPageProps {
//   studentId: string;
//   planId?: string;
//   planName: string;
//   onCancel: () => void;
// }

// interface Activity extends IActivityModel {
//   createdIn: Date;
// }

// const ReportsPage: React.FC<ReportsPageProps> = ({
//   studentId,
//   planId,
//   planName,
//   onCancel,
// }) => {
//   const [activities, setActivities] = useState<IActivityModel[]>([]);
//   const [reportDate, setReportDate] = useState<string>('');

//   useEffect(() => {
//     const fetchActivities = async () => {
//       try {
//         if (planId && studentId) {
//           const fetchedActivities: IActivityModel[] = await ActivityService.getActivitiesByPlanAndStudent(
//             planId,
//             studentId
//           );
//           setActivities(fetchedActivities);

//           // const reportDate: string = fetchedActivities[0]?.createdIn?.toISOString() || '';
//           setReportDate(reportDate);
//         }
//       } catch (error) {
//         console.error('Failed to fetch activities:', error);
//       }
//     };

//     fetchActivities();
//   }, [planId, studentId]);

//   const handleCancel = () => {
//     onCancel();
//   };

//   const renderQuestionsAndAnswers = (plan: IPlanModel) => {
//     return plan.quiz.map((quiz: QuizModel, index: number) => (
//       <React.Fragment key={index}>
//         <TableRow>
//           <TableCell colSpan={2}>{quiz.title}</TableCell>
//         </TableRow>
//         <TableRow>
//           <TableCell colSpan={2}>
//             {activities.map((activity) => (
//               <span key={activity._id}>
//                 {quiz.answer[activity.grade[index]]}
//                 <br />
//               </span>
//             ))}
//           </TableCell>
//         </TableRow>
//       </React.Fragment>
//     ));
//   };

//   return (
//     <div>
//       <Table>
//         <TableHead>
//           <TableRow>
//             <TableCell>Plan: {planName}</TableCell>
//           </TableRow>
//           <TableRow>
//             <TableCell>Date: {reportDate}</TableCell>
//           </TableRow>
//           <TableRow>
//             <TableCell>Activity ID</TableCell>
//             <TableCell>Grade</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//         {renderQuestionsAndAnswers({
//             _id: planId || '',
//             name: planName,
//             description: '',
//             reportingType: ReportingType.days,
//             reportingTime: { reportingTime: 0, maxReportingTime: {
//               [ReportingType.days]: 0,
//               [ReportingType.hours]: 0,
//               [ReportingType.minutes]: 0,
//             }},
//         </TableBody>
//       </Table>
//       <Button variant="contained" onClick={handleCancel}>
//         Cancel
//       </Button>
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
import { IPlanModel, QuizModel, ReportingType } from '../../Models/IPlanModel';
import IActivityModel from '../../Models/IActivityModel';

interface ReportsPageProps {
  studentId: string;
  planId?: string;
  planName: string;
  onCancel: () => void;
}

interface Activity extends IActivityModel {
  createdIn: Date;
}

const ReportsPage: React.FC<ReportsPageProps> = ({
  studentId,
  planId,
  planName,
  onCancel,
}) => {
  const [activities, setActivities] = useState<IActivityModel[]>([]);
  const [reportDate, setReportDate] = useState<string>('');

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        if (planId && studentId) {
          const fetchedActivities: IActivityModel[] = await ActivityService.getActivitiesByPlanAndStudent(
            planId,
            studentId
          );
          setActivities(fetchedActivities);

          // const reportDate: string = fetchedActivities[0]?.createdIn?.toISOString() || '';
          setReportDate(reportDate);
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

  const renderQuestionsAndAnswers = (plan: IPlanModel) => {
    return plan.quiz.map((quiz: QuizModel, index: number) => (
      <React.Fragment key={index}>
        <TableRow>
          <TableCell colSpan={2}>{quiz.title}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell colSpan={2}>
            {activities.map((activity) => (
              <span key={activity._id}>
                {quiz.answer[activity.grade[index]]}
                <br />
              </span>
            ))}
          </TableCell>
        </TableRow>
      </React.Fragment>
    ));
  };

  return (
    <div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Plan: {planName}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Date: {reportDate}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Activity ID</TableCell>
            <TableCell>Grade</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {renderQuestionsAndAnswers({
            _id: planId || '',
            name: planName,
            description: '',
            reportingType: ReportingType.days,
            reportingTime: { reportingTime: 0, maxReportingTime: {
              [ReportingType.days]: 0,
              [ReportingType.hours]: 0,
              [ReportingType.minutes]: 0,
            }},
            quiz: [],
          })}
        </TableBody>
      </Table>
      <Button variant="contained" onClick={handleCancel}>
        Cancel
      </Button>
    </div>
  );
};

export default ReportsPage;
