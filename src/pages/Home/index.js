import React, { useState, useEffect } from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionPanel,
  AccordionIcon,
  Box,
  Grid,
  Text,
  Spinner,
  Stack,
} from '@chakra-ui/core';

import SearchInput from 'components/SearchInput';
import formatNumber from 'utils/formatNumber';

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

export default function Home() {
  const [continents, setContinents] = useState([]);

  useEffect(() => {
    fetchCountries(setContinents);
  }, []);

  if (!(continents.length > 0)) {
    return <Spinner />;
  }

  return (
    <Stack flex="1">
      <SearchInput />
      <Grid>
        <Accordion>
          {continents.map((continent) => (
            <AccordionItem>
              <AccordionHeader>
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
                  {continent.countries.map((country) => (
                    <Box shadow="md">
                      <Text>{country.name}</Text>
                      <Text>{formatNumber(country.cases.total)}</Text>
                      <Text>{country.last_update}</Text>
                    </Box>
                  ))}
                </Grid>
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </Grid>
    </Stack>
  );
}
