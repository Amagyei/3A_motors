import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import tw from 'twin.macro';
import styled from 'styled-components';
import '../static/css/index.css';
import '../static/css/dashboard.css';
import { registerLicense } from '@syncfusion/ej2-base';
import { ContextProvider } from './app/contexts/ContextProvider';

const AppContainer = styled.div`
  ${tw`
    mx-4
    flex 
    flex-col 
    w-full
    h-full
    `};
`;

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(
  <ContextProvider>
    <React.StrictMode>
    <AppContainer>
      <App />
    </AppContainer>
  </React.StrictMode>

  </ContextProvider>
  
); 