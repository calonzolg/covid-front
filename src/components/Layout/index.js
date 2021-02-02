import React from 'react'
import {Stack} from '@chakra-ui/react'

import Header from 'components/Header'

export default function Layout({children}) {
  return (
    <Stack flex="1">
      <Header />

      {children}
    </Stack>
  )
}
