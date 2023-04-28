import React, {useEffect} from 'react'
import {createGetTokenBody} from '../../commerce-api/utils'
import {getAppOrigin} from 'pwa-kit-react-sdk/utils/url'
import useCustomer from '../../commerce-api/hooks/useCustomer'
import useNavigation from '../../hooks/use-navigation'
import {Spinner, Center} from '@chakra-ui/react'

const googleCallback = () => {
    const customer = useCustomer()
    const navigate = useNavigation()
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const slasCallbackEndpoint = '/google-callback'
            const tokenBody = createGetTokenBody(
                window.location.href,
                `${getAppOrigin()}${slasCallbackEndpoint}`,
                window.sessionStorage.getItem('codeVerifier')
            )
            const tokenResponse = customer.getLoggedInCustomerToken(tokenBody)
            window.sessionStorage.removeItem('codeVerifier')
            tokenResponse.then(function(result) {
                customer.federatedLogin(result.customer_id)
            })
            const pageBeforeLogin = window.sessionStorage.getItem('pageBeforeLogin')
            window.sessionStorage.removeItem('codeVerifier')
            navigate(pageBeforeLogin)
        }
    }, [])

    return (
        <Center h="500px" color="white">
            <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="xl"
            />
        </Center>
    )
}

export default googleCallback
