import React from 'react'
import {Link} from 'react-router-dom'
import {Box, Flex} from '@chakra-ui/react'

import SearchInput from 'components/SearchInput'

export default function Header() {
  return (
    <Flex
      alignItems="center"
      borderBottom="1px solid"
      borderColor="gray.100"
      p={2}
      flexDirection={{xs: 'column', sm: 'row'}}
    >
      <Box as={Link} to="/" mb={{xs: 3, sm: 0}} mr={3}>
        COVID-19 Tracker
      </Box>

      <Box w={['280px', '400px']}>
        <SearchInput />
      </Box>
    </Flex>
  )
}
