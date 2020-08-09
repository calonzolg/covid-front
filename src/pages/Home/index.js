import React from "react";
import useSWR from "swr";
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
} from "@chakra-ui/core";

const url = `${process.env.REACT_APP_COVID_BACKEND_URL}/api/countries`;
const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Home() {
  const { data: result, error } = useSWR(url, fetcher);

  if (error) {
    return <h1>Something went wrong!</h1>;
  }

  if (!result) {
    return <Spinner />;
  }

  return (
    <Grid flex="1">
      <Accordion>
        {result.map((continent) => (
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
                    <Text>{country.country}</Text>
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
  );
}

function formatNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}
