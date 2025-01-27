// src/api/serviceRecordAPI.js

import { authFetch } from "./authFetch";

const API_URL = "http://127.0.0.1:8000/client_portal/api/v1/";
const VEHICLE_API_URL = "http://127.0.0.1:8000/vehicle/api/";

/**
 * Fetches all service records.
 * @returns {Promise<Array>} - Array of service record objects.
 */
export const fetchServiceRecords = async () => {
  try {
    console.log("Fetching all service records...");

    const data = await authFetch(`${API_URL}service-records/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("Service records fetched:", data);
    return data.map((record) => ({
      id: record.serviceRecord_id,
      issueDescription: record.issue_description,
      status: record.status,
      paymentStatus: record.payment_status,
      serviceType: record.service_type,
      serviceTypeDisplay: record.service_type_display,
      vehicle: record.vehicle,
      vehicleDisplay: record.vehicle_display,
      assignedTo: record.assigned_to,
      assignedToDisplay: record.assigned_to_display,
      dateInitiated: record.date_initiated,
      dateCompleted: record.date_completed,
      costEstimate: record.cost_estimate,
    }));
  } catch (error) {
    console.error("Error fetching service records:", error);
    return [];
  }
};

/**
 * Fetches all service types.
 * @returns {Promise<Array>} - Array of service type objects.
 */
export const fetchServiceTypes = async () => {
  try {
    const data = await authFetch(`${API_URL}service-types/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return data.map((type) => ({
      id: type.id,
      name: type.name,
    }));
  } catch (error) {
    console.error("Error fetching service types:", error);
    return [];
  }
};

/**
 * Fetches all vehicles.
 * @returns {Promise<Array>} - Array of vehicle objects.
 */
export const fetchVehicles = async () => {
  try {
    const data = await authFetch(`${VEHICLE_API_URL}vehicles/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      
    });
    console.log("Vehicles fetched:",data);
   
    return data.map((vehicle) => ({
      id: vehicle.vehicle_id, 
      name: `${vehicle.model} (${vehicle.registration_number || "No Registration"})`,
    }));
  } catch (error) {
    console.error("Error fetching vehicles:", error);
    return [];
  }
};

/**
 * Fetches all employees.
 * @returns {Promise<Array>} - Array of employee objects.
 */
export const fetchEmployees = async () => {
  try {
    const data = await authFetch(`${API_URL}employees/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("Employees fetched:", data);
    console.log

    return data.map((employee) => ({
      id: employee.uid,
      name: employee.full_name || employee.username,
    }));
  } catch (error) {
    console.error("Error fetching employees:", error);
    return [];
  }
};

/**
 * Creates a new service record.
 * @param {object} record - The service record data.
 * @returns {Promise<object>} - The created service record.
 */
export const createServiceRecord = async (record) => {
  try {
    const data = await authFetch(`${API_URL}service-records/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(record),
    });
    return data;
  } catch (error) {
    console.error("Error creating service record:", error);
    throw error;
  }
};

/**
 * Updates an existing service record.
 * @param {string|number} id - The ID of the service record.
 * @param {object} updatedFields - The fields to update.
 * @returns {Promise<object>} - The updated service record.
 */
export const updateServiceRecord = async (id, updatedFields) => {
  try {
    const data = await authFetch(`${API_URL}service-records/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedFields),
    });
    console.log(`Updated Service Record ${id}:`, data);
    return data;
  } catch (error) {
    console.error(`Error updating service record ${id}:`, error);
    throw error;
  }
};