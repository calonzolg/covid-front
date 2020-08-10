import React from 'react';
import { ThemeProvider, CSSReset, Flex } from '@chakra-ui/core';

import Routes from './routes';

export default function App() {
  return (
    <ThemeProvider>
      <CSSReset />
      <Flex justifyContent="center">
        <Routes />
      </Flex>
    </ThemeProvider>
  );
}
