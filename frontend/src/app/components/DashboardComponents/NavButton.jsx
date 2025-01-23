import React from 'react';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import styled from 'styled-components';
import tw from 'twin.macro';

// Styled Components
const StyledButton = styled.button`
  ${tw`
    relative text-xl rounded-full p-3 hover:bg-light-gray
  `};
  color: ${({ color }) => color || 'black'};
`;

const DotIndicator = styled.span`
  ${tw`
    absolute rounded-full inline-flex h-2 w-2 right-2 top-2
  `};
  background: ${({ dotColor }) => dotColor || 'transparent'};
`;

const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
  <TooltipComponent content={title} position="BottomCenter">
    <StyledButton type="button" onClick={customFunc} color={color}>
      {dotColor && <DotIndicator dotColor={dotColor} />}
      {icon}
    </StyledButton>
  </TooltipComponent>
);

export default NavButton;