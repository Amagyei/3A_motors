import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import tw from 'twin.macro';
import { useMediaQuery } from 'react-responsive';
import { SCREENS } from '../responsive/index';
import { slide as Menu } from 'react-burger-menu';
import menuStyle from './menuStyle';

const ListContainer = styled.ul`
    ${tw`
        flex
        flex-row
        items-center
        list-none
    `}
`;

const NavItem = styled.li`
    ${tw`
        text-sm
        md:text-base
        text-black 
        font-medium
        mr-1
        md:mr-5
        cursor-pointer
        transition
        duration-300
        hover:text-gray-700
        ease-in-out
    `}
    ${({ menu }) => menu && tw`
        text-white
        text-xl
        mb-3
        focus:text-white
    `}
`;

export default function NavItems() {
    const [menuOpen, setMenuOpen] = useState(false); 
    const isMobile = useMediaQuery({ maxWidth: SCREENS.sm });

    const handleStateChange = (state) => {
        setMenuOpen(state.isOpen);
    };

    const closeMenu = () => {
        setMenuOpen(false);
    };

    if (isMobile) {
        return (
            <Menu 
                right styles={menuStyle} 
                isOpen={menuOpen} 
                onStateChange={handleStateChange}
            >
                <ListContainer>
                    <NavItem onClick={closeMenu} menu >
                        <a href="#">Home</a>
                    </NavItem>
                    <NavItem onClick={closeMenu} menu >
                        <a href="#">Services</a>
                    </NavItem>
                    <NavItem onClick={closeMenu} menu>
                        <a href="#">Products</a>
                    </NavItem>
                    <NavItem onClick={closeMenu} menu>
                        <a href="#">Contact Us</a>
                    </NavItem>
                </ListContainer>
            </Menu>
        );
    }

    return (
        <ListContainer>
            <NavItem>
                <a href="#">Home</a>
            </NavItem>
            <NavItem>
                <a href="#">Services</a>
            </NavItem>
            <NavItem>
                <a href="#">Products</a>
            </NavItem>
            <NavItem>
                <a href="#">Contact Us</a>
            </NavItem>
        </ListContainer>
    );
}