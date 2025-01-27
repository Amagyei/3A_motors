import React, { useEffect } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { FiShoppingCart } from 'react-icons/fi';
import { BsChatLeft } from 'react-icons/bs';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import styled from 'styled-components';
import tw from 'twin.macro';
import avatar from '../../../assets/images/avatar.jpg';
import { useStateContext } from '../../contexts/ContextProvider.js';
import NavButton from './NavButton';
import { MdKeyboardArrowDown } from 'react-icons/md';
import Cart from './Cart';

// Styled Components
const NavContainer = styled.div`
  ${tw`
    flex justify-between p-2 md:mx-6 relative
  `}
`;

const NavContent = styled.div`
  ${tw`
    flex items-center
  `}
`;

const NavProfile = styled.div`
  ${tw`
    flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg
  `}
`;

const ProfileImage = styled.img`
  ${tw`
    rounded-full w-8 h-8
  `};
`;

const DashNavbar = () => {
  const { activeMenu, setActiveMenu, isClicked, setIsClicked, handleClick, screenSize, setScreenSize } = useStateContext();

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 900) {setActiveMenu(false)
    } else {setActiveMenu(true)};
  }, [screenSize]);

  return (
    <NavContainer>
      {/* Menu Button */}
      <NavButton
        title="Menu"
        customFunc={() => setActiveMenu((prevActiveMenu) => !prevActiveMenu)}
        color="blue"
        icon={<AiOutlineMenu />}
      />

      <NavContent>
        {/* Shopping Cart */}
        <NavButton
          title="Cart"
          customFunc={() => handleClick('cart')}
          color="blue"
          icon={<FiShoppingCart />}
        />

        {/* Chat */}
        <NavButton
          title="Chat"
          dotColor="#03C9D7"
          customFunc={() => handleClick('chat')}
          color="blue"
          icon={<BsChatLeft />}
        />

        {/* Notifications */}
        <NavButton
          title="Notifications"
          dotColor="#03C9D7"
          customFunc={() => handleClick('notification')}
          color="blue"
          icon={<BsChatLeft />}
        />

        {/* Profile */}
        <TooltipComponent content="Profile" position="BottomCenter">
          <NavProfile onClick={() => handleClick('userProfile')}>
            <ProfileImage
              src={avatar}
              alt="User Profile"
            />
            <p>
              <span className="text-gray-400 text-14">
              Hi, 
              </span>{' '}
              <span className="text-gray-400 text-14">
              Michael 
              </span>
            </p>
            <MdKeyboardArrowDown className='text-gray-400 text-14' />
            
          </NavProfile>
        </TooltipComponent>
        {isClicked.cart && <Cart />}
        {isClicked.chat && <Chat />}
        {isClicked.notification && <Notification />}
        {isClicked.userProfile && <UserProfile />}

      </NavContent>
    </NavContainer>
  );
};

export default DashNavbar;