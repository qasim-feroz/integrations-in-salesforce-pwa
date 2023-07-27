/*
 * Copyright (c) 2022, Salesforce, Inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

//custom-core-change
import React, { useEffect, useState } from 'react'
//custom-core-change

import PropTypes from 'prop-types'
import { useIntl, FormattedMessage } from 'react-intl'
import { useLocation } from 'react-router-dom'
import useNavigation from 'App/hooks/use-navigation'

// Components
import {
    Box,
    Button,
    SimpleGrid,
    HStack,
    VStack,
    Text,
    Flex,
    Stack,
    Container,
    Link,
    Heading,
    Image,
    Grid
} from '@chakra-ui/react'

// Project Components
import Hero from '../../components/hero'
import Seo from '../../components/seo'
import Section from '../../components/section'
import ProductScroller from '../../components/product-scroller'
import { BasketIcon } from 'App/components/icons'

// Others
import { getAssetUrl } from 'pwa-kit-react-sdk/ssr/universal/utils'
import { heroFeatures, features, brandImages } from './data'

//Hooks
import useEinstein from '../../commerce-api/hooks/useEinstein'

// Constants
import {
    MAX_CACHE_AGE,
    HOME_SHOP_PRODUCTS_CATEGORY_ID,
    HOME_SHOP_PRODUCTS_LIMIT
} from '../../constants'

// *****  Core: Tag Manager - START  *****
import { triggerPageViewTag } from 'Core/src/integrations/tag-manager'
// *****  Core: Tag Manager - END  *****

// *****  Core: Rating & Reviews - START  *****
import { getBatchBottomLineWidgets } from 'Core/src/integrations/reviews-and-ratings'
// *****  Core: Rating & Reviews - END  *****

/**
 * This is the home page for Retail React App.
 * The page is created for demonstration purposes.
 * The page renders SEO metadata and a few promotion
 * categories and products, data is from local file.
 */
