/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import React from 'react'
import {
    Box, Stack, Image, SimpleGrid, Link,
    HStack,
    Text,
    AspectRatio
} from '@chakra-ui/react'
import parse from 'html-react-parser';


const BlogList = ({ data, ...props }) => {
    return (
        <Stack spacing={4} layerStyle="card" boxShadow="none">
            <SimpleGrid
                columns={2}
            >
                <Box display="flex" alignItems="center" justifyContent="space-between">
                    <BlogImage image={data.featured_image} width={['40%']} mr={4} />
                    <Box width={'60%'}>
                        <Link href={data.url}>
                            <HStack>
                                <Text fontWeight="700">
                                    {data.title}
                                </Text>
                            </HStack>
                        </Link>
                        <HStack>
                            <Text noOfLines={10}>
                                {parse(data.body)}
                            </Text>
                        </HStack>
                    </Box>
                </Box>
            </SimpleGrid>
        </Stack>

    )
}

export default BlogList



const BlogImage = ({ image, imageProps, ratio = 1, ...props }) => {
    return (
        <Box width="84px" backgroundColor="gray.100" {...props}>
            <AspectRatio ratio={ratio}>
                <Box position="relative">
                    {image && (
                        <Image
                            alt={image.title}
                            src={`${image.url}`}
                            ignoreFallback={true}
                            {...imageProps}
                        />
                    )}
                </Box>
            </AspectRatio>
        </Box>
    )
}