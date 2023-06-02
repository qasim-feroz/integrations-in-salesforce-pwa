import React from 'react'

import AdyenCheckout from '@adyen/adyen-web'
import '../../styles/adyen.css'

import {getAppOrigin} from 'pwa-kit-react-sdk/utils/url'
import {useEffect} from 'react'
import {useCheckout} from '../../../../pages/checkout/util/checkout-context'
import {httpClient, coreAppConfig} from 'pwa-custom-core/src'
import {RequestTarget} from 'pwa-custom-core/src/base/enums'

const AdyenCCFields = () => {
    let cardInfo = {}
    const {setAdyenData} = useCheckout()

    const adyenCreds = coreAppConfig.getAdyenCredentials()

    const handleChange = (event, component) => {
        cardInfo.paymentMethod = event.data.paymentMethod
        setAdyenData(cardInfo)
    }

    const handleField = (event, component) => {
        if (event.fieldType == 'encryptedCardNumber') {
            cardInfo.maskedNumber = event.endDigits
        }
    }

    const handleBrand = (event, component) => {
        cardInfo.brand = event.brand
    }

    const options = {
        onValid: handleChange,
        onFieldValid: handleField,
        onBrand: handleBrand
    }

    const params = {
        url: 'mobify/proxy/adyen/v69/sessions',
        method: 'POST',
        headers: {
            Authorization: 'Basic '.concat(adyenCreds.ADYEN_API_KEY)
        },
        payload: {
            merchantAccount: 'NestoshECOM',
            amount: {
                value: 2000,
                currency: 'USD'
            },
            returnUrl: `${getAppOrigin()}/en/content-search`,
            reference: 'Juice123',
            countryCode: 'US'
        },
        target: RequestTarget.None
    }

    useEffect(async () => {
        const sessionResult = await httpClient.getFetch(params)
        if (!sessionResult.error)
            renderPaymentComponent(sessionResult.response, options, adyenCreds)
    }, [])

    return (
        <div>
            <div id="card-container"></div>
        </div>
    )
}

const renderPaymentComponent = async (result, options, adyenCreds) => {
    const configuration = {
        environment: 'test', // Change to one of the environment values specified in step 4.
        clientKey: adyenCreds.ADYEN_CLIENT_KEY, // Public key used for client-side authentication: https://docs.adyen.com/development-resources/client-side-authentication
        analytics: {
            enabled: true // Set to false to not send analytics data to Adyen.
        },
        session: {
            id: result.id, // Unique identifier for the payment session.
            sessionData: result.sessionData
            // The payment session data.
        },
        onPaymentCompleted: (result, component) => {
            console.info(result, component)
        },
        onError: (error, component) => {
            console.error(error.name, error.message, error.stack, component)
        },
        // Any payment method specific configuration. Find the configuration specific to each payment method:  https://docs.adyen.com/payment-methods
        // For example, this is 3D Secure configuration for cards:
        paymentMethodsConfiguration: {
            card: {
                hasHolderName: true,
                holderNameRequired: false,
                billingAddressRequired: false
            }
        }
    }
    const checkout = await AdyenCheckout(configuration)
    const dropinComponent = checkout.create('card', options).mount('#card-container')
}

export default AdyenCCFields
