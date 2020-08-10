import React from 'react';
import { Stack } from '@chakra-ui/core';

import Header from 'components/Header';

export default function Layout({ children }) {
  return (
    <Stack flex="1">
      <Header />

      {children}
    </Stack>
  );
}
