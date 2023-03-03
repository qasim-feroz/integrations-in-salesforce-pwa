import { getAppOrigin } from 'pwa-kit-react-sdk/utils/url'
import fetch from 'cross-fetch'

import useBasket from "../../../../commerce-api/hooks/useBasket"
import useCustomer from "../../../../commerce-api/hooks/useCustomer"
import { useCheckout } from "../../../../pages/checkout/util/checkout-context"
import { useEffect } from 'react'

const AuthorizePayment = async (basket, customer, adyenData) => {
    let paymentResult, error
    const result = await fetch(
        `${getAppOrigin()}/mobify/proxy/adyen/v68/payments`, {
        method: 'POST',
        headers: {
            'Authorization': 'Basic d3NfNDU5MDQwQENvbXBhbnkuTmVzdG9zaDpkWXhZKUAqZjVrNVRJNDJReCZrOTQ2PFVV',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "amount": {
                "value": basket.orderTotal*100,
                "currency": basket.currency
            },
            "paymentMethod": adyenData,
            "reference": "51512",
            "merchantAccount": "NestoshECOM",
            "returnUrl": `${getAppOrigin()}`,
            "shopperReference": customer.customerId,
            "shopperInteraction": "ContAuth",
            "recurringProcessingModel": "CardOnFile"
        })
    })

    if (result.ok) {
        paymentResult = await result.json()
    } else {
        error = await result.json()
    }

    return { paymentResult, error }
}

export default AuthorizePayment
