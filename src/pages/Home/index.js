import React, { useState, useEffect } from 'react';
import { For } from 'react-loops';
import {
  Accordion,
  AccordionHeader,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Badge,
  Box,
  Divider,
  Grid,
  Spinner,
  Stack,
  Text,
  Flex,
} from '@chakra-ui/core';

import formatNumber from 'utils/formatNumber';
import Layout from 'components/Layout';

const url = `${process.env.REACT_APP_COVID_BACKEND_URL}/api/countries`;

const fetchCountries = async (setContinents) => {
  try {
    const response = await fetch(url);

    const responseJSON = await response.json();

    setContinents(responseJSON);
  } catch (error) {
    console.log(error);
  }
};

function StackInline({ children }) {
  return (
    <Stack isInline alignItems="center" justifyContent="space-between">
      {children}
    </Stack>
  );
}

export default function Home() {
  const [continents, setContinents] = useState([]);

  useEffect(() => {
    fetchCountries(setContinents);
  }, []);

  return (
    <Layout>
      {!(continents.length > 0) ? (
        <Flex p={2} alignItems="center" justifyContent="center">
          <Spinner />
        </Flex>
      ) : (
        <Accordion defaultIndex={[0]} allowMultiple>
          <For
            of={continents}
            as={(continent) => (
              <AccordionItem>
                <AccordionHeader bg="gray.100">
                  <Box flex="1" textAlign="left">
                    {continent.name}
                  </Box>
                  <AccordionIcon />
                </AccordionHeader>
                <AccordionPanel pb={4}>
                  <Grid
                    gridTemplateColumns="repeat(auto-fit, minmax(280px, 1fr))"
                    gridGap={5}
                  >
                    <For
                      of={continent.countries}
                      as={(country) => (
                        <Box
                          shadow="md"
                          borderWidth="1px"
                          borderColor="gray.100"
                          borderRadius="md"
                          p={3}
                        >
                          <Stack>
                            <StackInline>
                              <Badge>Country</Badge>
                              <Text>{country.name}</Text>
                            </StackInline>
                            <Divider />
                            <StackInline>
                              <Badge variantColor="blue">Population</Badge>
                              <Text>
                                {formatNumber(country.population) ?? 'N/A'}
                              </Text>
                            </StackInline>
                            <Divider />
                            <StackInline>
                              <Badge variantColor="red">Total Cases</Badge>
                              <Text>{formatNumber(country.cases.total)}</Text>
                            </StackInline>
                            <Divider />
                            <Stack
                              isInline
                              alignItems="center"
                              justifyContent="flex-end"
                            >
                              <Badge variantColor="green">Last Update</Badge>
                              <Text>{country.last_update}</Text>
                            </Stack>
                          </Stack>
                        </Box>
                      )}
                    />
                  </Grid>
                </AccordionPanel>
              </AccordionItem>
            )}
          />
        </Accordion>
      )}
    </Layout>
  );
}
