// src/components/ServiceRecords.jsx

import React, { useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import {
  fetchServiceRecords,
  fetchServiceTypes,
  fetchVehicles,
  fetchEmployees,
  createServiceRecord,
  updateServiceRecord,
} from "../../../../api/serviceRecordAPI";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Alert,
} from "@mui/material";

const ServiceRecords = () => {
  const [serviceRecordData, setServiceRecordData] = useState([]);
  const [serviceTypeOptions, setServiceTypeOptions] = useState([]);
  const [vehicleOptions, setVehicleOptions] = useState([]);
  const [employeeOptions, setEmployeeOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nextId, setNextId] = useState(1);

  // State for Edit Modal
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [currentEditRecord, setCurrentEditRecord] = useState(null);
  const [editError, setEditError] = useState(null);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);

        // Fetch existing service records from the server
        const records = await fetchServiceRecords();
        setServiceRecordData(records);

        // Fetch related data (service types, vehicles, employees)
        const serviceTypes = await fetchServiceTypes();
        setServiceTypeOptions(
          serviceTypes.map((type) => ({ label: type.name, value: type.id }))
        );

        const vehicles = await fetchVehicles();
        setVehicleOptions(
          vehicles.map((vehicle) => ({ label: vehicle.name, value: vehicle.id }))
        );

        const employees = await fetchEmployees();
        setEmployeeOptions(
          employees.map((employee) => ({ label: employee.name, value: employee.id }))
        );

        // Track the next temp ID for new records
        setNextId(records.length + 1);
      } catch (error) {
        console.error("Error fetching initial data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  /**
   * Adds a temporary record to the DataGrid.
   */
  const handleAddRecord = () => {
    const newRecord = {
      id: `temp-${nextId}`,
      issueDescription: "",
      status: "Pending",
      paymentStatus: "Unpaid",
      serviceType: "",
      vehicle: "",
      assignedTo: "",
      dateInitiated: "",
      dateCompleted: "",
      costEstimate: "",
    };

    setServiceRecordData((prevData) => [...prevData, newRecord]);
    setNextId(nextId + 1);
  };

  /**
   * Opens the Edit Dialog with the selected record's data.
   * @param {object} record - The service record to edit.
   */
  const handleEditClick = (record) => {
    setCurrentEditRecord(record);
    setEditError(null);
    setEditDialogOpen(true);
  };

  /**
   * Closes the Edit Dialog.
   */
  const handleEditClose = () => {
    setEditDialogOpen(false);
    setCurrentEditRecord(null);
    setEditError(null);
  };

  /**
   * Handles saving the edited record.
   */
  const handleEditSave = async () => {
    try {
      if (!currentEditRecord) return;

      const updatedFields = {
        issue_description: currentEditRecord.issueDescription,
        status: currentEditRecord.status,
        payment_status: currentEditRecord.paymentStatus,
        service_type: currentEditRecord.serviceType,
        vehicle: currentEditRecord.vehicle,
        assigned_to: currentEditRecord.assignedTo,
        date_completed: currentEditRecord.dateCompleted,
        cost_estimate: currentEditRecord.costEstimate,
      };

      const updatedRecord = await updateServiceRecord(currentEditRecord.id, updatedFields);

      // Update the local state with the updated record
      setServiceRecordData((prevData) =>
        prevData.map((item) => (item.id === updatedRecord.id ? updatedRecord : item))
      );

      // Close the dialog
      handleEditClose();
    } catch (error) {
      console.error("Error updating service record:", error);
      setEditError(error.message);
    }
  };

  /**
   * Saves a row, either by creating a new record or updating an existing one.
   * @param {object} row - The row data from the DataGrid.
   */
  const handleSaveRow = async (row) => {
    try {
      if (row.id && row.id.startsWith("temp")) {
        // Create new record
        const newRecordPayload = {
          vehicle: row.vehicle,
          service_type: row.serviceType,
          issue_description: row.issueDescription,
          status: row.status,
          payment_status: row.paymentStatus,
          cost_estimate: row.costEstimate,
        };
        const createdRecord = await createServiceRecord(newRecordPayload);

        // Overwrite the temp row with the full object returned from the server
        setServiceRecordData((prevData) =>
          prevData.map((item) => (item.id === row.id ? createdRecord : item))
        );
      } else {
        // Update existing record
        const updatedFields = {
          issue_description: row.issueDescription,
          status: row.status,
          payment_status: row.paymentStatus,
          cost_estimate: row.costEstimate,
        };
        const updatedRecord = await updateServiceRecord(row.id, updatedFields);

        // Update the local state with the updated record
        setServiceRecordData((prevData) =>
          prevData.map((item) => (item.id === updatedRecord.id ? updatedRecord : item))
        );
      }
    } catch (error) {
      console.error("Error saving row:", error);
    }
  };

  const columns = [
    {
      field: "issueDescription",
      headerName: "Issue Description",
      width: 200,
      editable: true,
    },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      editable: true,
      type: "singleSelect",
      valueOptions: ["Pending", "In Progress", "Completed"],
    },
    {
      field: "paymentStatus",
      headerName: "Payment Status",
      width: 150,
      editable: true,
      type: "singleSelect",
      valueOptions: ["Paid", "Unpaid"],
    },
    {
      field: "serviceType",
      headerName: "Service Type",
      width: 200,
      editable: true,
      type: "singleSelect",
      valueOptions: serviceTypeOptions, // { label, value } pairs
      renderCell: (params) =>
        params.row.serviceTypeDisplay || params.value || "Select Service Type",
    },
    {
      field: "vehicle",
      headerName: "Vehicle",
      width: 200,
      editable: true,
      type: "singleSelect",
      valueOptions: vehicleOptions, // { label, value } pairs
      renderCell: (params) =>
        params.row.vehicleDisplay || params.value || "Select Vehicle",
    },
    {
      field: "assignedTo",
      headerName: "Assigned To",
      width: 200,
      editable: true,
      type: "singleSelect",
      valueOptions: employeeOptions, // { label, value } pairs
      renderCell: (params) =>
        params.row.assignedToDisplay || params.value || "Select Employee",
    },
    {
      field: "dateInitiated",
      headerName: "Date Initiated",
      width: 200,
      editable: false,
      type: "dateTime",
      valueFormatter: (params) => {
        try {
          if (!params || !params.value) return "N/A";
          const date = new Date(params.value);
          return isNaN(date.getTime()) ? "Invalid Date" : date.toLocaleString();
        } catch (error) {
          console.error("Error formatting dateInitiated:", error);
          return "Invalid Date";
        }
      },
    },
    {
      field: "dateCompleted",
      headerName: "Date Completed",
      width: 200,
      editable: true,
      type: "dateTime",
      valueFormatter: (params) => {
        try {
          if (!params || !params.value) return "N/A";
          const date = new Date(params.value);
          return isNaN(date.getTime()) ? "Invalid Date" : date.toLocaleString();
        } catch (error) {
          console.error("Error formatting dateCompleted:", error);
          return "Invalid Date";
        }
      },
    },
    {
      field: "costEstimate",
      headerName: "Cost Estimate",
      width: 150,
      editable: true,
      type: "number",
      
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 250,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Box>
          <Button
            variant="contained"
            color="primary"
            size="small"
            style={{ marginRight: 8 }}
            onClick={() => handleSaveRow(params.row)}
          >
            Save
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            size="small"
            onClick={() => handleEditClick(params.row)}
          >
            Edit
          </Button>
        </Box>
      ),
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h1>Service Records</h1>
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddRecord}
        style={{ marginBottom: "10px" }}
      >
        Add Record
      </Button>

      <div style={{ height: 600, width: "100%" }}>
        <DataGrid
          rows={serviceRecordData}
          columns={columns}
          loading={loading}
          components={{ Toolbar: GridToolbar }}
          editMode="cell"
        />
      </div>

      {/* Edit Service Record Dialog */}
      <Dialog open={editDialogOpen} onClose={handleEditClose} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Service Record</DialogTitle>
        <DialogContent>
          {editError && (
            <Alert severity="error" style={{ marginBottom: "10px" }}>
              {editError}
            </Alert>
          )}
          {currentEditRecord && (
            <Box component="form" noValidate autoComplete="off">
              <TextField
                label="Issue Description"
                fullWidth
                margin="normal"
                value={currentEditRecord.issueDescription}
                onChange={(e) =>
                  setCurrentEditRecord({ ...currentEditRecord, issueDescription: e.target.value })
                }
              />
              <FormControl fullWidth margin="normal">
                <InputLabel>Status</InputLabel>
                <Select
                  value={currentEditRecord.status}
                  label="Status"
                  onChange={(e) =>
                    setCurrentEditRecord({ ...currentEditRecord, status: e.target.value })
                  }
                >
                  <MenuItem value="Pending">Pending</MenuItem>
                  <MenuItem value="In Progress">In Progress</MenuItem>
                  <MenuItem value="Completed">Completed</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth margin="normal">
                <InputLabel>Payment Status</InputLabel>
                <Select
                  value={currentEditRecord.paymentStatus}
                  label="Payment Status"
                  onChange={(e) =>
                    setCurrentEditRecord({ ...currentEditRecord, paymentStatus: e.target.value })
                  }
                >
                  <MenuItem value="Paid">Paid</MenuItem>
                  <MenuItem value="Unpaid">Unpaid</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth margin="normal">
                <InputLabel>Service Type</InputLabel>
                <Select
                  value={currentEditRecord.serviceType}
                  label="Service Type"
                  onChange={(e) =>
                    setCurrentEditRecord({ ...currentEditRecord, serviceType: e.target.value })
                  }
                >
                  {serviceTypeOptions.map((type) => (
                    <MenuItem key={type.value} value={type.value}>
                      {type.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth margin="normal">
                <InputLabel>Vehicle</InputLabel>
                <Select
                  value={currentEditRecord.vehicle}
                  label="Vehicle"
                  onChange={(e) =>
                    setCurrentEditRecord({ ...currentEditRecord, vehicle: e.target.value })
                  }
                >
                  {vehicleOptions.map((vehicle) => (
                    <MenuItem key={vehicle.value} value={vehicle.value}>
                      {vehicle.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth margin="normal">
                <InputLabel>Assigned To</InputLabel>
                <Select
                  value={currentEditRecord.assignedTo}
                  label="Assigned To"
                  onChange={(e) =>
                    setCurrentEditRecord({ ...currentEditRecord, assignedTo: e.target.value })
                  }
                >
                  {employeeOptions.map((employee) => (
                    <MenuItem key={employee.value} value={employee.value}>
                      {employee.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                label="Date Completed"
                type="date"
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                value={
                  currentEditRecord.dateCompleted
                    ? new Date(currentEditRecord.dateCompleted).toISOString().substr(0, 10)
                    : ""
                }
                onChange={(e) =>
                  setCurrentEditRecord({ ...currentEditRecord, dateCompleted: e.target.value })
                }
              />
              <TextField
                label="Cost Estimate"
                type="number"
                fullWidth
                margin="normal"
                value={currentEditRecord.costEstimate}
                onChange={(e) =>
                  setCurrentEditRecord({ ...currentEditRecord, costEstimate: e.target.value })
                }
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleEditSave} color="primary" variant="contained">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ServiceRecords;