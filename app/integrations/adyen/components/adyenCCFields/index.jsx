import React from 'react'
import fetch from 'cross-fetch'

import AdyenCheckout from '@adyen/adyen-web';
import '../../styles/adyen.css'

import { getAppOrigin } from 'pwa-kit-react-sdk/utils/url'
import { useState, useEffect } from 'react';
import useBasket from '../../../../commerce-api/hooks/useBasket';
import useCustomer from '../../../../commerce-api/hooks/useCustomer';
import { useCheckout } from '../../../../pages/checkout/util/checkout-context';

const AdyenCCFields = ({ form, prefix = '' }) => {
    // const [paymentInfo, setPaymentInfo] = useState({})
    const basket = useBasket()
    const customer = useCustomer()
    const [maskedCard, setMaskedCard] = useState(0)

    const { setAdyenData } = useCheckout()

    const handleChange = (event, component) => {
        setAdyenData(event.data.paymentMethod)
    }

    const handleField = (event, component) => {
        if (event.fieldType == "encryptedCardNumber") {
            const cardNumber = parseInt(event.endDigits) || 0
            // setMaskedCard(cardNumber)
            setAdyenData({cardNumber})
        }

    }

    const options = {
        onValid: handleChange,
        onFieldValid: handleField
    }

    useEffect(async () => {
        renderCCFields().then(function (result) {
            renderPaymentComponent(result, options)
        })
    }, [])

    return (
        <div>
            <div id="card-container"></div>
        </div>
    )
}

const renderPaymentComponent = async (result, options) => {
    const configuration = {
        environment: 'test', // Change to one of the environment values specified in step 4.
        clientKey: 'test_KUFFQNQDM5DDZGBXFOHKXOXVTMJ2UEM6', // Public key used for client-side authentication: https://docs.adyen.com/development-resources/client-side-authentication
        analytics: {
            enabled: true // Set to false to not send analytics data to Adyen.
        },
        session: {
            id: result.sessionResult.id, // Unique identifier for the payment session.
            sessionData: result.sessionResult.sessionData
            // The payment session data.
        },
        onPaymentCompleted: (result, component) => {
            console.info(result, component);
        },
        onError: (error, component) => {
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
    const dropinComponent = checkout.create('card', options).mount('#card-container')
}

const renderCCFields = async () => {
    let sessionResult, error
    const result = await fetch(
        `${getAppOrigin()}/mobify/proxy/adyen/v69/sessions`, {
        method: 'POST',
        headers: {
            'Authorization': 'Basic d3NfNDU5MDQwQENvbXBhbnkuTmVzdG9zaDpkWXhZKUAqZjVrNVRJNDJReCZrOTQ2PFVV',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "merchantAccount": "NestoshECOM",
            "amount": {
                "value": 2000,
                "currency": "USD"
            },
            "returnUrl": `${getAppOrigin()}/en/content-search`,
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
