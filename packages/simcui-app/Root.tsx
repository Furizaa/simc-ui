import React from 'react';
import { hot } from 'react-hot-loader/root';
import { ChakraProvider, DarkMode, extendTheme } from '@chakra-ui/core';
import Router from './Router';
import theme from './theme';
import { RouterContextProvider } from './modules/shared/context/RouterContext';
import AppShell from './modules/shared/components/AppShell';

const extendedTheme = extendTheme(theme);

const Root = () => (
  <ChakraProvider resetCSS theme={extendedTheme}>
    <DarkMode>
      <AppShell>
        <RouterContextProvider>
          <Router />
        </RouterContextProvider>
      </AppShell>
    </DarkMode>
  </ChakraProvider>
);

export default hot(Root);
