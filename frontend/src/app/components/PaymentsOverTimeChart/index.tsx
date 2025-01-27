// src/components/PaymentsOverTimeChart.jsx

import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const PaymentsOverTimeChart = ({ paymentsData }) => (
  <Card>
    <CardContent>
      <Typography variant="h6" gutterBottom>
        Payments Over Time
      </Typography>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={paymentsData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip formatter={(value) => `$${Number(value).toFixed(2)}`} />
          <Legend />
          <Bar dataKey="amount" fill="#82ca9d" name="Amount" />
        </BarChart>
      </ResponsiveContainer>
    </CardContent>
  </Card>
);

export default PaymentsOverTimeChart;