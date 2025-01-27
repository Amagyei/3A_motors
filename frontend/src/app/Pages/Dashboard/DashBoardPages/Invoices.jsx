import React, { useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box, CircularProgress, Typography, Alert } from "@mui/material";
import { fetchInvoices } from "../../../../api"; // Assuming the API function is defined here

const Invoices = () => {
  const [invoiceData, setInvoiceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInvoiceData = async () => {
      try {
        setLoading(true);
        const invoices = await fetchInvoices();
        console.log("Invoices:", invoices);

        // Parse the invoice data to match the expected columns
        setInvoiceData(
          invoices.map((invoice, index) => ({
            id: index + 1,
            invoiceId: invoice.id || "N/A",
            customerName: invoice.customer_name || "N/A",
            amount: invoice.amount ? `$${invoice.amount.toFixed(2)}` : "N/A",
            status: invoice.status || "N/A",
            issuedDate: invoice.issued_date
              ? new Date(invoice.issued_date).toLocaleDateString()
              : "N/A",
            dueDate: invoice.due_date
              ? new Date(invoice.due_date).toLocaleDateString()
              : "N/A",
            paymentMethod: invoice.payment_method || "N/A",
            serviceRecordId: invoice.service_record_id || "N/A",
          }))
        );
      } catch (err) {
        console.error("Error fetching invoices:", err);
        setError("Failed to fetch invoice data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchInvoiceData();
  }, []);

  const columns = [
    { field: "invoiceId", headerName: "Invoice ID", width: 150 },
    { field: "customerName", headerName: "Customer Name", width: 200 },
    { field: "amount", headerName: "Amount", width: 150 },
    { field: "status", headerName: "Status", width: 150 },
    { field: "issuedDate", headerName: "Issued Date", width: 180 },
    { field: "dueDate", headerName: "Due Date", width: 180 },
    { field: "paymentMethod", headerName: "Payment Method", width: 200 },
    { field: "serviceRecordId", headerName: "Service Record ID", width: 200 },
  ];

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
        <Typography variant="h6" style={{ marginLeft: "1rem" }}>
          Loading Invoices...
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
        Invoices
      </Typography>
      <div style={{ height: 600, width: "100%" }}>
        <DataGrid
          rows={invoiceData}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          disableSelectionOnClick
          pagination
        />
      </div>
    </div>
  );
};

export default Invoices;