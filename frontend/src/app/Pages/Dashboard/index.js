import React from 'react';

import { useState,  } from 'react';
import styled from "styled-components";
import tw from "twin.macro";
import { IoIosSettings } from "react-icons/io";
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { registerLicense } from '@syncfusion/ej2-base';
import { Routes } from 'react-router-dom';
import { useStateContext } from '../../contexts/ContextProvider'
import DashNavbar from '../../components/DashboardComponents/navbar'; // Capitalized the import
import Navbar from '../../components/navbar';
import ThemeSettings from '../../components/DashboardComponents';
// import { Kanban, Editor, Calendar, ColorPicker } from '../../components/DashboardComponents';

import SideBar from "./SideBar";
import { Route } from 'react-router';


import { Ecommerce, Orders, Calendar, Employees, Stacked, Pyramid, Customers, Kanban, Line, Area, Bar, Pie, Financial, ColorPicker, ColorMapping, Editor } from './DashBoardPages';
import { blue } from '@mui/material/colors';
registerLicense('Ngo9BigBOggjHTQxAR8/V1NMaF5cXmtCf1FpRmJGdld5fUVHYVZUTXxaS00DNHVRdkdmWX5fc3VdQmRYWURwXkY=');

const DashboardContainer = styled.div`
    ${tw`
        flex
        relative
        dark:bg-main-dark-bg
    `};
`;

const SettingsButtonWrapper = styled.div`
    ${tw`
        fixed
        right-4
        bottom-4
        z-[1000]
    `};
`;

const  SettingsButton = styled.button`
    background: blue;
    border-radius: 50%;
    ${tw`
        text-white
        text-3xl
        p-3
        hover:drop-shadow-xl
        hover:bg-light-gray
    `};
`;
// Main content container
 const MainContent = styled.div`
    ${tw`
        dark:bg-main-bg bg-main-bg min-h-screen w-full
    `};
    ${({ activeMenu }) => activeMenu && tw`md:ml-72 flex-1`}
`;

const SidebarContainer = styled.div`
    sidebar
    ${tw`
        w-72 fixed dark:bg-secondary-dark-bg bg-white
    `};
`;

const SidebarHiddenContainer = styled.div`
    ${tw`
        w-0 dark:bg-secondary-dark-bg
    `};
`;

// Navbar container
 const NavbarContainer = styled.div`
    ${tw`
        fixed md:static bg-main-bg dark:bg-main-dark-bg w-full
    `};
`;
const DashboardRoutes = (
    <>
        {/* dashboard  */}
        <Route path="/" element={(<Ecommerce />)} />
        <Route path="/ecommerce" element={(<Ecommerce />)} />

        {/* pages  */}
        <Route path="/orders" element={<Orders />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/customers" element={<Customers />} />

        {/* apps  */}
        <Route path="/kanban" element={<Kanban />} />
        <Route path="/editor" element={<Editor />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/color-picker" element={<ColorPicker />} />

        {/* charts  */}
        <Route path="/line" element={<Line />} />
        <Route path="/area" element={<Area />} />
        <Route path="/bar" element={<Bar />} />
        <Route path="/pie" element={<Pie />} />
        <Route path="/financial" element={<Financial />} />
        <Route path="/color-mapping" element={<ColorMapping />} />
        <Route path="/pyramid" element={<Pyramid />} />
        <Route path="/stacked" element={<Stacked />} />



    </>
)

export default function Dashboard() {
    // const [activeMenu, setActiveMenu] = useState(true);
    const { activeMenu } = useStateContext();
    return (
        
        
        
        <DashboardContainer>

            <SettingsButtonWrapper>
                <TooltipComponent content="Settings" position="Top">
                    <button
                    type="button"
                    style={{ background: blue, borderRadius: '50%' }}
                    className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
                    >
                        <FiSettings />
                    </button>
                    <SettingsButton> <FiSettings /></SettingsButton>
                </TooltipComponent>
            </SettingsButtonWrapper>
            
            
            {activeMenu ? (
                <SidebarContainer>
                    <SideBar />
                </SidebarContainer>
            ) : (
                <SidebarHiddenContainer>
                    <SideBar />
                </SidebarHiddenContainer>
            )}


            <MainContent activeMenu={activeMenu}>
                <NavbarContainer>
                    <DashNavbar />
                </NavbarContainer>
                <div>
                    {ThemeSettings && <ThemeSettings />}
                    <Routes>{DashboardRoutes}</Routes>
                </div>
            </MainContent>
        
            
            {/* remember to includem the navbar and have it make space for the sidebar */}
            {/* remember to include routes for any extra dashboard pages you want to create  */}
            


            
            
            
        </DashboardContainer>
        // <div className='flex relative dark:bg-main-dark-bg'>
        //     <SettingsButtonWrapper>
        //         <TooltipComponent content="Settings" position="Top">
        //             <SettingsButton
        //             type="button"
                    
        //             style={{ background: blue, borderRadius: '50%' }}
        //             >
        //                 <FiSettings />
        //             </SettingsButton>
        //         </TooltipComponent>
        //     </SettingsButtonWrapper>
            
        //     {activeMenu ? (
        //         <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-grey ">
        //             SideBar
        //             <SideBar />
        //         </div>
        //         ) : (
        //         <div className="w-0 dark:bg-secondary-dark-bg">
        //             <SideBar />
        //         </div>
        //     )}
        // </div>
    );
}