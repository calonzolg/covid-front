import React, { useEffect, useState } from 'react';
import { For } from 'react-loops';
import { useParams } from 'react-router-dom';
import {
  Spinner,
  Box,
  Heading,
  Text,
  Stack,
  Grid,
  Badge,
  Divider,
} from '@chakra-ui/core';

import Layout from 'components/Layout';
import NotFound from 'pages/NotFound';
import formatNumber from 'utils/formatNumber';

const url = `${process.env.REACT_APP_COVID_BACKEND_URL}/api/countries`;

const fetchCountry = async (setState, slug) => {
  try {
    const response = await fetch(`${url}/${slug}`);

    const responseJSON = await response.json();

    setState(responseJSON);
  } catch (error) {
    console.log(error);
  }
};

function StatisticsStack({ keyValue, value }) {
  function handleVariantColor(val) {
    switch (val) {
      case 'recovered':
        return 'green';

      case 'critical':
        return 'red';

      case 'new':
        return 'blue';

      default:
        return 'gray';
    }
  }

  return (
    <Stack isInline alignItems="center">
      <Text textTransform="capitalize" fontWeight="Bold">
        {keyValue}:
      </Text>
      <Badge fontSize="xl" variantColor={handleVariantColor(keyValue)}>
        {formatNumber(value) ?? 'N/A'}
      </Badge>
    </Stack>
  );
}

export default function Details() {
  const { slug } = useParams();
  const [country, setCountry] = useState(undefined);

  useEffect(() => {
    fetchCountry(setCountry, slug);
  }, [slug]);

  if (!country) {
    return <Spinner />;
  }

  if (country.length <= 0) {
    return <NotFound />;
  }

  const countryArray = country[0];

  return (
    <Layout>
      <Box p={2}>
        <Heading>{countryArray.country}</Heading>

        <Box my={2}>
          <Stack isInline alignItems="center">
            <Text fontWeight="bold" fontSize="lg">
              Continent:
            </Text>
            <Text>{countryArray.continent}</Text>
          </Stack>

          <Stack isInline alignItems="center">
            <Text fontWeight="bold" fontSize="lg">
              Population:
            </Text>
            <Text>{formatNumber(countryArray.population)}</Text>
          </Stack>

          <Stack isInline alignItems="center">
            <Text fontWeight="bold" fontSize="lg">
              Last Update:
            </Text>
            <Text>{countryArray.day}</Text>
          </Stack>
        </Box>
        <Divider />
        <Box my={4}>
          <Heading fontWeight="regular">Cases</Heading>
          <Grid
            gridTemplateColumns={[
              'repeat(auto-fit, minmax(250px, 1fr))',
              'repeat(2, 1fr)',
            ]}
            gridGap={3}
          >
            <For
              in={countryArray.cases}
              as={(countryCase, { key }) => (
                <StatisticsStack keyValue={key} value={countryCase} />
              )}
            />
          </Grid>
        </Box>
        <Divider />
        <Box my={4}>
          <Heading fontWeight="regular">Deaths</Heading>
          <Grid
            gridTemplateColumns={[
              'repeat(auto-fit, minmax(250px, 1fr))',
              'repeat(2, 1fr)',
            ]}
            gridGap={3}
          >
            <For
              in={countryArray.deaths}
              as={(countryDeath, { key }) => (
                <StatisticsStack keyValue={key} value={countryDeath} />
              )}
            />
          </Grid>
        </Box>
        <Divider />
        <Box my={4}>
          <Heading fontWeight="regular">Tests</Heading>
          <Grid
            gridTemplateColumns={[
              'repeat(auto-fit, minmax(200px, 1fr))',
              'repeat(2, 1fr)',
            ]}
            gridGap={3}
          >
            <For
              in={countryArray.tests}
              as={(countryTest, { key }) => (
                <StatisticsStack keyValue={key} value={countryTest} />
              )}
            />
          </Grid>
        </Box>
      </Box>
    </Layout>
  );
}
