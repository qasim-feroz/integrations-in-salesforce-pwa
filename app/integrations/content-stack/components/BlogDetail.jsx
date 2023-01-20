/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import React from 'react'
import {
    Box, Heading, Stack, Text
} from '@chakra-ui/react'
import parse from 'html-react-parser';
import { useCommerceAPI } from '../../../commerce-api/contexts';
import { useState } from "react";


const BlogDetail = ({ data, ...props }) => {
    const api = useCommerceAPI();
    const [content, setContent] = useState(null);
    const getContent = async (quantity) => {
        try {
            const contentResult = await api.shopperContents.getContent({
                parameters: { contentId: 'about-us1' }
            })
            setContent(contentResult)
        } catch (error) {
            console.log(error)
        }

    }
    const creatContent = async () => {
        try {
            const response = await api.shopperContents.createContent({
                body: {
                    "name":
                    {
                        "default": "About Us"
                    },
                    "page_title":
                    {
                        "default": "Page Title"
                    },
                    "page_description":
                    {
                        "default": "Page Description"
                    },
                    "online":
                    {
                        "default": true
                    },
                    "c_body":
                    {
                        "default":
                        {
                            "source": "<p>This is the about us body.</p>"
                        }
                    }
                },
                libraryId: 'RefArch',
                contentId: 'test-inam'
            })
            console.log(response)
        } catch (error) {
            console.log(error)
        }

    }
    if (data) {
        getContent();
        //creatContent()
    }

    return (<Box data-testid="blog-page" layerStyle="page">
        <Stack
            align={'center'}
            spacing={{ base: 8, md: 10 }}
            paddingTop={{ base: 12, md: 10 }}
            paddingBottom={{ base: 6, md: 10 }}
            direction={{ base: 'column', lg: 'row' }}
        >
            <Heading
                as="h1"
                fontSize={{ base: '4xl', md: '5xl', lg: '6xl' }}
            >
                {data.title}
            </Heading>
        </Stack>
        {data.body &&
            (
                <Text color={'gray.700'} fontWeight={600}>
                    {parse(data.body)}
                </Text>
            )
        }
        {content &&
            (
                <Text color={'gray.700'} fontWeight={600}>
                    {parse(content.c_body)}
                </Text>
            )
        }

    </Box>

    )
}

export default BlogDetail