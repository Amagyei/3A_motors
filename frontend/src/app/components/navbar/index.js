import React from "react";
import styled from "styled-components";
import tw from "twin.macro"; 
import { Logo } from "../logo";
import NavItems  from "./navitems";
import { Slide as Menu } from "react-burger-menu";


const NavbarContainer = styled.div`
  min-height: 60px;
  position: fixed; 
  top: 0; 
  left: 0;
  ${tw`
    w-full
    min-w-full
    max-w-screen-2xl
    mx-auto
    flex
    flex-row
    items-center
    lg:bg-red-50
    lg:pl-12
    lg:pr-12
    justify-between
  `};
`;

const LogoContainer = styled.div`
    ${tw`
        flex
        items-center
    `};
`;

export default function Navbar() {
    return (
        <NavbarContainer>
            <LogoContainer>
                <Logo/>
            </LogoContainer>
            <NavItems/> 
            
        </NavbarContainer>
    );
} 