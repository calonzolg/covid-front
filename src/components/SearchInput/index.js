import React, {useState, useEffect, useRef} from 'react'
import {Link} from 'react-router-dom'
import {
  Box,
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
  useDisclosure,
} from '@chakra-ui/react'
import {For} from 'react-loops'

const searchUrl = `${process.env.REACT_APP_COVID_BACKEND_URL}/api/search`

const searchCountry = async (
  searchParam,
  setSearchResult,
  onOpen,
  setIsLoading
) => {
  try {
    const response = await fetch(searchUrl, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({searchParam}),
    })

    const responseJSON = await response.json()

    setSearchResult(
      responseJSON.filter((continent) => {
        return continent.countries.length > 0
      })
    )

    onOpen()
    setIsLoading(false)
  } catch (error) {
    console.log(error)
  }
}

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay)

    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])

  return debouncedValue
}

export default function SearchInput() {
  const [searchText, setSearchText] = useState('')
  const [searchResult, setSearchResult] = useState([])
  const debounceValue = useDebounce(searchText, 500)
  const [isLoading, setIsLoading] = useState(false)
  const ref = useRef()
  const {onClose, isOpen, onOpen} = useDisclosure()

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        onClose()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref, onClose])

  function handleChange({target: {value}}) {
    setSearchText(value)
  }

  useEffect(() => {
    if (debounceValue) {
      setIsLoading(true)
      searchCountry(debounceValue, setSearchResult, onOpen, setIsLoading)
    }
  }, [debounceValue, onOpen])

  return (
    <>
      <InputGroup position="relative">
        <Input
          placeholder="Search a country"
          value={searchText}
          onChange={handleChange}
        />
        <InputRightElement>{isLoading && <Spinner />}</InputRightElement>
      </InputGroup>

      {isOpen && (
        <Box
          ref={ref}
          position="absolute"
          top={['100px', '60px']}
          overflow="hidden"
          zIndex={1}
          width={['280px', '400px']}
          maxH={['280px', '400px']}
          bg="white"
          border="1px solid"
          borderColor="gray.100"
          borderRadius="md"
        >
          {searchResult.length > 0 ? (
            <Box overflowY="auto" maxH={['280px', '400px']}>
              <For
                of={searchResult}
                as={(continent) => (
                  <>
                    <Box as="ul" bg="gray.400" p={2}>
                      {continent.name}
                    </Box>
                    <For
                      of={continent.countries}
                      as={(country, {key}) => (
                        <Link key={key} to={`/country/${country.slug}`}>
                          <Box
                            as="li"
                            onClick={onClose}
                            p={2}
                            _hover={{
                              backgroundColor: 'blue.500',
                              color: 'white',
                            }}
                          >
                            {country.name}
                          </Box>
                        </Link>
                      )}
                    />
                  </>
                )}
              />
            </Box>
          ) : (
            <Box>Not country found!</Box>
          )}
        </Box>
      )}
    </>
  )
}
