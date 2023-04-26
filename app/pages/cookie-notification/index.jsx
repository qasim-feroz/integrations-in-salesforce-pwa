import React, {useState, useEffect} from 'react'
import {Box, Flex, Text, Button, CloseButton, Divider, Center} from '@chakra-ui/react'
import CookiesModel from './CookiesModel'
import Cookies from 'js-cookie'
const CookieNotification = () => {
    const [showBanner, setShowBanner] = useState(true)
    const [showCustomizeCookieModel, setShowCustomizeCookieModel] = useState(Boolean)
    const storedCookies = Cookies.get('cookiePreferences')

    if (!storedCookies) {
        console.log('A')
    } else {
        console.log(false)
    }
    useEffect(() => {
        if (storedCookies) {
            const cookiesObject = JSON.parse(storedCookies)
            if (Object.keys(cookiesObject).length !== 0) {
                setShowBanner(false)
                console.log('There is data in the object')
            } else {
                setShowBanner(true)
                console.log('Data is not available')
            }
        }
    }, [storedCookies])

    const [cookiePreferences, setCookiePreferences] = useState({
        analytics: true,
        marketing: true,
        functional: true
    })

    // handle cookies selection checkbox
    const handleCheckboxChange = (event) => {
        const {name, checked} = event.target
        setCookiePreferences({...cookiePreferences, [name]: checked})
    }

    // handle preffered cookies setting button click
    const handleAcceptClick = (e) => {
        e.preventDefault()
        Cookies.set('cookiePreferences', JSON.stringify(cookiePreferences))
        console.log(cookiePreferences)
        setShowCustomizeCookieModel(false)
        setShowBanner(false)
    }

    // handle accept all cookies button click
    const handleAllCookieSubmit = (e) => {
        e.preventDefault()
        setCookiePreferences((prevState) => ({
            analytics: true,
            marketing: true,
            functional: true
        }))
        // Save cookie preferences to browser's cookies
        Cookies.set(
            'cookiePreferences',
            JSON.stringify({
                analytics: true,
                marketing: true,
                functional: true
            })
        )

        setShowBanner(false)
    }

    // handle rejected all cookies button click

    const handleRejectAllSubmit = (e) => {
        e.preventDefault()
        setCookiePreferences((prevState) => ({
            analytics: false,
            marketing: false,
            functional: false
        }))
        // Save cookie preferences to browser's cookies
        Cookies.set(
            'cookiePreferences',
            JSON.stringify({
                analytics: false,
                marketing: false,
                functional: false
            })
        )

        setShowBanner(false)
    }

    return (
        <>
            <CookiesModel
                isOpen={showCustomizeCookieModel}
                onClose={() => setShowCustomizeCookieModel(false)}
                cookiePreferences={cookiePreferences}
                handleCheckboxChange={handleCheckboxChange}
                handleAcceptClick={handleAcceptClick}
            />

            {!storedCookies && (
                <Box
                    pos="fixed"
                    bottom="0"
                    left="0"
                    right="0"
                    bg="gray.800"
                    color="white"
                    py="4"
                    zIndex="999"
                    display={'flex'}
                    flexDirection={{base: 'column', md: 'row'}}
                    justifyContent="space-between"
                    px={{base: '4', md: '8', lg: '16'}}
                >
                    <Center flexWrap="wrap" mb={{base: '2', md: '0'}}>
                        <Text fontSize="lg" mr="4" noOfLines={[1, 2, 3]}>
                            This site uses cookies
                        </Text>
                        {/*  <Divider
                            orientation="vertical"
                            mb={{base: '2', md: '0'}}
                            display={{base: 'none', md: 'none', lg: 'block'}}
            />*/}
                        <Text
                            fontSize="md"
                            mr="4"
                            ml={['0', '0', '4']}
                            noOfLines={[1, 2, 3]}
                            textAlign={{base: 'center', md: 'left'}}
                            // mb="2"
                        >
                            This website uses cookies to ensure you get the best experience on our
                            website.
                        </Text>
                    </Center>
                    <Flex
                        alignItems={{base: 'center', md: 'flex-start'}}
                        flexWrap="wrap"
                        justifyContent={{base: 'center', md: 'flex-start'}}
                        mt={{base: '2', md: '0'}}
                    >
                        <Flex
                            direction="column"
                            mb={{base: '2', md: '0'}}
                            mr={{base: '0', md: '4'}}
                            alignItems={{base: 'center', md: 'flex-start'}}
                        >
                            <Button
                                height="38px"
                                width={{base: '100%', md: '200px'}}
                                size="sm"
                                mb="1"
                                onClick={handleAllCookieSubmit}
                            >
                                Accept All
                            </Button>
                            <Button
                                height="38px"
                                width={{base: '100%', md: '200px'}}
                                variant="ghost"
                                size="sm"
                                mb="1"
                                onClick={handleRejectAllSubmit}
                            >
                                Reject All
                            </Button>
                            <Button
                                height="38px"
                                width={{base: '100%', md: '200px'}}
                                variant="ghost"
                                size="sm"
                                mb="1"
                                onClick={() => setShowCustomizeCookieModel(true)}
                            >
                                Customize
                            </Button>
                        </Flex>
                        {/*<CloseButton size="sm" onClick={handleClose} position="relative" top="-2px" />*/}
                    </Flex>
                </Box>
            )}
        </>
    )
}

export default CookieNotification
