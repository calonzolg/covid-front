import React from 'react'
import {Flex, Text} from '@chakra-ui/react'
import {Link} from 'react-router-dom'
import Layout from 'components/Layout'

export default function NotFound() {
  return (
    <Layout>
      <Flex
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        minH="calc(100vh - 48px)"
      >
        <Text fontWeight="bold" fontSize="5xl">
          404
        </Text>
        <Text fontWeight="bold">Not Found url</Text>
        <Link to="/">got to home</Link>
      </Flex>
    </Layout>
  )
}
