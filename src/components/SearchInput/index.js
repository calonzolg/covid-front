import React, { useState, useEffect } from 'react';
import { Input, FormControl, FormLabel, Box, Text } from '@chakra-ui/core';
import { Link } from 'react-router-dom';

const searchUrl = `${process.env.REACT_APP_COVID_BACKEND_URL}/api/search`;

const searchCountry = async (searchParam, setSearchResult) => {
  try {
    const response = await fetch(searchUrl, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({ searchParam }),
    });

    const responseJSON = await response.json();

    setSearchResult(
      responseJSON.filter((continent) => {
        return continent.countries.length > 0;
      })
    );
  } catch (error) {
    console.log(error);
  }
};

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default function SearchInput() {
  const [searchText, setSearchText] = useState('');
  const [searchResult, setSearchResult] = useState(undefined);
  const debounceValue = useDebounce(searchText, 500);

  function handleChange({ target: { value } }) {
    setSearchText(value);
  }

  useEffect(() => {
    if (debounceValue) {
      searchCountry(debounceValue, setSearchResult);
    }
  }, [debounceValue]);

  return (
    <FormControl mb={3}>
      <FormLabel>Search</FormLabel>
      <Input
        placeholder="Search a country"
        value={searchText}
        onChange={handleChange}
      />
      {searchResult &&
        (searchResult.length > 0 ? (
          searchResult.map((continent) => (
            <Box>
              <Text>{continent.name}</Text>
              {continent.countries.map((country) => (
                <Box as={Link} to={`/country/${country.slug}`}>
                  {country.name}
                </Box>
              ))}
            </Box>
          ))
        ) : (
          <Box>There is not country found</Box>
        ))}
    </FormControl>
  );
}
