import React, { useState } from 'react';
import {
  ScheduleComponent,
  ViewsDirective,
  ViewDirective,
  Day,
  Week,
  WorkWeek,
  Month,
  Agenda,
  Inject,
  Resize,
  DragAndDrop,
} from '@syncfusion/ej2-react-schedule';
import { DatePickerComponent } from '@syncfusion/ej2-react-calendars';

import { scheduleData } from '../../../../assets/images/dummy';
import { Header } from '../../../components/DashboardComponents';
import styled from 'styled-components';
import tw from 'twin.macro';

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

const PropertyPaneContainer = styled.div`
  ${tw`
    mt-5
  `}
`;

const StyledTable = styled.table`
  ${tw`
    w-full 
    bg-white
  `}
`;

const StyledTd = styled.td`
  ${tw`
    w-full
  `}
`;

const Scheduler = () => {
  const [scheduleObj, setScheduleObj] = useState();

  const change = (args) => {
    scheduleObj.selectedDate = args.value;
    scheduleObj.dataBind();
  };

  const onDragStart = (arg) => {
    arg.navigation.enable = true;
  };

  return (
    <PageContainer>
      <Header category="App" title="Calendar" />
      <ScheduleComponent
        height="650px"
        ref={(schedule) => setScheduleObj(schedule)}
        selectedDate={new Date(2021, 0, 10)}
        eventSettings={{ dataSource: scheduleData }}
        dragStart={onDragStart}
      >
        <ViewsDirective>
          {['Day', 'Week', 'WorkWeek', 'Month', 'Agenda'].map((item) => (
            <ViewDirective key={item} option={item} />
          ))}
        </ViewsDirective>
        <Inject services={[Day, Week, WorkWeek, Month, Agenda, Resize, DragAndDrop]} />
      </ScheduleComponent>
      <PropertyPaneContainer>
        <StyledTable>
          <tbody>
            <tr style={{ height: '50px' }}>
              <StyledTd>
                <DatePickerComponent
                  value={new Date(2021, 0, 10)}
                  showClearButton={false}
                  placeholder="Current Date"
                  floatLabelType="Always"
                  change={change}
                />
              </StyledTd>
            </tr>
          </tbody>
        </StyledTable>
      </PropertyPaneContainer>
    </PageContainer>
  );
};

export default Scheduler;