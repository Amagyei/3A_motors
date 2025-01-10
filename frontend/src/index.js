import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import tw from 'twin.macro';
import styled from 'styled-components';

const AppContainer = styled.div`
    width: 100%;
    
    ${tw`
    mx-4
    flex 
    flex-col 
    w-full
    h-full
    `}
`;

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(
  <React.StrictMode>
    <AppContainer>
      <App />
    </AppContainer>
  </React.StrictMode>
);