const Home = ({ productSearchResult, isLoading }) => {
    const intl = useIntl()
    const einstein = useEinstein()
    const { pathname } = useLocation()
    const navigate = useNavigation()

    // *****  Core: Rating & Reviews - START  *****
    const [batchBottomLineData, setBatchBottomLineData] = useState([])
    // *****  Core: Rating & Reviews - END  *****

    /**************** Einstein ****************/
    useEffect(() => {
        einstein.sendViewPage(pathname)

        // *****  Core: Tag Manager - START  *****
        triggerPageViewTag(pathname)
        // *****  Core: Tag Manager - END  *****
    }, [])

    // *****  Core: Rating & Reviews - START  *****
    useEffect(async () => {
        productSearchResult
            ? setBatchBottomLineData(await getBatchBottomLineWidgets(productSearchResult))
            : ''
    }, [productSearchResult])
    // *****  Core: Rating & Reviews - END  *****

    return (
        <Box data-testid="home-page" layerStyle="page" P={0}>
            <Seo
                title="Home Page"
                description="Commerce Cloud Retail React App"
                keywords="Commerce Cloud, Retail React App, React Storefront"
            />
            <Box
                position="relative"
                width="100%" /* Set the width and height of the component as per your requirement */
                height="500px"
                bgImage={getAssetUrl('static/img/HeroSection.jpeg')}
                bgSize="cover"
                bgPosition="center"
                overflow="hidden"
            >
                {/* Create an overlay using Flex */}
                <Flex
                    direction={'column'}
                    position="absolute"
                    top="25%"
                    left={0}
                    width="100%"
                    height="50%"
                    justifyContent="center"
                    alignItems="center"
                    bg="rgba(0, 0, 0, 0.4)" /* Adjust the overlay color and opacity here */
                    color="white" /* Adjust the text color */
                    textAlign="center"
                    p="4"
                >
                    <BasketIcon boxSize="35px" />
                    <Text fontSize={{ base: "2xl", md: "4xl", lg: "5xl" }}>New Arrival Sale</Text>
                    <Text fontSize={{ base: "xl", md: "2xl" }}>Up to 50% off</Text>
                    <Button
                        variant="outline"
                        bg="white"
                        as="a"
                        target="_blank"
                        onClick={() => {navigate('/category/newarrivals')}}
                        borderWidth="2px"
                        borderColor="pinkTant.900"
                    >
                        Buy Now
                    </Button>
                </Flex>
            </Box>

            <Box
                position="relative"
                mt="35px"
                width="100%" /* Set the width and height of the component as per your requirement */
                height="500px"
                bgImage={getAssetUrl('static/img/hero-section-2.jpg')}
                bgSize="cover"
                bgPosition="center"
                overflow="hidden"
            >
                {/* Create an overlay using Flex */}
                <Flex
                    direction={'column'}
                    position="absolute"
                    top={0}
                    left={0}
                    width="100%"
                    height="100%"
                    justifyContent="center"
                    alignItems="center"
                    color="white" /* Adjust the text color */
                    textAlign="center"
                    p="4"
                >
                    <BasketIcon boxSize="35px" />
                    <Text fontSize={{ base: "2xl", md: "4xl", lg: "5xl" }}>Find the right products for you</Text>
                    <Button
                        variant="outline"
                        bg="white"
                        as="a"
                        target="_blank"
                        onClick={() => {navigate('/category/womens-clothing-tops')}}
                        borderWidth="2px"
                        borderColor="pinkTant.900"
                    >
                        Get Start
                    </Button>
                </Flex>
            </Box>

            <Section
                background={'gray.50'}
                marginX="auto"
                paddingY={{ base: 8, md: 16 }}
                paddingX={{ base: 4, md: 8 }}
                borderRadius="base"
                width={{ base: '100vw', md: 'inherit' }}
                position={{ base: 'relative', md: 'inherit' }}
                left={{ base: '50%', md: 'inherit' }}
                right={{ base: '50%', md: 'inherit' }}
                marginLeft={{ base: '-50vw', md: 'auto' }}
                marginRight={{ base: '-50vw', md: 'auto' }}
            >
                <Heading textAlign={'center'} mb={'1'}>
                    BRANDS FOR WHICH WE WORKED
                </Heading>
                <SimpleGrid
                    columns={{ base: 1, md: 2, lg: 3 }}
                    spacingX={{ base: 1, md: 4 }}
                    spacingY={{ base: 4, md: 14 }}
                    justifyContent={"center"}
                    alignContent={"center"}
                    display={"flex"}
                    flexWrap={"wrap"}
                >
                    {/*heroFeatures.map((feature, index) => {
                        const featureMessage = feature.message
                        return (
                            <Box
                                key={index}
                                background={'white'}
                                boxShadow={'0px 2px 2px rgba(0, 0, 0, 0.1)'}
                                borderRadius={'4px'}
                            >
                                <Link target="_blank" href={feature.href}>
                                    <HStack>
                                        <Flex
                                            paddingLeft={6}
                                            height={24}
                                            align={'center'}
                                            justify={'center'}
                                        >
                                            {feature.icon}
                                        </Flex>
                                        <Text fontWeight="700" bgColor={'red'}>
                                            {intl.formatMessage(featureMessage.title)}
                                        </Text>
                                    </HStack>
                                </Link>
                            </Box>
                        )
                    })*/}
                    {brandImages.map((image, index) => (
                        <Image key={index} src={image.imageLink} alt="brand images" />
                    ))}
                </SimpleGrid>
            </Section>


            <Grid
                templateColumns={['1fr', '1fr', '1fr 1fr', '1fr 1fr 1fr']} // Responsive grid column layout
                gap="1rem"
                justifyItems="center"
                align="center"
                my="35px"
                bg="gray.100"
            >
                {/* Tile 1 */}
                <Box
                    position="relative"
                    width="100%" /* Responsive width */
                    m="1rem"
                    borderRadius="md"
                    overflow="hidden"
                >
                    {/* Image */}
                    <Box
                        width="100%"
                        height={['250px', '350px', '550px']} /* Responsive height */
                        bgImage={getAssetUrl('static/img/overlay1.jpg')}
                        bgSize="cover"
                        bgPosition="center"
                    >
                        {/* Center Overlay Text */}
                        <Box
                            position="absolute"
                            top="40%"
                            left="0"
                            textAlign="left"
                            bg="rgba(0, 0, 0, 0.4)" /* Adjust the overlay color and opacity here */
                            color="white" /* Adjust the text color */
                            p={['20px', '30px', '50px']} /* Responsive padding */
                        >
                            <Text fontSize={['md', 'lg']} /* Responsive font size */>Men</Text>
                        </Box>

                        {/* Bottom Overlay Text */}
                        <Box
                            position="absolute"
                            bottom="0"
                            left="0"
                            width="100%"
                            textAlign="center"
                            bg="rgba(0, 0, 0, 0.5)" /* Adjust the overlay color and opacity here */
                            color="white" /* Adjust the text color */
                            p="4"
                        >
                            <Button
                                as={Link}
                                onClick={() => {navigate('/category/mens')}}
                                target="_blank"
                                width={'auto'}
                                // paddingX={7}
                                bgColor={'black'}
                                _hover={{ textDecoration: 'none' }}
                            >
                                Shop Now
                            </Button>
                        </Box>
                    </Box>
                </Box>

                {/* Tile 2 */}
                <Box
                    position="relative"
                    width="100%" /* Responsive width */
                    m="1rem"
                    borderRadius="md"
                    overflow="hidden"
                >
                    {/* Image */}
                    <Box
                        width="100%"
                        height={['250px', '350px', '550px']} /* Responsive height */
                        bgImage={getAssetUrl('static/img/overlay2.jpg')}
                        bgSize="cover"
                        bgPosition="center"
                    >
                        {/* Center Overlay Text */}
                        <Box
                            position="absolute"
                            top="40%"
                            left="0"
                            textAlign="left"
                            bg="rgba(0, 0, 0, 0.4)" /* Adjust the overlay color and opacity here */
                            color="white" /* Adjust the text color */
                            p={['20px', '30px', '50px']} /* Responsive padding */
                        >
                            <Text fontSize={['md', 'lg']} /* Responsive font size */>Women</Text>
                        </Box>

                        {/* Bottom Overlay Text */}
                        <Box
                            position="absolute"
                            bottom="0"
                            left="0"
                            width="100%"
                            textAlign="center"
                            bg="rgba(0, 0, 0, 0.5)" /* Adjust the overlay color and opacity here */
                            color="white" /* Adjust the text color */
                            p="4"
                        >
                            <Button
                                as={Link}
                                onClick={() => {navigate('/category/womens')}}
                                target="_blank"
                                width={'auto'}
                                // paddingX={7}
                                bgColor={'black'}
                                _hover={{ textDecoration: 'none' }}
                            >
                                Shop Now
                            </Button>
                        </Box>
                    </Box>
                </Box>

                {/* Tile 3 */}
                <Box
                    position="relative"
                    width="100%" /* Responsive width */
                    m="1rem"
                    borderRadius="md"
                    overflow="hidden"
                >
                    {/* Image */}
                    <Box
                        width="100%"
                        height={['250px', '350px', '550px']} /* Responsive height */
                        bgImage={getAssetUrl('static/img/overly3.jpg')}
                        bgSize="cover"
                        bgPosition="center"
                    >
                        {/* Center Overlay Text */}
                        <Box
                            position="absolute"
                            top="40%"
                            left="0"
                            textAlign="left"
                            bg="rgba(0, 0, 0, 0.4)" /* Adjust the overlay color and opacity here */
                            color="white" /* Adjust the text color */
                            p={['20px', '30px', '50px']} /* Responsive padding */
                        >
                            <Text fontSize={['md', 'lg']} /* Responsive font size */>Shoes</Text>
                        </Box>

                        {/* Bottom Overlay Text */}
                        <Box
                            position="absolute"
                            bottom="0"
                            left="0"
                            width="100%"
                            textAlign="center"
                            bg="rgba(0, 0, 0, 0.5)" /* Adjust the overlay color and opacity here */
                            color="white" /* Adjust the text color */
                            p="4"
                        >
                            <Button
                                as={Link}
                                onClick={() => {navigate('/category/womens-accessories-shoes')}}
                                target="_blank"
                                width={'auto'}
                                // paddingX={7}
                                bgColor={'black'}
                                _hover={{ textDecoration: 'none' }}
                            >
                                Shop Now
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Grid>

            {productSearchResult && (
                <Section
                    padding={4}
                    paddingTop={16}
                    title={intl.formatMessage({
                        defaultMessage: 'Shop Products',
                        id: 'home.heading.shop_products'
                    })}
                    subtitle={intl.formatMessage(
                        {
                            defaultMessage:
                                'This section contains content from the catalog. {docLink} on how to replace it.',
                            id: 'home.description.shop_products',
                            description:
                                '{docLink} is a html button that links the user to https://sfdc.co/business-manager-manage-catalogs'
                        },
                        {
                            docLink: (
                                <Link
                                    target="_blank"
                                    href={'https://sfdc.co/business-manager-manage-catalogs'}
                                    textDecoration={'none'}
                                    position={'relative'}
                                    _after={{
                                        position: 'absolute',
                                        content: `""`,
                                        height: '2px',
                                        bottom: '-2px',
                                        margin: '0 auto',
                                        left: 0,
                                        right: 0,
                                        background: 'gray.700'
                                    }}
                                    _hover={{ textDecoration: 'none' }}
                                >
                                    {intl.formatMessage({
                                        defaultMessage: 'Read docs',
                                        id: 'home.link.read_docs'
                                    })}
                                </Link>
                            )
                        }
                    )}
                >
                    <Stack pt={8} spacing={16}>
                        <ProductScroller
                            products={productSearchResult?.hits}
                            isLoading={isLoading}
                            //* *****  Core: Rating & Reviews - START  *****
                            BottomLineWidget={batchBottomLineData}
                        //* *****  Core: Rating & Reviews - END  *****
                        />
                    </Stack>
                </Section>
            )}

            <Section
                padding={4}
                bgColor="gray.50"
                paddingTop={32}
                title={intl.formatMessage({
                    defaultMessage: 'Features',
                    id: 'home.heading.features'
                })}
                subtitle={intl.formatMessage({
                    defaultMessage:
                        'Out-of-the-box Integrations',
                    id: 'home.description.features'
                })}
            >
                <Container maxW={'6xl'} marginTop={10}>
                    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={5}>
                        <Box maxW="xl" borderRadius="lg" overflow="hidden" bgColor={'#fff'}>
                            <Flex>
                                {/* Left side image */}
                                <Image src={getAssetUrl('static/img/algolia.png')} alt="Image" boxSize="150px" />
                                <Box p="4">
                                    {/* Title on the right side */}
                                    <Heading as="h4" size="md" mb="2">
                                        Algolia
                                    </Heading>
                                    {/* Description on the right side */}
                                    <Text>
                                    Lightning-fast search and navigation to find products in a flash.
                                    </Text>
                                </Box>
                            </Flex>
                        </Box>
                        <Box maxW="xl" borderRadius="lg" overflow="hidden" bgColor={'#fff'}>
                            <Flex>
                                {/* Left side image */}
                                <Image src={getAssetUrl('static/img/melissa.png')} alt="Image" boxSize="150px" objectFit="cover" />
                                <Box p="4">
                                    {/* Title on the right side */}
                                    <Heading as="h4" size="md" mb="2">
                                        Melissa
                                    </Heading>
                                    {/* Description on the right side */}
                                    <Text>
                                    Streamlined address verification for hassle-free transactions and shipping.
                                    </Text>
                                </Box>
                            </Flex>
                        </Box>
                        <Box maxW="xl" borderRadius="lg" overflow="hidden" bgColor={'#fff'}>
                            <Flex>
                                {/* Left side image */}
                                <Image src={getAssetUrl('static/img/google.png')} alt="Image" boxSize="150px" objectFit="cover" />
                                <Box p="4">
                                    {/* Title on the right side */}
                                    <Heading as="h4" size="md" mb="2">
                                        Google Services
                                    </Heading>
                                    {/* Description on the right side */}
                                    <Text>
                                    Convenient Google login. Effortless tracking & robust security for insights & safe transactions
                                    </Text>
                                </Box>
                            </Flex>
                        </Box>
                        <Box maxW="xl" borderRadius="lg" overflow="hidden" bgColor={'#fff'}>
                            <Flex>
                                {/* Left side image */}
                                <Image src={getAssetUrl('static/img/ayden.png')} alt="Image" boxSize="150px" objectFit="cover" />
                                <Box p="4">
                                    {/* Title on the right side */}
                                    <Heading as="h4" size="md" mb="2">
                                        Adyen Payments
                                    </Heading>
                                    {/* Description on the right side */}
                                    <Text>
                                    Smooth and secure payment processing for hassle-free purchases.
                                    </Text>
                                </Box>
                            </Flex>
                        </Box>
                        <Box maxW="xl" borderRadius="lg" overflow="hidden" bgColor={'#fff'}>
                            <Flex>
                                {/* Left side image */}
                                <Image src={getAssetUrl('static/img/content-stack.png')} alt="Image" boxSize="150px" objectFit="cover" />
                                <Box p="4">
                                    {/* Title on the right side */}
                                    <Heading as="h4" size="md" mb="2">
                                        Content Slack
                                    </Heading>
                                    {/* Description on the right side */}
                                    <Text>
                                    Real-time collaboration and communication for a seamless shopping experience.
                                    </Text>
                                </Box>
                            </Flex>
                        </Box>
                        <Box maxW="xl" borderRadius="lg" overflow="hidden" bgColor={'#fff'}>
                            <Flex>
                                {/* Left side image */}
                                <Image src={getAssetUrl('static/img/klaviyo.png')} alt="Image" boxSize="150px" objectFit="cover" />
                                <Box p="4">
                                    {/* Title on the right side */}
                                    <Heading as="h4" size="md" mb="2">
                                    Klaviyo Marketing
                                    </Heading>
                                    {/* Description on the right side */}
                                    <Text>
                                    Customized solutions for a personalized and delightful customer journey.
                                    </Text>
                                </Box>
                            </Flex>
                        </Box>
                        {/* {features.map((feature, index) => {
                            const featureMessage = feature.message
                            return (
                                <HStack key={index} align={'top'}>
                                    <VStack align={'start'} spacing='4'>

                                        <Image h='150px' w='200px' objectFit={'cover'} src={feature.icon} />
                                        <Text
                                            fontWeight={700}
                                            fontSize={20}
                                            color={'pinkTant.900'}
                                        >
                                            {intl.formatMessage(featureMessage.title)}
                                        </Text>
                                        <Text color={'black'}>
                                            {intl.formatMessage(featureMessage.text)}
                                        </Text>
                                    </VStack>
                                </HStack>
                            )
                        })} */}
                    </SimpleGrid>
                </Container>
            </Section>

            <Section
                padding={4}
                paddingTop={32}
                title='Makes Your Brand Shine'
                subtitle={
                    <>
                        <>
                            {intl.formatMessage({
                                defaultMessage: 'Contact our support staff.',
                                id: 'home.description.here_to_help'
                            })}
                        </>
                        <br />
                        <>
                            {intl.formatMessage({
                                defaultMessage: 'They will get you to the right place.',
                                id: 'home.description.here_to_help_line_2'
                            })}
                        </>
                    </>
                }
                actions={
                    <Button
                        as={Link}
                        href="https://nestosh.com/contact/"
                        target="_blank"
                        width={'auto'}
                        paddingX={7}
                        _hover={{ textDecoration: 'none' }}
                    >
                        <FormattedMessage defaultMessage="Contact Us" id="home.link.contact_us" />
                    </Button>
                }
                maxWidth={'xl'}
            />
        </Box>
    )
}

Home.getTemplateName = () => 'home'

Home.shouldGetProps = ({ previousLocation, location }) =>
    !previousLocation || previousLocation.pathname !== location.pathname

Home.getProps = async ({ res, api }) => {
    if (res) {
        res.set('Cache-Control', `max-age=${MAX_CACHE_AGE}`)
    }

    const productSearchResult = await api.shopperSearch.productSearch({
        parameters: {
            refine: [`cgid=${HOME_SHOP_PRODUCTS_CATEGORY_ID}`, 'htype=master'],
            limit: HOME_SHOP_PRODUCTS_LIMIT
        }
    })

    return { productSearchResult }
}

Home.propTypes = {
    /**
     * The search result object showing all the product hits, that belong
     * in the supplied category.
     */
    productSearchResult: PropTypes.object,
    /**
     * The current state of `getProps` when running this value is `true`, otherwise it's
     * `false`. (Provided internally)
     */
    isLoading: PropTypes.bool
}

export default Home
