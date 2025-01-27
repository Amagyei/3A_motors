// src/components/SummaryCards.jsx

import React from 'react';
import { Grid, Card, CardContent, Typography } from '@mui/material';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import BuildIcon from '@mui/icons-material/Build';
import ReceiptIcon from '@mui/icons-material/Receipt';
import PaymentIcon from '@mui/icons-material/Payment';

const SummaryCards = ({ totalVehicles, activeServices, pendingInvoices, totalPayments }) => {
  const cardData = [
    {
      title: 'Total Vehicles',
      value: totalVehicles,
      icon: <DirectionsCarIcon fontSize="large" color="primary" />,
      color: 'primary',
    },
    {
      title: 'Active Services',
      value: activeServices,
      icon: <BuildIcon fontSize="large" color="secondary" />,
      color: 'secondary',
    },
    {
      title: 'Pending Invoices',
      value: pendingInvoices,
      icon: <ReceiptIcon fontSize="large" color="success" />,
      color: 'success',
    },
    {
      title: 'Total Payments',
      value: `$${totalPayments.toFixed(2)}`,
      icon: <PaymentIcon fontSize="large" color="error" />,
      color: 'error',
    },
  ];

  return (
    <Grid container spacing={2}>
      {cardData.map((card, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <Card>
            <CardContent style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ marginRight: '16px' }}>{card.icon}</div>
              <div>
                <Typography variant="h6" color="textSecondary">
                  {card.title}
                </Typography>
                <Typography variant="h4" color="textPrimary">
                  {card.value}
                </Typography>
              </div>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default SummaryCards;