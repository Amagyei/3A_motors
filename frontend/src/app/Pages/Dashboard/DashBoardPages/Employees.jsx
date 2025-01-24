import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { 
  GridComponent, 
  Inject, 
  ColumnsDirective, 
  ColumnDirective, 
  Search, 
  Page 
} from '@syncfusion/ej2-react-grids';
import { Header } from '../../../components/DashboardComponents';

// Updated Dummy Data for iMotors Employees
const imotorsEmployeesData = [
  {
    id: 1,
    name: 'John Doe',
    role: 'Mechanic',
    location: 'Accra Service Center',
    status: 'Active',
    contact: '123-456-7890',
    experience: '5 Years',
  },
  {
    id: 2,
    name: 'Jane Smith',
    role: 'Service Advisor',
    location: 'Kumasi Regional Office',
    status: 'Inactive',
    contact: '987-654-3210',
    experience: '8 Years',
  },
  {
    id: 3,
    name: 'Michael Johnson',
    role: 'Technician',
    location: 'Tema Workshop',
    status: 'Active',
    contact: '456-789-1230',
    experience: '3 Years',
  },
];

// Updated Columns for the Employees Grid
const imotorsEmployeesGrid = [
  { field: 'name', headerText: 'Name', width: '150', textAlign: 'Center' },
  { field: 'role', headerText: 'Role', width: '150', textAlign: 'Center' },
  { field: 'location', headerText: 'Location', width: '200', textAlign: 'Center' },
  { field: 'status', headerText: 'Status', width: '100', textAlign: 'Center' },
  { field: 'contact', headerText: 'Contact', width: '150', textAlign: 'Center' },
  { field: 'experience', headerText: 'Experience', width: '150', textAlign: 'Center' },
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

const Employees = () => {
  const toolbarOptions = ['Search'];

  const editing = { allowDeleting: true, allowEditing: true };

  return (
    <PageContainer>
      <Header category="iMotors" title="Employees" />
      <GridWrapper>
        <GridComponent
          dataSource={imotorsEmployeesData}
          width="auto"
          allowPaging
          allowSorting
          pageSettings={{ pageCount: 5 }}
          editSettings={editing}
          toolbar={toolbarOptions}
        >
          <ColumnsDirective>
            {/* Dynamically render columns */}
            {imotorsEmployeesGrid.map((item, index) => (
              <ColumnDirective key={index} {...item} />
            ))}
          </ColumnsDirective>
          <Inject services={[Search, Page]} />
        </GridComponent>
      </GridWrapper>
    </PageContainer>
  );
};

export default Employees;