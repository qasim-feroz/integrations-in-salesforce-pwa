import React from 'react'
import fetch from 'cross-fetch'

import AdyenCheckout from '@adyen/adyen-web';
import '@adyen/adyen-web/dist/adyen.css';
import getCredentials from '../../credentials/getCredentials';

import { useEffect } from 'react';


declare var process : {
    env: {
        API_KEY: {
            NODE_ENV: string
        }
        CLIENT_KEY: {
            NODE_ENV: string
        }
    }
}

const AdyenCCFields = (props: any) => {
    const { setAdyenData, origin } = props
    let cardInfo = {
        paymentMethod: '',
        maskedNumber: '',
        brand: ''
    }

    const handleChange = (event: any) => {
        cardInfo.paymentMethod = event.data.paymentMethod
        setAdyenData(cardInfo)
    }

    const handleField = (event: any) => {
        if (event.fieldType == "encryptedCardNumber") {
            cardInfo.maskedNumber = event.endDigits
        }

    }

    const handleBrand = (event: any) => {
        cardInfo.brand = event.brand
    }

    const options = {
        onValid: handleChange,
        onFieldValid: handleField,
        onBrand: handleBrand
    }

    useEffect(() => {
        renderCCFields(origin).then(function (result) {
            renderPaymentComponent(result, options)
        })
    }, [])

    return (
        <div>
            <div id="card-container"></div>
        </div>
    )
}

const renderPaymentComponent = async (result: any, options: any) => {
    const credentials = getCredentials()
    const configuration = {
        environment: 'test', // Change to one of the environment values specified in step 4.
        clientKey: `${credentials.ADYEN_CLIENT_KEY}`, // Public key used for client-side authentication: https://docs.adyen.com/development-resources/client-side-authentication
        analytics: {
            enabled: true // Set to false to not send analytics data to Adyen.
        },
        session: {
            id: result.sessionResult.id, // Unique identifier for the payment session.
            sessionData: result.sessionResult.sessionData
            // The payment session data.
        },
        onPaymentCompleted: (result:any, component:any) => {
            console.info(result, component);
        },
        onError: (error:any, component:any) => {
            console.error(error.name, error.message, error.stack, component);
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
    };
    const checkout = await AdyenCheckout(configuration)
    checkout.create('card', options).mount('#card-container')
}

const renderCCFields = async (origin:any) => {
    let sessionResult, error
    const credentials = getCredentials()
    const result = await fetch(
        `${origin}/mobify/proxy/adyen/v69/sessions`, {
        method: 'POST',
        headers: {
            'Authorization': `Basic ${credentials.ADYEN_API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "merchantAccount": "NestoshECOM",
            "amount": {
                "value": 2000,
                "currency": "USD"
            },
            "returnUrl": `${origin}/en/content-search`,
            "reference": "Juice123",
            "countryCode": "US"
        })
    })

    if (result.ok) {
        sessionResult = await result.json()
    } else {
        error = await result.json()
    }

    return { sessionResult, error }
}

export default AdyenCCFields
