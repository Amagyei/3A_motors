// src/components/VehicleOverview.jsx

import React from 'react';
import { Card, CardContent, Typography, Chip } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const statusColors = {
  'Active': 'success',
  'In Maintenance': 'warning',
  'Inactive': 'default',
};

const VehicleOverview = ({ vehicles }) => {
  const columns = [
    { field: 'make', headerName: 'Make', width: 150 },
    { field: 'model', headerName: 'Model', width: 150 },
    { field: 'year', headerName: 'Year', width: 100 },
    { field: 'registration_number', headerName: 'Registration', width: 150 },
    { field: 'color', headerName: 'Color', width: 120 },
    { field: 'vin', headerName: 'VIN', width: 200 },
    { 
      field: 'status', 
      headerName: 'Status', 
      width: 150,
      renderCell: (params) => (
        <Chip label={params.value} color={statusColors[params.value] || 'default'} />
      )
    },
    { field: 'queue_position', headerName: 'Queue Position', width: 150 },
  ];

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Vehicles Overview
        </Typography>
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={vehicles}
            columns={columns}
            pagination
            pageSizeOptions={[5, 10, 20]}
            getRowId={(row) => row.id}
            disableRowSelectionOnClick
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default VehicleOverview;