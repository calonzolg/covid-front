import React, { useEffect, useState } from "react";
import { For } from "react-loops";
import { useParams } from "react-router-dom";
import { Spinner, Stack, Box, Heading, Text } from "@chakra-ui/core";
import { formatNumber } from "../../utils";
import NotFound from "../NotFound";

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
    <Stack minW="500px" justifyContent="center" textAlign="center" shadow="md">
      <Heading>{countryArray.country}</Heading>

      <Box my={2}>
        <Text>{countryArray.continent}</Text>
        <Text>{formatNumber(countryArray.population)}</Text>
        <Text>{countryArray.day}</Text>
      </Box>

      <Box>
        <Text>Cases</Text>
        <Box>
          <For
            in={countryArray.cases}
            as={(countryCase, { key }) => (
              <>
                <Text textTransform="capitalize">{key}</Text>
                <Box>{formatNumber(countryCase) ?? "N/A"}</Box>
              </>
            )}
          />
        </Box>
      </Box>

      <Box>
        <Text>Deaths</Text>
        <Box>
          <For
            in={countryArray.deaths}
            as={(countryCase, { key }) => (
              <>
                <Text textTransform="capitalize">{key}</Text>
                <Box>{formatNumber(countryCase) ?? "N/A"}</Box>
              </>
            )}
          />
        </Box>

        <Box>
          <Text>Tests</Text>
          <Box>
            <For
              in={countryArray.tests}
              as={(countryCase, { key }) => (
                <>
                  <Text textTransform="capitalize">{key}</Text>
                  <Box>{formatNumber(countryCase) ?? "N/A"}</Box>
                </>
              )}
            />
          </Box>
        </Box>
      </Box>
    </Stack>
  );
}
