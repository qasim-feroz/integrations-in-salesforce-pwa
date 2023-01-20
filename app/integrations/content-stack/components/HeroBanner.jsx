/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import React from 'react'
import PropTypes from 'prop-types'
import {Box, Flex, Heading, Stack, Image} from '@chakra-ui/react'

const HeroBanner = ({ data, ...props}) => {
    console.log(data);

    return (
        <Box
            marginBottom={{base: 0, md: 10}}
            height={{lg: 'xl'}}
            position={{lg: 'relative'}}
            {...props}
        >
            <Stack
                align={'center'}
                spacing={{base: 8, md: 10}}
                paddingTop={{base: 12, md: 10}}
                paddingBottom={{base: 6, md: 10}}
                direction={{base: 'column', lg: 'row'}}
            >
                <Stack flex={1} spacing={{base: 5, md: 8}}>
                    <Heading
                        as="h1"
                        fontSize={{base: '4xl', md: '5xl', lg: '6xl'}}
                        maxWidth={{base: '75%', md: '50%', lg: 'md'}}
                    >
                        {data.banner_title}
                    </Heading>

                </Stack>
                <Flex
                    flex={1}
                    justify={'center'}
                    align={'center'}
                    position={'relative'}
                    width={'full'}
                    paddingTop={{base: 4, lg: 0}}
                >
                    <Box position={'relative'} width={{base: 'full', md: '80%', lg: 'full'}}>
                        <Image
                            fit={'cover'}
                            align={'center'}
                            width={'100%'}
                            height={'100%'}
                            src={data.banner_image.url}
                            alt={data.banner_image.filename}
                        />
                    </Box>
                </Flex>
            </Stack>
        </Box>
    )
}

export default HeroBanner
