import React from 'react';
import tw from 'twin.macro';
import styled from 'styled-components';
import { 
  GridComponent, 
  ColumnsDirective, 
  ColumnDirective, 
  Page, 
  Selection, 
  Inject, 
  Edit, 
  Toolbar, 
  Sort, 
  Filter 
} from '@syncfusion/ej2-react-grids';
import { customersData, customersGrid } from '../../../../assets/images/dummy';
import { Header } from '../../../components/DashboardComponents';

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

  /* Fix for overly large images in grid rows */
  .e-grid .e-row img {
    ${tw`
      w-16 h-16 
      rounded-full
      object-cover
    `}
  }
`;

const Customers = () => {
  const selectionSettings = { persistSelection: true };
  const toolbarOptions = ['Delete'];
  const editing = { allowDeleting: true, allowEditing: true };

  return (
    <PageContainer>
      <Header category="Page" title="Customers" />
      <GridWrapper>
        <GridComponent
          dataSource={customersData}
          enableHover={false}
          allowPaging
          pageSettings={{ pageCount: 5 }}
          selectionSettings={selectionSettings}
          toolbar={toolbarOptions}
          editSettings={editing}
          allowSorting
        >
          <ColumnsDirective>
            {customersGrid.map((item, index) => (
              <ColumnDirective key={index} {...item} />
            ))}
          </ColumnsDirective>
          <Inject services={[Page, Selection, Toolbar, Edit, Sort, Filter]} />
        </GridComponent>
      </GridWrapper>
    </PageContainer>
  );
};

export default Customers;