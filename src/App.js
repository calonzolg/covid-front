import React from 'react'
import {ChakraProvider, Flex} from '@chakra-ui/react'

import Routes from './routes'

export default function App() {
  return (
    <ChakraProvider>
      <Flex justifyContent="center">
        <Routes />
      </Flex>
    </ChakraProvider>
  )
}
