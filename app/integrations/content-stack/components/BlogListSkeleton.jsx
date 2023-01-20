import React, { useEffect } from 'react'

// Chakra Components
import {
    AspectRatio,
    Box,
    Img,
    Flex,
    ListItem,
    List,
    useMultiStyleConfig,
    Stack,
    Grid,
    GridItem,
    Container,
    Skeleton,
    Text,
    Heading,

} from '@chakra-ui/react'
import PropTypes from 'prop-types'

/**
 * The skeleton representation of the image gallery component. Use this component while
 * you are waiting for product data to be returnd from the server.
 */
const BlogListSkeleton = ({ size }) => {
    if (!size) {
        size = 3;
    }
    const sampleArray = new Array(size).fill();
    return (
        <div>
            {
                sampleArray.map((_, index) => {
                    return (
                        <Stack key={index} spacing={4} layerStyle="card" boxShadow="none">
                            <Flex width="full" bg="white" marginBottom={[4, 3]}>
                                <Skeleton width={['88px', '291px']} height={['88px', '291px']} />
                                <Stack marginLeft={[4, 6]} spacing={2} flex={1}>

                                    <Skeleton
                                        width={{ base: '180px', sm: '180px', md: '280px', lg: '280px' }}
                                        height={5}
                                        mt={5}
                                    />
                                    <Skeleton
                                        width={{ base: '180px', sm: '180px', md: '280px', lg: '280px' }}
                                        height={['88px', '200px']}
                                    />
                                </Stack>
                            </Flex>
                        </Stack>
                    )
                })
            }
        </div>
    )
}

BlogListSkeleton.propTypes = {
    size: PropTypes.bool
}

export default BlogListSkeleton;


