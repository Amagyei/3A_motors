export const fetchPayments = async () => {
    try {
      console.log("Fetching all payments...");
  
      const data = await authFetch(`${API_URL}payments/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      console.log("Raw payments data:", data); // Add this
      return data.map((payment, index) => ({
        id: index + 1, // Generate unique ID
        transaction_id: payment.transaction_id,
        amount: payment.amount,
        status: payment.status,
        paymentDate: payment.payment_date,
        invoice: payment.invoice,
        paymentMethod: payment.payment_method,
      }));
    } catch (error) {
      console.error("Error fetching payments:", error);
      return [];
    }
  };