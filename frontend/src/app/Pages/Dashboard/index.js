import React from 'react';
import styled from "styled-components";
import tw from "twin.macro";
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { registerLicense } from '@syncfusion/ej2-base';
import { Routes, Route } from 'react-router-dom';
import { useStateContext } from '../../contexts/ContextProvider';
import DashNavbar from '../../components/DashboardComponents/DashNavbar';
import SideBar from "./SideBar";
import {
  Ecommerce,
  Orders,
  Calendar,
  Employees,
  Stacked,
  Pyramid,
  Customers,
  Kanban,
  Line,
  Area,
  Bar,
  Pie,
  Financial,
  ColorPicker,
  ColorMapping,
  Editor,
} from './DashBoardPages';
import { blue } from '@mui/material/colors';

// Register Syncfusion license
registerLicense('Ngo9BigBOggjHTQxAR8/V1NMaF5cXmtCf1FpRmJGdld5fUVHYVZUTXxaS00DNHVRdkdmWX5fc3VdQmRYWURwXkY=');

// Styled Components
const DashboardContainer = styled.div`
  ${tw`
    flex relative dark:bg-main-dark-bg
  `}
`;

const SettingsButtonWrapper = styled.div`
  ${tw`
    fixed right-4 bottom-4 z-[1000]
  `}
`;

const SettingsButton = styled.button`
  background: blue;
  border-radius: 50%;
  ${tw`
    text-white text-3xl p-3 hover:drop-shadow-xl hover:bg-light-gray
  `}
`;

const MainContent = styled.div`
  ${tw`
    dark:bg-main-bg bg-main-bg min-h-screen w-full
  `}
  ${({ activeMenu }) => activeMenu && tw`md:ml-72 flex-1`}
`;

const SidebarContainer = styled.div`
  ${tw`
    w-72 fixed dark:bg-secondary-dark-bg bg-white
  `}
`;

const SidebarHiddenContainer = styled.div`
  ${tw`
    w-0 dark:bg-secondary-dark-bg
  `}
`;

const NavbarContainer = styled.div`
  ${tw`
    relative md:static bg-main-bg dark:bg-main-dark-bg w-full
  `}
`;

const DashboardRoutes = (
  <>
    <Route path="/" element={<Ecommerce />} />
    <Route path="/ecommerce" element={<Ecommerce />} />
    <Route path="/orders" element={<Orders />} />
    <Route path="/employees" element={<Employees />} />
    <Route path="/customers" element={<Customers />} />
    <Route path="/kanban" element={<Kanban />} />
    <Route path="/editor" element={<Editor />} />
    <Route path="/calendar" element={<Calendar />} />
    <Route path="/color-picker" element={<ColorPicker />} />
    <Route path="/line" element={<Line />} />
    <Route path="/area" element={<Area />} />
    <Route path="/bar" element={<Bar />} />
    <Route path="/pie" element={<Pie />} />
    <Route path="/financial" element={<Financial />} />
    <Route path="/color-mapping" element={<ColorMapping />} />
    <Route path="/pyramid" element={<Pyramid />} />
    <Route path="/stacked" element={<Stacked />} />
  </>
);

export default function Dashboard() {
  const { activeMenu } = useStateContext();

  return (
    <DashboardContainer>
      {/* Settings Button */}
      <SettingsButtonWrapper>
        <TooltipComponent content="Settings" position="Top">
          <SettingsButton>
            <FiSettings />
          </SettingsButton>
        </TooltipComponent>
      </SettingsButtonWrapper>

      {/* Sidebar */}
      {activeMenu ? (
        <SidebarContainer>
          <SideBar />
        </SidebarContainer>
      ) : (
        <SidebarHiddenContainer>
          <SideBar />
        </SidebarHiddenContainer>
      )}

      {/* Main Content */}
      <MainContent activeMenu={activeMenu}>
        <NavbarContainer>
          <DashNavbar />
        </NavbarContainer>
        <Routes>{DashboardRoutes}</Routes>
      </MainContent>
    </DashboardContainer>
  );
}