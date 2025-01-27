import React, { useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { fetchVehicles } from "../../../../api/serviceRecordAPI";
import { Box, CircularProgress, Typography, Alert } from "@mui/material";

const Vehicles = () => {
  const [vehicleData, setVehicleData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVehicleData = async () => {
      try {
        setLoading(true);
        const vehicles = await fetchVehicles();
        console.log("Vehicles:", vehicles);

        // Parse the vehicle data to match the expected columns
        setVehicleData(
          vehicles.map((vehicle, index) => {
            // Extract fields from the name (e.g., "Toyota Camry (rJD-5107)")
            const nameParts = vehicle.name.split(" ");
            const registrationMatch = /\(([^)]+)\)/.exec(vehicle.name); // Extract registration number inside parentheses

            return {
              id: index + 1,
              vehicleId: vehicle.id || "N/A",
              make: nameParts[0] || "N/A", // First part is the make (e.g., Toyota)
              model: nameParts.slice(1, -1).join(" ") || "N/A", // Middle part is the model (e.g., Camry)
              year: "N/A", // Year is not provided in the API response
              registrationNumber: registrationMatch ? registrationMatch[1] : "No Registration",
              color: "N/A", // Color is not provided in the API response
              vin: "N/A", // VIN is not provided in the API response
              status: "N/A", // Status is not provided in the API response
              queuePosition: "N/A", // Queue position is not provided in the API response
              owner: "N/A", // Owner is not provided in the API response
            };
          })
        );
      } catch (err) {
        console.error("Error fetching vehicles:", err);
        setError("Failed to fetch vehicle data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchVehicleData();
  }, []);

  const columns = [
    { field: "vehicleId", headerName: "Vehicle ID", width: 150 },
    { field: "make", headerName: "Make", width: 150 },
    { field: "model", headerName: "Model", width: 150 },
    { field: "year", headerName: "Year", width: 120 },
    { field: "registrationNumber", headerName: "Registration Number", width: 200 },
    { field: "color", headerName: "Color", width: 150 },
    { field: "vin", headerName: "VIN", width: 200 },
    { field: "status", headerName: "Status", width: 180 },
    { field: "queuePosition", headerName: "Queue Position", width: 150 },
    { field: "owner", headerName: "Owner", width: 200 },
  ];

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
        <Typography variant="h6" style={{ marginLeft: "1rem" }}>
          Loading Vehicles...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box style={{ padding: "20px" }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Vehicles
      </Typography>
      <div style={{ height: 600, width: "100%" }}>
        <DataGrid
          rows={vehicleData}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          disableSelectionOnClick
          pagination
        />
      </div>
    </div>
  );
};

export default Vehicles;