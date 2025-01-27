// src/pages/Home.jsx

import React, { useEffect, useState } from 'react';
import { Grid, Container, Typography, CircularProgress } from '@mui/material';
import SummaryCards from '../../../components/SummaryCards';
import ServiceStatusChart from '../../../components/ServiceStatusChart';
import PaymentsOverTimeChart from '../../../components/PaymentsOverTimeChart';
// import RecentActivities from '../../../components/RecentActivities';
// import NotificationsFeed from '../../../components/NotificationsFeed';
import VehicleOverview from '../../../components/VehicleOverview.jsx';
import { 
  fetchServiceRecords, 
  fetchInvoices, 
  fetchPayments, 
  fetchNotifications, 
  fetchVehicles 
} from '../../../../api';

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState({
    totalVehicles: 0,
    activeServices: 0,
    pendingInvoices: 0,
    totalPayments: 0,
  });
  const [serviceStatusData, setServiceStatusData] = useState([]);
  const [paymentsData, setPaymentsData] = useState([]);
  const [activities, setActivities] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [services, invoices, payments, notif, vehs] = await Promise.all([
          fetchServiceRecords(),
          fetchInvoices(),
          fetchPayments(),
          fetchNotifications(),
          fetchVehicles(),
        ]);

        setSummary({
          totalVehicles: vehs.length,
          activeServices: services.filter(s => s.status === 'In Progress').length,
          pendingInvoices: invoices.filter(i => i.status === 'Unpaid').length,
          totalPayments: payments.reduce((acc, curr) => acc + parseFloat(curr.amount), 0),
        });

        // Service Status Data for Pie Chart
        const statusCounts = services.reduce((acc, service) => {
          acc[service.status] = (acc[service.status] || 0) + 1;
          return acc;
        }, {});
        setServiceStatusData(Object.keys(statusCounts).map(key => ({ name: key, value: statusCounts[key] })));

        // Payments Over Time Data for Bar Chart
        // Assuming payments have a 'payment_date' and 'amount'
        const paymentsByMonth = payments.reduce((acc, payment) => {
          const month = new Date(payment.payment_date).toLocaleString('default', { month: 'short', year: 'numeric' });
          acc[month] = (acc[month] || 0) + parseFloat(payment.amount);
          return acc;
        }, {});
        setPaymentsData(Object.keys(paymentsByMonth).map(month => ({ month, amount: paymentsByMonth[month] })));

        // Recent Activities (e.g., latest 5 services and payments)
        const recentServices = services.slice(-5).map(s => ({
          type: 'Service Added',
          message: `Service for ${s.vehicleDisplay} - ${s.serviceTypeDisplay}`,
          timestamp: s.dateInitiated,
        }));
        const recentPayments = payments.slice(-5).map(p => ({
          type: 'Payment Made',
          message: `Payment of $${p.amount} for Invoice ${p.invoice}`,
          timestamp: p.payment_date,
        }));
        setActivities([...recentServices, ...recentPayments].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)));

        // Notifications
        setNotifications(notif);

        // Vehicles
        setVehicles(vehs);

      } catch (error) {
        console.error('Error loading dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" style={{ paddingTop: '20px', paddingBottom: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <SummaryCards
        totalVehicles={summary.totalVehicles}
        activeServices={summary.activeServices}
        pendingInvoices={summary.pendingInvoices}
        totalPayments={summary.totalPayments}
      />
      <Grid container spacing={2} style={{ marginTop: '20px' }}>
        <Grid item xs={12} md={6}>
          <ServiceStatusChart serviceStatusData={serviceStatusData} />
        </Grid>
        <Grid item xs={12} md={6}>
          <PaymentsOverTimeChart paymentsData={paymentsData} />
        </Grid>
        <Grid item xs={12} md={6}>
          {/* <RecentActivities activities={activities} /> */}
        </Grid>
        <Grid item xs={12} md={6}>
          {/* <NotificationsFeed notifications={notifications} /> */}
        </Grid>
        <Grid item xs={12}>
          <VehicleOverview vehicles={vehicles} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;