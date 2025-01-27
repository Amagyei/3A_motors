import React, { useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { fetchPayments } from "../../../../api/paymentApi"; // Adjust the path as necessary
import { Box, CircularProgress, Typography, Alert } from "@mui/material";

const Payments = () => {
  const [paymentData, setPaymentData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPaymentData = async () => {
      try {
        setLoading(true);
        const payments = await fetchPayments();
        console.log("Payments:", payments);

        // Map the payments to include an ID for DataGrid
        setPaymentData(
          payments.map((payment, index) => ({
            id: index + 1, // Use a unique ID for the table
            transaction_id: payment.transaction_id,
            invoice: payment.invoice,
            amount: payment.amount,
            status: payment.status,
            paymentDate: payment.payment_date,
            paymentMethod: payment.payment_method,
          }))
        );
      } catch (err) {
        console.error("Error fetching payments:", err);
        setError("Failed to fetch payment data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentData();
  }, []);

  const columns = [
    { field: "transaction_id", headerName: "Transaction ID", width: 200 },
    { field: "invoice", headerName: "Invoice", width: 150 },
    { field: "amount", headerName: "Amount", width: 120 },
    { field: "status", headerName: "Status", width: 120 },
    { field: "paymentDate", headerName: "Payment Date", width: 200 },
    { field: "paymentMethod", headerName: "Payment Method", width: 150 },
  ];

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
        <Typography variant="h6" style={{ marginLeft: "1rem" }}>
          Loading Payments...
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
        Payments
      </Typography>
      <div style={{ height: 600, width: "100%" }}>
        <DataGrid
          rows={paymentData}
          columns={columns}
          loading={loading}
          components={{ Toolbar: GridToolbar }}
          disableSelectionOnClick
          pagination
        />
      </div>
    </div>
  );
};

export default Payments;