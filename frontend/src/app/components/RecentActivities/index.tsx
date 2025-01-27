// import React from 'react';
// import { Card, CardContent, Typography, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
// import BuildIcon from '@mui/icons-material/Build';
// import PaymentIcon from '@mui/icons-material/Payment';
// import { format } from 'date-fns';

// const iconMapping = {
//   'Service Added': <BuildIcon color="primary" />,
//   'Payment Made': <PaymentIcon color="secondary" />,
// };

// const RecentActivities = ({ activities }) => (
//   <Card>
//     <CardContent>
//       <Typography variant="h6" gutterBottom>
//         Recent Activities
//       </Typography>
//       <List>
//         {activities.map((activity, index) => {
//           // Ensure the timestamp is a valid date
//           const date = new Date(activity.timestamp);
//           const formattedDate = !isNaN(date.getTime())
//             ? format(date, 'PPpp')
//             : 'Invalid date'; // Fallback if the date is invalid

//           return (
//             <ListItem key={index}>
//               <ListItemIcon>
//                 {iconMapping[activity.type] || <BuildIcon />}
//               </ListItemIcon>
//                 <ListItemText
//                 primary={activity.message}
//                 secondary={
//                     activity.timestamp
//                     ? format(new Date(activity.timestamp), 'PPpp')
//                     : 'Invalid Date'
//                 }
//                 />
//             </ListItem>
//           );
//         })}
//       </List>
//     </CardContent>
//   </Card>
// );

// export default RecentActivities;