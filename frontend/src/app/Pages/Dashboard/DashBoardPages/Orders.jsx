import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import Header from '../../../components/DashboardComponents/Header';
import { 
  GridComponent, 
  ColumnsDirective, 
  ColumnDirective, 
  Page, 
  Inject, 
  Sort, 
  Filter, 
  Toolbar, 
  Edit 
} from '@syncfusion/ej2-react-grids';

// Dummy Data for Orders Page
const ordersData = [
  {
    id: 1,
    service_type: 'Engine Repair',
    vehicle: 'Toyota Corolla - GR1234X',
    assigned_employee: 'John Doe',
    priority: 'High',
    payment_status: 'Pending',
    status: 'Not Started',
  },
  {
    id: 2,
    service_type: 'Brake Replacement',
    vehicle: 'Honda Civic - GR5678Y',
    assigned_employee: 'Jane Smith',
    priority: 'Medium',
    payment_status: 'Paid',
    status: 'In Progress',
  },
  {
    id: 3,
    service_type: 'Oil Change',
    vehicle: 'Ford F-150 - GR9101Z',
    assigned_employee: 'Michael Johnson',
    priority: 'Low',
    payment_status: 'Pending',
    status: 'Not Started',
  },
];

// Grid Columns for Pending Tasks
const ordersGrid = [
  { field: 'service_type', headerText: 'Service Type', width: '150', textAlign: 'Center' },
  { field: 'vehicle', headerText: 'Vehicle', width: '200', textAlign: 'Center' },
  { field: 'assigned_employee', headerText: 'Assigned Employee', width: '200', textAlign: 'Center' },
  { field: 'priority', headerText: 'Priority', width: '100', textAlign: 'Center' },
  { field: 'payment_status', headerText: 'Payment Status', width: '150', textAlign: 'Center' },
  { field: 'status', headerText: 'Task Status', width: '150', textAlign: 'Center' },
];

// Styled Components
const PageContainer = styled.div`
  ${tw`
    m-2 
    md:m-10 
    mt-24 
    p-2 
    md:p-10 
    bg-white 
    rounded-3xl
  `}
`;

const GridWrapper = styled.div`
  ${tw`
    shadow-md
    rounded-lg
  `}

  .e-grid {
    ${tw`
      rounded-lg
    `}
  }

  .e-headercell {
    ${tw`
      font-semibold
    `}
  }

  .e-row:hover {
    ${tw`
      bg-gray-100
    `}
  }
`;

const Orders = () => {
  const toolbarOptions = ['Add', 'Edit', 'Delete', 'Search'];
  const editing = { allowDeleting: true, allowEditing: true };

  return (
    <PageContainer>
      <Header category="iMotors" title="Pending Tasks" />
      <GridWrapper>
        <GridComponent
          dataSource={ordersData}
          allowPaging
          allowSorting
          toolbar={toolbarOptions}
          editSettings={editing}
        >
          <ColumnsDirective>
            {ordersGrid.map((item, index) => (
              <ColumnDirective key={index} {...item} />
            ))}
          </ColumnsDirective>
          <Inject services={[Page, Sort, Filter, Toolbar, Edit]} />
        </GridComponent>
      </GridWrapper>
    </PageContainer>
  );
};

export default Orders;