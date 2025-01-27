// src/api/invoiceAPI.js

import { authFetch } from "./authFetch";

const API_URL = "http://127.0.0.1:8000/client_portal/api/v1/";

/**
 * Fetches all invoices.
 * @returns {Promise<Array>} - Array of invoice objects.
 */
export const fetchInvoices = async () => {
  try {
    console.log("Fetching all invoices...");

    const data = await authFetch(`${API_URL}invoices/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    

    console.log("Invoices fetched:", data);
    return data.map((invoice) => ({
      id: invoice.invoice_id,
      amount: invoice.amount,
      status: invoice.status,
      dateCreated: invoice.date_created,
      dateDue: invoice.date_due,
      serviceRecord: invoice.service_record,
      serviceRecordDisplay: invoice.service_record_display,
      // Add other fields as needed
    }));
  } catch (error) {
    console.error("Error fetching invoices:", error);
    return [];
  }
};