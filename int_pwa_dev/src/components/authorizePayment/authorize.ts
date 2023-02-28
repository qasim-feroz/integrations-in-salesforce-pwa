import fetch from 'cross-fetch'

const AuthorizePayment = async (origin:any, basket:any, customer:any, adyenData:any) => {
    let paymentResult, error
    const result = await fetch(
        `${origin}/mobify/proxy/adyen/v68/payments`, {
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
            "returnUrl": `${origin}`,
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
