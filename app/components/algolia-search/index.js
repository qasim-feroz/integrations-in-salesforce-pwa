import React, {useState} from 'react'
import algoliasearch from 'algoliasearch'
import {Box, HStack, Input, Button, Grid, VStack} from '@chakra-ui/react'

// Adding comment here
const AlgoliaSearch = () => {
    const client = algoliasearch('latency', '56f24e4276091e774e8157fe4b8b11f6')
    const index = client.initIndex('movies')
    const [query, setQuery] = useState('')
    const [results, setResults] = useState([])

    const handleSearch = async () => {
        const {hits} = await index.search(query)
        setResults(hits)
    }

    const handleInputChange = async (e) => {
        const value = e.target.value
        setQuery(value)

        if (value.trim() !== '') {
            const {hits} = await index.search(value)
            setResults(hits)
        } else {
            setResults([])
        }
    }

    return (
        <div>
            <Box maxW="400px" mt="30px" mx="auto">
                <HStack>
                    <Input type="text" value={query} onChange={handleInputChange} />
                    <Button onClick={handleSearch}>Search</Button>
                </HStack>

                <Box
                    maxW="300px"
                    mt="20px"
                    mx="auto"
                    position="fixed"
                    top="80px"
                    right="-0.4%"
                    transform="translateX(-50%)"
                    bg="white"
                    boxShadow="lg"
                    p={4}
                    overflowY="scroll"
                    height="400px"
                    width="80%"
                    display={results.length > 0 ? 'block' : 'none'}
                >
                    {results.map((result) => (
                        <Box
                            key={result.objectID}
                            borderWidth="1px"
                            borderRadius="lg"
                            p={4}
                            boxShadow="md"
                            my={2}
                        >
                            <h3>{result.title}</h3>
                            {/* Add other fields from the result object */}
                        </Box>
                    ))}
                </Box>
            </Box>
        </div>
    )
}
export default AlgoliaSearch
