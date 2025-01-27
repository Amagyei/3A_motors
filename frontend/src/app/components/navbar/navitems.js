import React, { useState } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { useMediaQuery } from 'react-responsive';
import { SCREENS } from '../responsive/index';
import { slide as Menu } from 'react-burger-menu';
import menuStyle from './menuStyle';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: SCREENS.sm });

  // Check if user is logged in (accessToken in localStorage)
  const isLoggedIn = Boolean(localStorage.getItem('accessToken'));

  const handleStateChange = (state) => {
    setMenuOpen(state.isOpen);
  };

  // Close burger menu when an item is clicked (mobile only)
  const closeMenu = () => {
    setMenuOpen(false);
  };

  // Logout handler
  const handleLogout = () => {
    // Remove tokens and user info
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    closeMenu();    // Close menu if on mobile
    navigate('/home'); // Redirect to home
  };

  // Items visible to everyone
  const commonNavItems = (
    <>
      <NavItem onClick={closeMenu} menu={isMobile}>
        <a href="/home">Home</a>
      </NavItem>
      <NavItem onClick={closeMenu} menu={isMobile}>
        <a href="#">Services</a>
      </NavItem>
      <NavItem onClick={closeMenu} menu={isMobile}>
        <a href="#">Products</a>
      </NavItem>
      <NavItem onClick={closeMenu} menu={isMobile}>
        <a href="#">Contact Us</a>
      </NavItem>
    </>
  );

  // Auth-only items (Dashboard + Logout) vs Guest-only items (Login + Register)
  const authNavItems = isLoggedIn ? (
    <>
      <NavItem onClick={closeMenu} menu={isMobile}>
        <a href="/dashboard">Dashboard</a>
      </NavItem>
      <NavItem onClick={handleLogout} menu={isMobile}>
        Logout
      </NavItem>
    </>
  ) : (
    <>
      <NavItem onClick={closeMenu} menu={isMobile}>
        <a href="/login">Login</a>
      </NavItem>
      <NavItem onClick={closeMenu} menu={isMobile}>
        <a href="/register">Register</a>
      </NavItem>
    </>
  );

  // For mobile: display burger menu
  if (isMobile) {
    return (
      <Menu
        right
        styles={menuStyle}
        isOpen={menuOpen}
        onStateChange={handleStateChange}
      >
        <ListContainer>
          {commonNavItems}
          {authNavItems}
        </ListContainer>
      </Menu>
    );
  }

  // For desktop: display horizontal nav items
  return (
    <ListContainer>
      {commonNavItems}
      {authNavItems}
    </ListContainer>
  );
}